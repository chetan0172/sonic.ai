import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Transform Your Content Strategy with Smart Drip Campaigns
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our AI-powered platform helps you create, schedule, and optimize your content drip campaigns for maximum impact and engagement across all social platforms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 text-cyan-300">
                    <CheckCircle size={24} />
                  </div>
                  <p className="opacity-90">Intelligent content scheduling based on audience activity patterns</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-cyan-300">
                    <CheckCircle size={24} />
                  </div>
                  <p className="opacity-90">Dynamic content adaptation for each platform's requirements</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-cyan-300">
                    <CheckCircle size={24} />
                  </div>
                  <p className="opacity-90">Automated content repurposing and optimization</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 text-cyan-300">
                    <CheckCircle size={24} />
                  </div>
                  <p className="opacity-90">AI-powered engagement prediction and optimization</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-cyan-300">
                    <CheckCircle size={24} />
                  </div>
                  <p className="opacity-90">Smart A/B testing for maximum content performance</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 text-cyan-300">
                    <CheckCircle size={24} />
                  </div>
                  <p className="opacity-90">Real-time analytics and performance tracking</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Why Content Drip Campaigns?</h3>
              <p className="text-lg opacity-90">
                Content drip campaigns help you maintain consistent engagement, build stronger relationships with your audience, and achieve better results through strategic content distribution. Our AI ensures your content is delivered at the perfect time, in the perfect format, for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;