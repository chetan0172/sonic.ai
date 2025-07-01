import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event, session);
      
      if (event === 'SIGNED_IN' && session) {
        setSuccess('Successfully signed in! Redirecting...');
        setError(null);
        setLoading(false);
        setTimeout(() => {
          navigate('/app/dashboard');
        }, 1000);
      }
      
      if (event === 'SIGNED_OUT') {
        setSuccess('Successfully signed out');
        setError(null);
        setLoading(false);
      }
      
      if (event === 'PASSWORD_RECOVERY') {
        setSuccess('Password recovery email sent! Check your inbox.');
        setError(null);
        setLoading(false);
      }
      
      if (event === 'USER_UPDATED') {
        setSuccess('Profile updated successfully!');
        setError(null);
        setLoading(false);
      }

      // Handle sign in errors
      if (event === 'SIGNED_OUT' && !session) {
        // This could be due to an auth error
        setLoading(false);
      }
    });

    // Listen for auth errors from Supabase Auth UI
    const handleAuthUIError = () => {
      // Check for auth errors in the URL or other indicators
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      if (errorParam || errorDescription) {
        setError(errorDescription || errorParam || 'Authentication failed');
        setLoading(false);
      }
    };

    // Check for errors on mount
    handleAuthUIError();

    // Listen for auth errors via custom events
    const handleCustomAuthError = (event: CustomEvent) => {
      setLoading(false);
      const errorMessage = event.detail?.message || 'Authentication failed';
      
      // Map common error messages to user-friendly ones
      if (errorMessage.toLowerCase().includes('invalid login credentials') || 
          errorMessage.toLowerCase().includes('invalid email or password') ||
          errorMessage.toLowerCase().includes('email not confirmed')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (errorMessage.toLowerCase().includes('email already registered') || 
                 errorMessage.toLowerCase().includes('user already registered')) {
        setError('An account with this email already exists. Try signing in instead.');
      } else if (errorMessage.toLowerCase().includes('password should be at least')) {
        setError('Password must be at least 6 characters long.');
      } else if (errorMessage.toLowerCase().includes('invalid email')) {
        setError('Please enter a valid email address.');
      } else if (errorMessage.toLowerCase().includes('signup is disabled')) {
        setError('New registrations are currently disabled. Please contact support.');
      } else if (errorMessage.toLowerCase().includes('email rate limit exceeded')) {
        setError('Too many requests. Please wait a moment before trying again.');
      } else {
        setError(errorMessage);
      }
      setSuccess(null);
    };

    window.addEventListener('authError', handleCustomAuthError as EventListener);

    // Override console.error to catch Supabase auth errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorString = args.join(' ').toLowerCase();
      
      if (errorString.includes('supabase') || errorString.includes('auth')) {
        if (errorString.includes('invalid login credentials') || 
            errorString.includes('invalid email or password')) {
          setError('Invalid email or password. Please check your credentials and try again.');
          setLoading(false);
        } else if (errorString.includes('email already registered')) {
          setError('An account with this email already exists. Try signing in instead.');
          setLoading(false);
        }
      }
      
      originalConsoleError(...args);
    };

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener('authError', handleCustomAuthError as EventListener);
      console.error = originalConsoleError;
    };
  }, [navigate]);

  // Monitor for form submissions to show loading state
  useEffect(() => {
    const handleFormSubmit = () => {
      setLoading(true);
      setError(null);
      setSuccess(null);
    };

    // Listen for form submissions in the auth component
    const authContainer = document.querySelector('[data-supabase-auth]');
    if (authContainer) {
      const forms = authContainer.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
      });

      return () => {
        forms.forEach(form => {
          form.removeEventListener('submit', handleFormSubmit);
        });
      };
    }
  }, [authMode]);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Custom auth handler to catch errors
  const handleAuthAction = async (action: 'signIn' | 'signUp', email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      let result;
      if (action === 'signIn') {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      if (result.error) {
        throw result.error;
      }

      if (action === 'signUp' && !result.data.session) {
        setSuccess('Please check your email to confirm your account.');
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message?.toLowerCase() || '';
      
      if (errorMessage.includes('invalid login credentials') || 
          errorMessage.includes('invalid email or password')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (errorMessage.includes('email already registered')) {
        setError('An account with this email already exists. Try signing in instead.');
      } else if (errorMessage.includes('password should be at least')) {
        setError('Password must be at least 6 characters long.');
      } else if (errorMessage.includes('invalid email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(error.message || 'An error occurred during authentication.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="text-4xl font-['Helvetica'] text-white">
            Zsonic.ai
          </span>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {authMode === 'sign_up' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          {authMode === 'sign_up' ? (
            <>Start your free trial. No credit card required.</>
          ) : (
            <>Sign in to your account to continue</>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/20">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-200 text-sm font-medium">{error}</p>
                <button
                  onClick={clearMessages}
                  className="mt-2 text-xs text-red-300 hover:text-red-200 underline transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-200 text-sm font-medium">{success}</p>
                <button
                  onClick={clearMessages}
                  className="mt-2 text-xs text-green-300 hover:text-green-200 underline transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-3"></div>
              <p className="text-blue-200 text-sm">Processing your request...</p>
            </div>
          )}

          <div data-supabase-auth>
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#6366F1',
                      brandAccent: '#4F46E5',
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: '9999px',
                    padding: '12px 24px',
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                  container: {
                    gap: '16px',
                  },
                  input: {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(156, 163, 175, 0.5)',
                    color: 'white',
                    padding: '12px 16px',
                    fontSize: '14px',
                    '&:focus': {
                      border: '1px solid #6366F1',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      outline: 'none',
                      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                    },
                    '&:hover': {
                      border: '1px solid rgba(156, 163, 175, 0.7)',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    },
                  },
                  label: {
                    color: '#E5E7EB',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px',
                  },
                  message: {
                    color: '#F3F4F6',
                    fontSize: '13px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    marginTop: '4px',
                  },
                  anchor: {
                    color: '#A5B4FC',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: '#C7D2FE',
                    },
                  },
                  divider: {
                    backgroundColor: 'rgba(156, 163, 175, 0.3)',
                  },
                  loader: {
                    color: '#6366F1',
                  },
                },
              }}
              view={authMode}
              providers={['google', 'facebook']}
              redirectTo={`${window.location.origin}/app/dashboard`}
              onlyThirdPartyProviders={false}
              magicLink={false}
            />
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                setAuthMode(authMode === 'sign_up' ? 'sign_in' : 'sign_up');
                clearMessages();
                setLoading(false);
              }}
              className="w-full text-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              {authMode === 'sign_up'
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;