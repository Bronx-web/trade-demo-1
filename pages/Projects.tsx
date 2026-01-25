
import React from 'react';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const projects = [
    { title: 'Modern Gray Veneer', category: 'Residential', img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800' },
    { title: 'Heritage Restoration', category: 'Commercial', img: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=800' },
    { title: 'Outdoor Living Area', category: 'Landscape', img: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800' },
    { title: 'Precision Blockwork', category: 'Structural', img: 'https://images.unsplash.com/photo-1635311029107-df087d00f898?auto=format&fit=crop&q=80&w=800' },
    { title: 'Feature Brick Wall', category: 'Interior', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800' },
    { title: 'Retaining Solution', category: 'Infrastructure', img: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold oswald text-white mb-4">OUR WORK SPEAK FOR ITSELF</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Clean lines. Perfect joints. Zero shortcuts. From full-house brick veneer to statement outdoor fireplaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative bg-white overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-xs font-bold text-[#CB4154] uppercase tracking-widest mb-1">{project.category}</span>
                <h3 className="text-xl font-bold text-white oswald uppercase">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center bg-gray-50 py-16 rounded-3xl border-2 border-dashed border-gray-200">
          <h2 className="text-3xl font-bold oswald mb-4 text-gray-900">READY TO BUILD SOMETHING LEGENDARY?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Get an instant labor and material estimate for your project in seconds with our premium calculator.</p>
          <Link to="/booking" className="inline-block bg-[#CB4154] hover:bg-[#b03848] text-white px-10 py-4 rounded-sm font-bold oswald tracking-wider transition-all">
            GET A QUOTE NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
