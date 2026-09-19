import Link from 'next/link';
import { Landmark, Mail, Heart } from 'lucide-react';

const footerLinks = {
  Explore: [
    { label: 'Heritage', href: '/explore' },
    { label: 'Map of India', href: '/map' },
    { label: 'Cultural Stories', href: '/stories' },
    { label: 'Artisans', href: '/artisans' },
  ],
  Contribute: [
    { label: 'Submit a Story', href: '/contribute' },
    { label: 'Ask Dharohar', href: '/ask-dharohar' },
    { label: 'Admin Dashboard', href: '/admin' },
  ],
  About: [
    { label: 'Our Mission', href: '/explore' },
    { label: 'Partners', href: '/explore' },
    { label: 'Contact', href: '/contribute' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Landmark className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold text-primary">
                Dharohar
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover. Preserve. Share India&apos;s Living Heritage.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dharohar. A SIH 2026 initiative.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>for India&apos;s heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
