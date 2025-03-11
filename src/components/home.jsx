import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, CheckCircle, Users } from 'lucide-react';

// Define the Conference component
const Home: React.FC = () => {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Calculate days left until conference
  useEffect(() => {
    const conferenceDate = new Date('2025-03-27');
    const today = new Date();
    const diffTime = conferenceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays > 0 ? diffDays : 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative text-white">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-black z-0"
        style={{
          backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-11%20142248-SLmyUFatFjzYsoSxjvBTktPv35YYSJ.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            INTERNATIONAL CONFERENCE ON
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            "NEW-GEN TECHNOLOGIES FOR SUSTAINABLE DEVELOPMENT"
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            (ICNGTS - 2025) | March 27-29, 2025
          </p>
          
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg">
            REGISTER NOW
          </button>
          
          {daysLeft > 0 && (
            <p className="mt-4 text-lg">
              {daysLeft} days left until the conference
            </p>
          )}
        </div>
      </div>

      {/* Important dates section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-4 pb-8">
        <DateCard 
          number="24" 
          month="DEC" 
          day="24" 
          title="Last date for Abstract submission"
          icon={<FileText className="w-5 h-5" />}
        />
        <DateCard 
          number="31" 
          month="DEC" 
          day="24" 
          title="Intimation of Acceptance"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <DateCard 
          number="15" 
          month="JAN" 
          day="25" 
          title="Last date for submission of Full Length Paper"
          icon={<FileText className="w-5 h-5" />}
        />
        <DateCard 
          number="15" 
          month="JAN" 
          day="25" 
          title="Last date for Registration"
          icon={<Users className="w-5 h-5" />}
        />
      </div>
    </div>
  );
};

// Date card component
interface DateCardProps {
  number: string;
  month: string;
  day: string;
  title: string;
  icon: React.ReactNode;
}

const DateCard: React.FC<DateCardProps> = ({ number, month, day, title, icon }) => {
  return (
    <div className="flex">
      <div className="bg-purple-800 text-white p-4 flex flex-col items-center justify-center min-w-[80px]">
        <span className="text-2xl font-bold">{number}</span>
        <span className="text-sm">{month} {day}</span>
      </div>
      <div className="bg-white text-gray-800 p-4 flex-1 flex items-center">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;