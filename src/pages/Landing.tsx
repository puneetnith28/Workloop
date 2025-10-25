
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MessageSquare, 
  LayoutDashboard, 
  ArrowRight, 
  Sparkles,
  Code,
  GitCompare,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import useTheme from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navbar */}
      <header className="border-b border-border sticky top-0 z-30 bg-background/80 backdrop-blur-md">
        <div className="workloop-container py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="font-bold text-xl">WorkLoop</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle available on the first page */}
            <ThemeToggle />

            <Link to="/login">
              <Button variant="outline" className="border-workloop-purple/30 hover:border-workloop-purple">Log In</Button>
            </Link>
            <Link to="/login?tab=register">
              <Button className="bg-gradient-purple hover:bg-workloop-dark-purple">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="workloop-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            AI-Powered Version Control
            <br /> 
            <span className="gradient-text">for Creatives</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
            Track changes, compare versions, and get AI feedback on your creative 
            files - images, PDFs, designs, and documents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <Link to="/how-it-works">
              <Button size="lg" className="bg-gradient-purple hover:bg-workloop-dark-purple gap-2">
                Get Started Free
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-workloop-purple/30 hover:border-workloop-purple">
                See How It Works
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-br from-secondary/20 to-secondary/50">
        <div className="workloop-container">
          <h2 className="text-3xl font-bold text-center mb-4">Powerful Features for Creatives</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Tools designed to help creative professionals track, manage, and improve their work with AI assistance.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GitCompare,
                title: "Visual Version Comparison",
                description: "Compare versions side by side with visual highlighting of what's changed between versions.",
                gradient: "from-blue-500/10 to-purple-500/10"
              },
              {
                icon: Bot,
                title: "AI-Powered Feedback",
                description: "Get instant AI feedback on your designs, copy, and presentations to improve your work.",
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              {
                icon: MessageSquare,
                title: "Collaborative Comments",
                description: "Add comments, mention team members, and resolve discussions inline.",
                gradient: "from-green-500/10 to-blue-500/10"
              },
              {
                icon: Sparkles,
                title: "Automatic Version Summaries",
                description: "AI automatically generates summaries of what changed between versions.",
                gradient: "from-yellow-500/10 to-orange-500/10"
              },
              {
                icon: LayoutDashboard,
                title: "Centralized Dashboard",
                description: "Track all your files, versions, and team activity in one organized place.",
                gradient: "from-red-500/10 to-yellow-500/10"
              },
              {
                icon: Code,
                title: "Integrations",
                description: "Seamless integration with tools like Figma, Google Docs, and Adobe Creative Cloud.",
                gradient: "from-teal-500/10 to-green-500/10"
              }
            ].map((feature, i) => (
              <div 
                key={feature.title} 
                className={`workloop-card bg-gradient-to-br ${feature.gradient}`}
              >
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 bg-gradient-to-tr from-background to-secondary/20">
        <div className="workloop-container">
          <h2 className="text-3xl font-bold text-center mb-12">How WorkLoop Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Files",
                description: "Upload files or connect to your favorite design tools.",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                step: "2",
                title: "Create & Iterate",
                description: "Work on your designs and documents while we track versions.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                step: "3",
                title: "Get Feedback & Collaborate",
                description: "Receive AI insights and team feedback to perfect your work.",
                gradient: "from-pink-500 to-red-500"
              }
            ].map((item, i) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-4`}>
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-16 text-center">
            <Link to="/login?tab=register">
              <Button size="lg" className="bg-gradient-purple hover:bg-workloop-dark-purple">
                Start Your Creative Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-8 bg-gradient-to-b from-secondary/20 to-secondary/50">
        <div className="workloop-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-purple rounded-md flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="font-bold">WorkLoop</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4 md:mb-0">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">Help</a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} WorkLoop. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

function ThemeToggle() {
  const { theme, setLight, setDark } = useTheme();

  const checked = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{checked ? 'Dark' : 'Light'}</span>
      <Switch
        checked={checked}
        onCheckedChange={(v) => (v ? setDark() : setLight())}
        aria-label="Toggle theme"
      />
    </div>
  );
}
