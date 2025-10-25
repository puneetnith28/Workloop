import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 bg-gradient-to-tr from-background to-secondary/10">
        <div className="workloop-container">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-border text-center">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">$0</p>
              <p className="text-muted-foreground mb-6">Up to 3 projects, basic versioning and previews.</p>
              <Button variant="outline">Start for free</Button>
            </div>

            <div className="p-6 rounded-lg border border-border text-center">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$12/mo</p>
              <p className="text-muted-foreground mb-6">Unlimited projects, advanced diffs, and AI suggestions.</p>
              <Button className="bg-workloop-purple">Choose Pro</Button>
            </div>

            <div className="p-6 rounded-lg border border-border text-center">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <p className="text-muted-foreground mb-6">SAML, priority support, and on-prem options.</p>
              <Button className="bg-workloop-purple">Contact Sales</Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-gradient-purple hover:bg-workloop-dark-purple">
              Start your trial
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
