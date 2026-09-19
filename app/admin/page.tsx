'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  TrendingUp,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockContributions, traditions, artisans, stories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Traditions', value: traditions.length, icon: FileText, color: 'text-primary' },
  { label: 'Total Contributors', value: 47, icon: Users, color: 'text-accent' },
  { label: 'Total Artisans', value: artisans.length, icon: ShieldCheck, color: 'text-primary' },
  { label: 'Pending Contributions', value: mockContributions.filter((c) => c.status === 'pending').length, icon: Clock, color: 'text-destructive' },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [contributions, setContributions] = useState(mockContributions);

  const handleAction = (id: string, action: 'approve' | 'reject' | 'review') => {
    const actionLabels: Record<string, string> = {
      approve: 'approved',
      reject: 'rejected',
      review: 'marked for review',
    };

    if (action === 'approve' || action === 'reject') {
      setContributions((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: action === 'approve' ? 'approved' : 'rejected' } : c
        )
      );
    }

    toast({
      title: `Contribution ${actionLabels[action]}`,
      description: `The submission has been ${actionLabels[action]}.`,
    });
  };

  const pending = contributions.filter((c) => c.status === 'pending');
  const approved = contributions.filter((c) => c.status === 'approved');
  const rejected = contributions.filter((c) => c.status === 'rejected');

  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage contributions and monitor platform statistics
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-card rounded-2xl border border-border/50 shadow-sm p-5 animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className={cn('w-5 h-5', stat.color)} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Contributions */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm">
          <div className="p-6 border-b border-border/50">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Pending Contributions
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review and verify community-submitted heritage entries
            </p>
          </div>

          <Tabs defaultValue="pending" className="p-6">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">
                Pending ({pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({approved.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejected.length})
              </TabsTrigger>
            </TabsList>

            {(['pending', 'approved', 'rejected'] as const).map((tabStatus) => (
              <TabsContent key={tabStatus} value={tabStatus} className="space-y-3">
                {contributions.filter((c) => c.status === tabStatus).length > 0 ? (
                  contributions
                    .filter((c) => c.status === tabStatus)
                    .map((contribution) => (
                      <div
                        key={contribution.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground text-sm">
                              {contribution.title}
                            </h3>
                            <Badge
                              variant={
                                contribution.status === 'approved'
                                  ? 'default'
                                  : contribution.status === 'rejected'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {contribution.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span>By {contribution.contributor_name}</span>
                            <span>{contribution.state} · {contribution.district}</span>
                            <span>{contribution.category}</span>
                            <span>
                              {new Date(contribution.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>

                        {tabStatus === 'pending' && (
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              size="sm"
                              variant="default"
                              className="gap-1.5 rounded-full h-8 text-xs"
                              onClick={() => handleAction(contribution.id, 'approve')}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 rounded-full h-8 text-xs"
                              onClick={() => handleAction(contribution.id, 'review')}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-1.5 rounded-full h-8 text-xs text-destructive hover:text-destructive"
                              onClick={() => handleAction(contribution.id, 'reject')}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground">
                      No {tabStatus} contributions at this time.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
