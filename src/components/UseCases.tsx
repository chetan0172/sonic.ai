import React, { useState } from 'react';
import { 
  Upload, 
  Brain, 
  Target, 
  Calendar, 
  BarChart2, 
  Zap,
  MessageSquare,
  Users
} from 'lucide-react';

const useCases = [
  {
    id: 1,
    title: "AI-Powered Content Analysis & Optimization",
    steps: [
      { number: 1, description: "Upload your long-form content or paste URL" },
      { number: 2, description: "AI analyzes content for viral potential and engagement markers" },
      { number: 3, description: "Platform suggests optimal content chunks and formats" },
      { number: 4, description: "Dynamic adaptation for each social platform's requirements" },
      { number: 5, description: "Preview and fine-tune AI-generated variations" }
    ],
    result: "Your content is automatically analyzed, optimized, and formatted for maximum engagement across all platforms."
  },
  {
    id: 2,
    title: "Smart Drip Campaign Creation",
    steps: [
      { number: 1, description: "Set campaign goals and target audience" },
      { number: 2, description: "AI builds optimal content drip sequence" },
      { number: 3, description: "Platform suggests posting schedule based on audience activity" },
      { number: 4, description: "Create platform-specific content variations automatically" },
      { number: 5, description: "Schedule entire campaign with smart timing" }
    ],
    result: "A complete, multi-platform drip campaign that guides your audience through a strategic content journey."
  },
  {
    id: 3,
    title: "Engagement Optimization & Analytics",
    steps: [
      { number: 1, description: "AI monitors post performance in real-time" },
      { number: 2, description: "Platform adapts content and timing based on engagement" },
      { number: 3, description: "Track conversion goals and audience behavior" },
      { number: 4, description: "Automated A/B testing of content variations" },
      { number: 5, description: "Receive AI-powered optimization suggestions" }
    ],
    result: "Continuously optimized content strategy with data-driven insights and automated improvements."
  }
];

const UseCases: React.FC = () => {
  const [activeCase, setActiveCase] = useState(useCases[0].id);
  
  const selectedCase = useCases.find(useCase => useCase.id === activeCase);
  
  return (
    <section id="use-cases" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100/30 dark:bg-primary-900/30 px-4 py-2 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-4">
            <Zap className="w-4 h-4" />
            <span>Intelligent Workflow</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience our AI-powered content drip system that transforms your content strategy
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 bg-gray-50 dark:bg-gray-900/50 p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Workflow</h3>
              <div className="space-y-4">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.id}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      activeCase === useCase.id
                        ? 'bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-200'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } border`}
                    onClick={() => setActiveCase(useCase.id)}
                  >
                    {useCase.title}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/3 p-6 lg:p-8">
              {selectedCase && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {selectedCase.title}
                  </h3>
                  
                  <div className="mb-8">
                    <div className="relative">
                      {selectedCase.steps.map((step, index) => (
                        <div key={step.number} className="flex mb-8 relative">
                          <div className="mr-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 text-white font-bold">
                              {step.number}
                            </div>
                            {index < selectedCase.steps.length - 1 && (
                              <div 
                                className="absolute top-10 bottom-0 left-5 w-0.5 bg-primary-200 dark:bg-primary-800" 
                                style={{ height: 'calc(100% - 40px)' }}
                              ></div>
                            )}
                          </div>
                          <div className="pt-1.5">
                            <p className="text-gray-700 dark:text-gray-300 text-lg">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Result</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedCase.result}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white py-3 px-8 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Start Your Content Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default UseCases;