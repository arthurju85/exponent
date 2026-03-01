'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Wallet } from 'lucide-react';
import { XLogo } from './x-logo';
import { GoogleLogo } from './google-logo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type AuthStep = 'login' | 'email-form' | 'email-verify' | 'wallet-setup';

export function AuthModal({ open, onOpenChange, onSuccess }: AuthModalProps) {
  const t = useTranslations('onboarding.identity');
  const [step, setStep] = useState<AuthStep>('login');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const generateWalletAddress = () => {
    // Generate a mock wallet address
    return '0x' + Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const address = generateWalletAddress();
      setWalletAddress(address);
      setIsLoading(false);
      setStep('wallet-setup');
    }, 1500);
  };

  const handleTwitterLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const address = generateWalletAddress();
      setWalletAddress(address);
      setIsLoading(false);
      setStep('wallet-setup');
    }, 1500);
  };

  const handleWalletConnect = () => {
    setIsLoading(true);
    // Simulate wallet connection
    setTimeout(() => {
      const address = generateWalletAddress();
      setWalletAddress(address);
      setIsLoading(false);
      // Skip wallet-setup step for wallet connect since they already have a wallet
      handleComplete();
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('email-verify');
    }, 1000);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const address = generateWalletAddress();
      setWalletAddress(address);
      setIsLoading(false);
      setStep('wallet-setup');
    }, 1000);
  };

  const handleComplete = () => {
    onOpenChange(false);
    onSuccess?.();
    reset();
  };

  const reset = () => {
    setStep('login');
    setEmail('');
    setVerificationCode('');
    setWalletAddress('');
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) reset();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {step === 'login' && 'Welcome to Exponent'}
            {step === 'email-form' && 'Enter your email'}
            {step === 'email-verify' && 'Verify your email'}
            {step === 'wallet-setup' && 'Your Wallet is Ready'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 'login' && 'Sign in to continue'}
            {step === 'email-form' && "We'll send you a verification code"}
            {step === 'email-verify' && `Enter the code sent to ${email}`}
            {step === 'wallet-setup' && "We've automatically created a wallet for you"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {step === 'login' && (
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 relative"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <GoogleLogo className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 relative"
                onClick={handleTwitterLogin}
                disabled={isLoading}
              >
                <XLogo className="mr-2 h-5 w-5" />
                Continue with X
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 relative"
                onClick={handleWalletConnect}
                disabled={isLoading}
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() => setStep('email-form')}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </div>
          )}

          {step === 'email-form' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? 'Sending...' : 'Send verification code'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep('login')}
              >
                Back
              </Button>
            </form>
          )}

          {step === 'email-verify' && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || verificationCode.length < 6}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setStep('email-form')}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={handleEmailSubmit}
                  disabled={isLoading}
                >
                  Resend code
                </Button>
              </div>
            </form>
          )}

          {step === 'wallet-setup' && (
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <Label className="text-sm text-muted-foreground mb-2 block">Your Wallet Address</Label>
                <div className="font-mono text-sm break-all bg-background p-3 rounded">
                  {walletAddress}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This wallet is automatically created and linked to your account.
                You can use it to invest in projects or create your own.
              </p>
              <Button
                className="w-full"
                onClick={handleComplete}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {step !== 'wallet-setup' && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
