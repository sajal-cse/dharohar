'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TraditionCard } from '@/components/cards';
import { traditions, categories } from '@/lib/data';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [state, setState] = useState('all');

  const states = useMemo(() => {
    const unique = Array.from(new Set(traditions.map((t) => t.state)));
    return unique.sort();
  }, []);

  const filtered = useMemo(() => {
    return traditions.filter((t) => {
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.state.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === 'all' ||
        t.category.toLowerCase().replace(/\s+/g, '-') === category;
      const matchesState = state === 'all' || t.state === state;
      return matchesSearch && matchesCategory && matchesState;
    });
  }, [search, category, state]);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Explore India&apos;s Heritage
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Browse {traditions.length} documented traditions from across the country. Search by name, filter by category or state.
        </p>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search traditions, crafts, festivals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 text-base rounded-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 rounded-full sm:w-52">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="h-11 rounded-full sm:w-52">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(search || category !== 'all' || state !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                  setState('all');
                }}
                className="h-11 rounded-full"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} {filtered.length === 1 ? 'tradition' : 'traditions'}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tradition, index) => (
              <TraditionCard key={tradition.id} tradition={tradition} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              No traditions found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or filters to discover more of India&apos;s heritage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="pt-24 min-h-[60vh]" />}>
      <ExploreContent />
    </Suspense>
  );
}
