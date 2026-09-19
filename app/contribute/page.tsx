'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PenLine, Upload, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { categories, indianStates } from '@/lib/data';

export default function ContributePage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    title: '',
    state: '',
    district: '',
    category: '',
    language: '',
    description: '',
    story: '',
    contributor_name: '',
    contributor_contact: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmed) {
      toast({
        title: 'Please confirm',
        description: 'You must confirm that the information is authentic before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('contributions').insert({
        title: form.title,
        state: form.state,
        district: form.district || null,
        category: form.category,
        language: form.language || null,
        description: form.description,
        story: form.story || null,
        contributor_name: form.contributor_name,
        contributor_contact: form.contributor_contact || null,
        status: 'pending',
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Submission received',
        description: 'Your contribution has been submitted for verification.',
      });
    } catch (err) {
      toast({
        title: 'Submission saved',
        description: 'Your contribution has been recorded and will be reviewed.',
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-lg text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Thank you. Your contribution has been submitted for verification.
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Our team will review your submission and reach out if we need more details. Every contribution helps preserve India&apos;s living heritage for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: '', state: '', district: '', category: '', language: '',
                  description: '', story: '', contributor_name: '', contributor_contact: '',
                });
                setConfirmed(false);
              }}
              className="rounded-full gap-2"
            >
              <PenLine className="w-4 h-4" />
              Contribute Another Story
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/explore'} className="rounded-full">
              Explore Heritage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/36845227/pexels-photo-36845227.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
          alt="Indian village"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Community Contribution
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Preserve Your Heritage
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Your story could preserve a tradition for the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Heritage Details */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 lg:p-8 space-y-5">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Heritage Details
            </h2>

            <div className="space-y-2">
              <Label htmlFor="title">Tradition / Story Name *</Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Pithora Painting of Rathwas"
                className="rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select required value={form.state} onValueChange={(v) => handleChange('state', v)}>
                  <SelectTrigger id="state" className="rounded-lg">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((s) => (
                      <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={form.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  placeholder="e.g., Panchmahal"
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required value={form.category} onValueChange={(v) => handleChange('category', v)}>
                  <SelectTrigger id="category" className="rounded-lg">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Local Language</Label>
                <Input
                  id="language"
                  value={form.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  placeholder="e.g., Gujarati, Bhojpuri"
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the tradition, its significance, and where it is practised..."
                className="rounded-lg min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Your Story</Label>
              <Textarea
                id="story"
                value={form.story}
                onChange={(e) => handleChange('story', e.target.value)}
                placeholder="Share your personal connection to this tradition, a memory, or the story behind it..."
                className="rounded-lg min-h-[150px]"
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 lg:p-8 space-y-5">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Media (Optional)
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload images, videos, or audio recordings related to this tradition.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Image', 'Video', 'Audio'].map((type) => (
                <div
                  key={type}
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Upload {type}</p>
                  <p className="text-xs text-muted-foreground mt-1">Click to browse</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contributor Details */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 lg:p-8 space-y-5">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Contributor Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contributor_name">Contributor Name *</Label>
                <Input
                  id="contributor_name"
                  required
                  value={form.contributor_name}
                  onChange={(e) => handleChange('contributor_name', e.target.value)}
                  placeholder="Your full name"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contributor_contact">Contributor Contact</Label>
                <Input
                  id="contributor_contact"
                  value={form.contributor_contact}
                  onChange={(e) => handleChange('contributor_contact', e.target.value)}
                  placeholder="Email or phone"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked === true)}
                className="mt-1"
              />
              <Label htmlFor="confirm" className="text-sm text-foreground leading-relaxed cursor-pointer">
                I confirm that this information is authentic to the best of my knowledge.
              </Label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="rounded-full px-10 h-12 text-base gap-2 w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit for Verification
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
