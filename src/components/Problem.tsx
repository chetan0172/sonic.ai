import React from 'react';
import { Clock, Share2, Palette } from 'lucide-react';

const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Content Creator's Dilemma
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You invest hours creating amazing long-form content, but it often gets lost in the digital noise. The struggle to consistently repurpose and schedule it is real.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl transition-transform hover:-translate-y-1 duration-300">
            <div className="text-purple-700 mb-4">
              <Clock size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Time Consuming</h3>
            <p className="text-gray-600">
              Manually repurposing content for different platforms is tedious and time-consuming, taking hours that could be spent creating more value.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl transition-transform hover:-translate-y-1 duration-300">
            <div className="text-purple-700 mb-4">
              <Share2 size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Inconsistent Posting</h3>
            <p className="text-gray-600">
              Without a reliable system, posting becomes sporadic and engagement suffers, leading to algorithm penalties and reduced reach.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl transition-transform hover:-translate-y-1 duration-300">
            <div className="text-purple-700 mb-4">
              <Palette size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Platform Mismatch</h3>
            <p className="text-gray-600">
              Content that works on one platform often fails on others, requiring complex reformatting and platform-specific knowledge.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-2xl font-medium text-gray-900 mb-6 max-w-3xl mx-auto">
            What if you could transform <span className="text-purple-700">one piece of content</span> into dozens of platform-perfect posts with just a few clicks?
          </p>
          <div className="inline-block bg-purple-100 text-purple-700 px-6 py-3 rounded-lg text-lg font-medium">
            That's exactly what Zsonic.ai does
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;