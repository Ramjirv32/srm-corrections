import { useState, useEffect, ReactElement } from 'react';
import { Calendar, Clock, AlertCircle, Check, FileText, Calendar as CalendarIcon } from 'lucide-react';

interface Deadline {
  name: string;
  date: Date;
  icon: ReactElement;
  description: string;
  status: 'upcoming' | 'active' | 'passed';
}

const RegistrationCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentDeadline, setCurrentDeadline] = useState<Deadline | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'open' | 'verifying' | 'closed'>('open');
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    // Define important dates
    const initialDeadlines: Deadline[] = [
      {
        name: 'Paper Submission Deadline',
        date: new Date('2025-04-12T23:59:59'),
        icon: <FileText className="text-blue-600" />,
        description: 'Last date for submitting your research papers',
        status: 'upcoming'
      },
      {
        name: 'Early Bird Registration',
        date: new Date('2025-03-15T23:59:59'),
        icon: <CalendarIcon className="text-green-600" />,
        description: 'Register early for special rates',
        status: 'upcoming'
      },
      {
        name: 'Standard Registration',
        date: new Date('2025-04-05T23:59:59'),
        icon: <CalendarIcon className="text-yellow-600" />,
        description: 'Regular registration period',
        status: 'upcoming'
      },
      {
        name: 'Conference Date',
        date: new Date('2025-04-26T09:00:00'),
        icon: <Calendar className="text-red-600" />,
        description: 'ICMBNT-2025 Conference begins',
        status: 'upcoming'
      }
    ];

    // Update status based on current date
    const now = new Date();
    const updatedDeadlines = initialDeadlines.map(deadline => {
      if (now > deadline.date) {
        return { ...deadline, status: 'passed' as const };
      } else if (
        now > new Date(deadline.date.getTime() - 7 * 24 * 60 * 60 * 1000) && 
        now <= deadline.date
      ) {
        return { ...deadline, status: 'active' as const };
      }
      return deadline;
    });

    setDeadlines(updatedDeadlines);

    // Find the next upcoming deadline
    const upcomingDeadlines = updatedDeadlines
      .filter(d => d.status !== 'passed')
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    if (upcomingDeadlines.length > 0) {
      setCurrentDeadline(upcomingDeadlines[0]);
    }

    // You can set registration status based on your business logic
    // This is just a placeholder, replace with real logic
    const paperDeadline = initialDeadlines[0].date;
    if (now > paperDeadline) {
      setRegistrationStatus('closed');
    } else if (Math.random() > 0.7) { // Just for demonstration
      setRegistrationStatus('verifying');
    } else {
      setRegistrationStatus('open');
    }
  }, []);

  useEffect(() => {
    if (!currentDeadline) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = currentDeadline.date.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
        // Recalculate deadlines
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDeadline]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-gray-100 p-3 rounded-lg w-20 sm:w-24 mx-1 sm:mx-2">
      <div className="text-2xl sm:text-3xl font-bold text-blue-800 font-mono">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-gray-600 text-xs sm:text-sm mt-1">{label}</div>
    </div>
  );

  const getStatusMessage = () => {
    switch (registrationStatus) {
      case 'pending':
        return {
          title: 'Registration Opening Soon',
          message: 'Registration for ICMBNT-2025 will open shortly. Please check back later.',
          icon: <Clock className="text-yellow-500" size={24} />,
          color: 'bg-yellow-50 border-yellow-200'
        };
      case 'verifying':
        return {
          title: 'Registration Under Verification',
          message: 'Your submission is currently being verified. We will notify you once the process is complete.',
          icon: <AlertCircle className="text-blue-500" size={24} />,
          color: 'bg-blue-50 border-blue-200'
        };
      case 'open':
        return {
          title: 'Registration Open',
          message: 'Registration for ICMBNT-2025 is now open. Please submit your details to register.',
          icon: <Check className="text-green-500" size={24} />,
          color: 'bg-green-50 border-green-200'
        };
      case 'closed':
        return {
          title: 'Registration Closed',
          message: 'The registration period for ICMBNT-2025 has ended. Thank you for your interest.',
          icon: <AlertCircle className="text-red-500" size={24} />,
          color: 'bg-red-50 border-red-200'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Registration Status Banner */}
      <div className={`p-4 ${statusInfo.color} border-l-4 border-l-${statusInfo.color.split('-')[1]}-400`}>
        <div className="flex items-center">
          {statusInfo.icon}
          <div className="ml-3">
            <h3 className="text-lg font-semibold">{statusInfo.title}</h3>
            <p className="text-sm text-gray-600">{statusInfo.message}</p>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      {currentDeadline && (
        <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">
                {currentDeadline.name}
              </h2>
              <p className="text-white/80 text-sm">
                {currentDeadline.description}
              </p>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full text-sm mt-2 sm:mt-0">
              {currentDeadline.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex flex-wrap justify-center gap-2">
              <TimeBlock value={timeLeft.days} label="DAYS" />
              <TimeBlock value={timeLeft.hours} label="HOURS" />
              <TimeBlock value={timeLeft.minutes} label="MINS" />
              <TimeBlock value={timeLeft.seconds} label="SECS" />
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Deadlines</h3>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-6 w-0.5 bg-gray-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            {deadlines.map((deadline, index) => (
              <div key={index} className="flex items-start relative">
                <div className={`z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full 
                  ${deadline.status === 'passed' ? 'bg-gray-300' : 
                    deadline.status === 'active' ? 'bg-blue-100 ring-4 ring-blue-50' : 'bg-white border-2 border-gray-200'}`}>
                  {deadline.icon}
                </div>
                
                <div className="ml-4 sm:ml-6">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h4 className={`font-medium ${
                      deadline.status === 'passed' ? 'text-gray-500' : 
                      deadline.status === 'active' ? 'text-blue-800' : 'text-gray-800'
                    }`}>
                      {deadline.name}
                    </h4>
                    <div className={`sm:ml-3 text-sm ${
                      deadline.status === 'passed' ? 'text-gray-400' : 
                      deadline.status === 'active' ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {deadline.date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {deadline.description}
                  </p>
                  
                  <div className="mt-2">
                    {deadline.status === 'passed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Passed
                      </span>
                    )}
                    {deadline.status === 'active' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Active Now
                      </span>
                    )}
                    {deadline.status === 'upcoming' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCountdown;