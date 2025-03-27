
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { ServiceCard } from '@/components/ui/service-card';
import { DoctorCard } from '@/components/ui/doctor-card';
import { BlogCard } from '@/components/ui/blog-card';
import { HospitalModel } from '@/components/three/HospitalModel';
import { ChatbotInterface } from '@/components/ui/chatbot-interface';
import { Stethoscope, Users, Brain, FileText, MessageCircle } from 'lucide-react';

// Sample data
const featuredDoctors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop',
    rating: 4.8,
    experience: 12
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=500&auto=format&fit=crop',
    rating: 4.7,
    experience: 9
  },
  {
    id: '3',
    name: 'Amira Patel',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500&auto=format&fit=crop',
    rating: 4.9,
    experience: 15
  }
];

const featuredBlogs = [
  {
    id: '1',
    title: 'Understanding Heart Health: Key Indicators to Monitor',
    excerpt: 'Learn about the vital signs and lifestyle factors that impact your cardiovascular health.',
    category: 'Heart Health',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500&auto=format&fit=crop',
    date: 'June 12, 2023',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '2',
    title: 'The Science of Sleep: How Rest Affects Your Mental Health',
    excerpt: 'Discover the crucial relationship between sleep quality and cognitive function.',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=500&auto=format&fit=crop',
    date: 'May 28, 2023',
    author: {
      name: 'Dr. James Wilson',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop'
    }
  }
];

const Index = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-health-50 via-background to-background"></div>
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
                  Modern Healthcare <span className="text-gradient">At Your Fingertips</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                  Comprehensive healthcare services designed around you, with easy access to doctors, 
                  checkups, therapy, and more.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to="/doctors">Find a Doctor</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link to="/checkup">Free Checkup</Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i+10}`} 
                        alt="Patient" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-health-700 font-medium">4,000+</span>
                  <span className="text-muted-foreground ml-1">satisfied patients</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0 overflow-hidden rounded-xl">
              <HospitalModel className="w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionTitle
            subtitle="Our Services"
            title="Comprehensive Healthcare Solutions"
            description="Access a wide range of healthcare services designed to meet your needs, from consultations to specialized treatments."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <ServiceCard
              title="Doctor Consultations"
              description="Connect with experienced healthcare professionals for personalized care."
              icon={<Stethoscope size={24} />}
              link="/doctors"
            />
            
            <ServiceCard
              title="Community Support"
              description="Join our healthcare community for support, advice, and shared experiences."
              icon={<Users size={24} />}
              link="/community"
            />
            
            <ServiceCard
              title="Mental Wellness"
              description="Access therapy services and resources to support your mental health journey."
              icon={<Brain size={24} />}
              link="/therapy"
            />
            
            <ServiceCard
              title="Health Resources"
              description="Browse our collection of articles, guides, and health information."
              icon={<FileText size={24} />}
              link="/blogs"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Doctors */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <SectionTitle
              subtitle="Expert Professionals"
              title="Meet Our Specialists"
              description="Our team of qualified healthcare providers is dedicated to delivering the highest standard of care."
              alignment="left"
              className="md:max-w-md"
            />
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/doctors">View All Doctors</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Checkup & Therapy Spotlight */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass-panel p-8 order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Free Health Assessment</h3>
              <p className="text-muted-foreground mb-6">
                Take our comprehensive health assessment to get personalized insights about your wellbeing and potential areas for improvement.
              </p>
              <ul className="space-y-3 mb-6">
                {['Cardiovascular health', 'Mental wellbeing', 'Nutrition evaluation', 'Lifestyle analysis'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/checkup">Take Free Assessment</Link>
              </Button>
            </div>
            
            <div className="space-y-6 order-1 md:order-2">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Preventive Care & Mental Wellbeing</h2>
                <p className="text-muted-foreground">
                  Our platform offers comprehensive tools for proactive health management, including free online assessments 
                  and professional therapy services.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-panel p-6">
                  <div className="bg-health-50 text-health-600 p-2 rounded-lg w-fit mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">Health Monitoring</h4>
                  <p className="text-sm text-muted-foreground">Track vital signs and health metrics over time</p>
                </div>
                
                <div className="glass-panel p-6">
                  <div className="bg-health-50 text-health-600 p-2 rounded-lg w-fit mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15.5C14.2091 15.5 16 13.7091 16 11.5C16 9.29086 14.2091 7.5 12 7.5C9.79086 7.5 8 9.29086 8 11.5C8 13.7091 9.79086 15.5 12 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15.5C19.2669 15.7931 19.2272 16.1249 19.286 16.4463C19.3448 16.7677 19.4995 17.0632 19.73 17.29L19.79 17.35C19.976 17.5356 20.1235 17.7545 20.2241 17.9943C20.3248 18.2341 20.3766 18.4902 20.3766 18.75C20.3766 19.0098 20.3248 19.2659 20.2241 19.5057C20.1235 19.7455 19.976 19.9644 19.79 20.15C19.6044 20.336 19.3855 20.4835 19.1457 20.5841C18.9059 20.6848 18.6498 20.7366 18.39 20.7366C18.1302 20.7366 17.8741 20.6848 17.6343 20.5841C17.3945 20.4835 17.1756 20.336 16.99 20.15L16.93 20.09C16.7032 19.8595 16.4077 19.7048 16.0863 19.646C15.7649 19.5872 15.4331 19.6269 15.14 19.76C14.8508 19.8892 14.6096 20.0982 14.4462 20.3583C14.2829 20.6184 14.2048 20.9181 14.22 21.22V21.4C14.22 21.9304 14.0093 22.4391 13.6342 22.8142C13.2591 23.1893 12.7504 23.4 12.22 23.4C11.6896 23.4 11.1809 23.1893 10.8058 22.8142C10.4307 22.4391 10.22 21.9304 10.22 21.4V21.31C10.2279 20.9986 10.1389 20.6924 9.96418 20.4283C9.78943 20.1643 9.53704 19.9546 9.23998 19.83C8.94687 19.6969 8.61505 19.6572 8.29364 19.716C7.97223 19.7748 7.67668 19.9295 7.44998 20.16L7.38998 20.22C7.20441 20.406 6.98551 20.5535 6.7457 20.6541C6.5059 20.7548 6.24978 20.8066 5.98998 20.8066C5.73018 20.8066 5.47406 20.7548 5.23425 20.6541C4.99445 20.5535 4.77555 20.406 4.58998 20.22C4.40397 20.0344 4.25647 19.8155 4.15583 19.5757C4.05519 19.3359 4.00342 19.0798 4.00342 18.82C4.00342 18.5602 4.05519 18.3041 4.15583 18.0643C4.25647 17.8245 4.40397 17.6056 4.58998 17.42L4.64998 17.36C4.88054 17.1333 5.03521 16.8377 5.094 16.5163C5.15279 16.1949 5.11312 15.8631 4.97998 15.57C4.85094 15.2808 4.64191 15.0396 4.38179 14.8762C4.12167 14.7129 3.82195 14.6348 3.51998 14.65H3.29998C2.76955 14.65 2.26086 14.4393 1.88579 14.0642C1.51071 13.6891 1.29998 13.1804 1.29998 12.65C1.29998 12.1196 1.51071 11.6109 1.88579 11.2358C2.26086 10.8607 2.76955 10.65 3.29998 10.65H3.38998C3.70138 10.6579 4.00759 10.5689 4.27164 10.3941C4.53569 10.2194 4.74539 9.967 4.86998 9.67C5.00312 9.37689 5.04279 9.04507 4.984 8.72366C4.92521 8.40226 4.77054 8.1067 4.53998 7.88L4.47998 7.82C4.30397 7.63443 4.15647 7.41553 4.05583 7.17572C3.95519 6.93592 3.90342 6.6798 3.90342 6.42C3.90342 6.1602 3.95519 5.90408 4.05583 5.66428C4.15647 5.42447 4.30397 5.20557 4.47998 5.02C4.66555 4.84399 4.88445 4.69649 5.12425 4.59585C5.36406 4.49521 5.62018 4.44344 5.87998 4.44344C6.13978 4.44344 6.3959 4.49521 6.6357 4.59585C6.87551 4.69649 7.09441 4.84399 7.27998 5.02L7.33998 5.08C7.56668 5.31056 7.86223 5.46523 8.18364 5.52402C8.50505 5.58281 8.83687 5.54313 9.12998 5.41H9.19998C9.4892 5.28096 9.73039 5.07193 9.89373 4.81181C10.0571 4.55168 10.1352 4.25197 10.12 3.95V3.73C10.12 3.19957 10.3307 2.69086 10.7058 2.31579C11.0809 1.94071 11.5896 1.73 12.12 1.73C12.6504 1.73 13.1591 1.94071 13.5342 2.31579C13.9093 2.69086 14.12 3.19957 14.12 3.73V3.82C14.1048 4.12197 14.1829 4.42168 14.3462 4.68181C14.5096 4.94193 14.7508 5.15096 15.04 5.28C15.3331 5.41313 15.6649 5.45281 15.9863 5.39402C16.3077 5.33523 16.6032 5.18056 16.83 4.95L16.89 4.89C17.0756 4.71399 17.2945 4.56649 17.5343 4.46585C17.7741 4.36521 18.0302 4.31343 18.29 4.31343C18.5498 4.31343 18.8059 4.36521 19.0457 4.46585C19.2855 4.56649 19.5044 4.71399 19.69 4.89C19.876 5.07557 20.0235 5.29447 20.1241 5.53428C20.2248 5.77408 20.2766 6.0302 20.2766 6.29C20.2766 6.5498 20.2248 6.80592 20.1241 7.04572C20.0235 7.28553 19.876 7.50443 19.69 7.69L19.63 7.75C19.3995 7.9767 19.2448 8.27225 19.186 8.59366C19.1272 8.91507 19.1669 9.24689 19.3 9.54V9.61C19.429 9.89922 19.6381 10.1404 19.8982 10.3038C20.1583 10.4671 20.458 10.5452 20.76 10.53H20.98C21.5104 10.53 22.0191 10.7407 22.3942 11.1158C22.7693 11.4909 22.98 11.9996 22.98 12.53C22.98 13.0604 22.7693 13.5691 22.3942 13.9442C22.0191 14.3193 21.5104 14.53 20.98 14.53H20.89C20.588 14.5452 20.2883 14.6233 20.0282 14.7867C19.7681 14.95 19.559 15.1912 19.43 15.48V15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">Personalized Plan</h4>
                  <p className="text-sm text-muted-foreground">Customized health recommendations</p>
                </div>
                
                <div className="glass-panel p-6">
                  <div className="bg-health-50 text-health-600 p-2 rounded-lg w-fit mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 10.5L11 12.5L15.5 8M20 21V7.8C20 6.11984 20 5.27976 19.673 4.63803C19.3854 4.07354 18.9265 3.6146 18.362 3.32698C17.7202 3 16.8802 3 15.2 3H8.8C7.11984 3 6.27976 3 5.63803 3.32698C5.07354 3.6146 4.6146 4.07354 4.32698 4.63803C4 5.27976 4 6.11984 4 7.8V21L6.75 19L9.25 21L12 19L14.75 21L17.25 19L20 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">Health Records</h4>
                  <p className="text-sm text-muted-foreground">Secure storage of your medical data</p>
                </div>
                
                <div className="glass-panel p-6">
                  <div className="bg-health-50 text-health-600 p-2 rounded-lg w-fit mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 12.5C14 14.5 11.5 16 9 16C4 16 4 12.5 4 12.5C4 12.5 4 9 9 9C11.5 9 14 10.5 14 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 12C16 15 19 17 21 17C22 17 22 16 22 16C22 16 22 15 21 15C19 15 16 13 16 10C16 7 19 5 21 5C22 5 22 6 22 6C22 6 22 7 21 7C19 7 16 9 16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">Therapy Sessions</h4>
                  <p className="text-sm text-muted-foreground">Professional mental health support</p>
                </div>
              </div>
              
              <Button asChild variant="outline">
                <Link to="/therapy">Explore Therapy Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <SectionTitle
              subtitle="Health Insights"
              title="Latest Articles & Guidelines"
              description="Stay informed with the latest health news, research, and expert advice from our medical professionals."
              alignment="left"
              className="md:max-w-md"
            />
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/blogs">Browse All Articles</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-health-50/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="glass-panel p-8 md:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users who have already transformed their healthcare experience with our comprehensive platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/checkup">Take Health Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chatbot Button */}
      <Button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
      >
        <MessageCircle size={24} />
      </Button>
      
      {/* Chatbot Interface */}
      <ChatbotInterface 
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        className="bottom-6 right-6 animate-scale-in"
      />
    </PageLayout>
  );
};

export default Index;
