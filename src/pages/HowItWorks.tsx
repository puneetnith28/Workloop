import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, LayoutDashboard, ArrowRight, Sparkles, Code, GitCompare, Bot } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 bg-gradient-to-tr from-background to-secondary/20">
        <div className="workloop-container">
          <h2 className="text-3xl font-bold text-center mb-12">How WorkLoop Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {
              [
                {
                  step: '1',
                  title: 'Connect Your Files',
                  description: 'Upload images, PDFs, designs or connect Figma/Drive. Keep everything in one place.',
                  gradient: 'from-blue-500 to-purple-500',
                  icon: FileText
                },
                {
                  step: '2',
                  title: 'Automatic Versioning',
                  description: 'Every save or upload becomes a version. Compare changes, revert, or branch work.',
                  gradient: 'from-purple-500 to-pink-500',
                  icon: GitCompare
                },
                {
                  step: '3',
                  title: 'AI Feedback & Collaboration',
                  description: 'AI suggestions, comments, and annotations help teams iterate faster.',
                  gradient: 'from-pink-500 to-red-500',
                  icon: Bot
                }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-4`}>
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))
            }
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Upload & Connect</h3>
              <p className="text-muted-foreground mb-4">Drop files directly or link external tools. We index files and extract metadata so you can search, filter, and jump straight to a specific version.</p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Supported:</strong> PNG, JPG, SVG, PDF, PSD (preview), text & code files.</li>
                <li><strong>Integrations:</strong> Figma, Google Drive, Notion (coming soon).</li>
                <li><strong>Metadata:</strong> Author, version timestamp, change summary.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Visual Diffs & Version History</h3>
              <p className="text-muted-foreground mb-4">Compare two versions side-by-side or as overlays. Visual differences are highlighted so designers can quickly spot layout, color, or asset changes.</p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Side-by-side</strong> previews for quick comparisons.</li>
                <li><strong>Overlay mode</strong> to blend images and spot subtle changes.</li>
                <li><strong>Restore</strong> a previous version or export a diff report.</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">AI Feedback & Actionable Suggestions</h3>
              <p className="text-muted-foreground mb-4">Our AI analyzes designs and copy to provide constructive feedback—accessibility tips, color contrast suggestions, and wording improvements with examples.</p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Color contrast and accessibility fixes with suggested color swaps.</li>
                <li>Copy improvements with before/after suggestions you can accept into a new version.</li>
                <li>Automated summaries of what changed between versions.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Collaboration & Workflows</h3>
              <p className="text-muted-foreground mb-4">Comment inline, mention teammates, and manage review cycles. Approve changes and tag releases so your team stays in sync.</p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Inline comments and threaded discussions.</li>
                <li>Assign reviewers and track resolution state.</li>
                <li>Release tagging and change logs for stakeholder reviews.</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/login?tab=register">
              <Button size="lg" className="bg-gradient-purple hover:bg-workloop-dark-purple">
                Start Your Creative Journey
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
