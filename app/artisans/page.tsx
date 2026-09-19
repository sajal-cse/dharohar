'use client';

import { useState, useMemo } from 'react';
import { ArtisanCard } from '@/components/cards';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { artisans } from '@/lib/data';

export default function ArtisansPage() {
  const [state, setState] = useState('all');

  const states = useMemo(() => Array.from(new Set(artisans.map((a) => a.state))).sort(), []);

  const filtered = useMemo(() => {
    return artisans.filter((a) => state === 'all' || a.state === state);
  }, [state]);

  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Meet the Keepers of Tradition
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          The artisans, performers, and craftspeople who have dedicated their lives to preserving India&apos;s cultural heritage. Their hands carry centuries of knowledge.
        </p>

        <div className="mb-8">
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="h-11 rounded-full sm:w-56">
              <SelectValue placeholder="Filter by State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} {filtered.length === 1 ? 'artisan' : 'artisans'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((artisan, index) => (
            <ArtisanCard key={artisan.id} artisan={artisan} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
