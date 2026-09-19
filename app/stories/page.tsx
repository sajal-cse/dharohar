'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StoryCard } from '@/components/cards';
import { stories } from '@/lib/data';

export default function StoriesPage() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('all');
  const [category, setCategory] = useState('all');
  const [language, setLanguage] = useState('all');

  const states = useMemo(() => Array.from(new Set(stories.map((s) => s.state))).sort(), []);
  const categories = useMemo(() => Array.from(new Set(stories.map((s) => s.category))).sort(), []);
  const languages = useMemo(() => Array.from(new Set(stories.map((s) => s.language))).sort(), []);

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.content.toLowerCase().includes(search.toLowerCase()) ||
        s.author.toLowerCase().includes(search.toLowerCase());
      const matchesState = state === 'all' || s.state === state;
      const matchesCategory = category === 'all' || s.category === category;
      const matchesLanguage = language === 'all' || s.language === language;
      return matchesSearch && matchesState && matchesCategory && matchesLanguage;
    });
  }, [search, state, category, language]);

  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Cultural Stories
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Read stories from across India — each one a window into a living tradition, told by the people who keep it alive.
        </p>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stories, authors, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 text-base rounded-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="h-11 rounded-full sm:w-48">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 rounded-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-11 rounded-full sm:w-48">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(search || state !== 'all' || category !== 'all' || language !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => { setSearch(''); setState('all'); setCategory('all'); setLanguage('all'); }}
                className="h-11 rounded-full"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              No stories found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or filters to find more cultural stories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
