import React from 'react';
import { 
  Sparkles, 
  LineChart, 
  Share2, 
  Workflow, 
  Mic, 
  Users,
  Brain,
  Target,
  Repeat,
  MessageSquare,
  BarChart,
  Zap
} from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 1,
    title: "AI 'Virality Predictor' Before Posting",
    description: "Our advanced AI analyzes your content against trending patterns and viral markers to predict engagement potential before you post, helping you optimize for maximum reach.",
    icon: "Brain"
  },
  {
    id: 2,
    title: "Dynamic Auto-Adaption by Platform + Audience",
    description: "Smart content adaptation that automatically tailors your message for each platform's unique requirements and audience preferences in real-time.",
    icon: "Target"
  },
  {
    id: 3,
    title: "Drip Funnel Builder with Conversion Goals",
    description: "Create sophisticated content funnels that guide your audience through a strategic journey, optimized for your specific conversion objectives.",
    icon: "Workflow"
  },
  {
    id: 4,
    title: "Auto-snippet to Podcast / Reel Script / AI Voiceover",
    description: "Transform any content into platform-specific formats with AI-powered scripting and professional voiceover generation for maximum impact.",
    icon: "Mic"
  },
  {
    id: 5,
    title: "Competitor Content Tracker + One-Click Remix",
    description: "Monitor competitor content performance and instantly remix successful concepts into your unique voice and brand style.",
    icon: "Repeat"
  },
  {
    id: 6,
    title: "First-Party CRM + Engagement Engine",
    description: "Build deeper relationships with your audience through personalized engagement tracking and automated interaction management.",
    icon: "MessageSquare"
  }
];

const IconComponent: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case 'Brain': return <Brain size={40} />;
    case 'Target': return <Target size={40} />;
    case 'Workflow': return <Workflow size={40} />;
    case 'Mic': return <Mic size={40} />;
    case 'Repeat': return <Repeat size={40} />;
    case 'MessageSquare': return <MessageSquare size={40} />;
    default: return <Sparkles size={40} />;
  }
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100/30 dark:bg-primary-900/30 px-4 py-2 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next-Generation Content Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your content strategy with AI-powered tools designed for maximum impact and engagement
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-primary-600 dark:text-primary-400 mb-4">
                <IconComponent icon={feature.icon} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Experience the Future of Content Management
              </h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl">
                Join thousands of content creators who are leveraging AI to create more engaging content in less time.
              </p>
              <button className="bg-white text-primary-600 hover:bg-gray-100 py-3 px-8 rounded-full font-medium transition-colors shadow-lg">
                Start Your Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;