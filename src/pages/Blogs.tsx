
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionTitle } from '@/components/ui/section-title';
import { BlogCard } from '@/components/ui/blog-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

// Sample blog data
const blogsData = [
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
  },
  {
    id: '3',
    title: 'Nutrition Myths Debunked: Evidence-Based Dietary Advice',
    excerpt: 'Separating fact from fiction in the world of nutrition and diet recommendations.',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500&auto=format&fit=crop',
    date: 'May 14, 2023',
    author: {
      name: 'Dr. Linda Chen',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '4',
    title: 'Exercise for Longevity: Building a Sustainable Fitness Routine',
    excerpt: 'Creating a balanced exercise program that supports long-term health and vitality.',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop',
    date: 'April 30, 2023',
    author: {
      name: 'Dr. Michael Thompson',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '5',
    title: 'Managing Chronic Pain: Integrated Approaches',
    excerpt: 'Exploring multidisciplinary strategies for effective chronic pain management.',
    category: 'Pain Management',
    image: 'https://images.unsplash.com/photo-1566662632482-a2dedf6d7113?q=80&w=500&auto=format&fit=crop',
    date: 'April 15, 2023',
    author: {
      name: 'Dr. Sophia Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '6',
    title: 'Pediatric Health: What Every Parent Should Know',
    excerpt: 'Essential information for parents about child development and common health concerns.',
    category: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1588613254750-c6b9f2bce332?q=80&w=500&auto=format&fit=crop',
    date: 'March 28, 2023',
    author: {
      name: 'Dr. Robert Patel',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop'
    }
  }
];

const categories = [
  'All Categories', 'Heart Health', 'Mental Health', 'Nutrition', 
  'Fitness', 'Pain Management', 'Pediatrics', 'Women\'s Health'
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  
  // Filter blogs based on search term and category
  const filteredBlogs = blogsData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All Categories' || blog.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-health-50/50 to-background">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Health Insights"
            title="Articles & Guidelines"
            description="Stay informed with the latest health research, expert advice, and practical guidelines from our medical professionals."
          />
          
          {/* Search and Filter */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="glass-panel p-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                <span>Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-8 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 categories-scroll">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer py-2 px-4 whitespace-nowrap"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      
      {/* Articles Grid */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Please try different search terms or categories.
              </p>
            </div>
          )}
          
          {filteredBlogs.length > 0 && (
            <div className="text-center mt-10">
              <Button variant="outline" size="lg">Load More Articles</Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Guidelines */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Clinical Resources"
            title="Health Guidelines"
            description="Evidence-based recommendations for managing common health conditions and promoting wellness."
            className="mb-12"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'High Blood Pressure Management Guidelines',
                description: 'Comprehensive guide to understanding, monitoring, and controlling high blood pressure.',
                category: 'Cardiovascular',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop'
              },
              {
                title: 'Diabetes Care: Best Practices',
                description: 'Recommendations for blood glucose monitoring, nutrition, medication, and lifestyle management.',
                category: 'Endocrinology',
                image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop'
              }
            ].map((guideline, index) => (
              <div key={index} className="glass-panel overflow-hidden hover-scale flex flex-col md:flex-row">
                <div className="md:w-2/5">
                  <img 
                    src={guideline.image} 
                    alt={guideline.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col">
                  <Badge className="w-fit mb-3">{guideline.category}</Badge>
                  <h3 className="text-xl font-medium mb-2">{guideline.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{guideline.description}</p>
                  <Button variant="outline" className="w-full md:w-fit">Download PDF</Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg">View All Guidelines</Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="glass-panel p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Up-to-Date</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for the latest health articles, research findings, and expert advice delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Your email address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx="true">{`
        .categories-scroll::-webkit-scrollbar {
          height: 4px;
        }
        
        .categories-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .categories-scroll::-webkit-scrollbar-thumb {
          background-color: var(--health-200);
          border-radius: 9999px;
        }
      `}</style>
    </PageLayout>
  );
};

export default Blogs;
