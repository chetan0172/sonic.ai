import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Upload, Youtube, FileText, Mic, Video, Sparkles, Zap, TrendingUp, Users, BarChart2, Share2, Globe, Target, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Hero: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    features: {
      viralityPredictor: false,
      autoAdaption: false,
      dripFunnel: false,
      autoSnippet: false,
      competitorTracker: false,
      crmEngine: false
    },
    additionalFeatures: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('wishlists')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          features: formData.features,
          additional_features: formData.additionalFeatures
        }]);

      if (error) throw error;

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        features: {
          viralityPredictor: false,
          autoAdaption: false,
          dripFunnel: false,
          autoSnippet: false,
          competitorTracker: false,
          crmEngine: false
        },
        additionalFeatures: ''
      });

      alert('Thank you for joining our wishlist!');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Gradient Background with Noise Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20 animate-glow">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              AI-Powered Content Drip Campaign Platform
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Transform Your Content Into
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text">
              Engaging Social Drips
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300/90 mb-10 max-w-3xl leading-relaxed">
            Upload once, let AI create weeks of platform-optimized content. Schedule your drip campaign and watch your engagement soar across all channels.
          </p>

          {/* Wishlist Form */}
          <div className="w-full max-w-lg mb-16 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <p className="text-white text-sm font-medium">Interested Features:</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries({
                    viralityPredictor: 'AI Virality Predictor',
                    autoAdaption: 'Dynamic Auto-Adaption',
                    dripFunnel: 'Drip Funnel Builder',
                    autoSnippet: 'Auto-snippet Generator',
                    competitorTracker: 'Competitor Tracker',
                    crmEngine: 'CRM Engine'
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center space-x-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.features[key]}
                        onChange={(e) => setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            [key]: e.target.checked
                          }
                        })}
                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Additional features you'd like to see..."
                  value={formData.additionalFeatures}
                  onChange={(e) => setFormData({...formData, additionalFeatures: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Join Wishlist
              </button>
              <Link
                to="/auth"
                className="w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 text-center block mt-2"
              >
                Try Demo
              </Link>
            </form>
          </div>

          {/* 3D Dashboard Effect */}
          <div className="w-full max-w-5xl relative perspective-2000">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 transform rotate-x-5 hover:rotate-x-0 transition-transform duration-500 shadow-2xl">
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Global Reach</h3>
                    <div className="bg-primary-500/20 p-2 rounded-lg">
                      <Globe className="w-5 h-5 text-primary-400" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">85.2K</span>
                    <span className="text-green-400 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12.3%
                    </span>
                  </div>
                  <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Conversion Rate</h3>
                    <div className="bg-secondary-500/20 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-secondary-400" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">4.6%</span>
                    <span className="text-green-400 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +2.1%
                    </span>
                  </div>
                  <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Engagement</h3>
                    <div className="bg-primary-500/20 p-2 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-primary-400" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">1.2K</span>
                    <span className="text-green-400 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8.7%
                    </span>
                  </div>
                  <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Platform Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-transform">
                  <h3 className="text-white font-medium mb-4">Platform Performance</h3>
                  <div className="space-y-4">
                    {[
                      { platform: 'X (Twitter)', value: '78%', color: 'from-blue-500 to-blue-600', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png' },
                      { platform: 'Instagram', value: '92%', color: 'from-pink-500 to-purple-600', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' },
                      { platform: 'LinkedIn', value: '64%', color: 'from-blue-600 to-blue-700', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg' }
                    ].map((item) => (
                      <div key={item.platform} className="transform hover:translate-x-2 transition-transform">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <div className="flex items-center">
                            <img 
                              src={item.icon} 
                              alt={item.platform} 
                              className="w-4 h-4 mr-2 invert" 
                            />
                            <span className="text-gray-300">{item.platform}</span>
                          </div>
                          <span className="text-white">{item.value}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full animate-pulse`}
                            style={{ width: item.value }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-medium mb-4">Content Distribution</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Videos', value: '45%', icon: Video },
                      { label: 'Blog Posts', value: '30%', icon: FileText },
                      { label: 'Podcasts', value: '15%', icon: Mic },
                      { label: 'YouTube', value: '10%', icon: Youtube }
                    ].map((item) => (
                      <div key={item.label} className="bg-white/5 rounded-lg p-4 flex items-center gap-3 transform hover:scale-105 transition-transform">
                        <div className="bg-primary-500/20 p-2 rounded-lg">
                          <item.icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">{item.label}</div>
                          <div className="text-lg font-semibold text-white">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Platform Pills */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg flex items-center gap-3 border border-white/20 transform hover:scale-110 transition-transform">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" alt="X (Twitter)" className="w-5 h-5" />
                <span className="font-medium text-white">X (Twitter)</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg flex items-center gap-3 border border-white/20 transform hover:scale-110 transition-transform">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-5 h-5 invert" />
                <span className="font-medium text-white">Instagram</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg flex items-center gap-3 border border-white/20 transform hover:scale-110 transition-transform">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="w-5 h-5 invert" />
                <span className="font-medium text-white">LinkedIn</span>
              </div>
            </div>
          </div>

          <div className="mt-24 animate-bounce">
            <ArrowDown className="w-8 h-8 text-gray-400/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;