'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bell, Check, TrendingUp, Users, FileCheck, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type NotificationType = 'investment' | 'milestone' | 'reimbursement' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'milestone',
    title: 'Soft Cap Reached!',
    message: 'Your project has reached the soft cap of $36,000',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'investment',
    title: 'New Investment',
    message: '0x7a3f...9e2d invested $2,000 in your project',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: '3',
    type: 'reimbursement',
    title: 'Reimbursement Approved',
    message: 'Your reimbursement request for $5,240 has been approved',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'New features are now available on the platform',
    time: '3 days ago',
    read: true,
  },
];

const typeIcons: Record<NotificationType, typeof Bell> = {
  investment: Users,
  milestone: TrendingUp,
  reimbursement: FileCheck,
  system: Info,
};

const typeColors: Record<NotificationType, string> = {
  investment: 'bg-blue-500/10 text-blue-500',
  milestone: 'bg-green-500/10 text-green-500',
  reimbursement: 'bg-purple-500/10 text-purple-500',
  system: 'bg-gray-500/10 text-gray-500',
};

export function Notifications() {
  const t = useTranslations('nav');
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">{t('notifications')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-semibold">{t('notifications')}</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs"
              onClick={markAllAsRead}
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            return (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex items-start gap-3 p-3 cursor-pointer',
                  !notification.read && 'bg-muted/50'
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div
                  className={cn(
                    'rounded-full p-2 shrink-0',
                    typeColors[notification.type]
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                )}
              </DropdownMenuItem>
            );
          })
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
