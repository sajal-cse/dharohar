'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Bookmark,
  Headphones,
  Languages,
  Share2,
  ArrowLeft,
  Clock,
  Award,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { traditions } from '@/lib/data';
import { TraditionCard } from '@/components/cards';
import { useToast } from '@/hooks/use-toast';

export default function HeritageDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const tradition = traditions.find((t) => t.id === id);
  const { toast } = useToast();

  if (!tradition) notFound();

  const relatedTraditions = traditions
    .filter((t) => t.id !== id && (t.category === tradition.category || t.state === tradition.state))
    .slice(0, 3);

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: action === 'Saved' ? 'Added to your saved heritage collection.' : 'This feature will be available soon.',
    });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={tradition.cover_image}
          alt={tradition.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/explore">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-4 gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                Back to Explore
              </Button>
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-primary text-primary-foreground">{tradition.category}</Badge>
              {tradition.language && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tradition.language}
                </Badge>
              )}
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-3">
              {tradition.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{tradition.state}</span>
              {tradition.district && <span className="text-white/50">· {tradition.district}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full shrink-0" onClick={() => handleAction('Saved')}>
            <Bookmark className="w-4 h-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full shrink-0" onClick={() => handleAction('Listening to audio...')}>
            <Headphones className="w-4 h-4" />
            Listen
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full shrink-0" onClick={() => handleAction('Translation coming soon')}>
            <Languages className="w-4 h-4" />
            Translate
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full shrink-0" onClick={() => handleAction('Link copied to clipboard')}>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* About */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
            About
          </h2>
          <p className="text-base lg:text-lg text-foreground/80 leading-relaxed mb-4">
            {tradition.description}
          </p>
          {tradition.location && (
            <div className="flex items-start gap-2 mt-6 p-4 rounded-xl bg-secondary/50">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Where it is practised</p>
                <p className="text-sm text-muted-foreground">{tradition.location}</p>
              </div>
            </div>
          )}
        </section>

        {/* History Timeline */}
        {tradition.history && tradition.history.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-8">
              History
            </h2>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border ml-5" />
              <div className="space-y-8">
                {tradition.history.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-semibold text-primary mb-1">{item.year}</p>
                      <p className="text-foreground/80 leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it is created */}
        {tradition.how_its_made && tradition.how_its_made.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-8">
              How it is Created
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tradition.how_its_made.map((step, index) => (
                <div key={index} className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm">
                  <div className="relative aspect-[16/10] bg-muted">
                    <Image
                      src={step.image}
                      alt={step.step}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {step.step}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Meet the Artisan */}
        {tradition.artisan_name && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Meet the Artisan
            </h2>
            <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm grid md:grid-cols-3">
              <div className="relative aspect-[3/4] md:aspect-auto bg-muted">
                <Image
                  src={tradition.artisan_image || ''}
                  alt={tradition.artisan_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:col-span-2 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-accent">Master Artisan</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {tradition.artisan_name}
                </h3>
                {tradition.artisan_location && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {tradition.artisan_location}
                  </div>
                )}
                <p className="text-foreground/80 leading-relaxed">
                  {tradition.artisan_bio}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {tradition.gallery && tradition.gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tradition.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${tradition.name} gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Traditions */}
        {relatedTraditions.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Related Traditions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTraditions.map((t, index) => (
                <TraditionCard key={t.id} tradition={t} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
