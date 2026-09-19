import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

export const metadata: Metadata = {
  metadataBase: new URL('https://dharohar.in'),
  title: 'Dharohar — Discover. Preserve. Share India’s Living Heritage.',
  description:
    'Explore the traditions, stories, crafts, music and living heritage that make every region of India unique.',
  openGraph: {
    title: 'Dharohar — Discover. Preserve. Share India’s Living Heritage.',
    description:
      'Explore the traditions, stories, crafts, music and living heritage that make every region of India unique.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 page-transition">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
