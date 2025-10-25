import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Globe, 
  Key, 
  Bot, 
  Plug, 
  Laptop, 
  BellRing,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="workloop-container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account preferences and plugin settings
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <nav className="space-y-1">
                {[
                  { icon: User, label: 'Account' },
                  { icon: Lock, label: 'Security' },
                  { icon: Palette, label: 'Appearance' },
                  { icon: Bell, label: 'Notifications' },
                  { icon: Bot, label: 'AI Settings' },
                  { icon: Plug, label: 'Integrations' },
                  { icon: Key, label: 'API Keys' },
                ].map((item, i) => (
                  <Button
                    key={item.label}
                    variant={i === 0 ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your account details
                    </p>
                  </div>
                  <Button className="bg-workloop-purple hover:bg-workloop-dark-purple">
                    Save Changes
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Puneet Yadav" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="puneet@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Design Studio" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize the look and feel
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label>Theme</Label>
                    <RadioGroup defaultValue="light" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reduce Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Use simpler transitions
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">AI Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure AI features
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label>AI Model</Label>
                    <RadioGroup defaultValue="openai" className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="openai" id="openai" />
                        <Label htmlFor="openai">OpenAI GPT-4o</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gemini" id="gemini" />
                        <Label htmlFor="gemini">Google Gemini</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-generate feedback</Label>
                      <p className="text-sm text-muted-foreground">
                        Provide AI tips on each upload
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Version summaries</Label>
                      <p className="text-sm text-muted-foreground">
                        Generate summaries of changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage connections to other services
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Figma', connected: false, icon: <Laptop size={16} /> },
                    { name: 'Google Drive', connected: false, icon: <Globe size={16} /> },
                    { name: 'Notion', connected: false, icon: <Globe size={16} /> },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {integration.icon}
                        <div>
                          <p className="font-medium text-sm">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {integration.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <Button variant={integration.connected ? "destructive" : "outline"}>
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
