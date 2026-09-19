import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Tradition, Story, Artisan } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function TraditionCard({ tradition, index = 0 }: { tradition: Tradition; index?: number }) {
  return (
    <Link href={`/heritage/${tradition.id}`} className="group block">
      <article
        className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={tradition.cover_image}
            alt={tradition.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground hover:bg-primary">
            {tradition.category}
          </Badge>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 text-white/90 text-xs mb-1">
              <MapPin className="w-3.5 h-3.5" />
              {tradition.state}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {tradition.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {tradition.description}
          </p>
          <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Explore Story
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  return (
    <article
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground hover:bg-primary">
          {story.category}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {story.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
          {story.content}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {story.state}
          </span>
          <span>{story.reading_time}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          By {story.author} · {story.language}
        </div>
      </div>
    </article>
  );
}

export function ArtisanCard({ artisan, index = 0 }: { artisan: Artisan; index?: number }) {
  return (
    <article
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={artisan.image}
          alt={artisan.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-serif text-lg font-semibold">{artisan.name}</h3>
          <p className="text-sm text-white/80">{artisan.craft}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {artisan.district}, {artisan.state}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
          {artisan.bio}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            {artisan.years_experience} years of practice
          </span>
          <span className="text-sm font-medium text-primary hover:gap-2 transition-all cursor-pointer flex items-center gap-1">
            View Profile
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function CategoryCard({
  name,
  description,
  entryCount,
  icon: Icon,
  image,
  index = 0,
}: {
  name: string;
  description: string;
  entryCount: number;
  icon: any;
  image: string;
  index?: number;
}) {
  return (
    <Link href={`/explore?category=${name.toLowerCase().replace(/\s+/g, '-')}`} className="group block">
      <div
        className={cn(
          'relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up'
        )}
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
          <Icon className="w-7 h-7 mb-2 opacity-90" />
          <h3 className="font-serif text-lg font-semibold">{name}</h3>
          <p className="text-xs text-white/70 mt-1">{entryCount} entries</p>
        </div>
      </div>
    </Link>
  );
}
