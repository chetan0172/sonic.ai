import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Library, 
  Calendar, 
  BarChart2, 
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import { supabase } from '../lib/supabase';

interface DashboardLayoutProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Upload Content', href: '/app/upload', icon: Upload },
    { name: 'Content Library', href: '/app/library', icon: Library },
    { name: 'Campaign Manager', href: '/app/campaign', icon: Calendar },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
      } else {
        navigate('/auth');
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Disclosure as="nav" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:hidden">
        {({ open }) => (
          <>
            <div className="px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl font-['Helvetica'] text-gray-900 dark:text-white">
                    Zsonic.ai
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <Disclosure.Button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    {open ? <X size={24} /> : <Menu size={24} />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xl font-['Helvetica'] text-gray-900 dark:text-white">
                Zsonic.ai
              </span>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={handleSignOut}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex-1">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;