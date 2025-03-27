
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, Activity, Clipboard, AlertCircle, CheckCircle, 
  ChevronRight, ChevronLeft, Check, Award, LoaderCircle,
  ArrowRight, Lightbulb
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const checkupCategories = [
  {
    id: "general",
    title: "General Health",
    icon: Activity,
    description: "Basic assessment of your overall health status and lifestyle factors",
    questions: 5,
    time: "2-3 min",
  },
  {
    id: "heart",
    title: "Heart Health",
    icon: Heart,
    description: "Evaluate risk factors related to cardiovascular health",
    questions: 8,
    time: "4-5 min",
  },
  {
    id: "mental",
    title: "Mental Wellbeing",
    icon: Lightbulb,
    description: "Assessment of stress, anxiety, and other mental health indicators",
    questions: 10,
    time: "5-7 min",
  },
];

// Sample general health assessment questions
const generalHealthQuestions = [
  {
    id: "q1",
    question: "How would you rate your overall health?",
    options: [
      { id: "a", text: "Excellent", value: 5 },
      { id: "b", text: "Very good", value: 4 },
      { id: "c", text: "Good", value: 3 },
      { id: "d", text: "Fair", value: 2 },
      { id: "e", text: "Poor", value: 1 },
    ],
  },
  {
    id: "q2",
    question: "How many days per week do you exercise for at least 30 minutes?",
    options: [
      { id: "a", text: "0-1 days", value: 1 },
      { id: "b", text: "2-3 days", value: 3 },
      { id: "c", text: "4-5 days", value: 4 },
      { id: "d", text: "6-7 days", value: 5 },
    ],
  },
  {
    id: "q3",
    question: "How many servings of fruits and vegetables do you consume daily?",
    options: [
      { id: "a", text: "0-1 servings", value: 1 },
      { id: "b", text: "2-3 servings", value: 3 },
      { id: "c", text: "4-5 servings", value: 4 },
      { id: "d", text: "More than 5 servings", value: 5 },
    ],
  },
  {
    id: "q4",
    question: "How would you describe your sleep quality?",
    options: [
      { id: "a", text: "Very good", value: 5 },
      { id: "b", text: "Good", value: 4 },
      { id: "c", text: "Fair", value: 3 },
      { id: "d", text: "Poor", value: 2 },
      { id: "e", text: "Very poor", value: 1 },
    ],
  },
  {
    id: "q5",
    question: "How would you rate your stress levels in the past month?",
    options: [
      { id: "a", text: "Very low", value: 5 },
      { id: "b", text: "Low", value: 4 },
      { id: "c", text: "Moderate", value: 3 },
      { id: "d", text: "High", value: 2 },
      { id: "e", text: "Very high", value: 1 },
    ],
  },
];

type AssessmentStep = 'category' | 'questions' | 'results';

const Checkup = () => {
  const [step, setStep] = useState<AssessmentStep>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };
  
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleNext = () => {
    const currentQuestion = generalHealthQuestions[currentQuestionIndex];
    if (!answers[currentQuestion.id]) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestionIndex < generalHealthQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results
      setIsCalculating(true);
      setTimeout(() => {
        calculateResults();
      }, 2000);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep('category');
    }
  };
  
  const calculateResults = () => {
    // Simple calculation - average of all answers
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const avgScore = (totalScore / generalHealthQuestions.length) * 20; // Scale to 100
    setHealthScore(Math.round(avgScore));
    setIsCalculating(false);
    setStep('results');
  };
  
  const resetAssessment = () => {
    setStep('category');
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setHealthScore(null);
  };
  
  const getScoreCategory = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "text-green-500" };
    if (score >= 70) return { label: "Very Good", color: "text-teal-500" };
    if (score >= 55) return { label: "Good", color: "text-blue-500" };
    if (score >= 40) return { label: "Fair", color: "text-amber-500" };
    return { label: "Needs Improvement", color: "text-red-500" };
  };
  
  const renderProgressBar = () => {
    if (step === 'questions') {
      const progress = ((currentQuestionIndex + 1) / generalHealthQuestions.length) * 100;
      return (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {generalHealthQuestions.length}</span>
            <span className="text-health-600 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      );
    }
    return null;
  };
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-health-50/50 to-background">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Health Assessment"
            title="Free Health Checkup"
            description="Take our comprehensive health assessment to get insights about your wellbeing and personalized recommendations."
          />
        </div>
      </section>
      
      {/* Assessment Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {renderProgressBar()}
            
            <div className="glass-panel overflow-hidden">
              {step === 'category' && (
                <div className="animate-fade-in p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Choose Assessment Type</h2>
                  <div className="grid gap-4">
                    {checkupCategories.map((category) => (
                      <div 
                        key={category.id} 
                        className="glass-panel hover-scale transition-all cursor-pointer"
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <div className="flex items-start p-5 gap-4">
                          <div className="bg-health-50 text-health-600 p-3 rounded-xl">
                            <category.icon size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium">{category.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">
                              {category.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clipboard size={14} />
                                <span>{category.questions} questions</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock size={14} />
                                <span>{category.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-health-50 text-health-600">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {step === 'questions' && (
                <div className="animate-fade-in p-6 md:p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedCategory === 'general' ? 'General Health Assessment' : 
                       selectedCategory === 'heart' ? 'Heart Health Assessment' : 
                       'Mental Wellbeing Assessment'}
                    </h2>
                    <p className="text-muted-foreground">
                      Please answer honestly for the most accurate results.
                    </p>
                  </div>
                  
                  {selectedCategory === 'general' && (
                    <div className="space-y-6">
                      <div className="glass-panel p-6">
                        <h3 className="text-lg font-medium mb-4">
                          {generalHealthQuestions[currentQuestionIndex].question}
                        </h3>
                        <div className="space-y-3">
                          {generalHealthQuestions[currentQuestionIndex].options.map((option) => (
                            <div 
                              key={option.id}
                              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                answers[generalHealthQuestions[currentQuestionIndex].id] === option.value
                                  ? 'border-health-500 bg-health-50/50 text-health-700'
                                  : 'border-border hover:border-health-200 hover:bg-health-50/20'
                              }`}
                              onClick={() => handleAnswer(generalHealthQuestions[currentQuestionIndex].id, option.value)}
                            >
                              <span>{option.text}</span>
                              {answers[generalHealthQuestions[currentQuestionIndex].id] === option.value && (
                                <Check size={18} className="text-health-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious} 
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft size={16} />
                          Back
                        </Button>
                        <Button 
                          onClick={handleNext} 
                          className="flex items-center gap-1"
                        >
                          {currentQuestionIndex < generalHealthQuestions.length - 1 ? (
                            <>
                              Next
                              <ChevronRight size={16} />
                            </>
                          ) : (
                            <>
                              Complete
                              <CheckCircle size={16} />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {step === 'results' && healthScore !== null && (
                <div className="animate-fade-in">
                  <div className="bg-health-50/50 p-6 md:p-8 text-center">
                    <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <div className="text-2xl font-bold text-health-600">{healthScore}</div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Your Health Score</h2>
                    <p className={`text-lg font-medium ${getScoreCategory(healthScore).color}`}>
                      {getScoreCategory(healthScore).label}
                    </p>
                  </div>
                  
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="glass-panel p-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                          <CheckCircle size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Strengths</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Based on your responses, you're doing well with regular exercise and maintaining a balanced diet.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-panel p-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-50 text-amber-600 p-2 rounded-lg">
                          <AlertCircle size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Areas for Improvement</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            You might want to focus on improving your sleep quality and finding ways to better manage stress.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-panel p-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-health-50 text-health-600 p-2 rounded-lg">
                          <Lightbulb size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Recommendations</h3>
                          <ul className="text-muted-foreground text-sm mt-2 space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="text-health-600 mt-1">•</span>
                              <span>Consider incorporating relaxation techniques like meditation or deep breathing exercises.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-health-600 mt-1">•</span>
                              <span>Establish a consistent sleep routine by going to bed and waking up at the same time daily.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-health-600 mt-1">•</span>
                              <span>Maintain your current exercise routine, but consider adding variety to target different muscle groups.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={resetAssessment} 
                        className="flex-1"
                      >
                        Take Another Assessment
                      </Button>
                      <Button className="flex-1">
                        Download Full Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {isCalculating && (
                <div className="p-16 text-center animate-fade-in">
                  <LoaderCircle size={48} className="animate-spin text-health-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Analyzing Your Responses</h3>
                  <p className="text-muted-foreground">
                    Please wait while we process your answers and generate personalized insights...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Why Take Our Assessment"
            title="Benefits of Health Checkups"
            description="Regular health assessments help you stay informed about your wellbeing and take proactive steps toward better health."
          />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Personalized Insights",
                description: "Get customized recommendations based on your unique health profile and lifestyle.",
                icon: <Award size={24} />,
              },
              {
                title: "Early Detection",
                description: "Identify potential health concerns before they become serious problems.",
                icon: <AlertCircle size={24} />,
              },
              {
                title: "Track Progress",
                description: "Monitor your health improvements over time with regular assessments.",
                icon: <Activity size={24} />,
              },
            ].map((feature, index) => (
              <Card key={index} className="glass-panel hover-scale">
                <CardHeader>
                  <div className="bg-health-50 text-health-600 p-3 rounded-xl w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

const Clock = ({ size, className }: { size: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default Checkup;
