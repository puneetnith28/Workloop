import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, LayoutDashboard, Code, Sparkles } from 'lucide-react';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 bg-gradient-to-tr from-background to-secondary/10">
        <div className="workloop-container">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles />
                <h3 className="text-lg font-semibold">Smart Suggestions</h3>
              </div>
              <p className="text-muted-foreground">AI-driven accessibility and copy suggestions to speed up reviews and reduce manual errors.</p>
            </div>

            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Code />
                <h3 className="text-lg font-semibold">Code & Asset Support</h3>
              </div>
              <p className="text-muted-foreground">Supports design files, images, and code previews so engineers and designers can collaborate in one place.</p>
            </div>

            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <LayoutDashboard />
                <h3 className="text-lg font-semibold">Versioning & Diffs</h3>
              </div>
              <p className="text-muted-foreground">Automatic versioning and visual diffs make it easy to track changes and roll back when needed.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-gradient-purple hover:bg-workloop-dark-purple">
              Get Started
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
