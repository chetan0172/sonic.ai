import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  BarChart2, 
  Target, 
  Zap 
} from 'lucide-react';

const Personas: React.FC = () => {
  return (
    <section id="personas" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Proven Results Across Industries
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how businesses are transforming their content strategy with our AI-powered platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Success Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Platform Success Metrics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  <TrendingUp size={24} />
                  <span className="text-2xl font-bold">85%</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Average Engagement Increase
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  <Users size={24} />
                  <span className="text-2xl font-bold">2.5x</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Audience Growth Rate
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  <Clock size={24} />
                  <span className="text-2xl font-bold">75%</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Time Saved on Content Creation
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  <BarChart2 size={24} />
                  <span className="text-2xl font-bold">3.2x</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Content Output Increase
                </p>
              </div>
            </div>
          </div>

          {/* Industry Impact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Industry Impact
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Enterprise Adoption
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Used by 500+ companies across 20+ industries for content optimization and distribution
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    AI Processing Power
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Over 1 million pieces of content processed and optimized monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Benefits */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <h4 className="text-xl font-semibold mb-2">Efficiency</h4>
              <p className="opacity-90">
                Reduce content creation time by 75% while maintaining quality and consistency
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Engagement</h4>
              <p className="opacity-90">
                Achieve 2-3x higher engagement rates with AI-optimized content
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">ROI</h4>
              <p className="opacity-90">
                Average 150% increase in content marketing ROI within 3 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personas;