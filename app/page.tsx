'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Compass,
  PenLine,
  ArrowRight,
  Palette,
  Hammer,
  PartyPopper,
  Music,
  PersonStanding,
  UtensilsCrossed,
  BookOpen,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TraditionCard, CategoryCard } from '@/components/cards';
import { traditions, categories } from '@/lib/data';

const iconMap: Record<string, any> = {
  Palette,
  Hammer,
  PartyPopper,
  Music,
  PersonStanding,
  UtensilsCrossed,
  BookOpen,
  Building2,
};

const categoryImages: Record<string, string> = {
  'folk-art': 'https://images.pexels.com/photos/368727/pexels-photo-368727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'handicrafts': 'https://images.pexels.com/photos/3145866/pexels-photo-3145866.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'festivals': 'https://images.pexels.com/photos/34185066/pexels-photo-34185066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'folk-music': 'https://images.pexels.com/photos/15937060/pexels-photo-15937060.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'dance': 'https://images.pexels.com/photos/38087959/pexels-photo-38087959.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'food': 'https://images.pexels.com/photos/7804406/pexels-photo-7804406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'oral-history': 'https://images.pexels.com/photos/22820076/pexels-photo-22820076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'architecture': 'https://images.pexels.com/photos/27719237/pexels-photo-27719237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const featuredTraditions = traditions.slice(0, 6);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/34952651/pexels-photo-34952651.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="Indian cultural heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            India&apos;s Living Heritage Platform
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance animate-fade-in-up">
            Discover India Beyond the Famous Places.
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Explore the traditions, stories, crafts, music and living heritage that make every region of India unique.
          </p>

          <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search traditions, crafts, festivals, stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-base bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/explore" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full px-8 h-12 text-base">
                <Compass className="w-5 h-5" />
                Explore Heritage
              </Button>
            </Link>
            <Link href="/contribute" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full px-8 h-12 text-base bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white">
                <PenLine className="w-5 h-5" />
                Contribute a Story
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-5" />
      </section>

      {/* Explore by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover India&apos;s diverse cultural heritage across eight distinct categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, index) => {
            const Icon = iconMap[cat.icon] || Palette;
            return (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                description={cat.description}
                entryCount={cat.entry_count}
                icon={Icon}
                image={categoryImages[cat.slug] || categoryImages['folk-art']}
                index={index}
              />
            );
          })}
        </div>
      </section>

      {/* Featured Heritage */}
      <section className="bg-secondary/30 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Stories Worth Preserving
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Six remarkable traditions from across India, each representing centuries of cultural practice
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="gap-2 rounded-full">
                View All Heritage
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTraditions.map((tradition, index) => (
              <TraditionCard key={tradition.id} tradition={tradition} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/5399393/pexels-photo-5399393.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
            alt="Indian countryside"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
          <div className="relative z-10 p-8 lg:p-16 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 max-w-2xl mx-auto">
              Your story could preserve a tradition for the next generation.
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Share the heritage of your village, your family, your community. Every contribution matters.
            </p>
            <Link href="/contribute">
              <Button size="lg" variant="secondary" className="gap-2 rounded-full px-8 h-12 text-base">
                <PenLine className="w-5 h-5" />
                Contribute Your Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
