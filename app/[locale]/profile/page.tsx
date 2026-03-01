'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Wallet, Copy, ExternalLink, User, Settings, LogOut } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock data for user profile
const mockUser = {
  name: 'Arthur',
  email: 'arthur@example.com',
  walletAddress: '0x7a3f8e9d2c1b5a4f6e0d8c7b9a2f3e4d5c6b7a8f',
  joinedDate: '2025-02-28',
};

// Mock data for token balances
const mockBalances = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    balance: 12500.50,
    value: 12500.50,
    change24h: '+0.01%',
    icon: '💵',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.45,
    value: 8925.75,
    change24h: '+2.34%',
    icon: '💎',
  },
  {
    symbol: 'EIP',
    name: 'Elite Insurance Pro',
    balance: 150000,
    value: 1800.00,
    change24h: '+15.2%',
    icon: '📈',
  },
  {
    symbol: 'ACS',
    name: 'AI Content Studio',
    balance: 50000,
    value: 450.00,
    change24h: '-3.5%',
    icon: '🎨',
  },
];

export default function ProfilePage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('wallet');

  const copyAddress = () => {
    navigator.clipboard.writeText(mockUser.walletAddress);
    toast.success('Address copied to clipboard');
  };

  const totalBalance = mockBalances.reduce((sum, token) => sum + token.value, 0);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account and wallet</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{mockUser.name}</h2>
                      <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Joined {mockUser.joinedDate}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <Card>
                <CardContent className="p-2">
                  <nav className="space-y-1">
                    <Button
                      variant={activeTab === 'wallet' ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab('wallet')}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Button>
                    <Button
                      variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="wallet" className="mt-0 space-y-6">
                  {/* Wallet Address Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        Wallet Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-muted p-3 rounded-lg text-sm break-all">
                          {mockUser.walletAddress}
                        </code>
                        <Button variant="outline" size="icon" onClick={copyAddress}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Total Balance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Across all tokens
                      </p>
                    </CardContent>
                  </Card>

                  {/* Token Balances */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Token Balances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockBalances.map((token) => (
                          <div
                            key={token.symbol}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{token.icon}</span>
                              <div>
                                <div className="font-medium">{token.symbol}</div>
                                <div className="text-sm text-muted-foreground">
                                  {token.name}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {token.balance.toLocaleString()} {token.symbol}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${token.value.toLocaleString()}
                              </div>
                              <div
                                className={`text-xs ${
                                  token.change24h.startsWith('+')
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                }`}
                              >
                                {token.change24h}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Display Name</label>
                        <input
                          type="text"
                          defaultValue={mockUser.name}
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          defaultValue={mockUser.email}
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                          disabled
                        />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
