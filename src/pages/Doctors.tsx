
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionTitle } from '@/components/ui/section-title';
import { DoctorCard } from '@/components/ui/doctor-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, Filter, MapPin, Star, Clock, 
  HeartPulse, Brain, Stethoscope, Microscope 
} from 'lucide-react';

// Sample data for doctors
const doctorsData = [
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
  },
  {
    id: '4',
    name: 'David Wilson',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop',
    rating: 4.6,
    experience: 8
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    specialty: 'Psychiatrist',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=500&auto=format&fit=crop',
    rating: 4.9,
    experience: 11
  },
  {
    id: '6',
    name: 'James Thompson',
    specialty: 'Orthopedic Surgeon',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500&auto=format&fit=crop',
    rating: 4.8,
    experience: 14
  }
];

const specialties = [
  { name: 'Cardiology', icon: HeartPulse },
  { name: 'Neurology', icon: Brain },
  { name: 'General Medicine', icon: Stethoscope },
  { name: 'Pathology', icon: Microscope }
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter doctors based on search term
  const filteredDoctors = doctorsData.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-health-50/50 to-background">
        <div className="container px-4 md:px-6">
          <SectionTitle
            subtitle="Healthcare Experts"
            title="Find the Right Doctor For You"
            description="Connect with experienced healthcare professionals specializing in various medical fields."
          />
          
          {/* Search and Filter */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="glass-panel p-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by name or specialty..."
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
      
      {/* Specialties Section */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h3 className="text-xl font-medium mb-6">Popular Specialties</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty) => (
              <div 
                key={specialty.name}
                className="glass-panel p-4 flex items-center gap-3 hover-scale cursor-pointer"
              >
                <div className="bg-health-50 text-health-600 p-2 rounded-lg">
                  <specialty.icon size={20} />
                </div>
                <span className="font-medium">{specialty.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Doctors Grid */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">
              {searchTerm ? `Search Results (${filteredDoctors.length})` : 'All Doctors'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>New York, USA</span>
            </div>
          </div>
          
          {filteredDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <h4 className="text-lg font-medium mb-2">No doctors found</h4>
              <p className="text-muted-foreground">
                Please try a different search term or browse all doctors.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-health-50/50">
        <div className="container px-4 md:px-6">
          <div className="glass-panel p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Finding the Right Specialist?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our healthcare professionals are ready to assist you in finding the right doctor based on your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-6">
                Get Personalized Recommendation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Doctors;
