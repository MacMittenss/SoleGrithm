import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Loader2, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithEmail, registerWithEmail, signInWithGoogle } from '@/lib/firebase';
import { useLocation } from 'wouter';

type AuthMode = 'login' | 'register';

export default function Auth() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validations, setValidations] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    displayName: false
  });
  
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Form validation
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return value.length >= 6;
      case 'confirmPassword':
        return value === formData.password;
      case 'displayName':
        return value.length >= 2;
      default:
        return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidations(prev => ({ 
      ...prev, 
      [field]: validateField(field, value) 
    }));
  };

  // Email/Password Authentication
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await registerWithEmail(formData.email, formData.password);
        toast({
          title: "Account created successfully!",
          description: "Welcome to SoleGrithm. Your sneaker journey begins now.",
        });
      } else {
        await signInWithEmail(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to your account.",
        });
      }
      setLocation('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google Authentication
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Welcome to SoleGrithm!",
        description: "You've successfully signed in with Google.",
      });
      setLocation('/');
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Google Sign-in Error",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = authMode === 'login' 
    ? validations.email && validations.password
    : validations.email && validations.password && validations.confirmPassword && validations.displayName;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: authMode === 'login' ? -20 : 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: authMode === 'login' ? 20 : -20,
      transition: { duration: 0.3 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-6"
      >
        {/* Logo & Header */}
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              SoleGrithm
            </span>
          </motion.div>
          
          <h1 className="text-2xl font-bold tracking-tight">
            {authMode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground">
            {authMode === 'login' 
              ? 'Sign in to continue your sneaker journey'
              : 'Join the ultimate sneaker community'
            }
          </p>
        </motion.div>

        {/* Auth Mode Toggle */}
        <motion.div 
          className="flex bg-muted rounded-lg p-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            variant={authMode === 'login' ? 'default' : 'ghost'}
            className="flex-1 relative"
            onClick={() => setAuthMode('login')}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Button
            variant={authMode === 'register' ? 'default' : 'ghost'}
            className="flex-1 relative"
            onClick={() => setAuthMode('register')}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </motion.div>

        {/* Auth Form */}
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.form
                key={authMode}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleEmailAuth}
                className="space-y-4"
              >
                {/* Display Name - Register only */}
                {authMode === 'register' && (
                  <motion.div 
                    variants={fieldVariants}
                    custom={0}
                    className="space-y-2"
                  >
                    <Label htmlFor="displayName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Display Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Your display name"
                        value={formData.displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        className={`pl-4 pr-10 ${validations.displayName ? 'border-green-500' : ''}`}
                        required
                        data-testid="input-display-name"
                      />
                      {formData.displayName && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validations.displayName ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div 
                  variants={fieldVariants}
                  custom={authMode === 'register' ? 1 : 0}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-4 pr-10 ${validations.email ? 'border-green-500' : ''}`}
                      required
                      data-testid="input-email"
                    />
                    {formData.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validations.email ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div 
                  variants={fieldVariants}
                  custom={authMode === 'register' ? 2 : 1}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-4 pr-20 ${validations.password ? 'border-green-500' : ''}`}
                      required
                      data-testid="input-password"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {formData.password && (
                        <>
                          {validations.password ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {authMode === 'register' && (
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters long
                    </p>
                  )}
                </motion.div>

                {/* Confirm Password - Register only */}
                {authMode === 'register' && (
                  <motion.div 
                    variants={fieldVariants}
                    custom={3}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`pl-4 pr-10 ${validations.confirmPassword ? 'border-green-500' : ''}`}
                        required
                        data-testid="input-confirm-password"
                      />
                      {formData.confirmPassword && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validations.confirmPassword ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  variants={fieldVariants}
                  custom={authMode === 'register' ? 4 : 2}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading || !isFormValid}
                    data-testid="button-submit-auth"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      <>
                        {authMode === 'login' ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </AnimatePresence>

            {/* Divider */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge variant="secondary" className="bg-background px-3">
                  or continue with
                </Badge>
              </div>
            </motion.div>

            {/* Google Sign-in */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                data-testid="button-google-auth"
              >
                <FaGoogle className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div 
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-primary"
                onClick={() => setAuthMode('register')}
                disabled={isLoading}
              >
                Sign up
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-primary"
                onClick={() => setAuthMode('login')}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}