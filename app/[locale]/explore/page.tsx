'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    name: 'Elite Insurance Pro',
    symbol: '$EIP',
    role: 'superSeller',
    status: 'subscribing',
    image: '/projects/1.jpg',
    raised: 48600,
    hardCap: 72000,
    participants: 127,
    currentPrice: 0.012,
    endTime: '3 days',
  },
  {
    id: '2',
    name: 'AI Content Studio',
    symbol: '$ACS',
    role: 'creator',
    status: 'subscribing',
    image: '/projects/2.jpg',
    raised: 28500,
    hardCap: 50000,
    participants: 89,
    currentPrice: 0.008,
    endTime: '8 days',
  },
  {
    id: '3',
    name: 'SaaS Dev Tools',
    symbol: '$SDT',
    role: 'solopreneur',
    status: 'graduated',
    image: '/projects/3.jpg',
    raised: 100000,
    hardCap: 80000,
    participants: 234,
    currentPrice: 0.045,
    listPrice: 0.015,
    change: '+200%',
    endTime: 'Graduated',
  },
  {
    id: '4',
    name: 'Real Estate Master',
    symbol: '$REM',
    role: 'superSeller',
    status: 'graduated',
    image: '/projects/4.jpg',
    raised: 150000,
    hardCap: 120000,
    participants: 312,
    currentPrice: 0.078,
    listPrice: 0.025,
    change: '+212%',
    endTime: 'Graduated',
  },
  {
    id: '5',
    name: 'Crypto Analyst Pro',
    symbol: '$CAP',
    role: 'creator',
    status: 'subscribing',
    image: '/projects/5.jpg',
    raised: 15600,
    hardCap: 60000,
    participants: 67,
    currentPrice: 0.009,
    endTime: '12 days',
  },
  {
    id: '6',
    name: 'Web3 Developer',
    symbol: '$W3D',
    role: 'solopreneur',
    status: 'subscribing',
    image: '/projects/6.jpg',
    raised: 42500,
    hardCap: 75000,
    participants: 156,
    currentPrice: 0.011,
    endTime: '5 days',
  },
];

const roleColors: Record<string, string> = {
  superSeller: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  solopreneur: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  creator: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

const roleLabels: Record<string, string> = {
  superSeller: 'Super Seller',
  solopreneur: 'Solopreneur',
  creator: 'Creator',
};

export default function ExplorePage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || project.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('nav.explore')}
            </h1>
            <p className="text-muted-foreground">
              Discover and invest in promising super-individual projects
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10 w-full md:w-[280px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="superSeller">Super Seller</SelectItem>
                  <SelectItem value="solopreneur">Solopreneur</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="subscribing">Subscribing</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="endingSoon">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 opacity-20" />
                  </div>
                  {project.status === 'graduated' && (
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="default"
                        className="bg-green-500 text-white"
                      >
                        🎓 Graduated
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.symbol}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(roleColors[project.role])}
                    >
                      {roleLabels[project.role]}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.participants}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{project.endTime}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  {project.status === 'subscribing' ? (
                    <>
                      <Progress
                        value={(project.raised / project.hardCap) * 100}
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${project.raised.toLocaleString()} /
                        </span>
                        <span className="font-medium">
                          ${project.hardCap.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Current Price:
                        </span>
                        <span className="font-medium text-primary">
                          ${project.currentPrice.toFixed(3)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Listed Price:
                        </span>
                        <span className="font-medium">
                          ${project.listPrice?.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Current Price:
                        </span>
                        <span className="font-medium text-green-500">
                          ${project.currentPrice.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Change:</span>
                        <span className="font-medium text-green-500">
                          {project.change}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" variant="default">
                    {project.status === 'subscribing'
                      ? 'Invest Now'
                      : 'View Details'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
