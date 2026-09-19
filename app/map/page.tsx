'use client';

import { useState } from 'react';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { indianStates, traditions } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MapPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateData = indianStates.find((s) => s.name === selectedState);
  const stateTraditions = traditions.filter((t) => t.state === selectedState);

  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Interactive Heritage Map
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Select a state to discover its documented traditions, cultural categories, and featured artisans.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* State Grid */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                Select a State
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {indianStates.map((state) => (
                  <button
                    key={state.name}
                    onClick={() => setSelectedState(state.name)}
                    className={cn(
                      'group relative p-4 rounded-xl border text-left transition-all duration-200',
                      selectedState === state.name
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{state.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {state.traditionsCount} traditions
                        </p>
                      </div>
                      <ChevronRight
                        className={cn(
                          'w-4 h-4 text-muted-foreground transition-transform',
                          selectedState === state.name && 'text-primary translate-x-0.5'
                        )}
                      />
                    </div>
                    <Badge variant="outline" className="mt-3 text-xs">
                      {state.region}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* State Details */}
          <div className="lg:col-span-2">
            {stateData ? (
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sticky top-24 animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      {stateData.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stateData.traditionsCount} traditions documented
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="p-1.5 rounded-md hover:bg-secondary"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Featured Traditions */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Featured Traditions
                  </h3>
                  <div className="space-y-2">
                    {stateTraditions.length > 0 ? (
                      stateTraditions.map((t) => (
                        <Link
                          key={t.id}
                          href={`/heritage/${t.id}`}
                          className="flex items-center gap-2 p-3 rounded-lg bg-secondary/40 hover:bg-secondary/80 transition-colors group"
                        >
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                            {t.name}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))
                    ) : (
                      stateData.featuredTraditions.map((name) => (
                        <div
                          key={name}
                          className="flex items-center gap-2 p-3 rounded-lg bg-secondary/40"
                        >
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm font-medium text-foreground">{name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Cultural Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Cultural Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stateData.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Featured Artisans */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Featured Artisans
                  </h3>
                  <div className="space-y-2">
                    {stateData.featuredArtisans.map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/40"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {name.charAt(0)}
                        </div>
                        <span className="text-sm text-foreground">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/artisans" className="block mt-6">
                  <Button variant="outline" className="w-full rounded-full">
                    View All Artisans
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Select a State
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Click on any state from the list to explore its cultural heritage, traditions, and artisans.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
