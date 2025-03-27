
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Brain, CalendarCheck, MapPin, MessageCircle, Star, Video, Clock, Phone } from 'lucide-react';

// Sample therapists data
const therapistsData = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    specialty: 'Cognitive Behavioral Therapy',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    rating: 4.9,
    experience: 10,
    nextAvailable: 'Tomorrow',
    about: 'Dr. Chen specializes in cognitive behavioral therapy and has extensive experience treating anxiety disorders, depression, and PTSD.'
  },
  {
    id: '2',
    name: 'Dr. Marcus Johnson',
    specialty: 'Family Therapy',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop',
    rating: 4.7,
    experience: 15,
    nextAvailable: 'Today',
    about: 'Dr. Johnson is a licensed family therapist with expertise in resolving family conflicts, improving communication, and strengthening relationships.'
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    specialty: 'Mindfulness-Based Therapy',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=500&auto=format&fit=crop',
    rating: 4.8,
    experience: 8,
    nextAvailable: 'In 2 days',
    about: 'Dr. Williams focuses on mindfulness-based approaches to treat stress, anxiety, and help clients develop greater self-awareness and emotional regulation.'
  }
];

// Therapy options
const therapyOptions = [
  {
    title: 'Individual Therapy',
    description: 'One-on-one sessions with a licensed therapist to address personal challenges and mental health concerns.',
    features: ['Personalized treatment plans', 'Confidential sessions', 'Flexible scheduling options', 'Available in-person or virtual']
  },
  {
    title: 'Couples Therapy',
    description: 'Sessions designed to help couples improve communication, resolve conflicts, and strengthen their relationship.',
    features: ['Conflict resolution techniques', 'Communication skill building', 'Rebuilding trust', 'Joint and individual sessions available']
  },
  {
    title: 'Group Therapy',
    description: 'Therapeutic sessions in a group setting that provide support, perspective, and connection with others facing similar challenges.',
    features: ['Peer support and feedback', 'Reduced feelings of isolation', 'Cost-effective option', 'Specialized groups for specific issues']
  }
];

// Session types
const sessionTypes = [
  {
    id: 'video',
    title: 'Video Session',
    icon: Video,
    description: 'Meet with your therapist via secure video conferencing.',
    price: '$85'
  },
  {
    id: 'phone',
    title: 'Phone Session',
    icon: Phone,
    description: 'Connect with your therapist through a phone call.',
    price: '$75'
  },
  {
    id: 'message',
    title: 'Messaging Therapy',
    icon: MessageCircle,
    description: 'Ongoing text-based communication with your therapist.',
    price: '$65/week'
  }
];

const Therapy = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-health-50/50 to-background">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Mental Wellness"
            title="Professional Therapy Services"
            description="Access quality mental health care from licensed professionals to support your emotional wellbeing."
          />
          
          <div className="flex justify-center mt-8">
            <Button size="lg" className="rounded-full px-6">
              Find a Therapist
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Tabs */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="services" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="therapists">Therapists</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            {/* Services Tab */}
            <TabsContent value="services" className="animate-fade-in">
              <div className="space-y-12">
                {/* Therapy Options */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Our Therapy Options</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {therapyOptions.map((option, index) => (
                      <Card key={index} className="glass-panel hover-scale">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-medium mb-2">{option.title}</h3>
                          <p className="text-muted-foreground mb-4 text-sm">
                            {option.description}
                          </p>
                          <ul className="space-y-2 mb-4">
                            {option.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-health-600 mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full">Learn More</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Session Types */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Session Types</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {sessionTypes.map((session) => (
                      <Card key={session.id} className="glass-panel hover-scale">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-health-50 text-health-600 p-3 rounded-xl">
                              <session.icon size={24} />
                            </div>
                            <Badge variant="outline" className="text-lg font-medium">
                              {session.price}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-medium mb-2">{session.title}</h3>
                          <p className="text-muted-foreground mb-4 text-sm">
                            {session.description}
                          </p>
                          <Button className="w-full">Select</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Specialties */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">We Provide Support For</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[
                      'Anxiety', 'Depression', 'Stress', 'Trauma & PTSD',
                      'Relationship Issues', 'Self-Esteem', 'Grief', 'Life Transitions'
                    ].map((specialty, index) => (
                      <div key={index} className="glass-panel p-4 text-center hover-scale">
                        <span className="font-medium">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Therapists Tab */}
            <TabsContent value="therapists" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Our Licensed Therapists</h2>
                  <Button variant="outline">Filter Therapists</Button>
                </div>
                
                <div className="grid gap-6">
                  {therapistsData.map((therapist) => (
                    <div 
                      key={therapist.id} 
                      className={`glass-panel overflow-hidden transition-all duration-300 ${
                        selectedTherapist === therapist.id 
                          ? 'shadow-glass-lg' 
                          : 'hover:shadow-glass hover:scale-[1.01]'
                      }`}
                    >
                      <div className="p-6 md:flex gap-6">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-xl">
                            <AvatarImage src={therapist.image} alt={therapist.name} />
                            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="md:w-3/4">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <div>
                              <h3 className="text-xl font-medium">{therapist.name}</h3>
                              <p className="text-muted-foreground">{therapist.specialty}</p>
                            </div>
                            <Badge variant="outline" className="bg-health-50 text-health-700">
                              {therapist.nextAvailable} Availability
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 my-3">
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-health-500 fill-health-500" />
                              <span className="font-medium">{therapist.rating} (120+ reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Brain size={16} />
                              <span>{therapist.experience} years experience</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin size={16} />
                              <span>New York, NY (Virtual Available)</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {therapist.about}
                          </p>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            {['Anxiety', 'Depression', 'Trauma', 'Stress'].map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div 
                            className="flex flex-col sm:flex-row gap-3 mt-4"
                            onClick={() => setSelectedTherapist(
                              selectedTherapist === therapist.id ? null : therapist.id
                            )}
                          >
                            <Button className="flex items-center gap-2">
                              <CalendarCheck size={16} />
                              Book Appointment
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              View Full Profile
                            </Button>
                          </div>
                          
                          {selectedTherapist === therapist.id && (
                            <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                              <h4 className="font-medium mb-3">Available Appointment Slots</h4>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
                                {['Today 2:00 PM', 'Today 4:30 PM', 'Tomorrow 10:00 AM', 'Tomorrow 1:30 PM', 'Fri 11:00 AM'].map((slot) => (
                                  <div 
                                    key={slot} 
                                    className="glass-panel p-2 text-center text-sm cursor-pointer hover:bg-health-50/50 hover:border-health-200 transition-colors"
                                  >
                                    {slot}
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock size={14} />
                                <span>Session duration: 50 minutes</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button>View More Therapists</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* FAQ Tab */}
            <TabsContent value="faq" className="animate-fade-in">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <div className="grid gap-4">
                  {[
                    {
                      question: "How do I know if therapy is right for me?",
                      answer: "Therapy can be beneficial for anyone looking to improve their mental health, work through challenges, or develop better coping strategies. If you're experiencing persistent negative feelings, relationship difficulties, or find it hard to manage daily stressors, therapy might be helpful. A consultation with a therapist can help determine if their services match your needs."
                    },
                    {
                      question: "What's the difference between in-person and virtual therapy?",
                      answer: "In-person therapy takes place face-to-face in a therapist's office, while virtual therapy happens through video calls, phone calls, or messaging. Both formats are effective, with virtual therapy offering more convenience and accessibility. Your preference, comfort level, and specific needs will help determine which format is better for you."
                    },
                    {
                      question: "How long does therapy typically last?",
                      answer: "The duration of therapy varies widely depending on your goals, the issues you're addressing, and the type of therapy. Some people benefit from short-term therapy (8-12 sessions) focused on specific issues, while others prefer longer-term therapy for ongoing support. Your therapist will discuss expectations and regularly assess progress with you."
                    },
                    {
                      question: "Is therapy confidential?",
                      answer: "Yes, therapy is confidential, and therapists are bound by professional ethics and laws to maintain your privacy. There are limited exceptions where therapists are required to break confidentiality, such as if there's a risk of harm to yourself or others, suspicion of abuse of a minor or vulnerable adult, or if required by a court order. Your therapist will explain these limitations at the beginning of treatment."
                    },
                    {
                      question: "How much does therapy cost?",
                      answer: "Therapy costs vary based on the therapist's credentials, location, session format, and whether you're using insurance. Our platform offers different pricing options ranging from $65 to $150 per session. Many health insurance plans provide some coverage for mental health services. We recommend checking with your insurance provider about your specific coverage."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="glass-panel p-6">
                      <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                
                <div className="glass-panel p-6 mt-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Have more questions?</h3>
                  <p className="text-muted-foreground mb-4">
                    Our support team is available to help you with any questions you might have about our therapy services.
                  </p>
                  <Button>Contact Support</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Client Stories"
            title="What Our Clients Say"
            description="Hear from individuals who have experienced positive changes through our therapy services."
          />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                quote: "Therapy has completely transformed how I handle stress and anxiety. My therapist helped me develop coping strategies that have made such a difference in my daily life.",
                name: "Jamie R.",
                title: "Client for 8 months"
              },
              {
                quote: "I was skeptical about virtual therapy, but it's been incredible. The convenience means I never miss a session, and I've made more progress than I ever expected.",
                name: "Michael T.",
                title: "Client for 6 months"
              },
              {
                quote: "After struggling with depression for years, I finally found a therapist who understands me. The support and guidance have been instrumental in my recovery journey.",
                name: "Aisha K.",
                title: "Client for 1 year"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-panel p-6 hover-scale">
                <div className="text-health-500 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V15C10 16.0609 9.57857 17.0783 8.82843 17.8284C8.07828 18.5786 7.06087 19 6 19H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V15C20 16.0609 19.5786 17.0783 18.8284 17.8284C18.0783 18.5786 17.0609 19 16 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="glass-panel p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Taking the first step toward better mental health is a sign of strength. Our licensed therapists are here to support you on your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-6">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6">
                Explore Therapists
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Therapy;
