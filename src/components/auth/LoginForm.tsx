
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  initialTab?: 'login' | 'register';
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onRegister, 
  initialTab = 'login' 
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(registerName, registerEmail, registerPassword);
  };

  // This is a fixed handler for the tabs
  const handleTabChange = (value: string) => {
    // Cast to satisfy TypeScript
    setActiveTab(value as 'login' | 'register');
  };

  return (
    <Card className="shadow-lg animate-fade-in bg-gradient-to-br from-white to-secondary/20 dark:from-gray-900 dark:to-gray-800/20 border border-white/20 dark:border-gray-700/20">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome to WorkLoop</CardTitle>
        <CardDescription>
          AI-powered version control for creatives
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/reset-password" 
                      className="text-sm text-workloop-purple hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Button type="submit" className="w-full bg-gradient-purple hover:bg-workloop-dark-purple gap-2">
                  <LogIn size={16} />
                  Login
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)} 
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-purple hover:bg-workloop-dark-purple gap-2">
                  <UserPlus size={16} />
                  Create Account
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 bg-secondary/30">
        <div className="text-xs text-center text-muted-foreground w-full">
          By continuing, you agree to WorkLoop's
          <a href="#" className="text-workloop-purple hover:underline mx-1">Terms of Service</a>
          and
          <a href="#" className="text-workloop-purple hover:underline mx-1">Privacy Policy</a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
