
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for community discussions
const discussions = [
  {
    id: "1",
    title: "Managing Chronic Pain: Strategies and Support",
    author: {
      name: "Jamie Smith",
      avatar: "https://i.pravatar.cc/100?img=1",
      role: "Community Member",
    },
    category: "Chronic Conditions",
    replies: 24,
    likes: 38,
    date: "2 days ago",
    excerpt:
      "Living with chronic pain can be challenging. I wanted to share some strategies that have helped me cope and would love to hear what works for others...",
  },
  {
    id: "2",
    title: "Nutrition Tips for Boosting Immune System",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/100?img=2",
      role: "Nutritionist",
    },
    category: "Nutrition & Diet",
    replies: 31,
    likes: 52,
    date: "4 days ago",
    excerpt:
      "With flu season approaching, I thought it would be helpful to share some evidence-based nutrition strategies to strengthen your immune system...",
  },
  {
    id: "3",
    title: "Mental Health During Difficult Times",
    author: {
      name: "Dr. Sarah Wilson",
      avatar: "https://i.pravatar.cc/100?img=3",
      role: "Psychiatrist",
    },
    category: "Mental Health",
    replies: 42,
    likes: 67,
    date: "1 week ago",
    excerpt:
      "Let's discuss strategies for maintaining mental well-being during challenging periods. I'd like to open a supportive conversation about coping mechanisms...",
  },
];

// Sample data for upcoming events
const events = [
  {
    id: "1",
    title: "Diabetes Awareness Workshop",
    date: "June 15, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual Event",
    attendees: 128,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Mindfulness Meditation Session",
    date: "June 18, 2023",
    time: "10:00 AM - 11:00 AM",
    location: "Community Center",
    attendees: 45,
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=500&auto=format&fit=crop",
  },
];

// Sample data for support groups
const supportGroups = [
  {
    id: "1",
    name: "Cancer Survivors Network",
    members: 256,
    description: "A supportive community for cancer survivors, those currently fighting cancer, and their families.",
    image: "https://images.unsplash.com/photo-1577036421869-8b7c8be3fdb1?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Parenting Support Group",
    members: 325,
    description: "Connect with other parents to share experiences, advice, and support for raising healthy children.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Anxiety & Depression Support",
    members: 412,
    description: "A safe space to discuss mental health challenges and share coping strategies.",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=500&auto=format&fit=crop",
  },
];

const Community = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-health-50/50 to-background">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Connect & Support"
            title="Join Our Healthcare Community"
            description="Connect with like-minded individuals, participate in discussions, and find support groups tailored to your health journey."
          />
          
          <div className="flex justify-center mt-8">
            <Button size="lg" className="rounded-full px-6">
              Join the Community
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              { label: "Members", value: "5,400+", icon: Users },
              { label: "Discussions", value: "3,200+", icon: MessageSquare },
              { label: "Support Groups", value: "48", icon: Users },
              { label: "Events", value: "24 Monthly", icon: Calendar },
            ].map((stat, index) => (
              <div key={index} className="glass-panel p-4 text-center">
                <div className="bg-health-50 text-health-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={18} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="discussions" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="discussions">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="groups">
                <Users className="mr-2 h-4 w-4" />
                Support Groups
              </TabsTrigger>
            </TabsList>
            
            {/* Discussions Tab */}
            <TabsContent value="discussions" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Popular Discussions</h2>
                  <Button variant="outline">Start New Discussion</Button>
                </div>
                
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="glass-panel hover-scale">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                          <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-medium">{discussion.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              by {discussion.author.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.author.role}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {discussion.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{discussion.date}</span>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{discussion.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MessageSquare size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{discussion.likes} likes</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <div className="text-center mt-8">
                  <Button variant="outline">View All Discussions</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Upcoming Events</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="glass-panel overflow-hidden hover-scale">
                      <div className="aspect-video relative">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <Badge className="bg-health-500 hover:bg-health-600">
                            {event.date}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <Button className="w-full">Register</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button variant="outline">View All Events</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Support Groups Tab */}
            <TabsContent value="groups" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Support Groups</h2>
                  <Button variant="outline">Create New Group</Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {supportGroups.map((group) => (
                    <div key={group.id} className="glass-panel overflow-hidden hover-scale">
                      <div className="aspect-video relative">
                        <img 
                          src={group.image} 
                          alt={group.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-medium mb-2">{group.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <Users size={16} />
                          <span>{group.members} members</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {group.description}
                        </p>
                        <Button className="w-full">Join Group</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button variant="outline">View All Groups</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6">
          <div className="glass-panel p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stronger Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with people who share similar health experiences. Our community offers support, knowledge, and friendship on your healthcare journey.
            </p>
            <Button size="lg" className="rounded-full px-6">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Community;
