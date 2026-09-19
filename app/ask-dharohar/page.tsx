'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { traditions, artisans, stories } from '@/lib/data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  'What are some lesser-known traditions of Assam?',
  'Tell me about traditional crafts of Rajasthan.',
  'Plan a cultural trip through Kerala.',
  'Which Indian folk dances are associated with harvest festivals?',
];

function generateResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('assam')) {
    const assamTraditions = traditions.filter((t) => t.state === 'Assam');
    const assamArtisans = artisans.filter((a) => a.state === 'Assam');
    let response = `Assam has a rich cultural heritage, particularly centered around the Vaishnavite traditions of Majuli Island. Here are some notable traditions:\n\n`;
    assamTraditions.forEach((t) => {
      response += `**${t.name}** (${t.category})\n${t.description}\n\n`;
    });
    if (assamArtisans.length > 0) {
      response += `Notable artisans from Assam include ${assamArtisans.map((a) => a.name).join(', ')}.\n\n`;
    }
    response += `I'd recommend exploring the Majuli Mask Making tradition — it's one of the most unique craft forms in India, practiced in the world's largest river island.`;
    return response;
  }

  if (lower.includes('rajasthan')) {
    const rajTraditions = traditions.filter((t) => t.state === 'Rajasthan');
    let response = `Rajasthan is a treasure trove of living heritage. Here are some remarkable traditions:\n\n`;
    rajTraditions.forEach((t) => {
      response += `**${t.name}** — ${t.category}\n${t.description}\n\n`;
    });
    response += `For crafts specifically, I'd highlight **Phad Painting** (narrative scroll painting), **Blue Pottery** (a unique quartz-based ceramic art), and **Kathputli** (string puppetry). Each represents centuries of artisanal knowledge passed down through families.`;
    return response;
  }

  if (lower.includes('kerala')) {
    const keralaTraditions = traditions.filter((t) => t.state === 'Kerala');
    let response = `A cultural trip through Kerala could be a deeply enriching experience. Here's a suggested itinerary:\n\n`;
    response += `**Day 1-2: Thrissur** — Witness Kathakali performances at Kerala Kalamandalam, the premier institution for this classical dance-drama. Don't miss the elaborate makeup process that takes hours before each performance.\n\n`;
    response += `**Day 3-4: Palakkad** — Visit the Tholpavakoothu shadow puppet theatre tradition. The performances at Bhagavathy temples are a mesmerizing experience.\n\n`;
    response += `**Day 5: Kochi** — Explore the fusion of Portuguese, Dutch, and Kerala architectural styles in Fort Kochi.\n\n`;
    response += `Key traditions to experience:\n`;
    keralaTraditions.forEach((t) => {
      response += `- **${t.name}**: ${t.description.substring(0, 120)}...\n`;
    });
    return response;
  }

  if (lower.includes('harvest') || lower.includes('festival')) {
    return `Several Indian folk dances are deeply connected to harvest festivals:\n\n**Bihu Dance (Assam)** — Performed during Rongali Bihu in April, celebrating the Assamese New Year and spring harvest.\n\n**Bhangra (Punjab)** — Originally a harvest dance celebrating the wheat harvest during Vaisakhi.\n\n**Kalbelia (Rajasthan)** — While not strictly a harvest dance, Kalbelia performances often coincide with seasonal celebrations.\n\n**Garba (Gujarat)** — Danced during Navratri, which aligns with the post-monsoon harvest season.\n\n**Chhau Dance (Jharkhand)** — Performed during Chaitra Parva, marking the spring harvest.\n\nThese dances are not just performances — they are communal celebrations where the entire village participates, giving thanks for the harvest.`;
  }

  if (lower.includes('craft') || lower.includes('handicraft')) {
    return `India's craft traditions are incredibly diverse. Here are some highlights from our collection:\n\n**Majuli Mask Making (Assam)** — Bamboo and clay masks used in Vaishnavite dance-dramas on the world's largest river island.\n\n**Blue Pottery (Rajasthan)** — A unique non-clay pottery using quartz powder, known for its distinctive blue glaze.\n\n**Rogan Art (Gujarat)** — A rare textile painting where colored castor oil paste is pushed onto fabric with a metal rod. Only one family in the world practices this.\n\n**Madhubani Painting (Bihar)** — Intricate folk paintings traditionally done on walls by women during festivals and weddings.\n\nWould you like to explore any of these in detail?`;
  }

  if (lower.includes('dance') || lower.includes('music')) {
    const danceTraditions = traditions.filter((t) => t.category === 'Dance' || t.category === 'Folk Music');
    let response = `Here are some remarkable dance and music traditions from our collection:\n\n`;
    danceTraditions.forEach((t) => {
      response += `**${t.name}** (${t.state}, ${t.category})\n${t.description.substring(0, 150)}...\n\n`;
    });
    return response;
  }

  return `That's a great question! I can help you explore India's cultural heritage. I have information about ${traditions.length} documented traditions, ${artisans.length} artisans, and ${stories.length} cultural stories from across India.\n\nTry asking me about:\n- Traditions from a specific state (e.g., "What traditions are found in Kerala?")\n- A particular category (e.g., "Tell me about folk art traditions")\n- Planning a cultural trip (e.g., "Plan a heritage tour of Rajasthan")\n- Specific traditions (e.g., "What is Phad Painting?")`;
}

export default function AskDharoharPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateResponse(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          AI Guide
        </div>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Ask Dharohar
        </h1>
        <p className="text-muted-foreground">
          Your AI guide to India&apos;s cultural heritage.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-[300px] max-h-[50vh]"
        >
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Ask me anything about India&apos;s cultural traditions, crafts, festivals, and stories. I have knowledge of {traditions.length} traditions from across the country.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/50 transition-colors text-sm text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex gap-3 animate-fade-in-up',
                msg.role === 'user' && 'flex-row-reverse'
              )}
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
                  msg.role === 'user'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>
              <div
                className={cn(
                  'rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border/50 text-foreground'
                )}
              >
                {msg.content.split('**').map((part, i) =>
                  i % 2 === 1 ? (
                    <strong key={i} className="font-semibold">{part}</strong>
                  ) : (
                    part
                  )
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-card border border-border/50">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="py-4 border-t border-border/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any tradition, craft, or cultural story..."
              className="flex-1 h-12 px-4 rounded-full bg-card border border-border/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 rounded-full shrink-0"
              disabled={!input.trim() || loading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
