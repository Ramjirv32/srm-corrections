import  { useState, useEffect } from "react";
import { FaTimes, FaUpload, FaLayerGroup, FaListUl } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add the categories data
const categories = [
  {
    name: "Engineering and Technology",
    topics: [
      "Aeronautical", "AI", "Architecture", "Artificial Intelligence", 
      "Aviation Technology", "Big Data", "Bioinformatics", "Biomedical Engineering", 
      "Bionuclear Engineering", "Biotechnology", "Civil Engineering", "Computer Science",
      "Computing", "Control Automation", "Cybersecurity", "Design", "Electrical", 
      "Electronics", "Energy", "Engineering", "Image Processing", "Industrial Engineering",
      "Information Technology", "IOT", "Manufacturing", "Marine Engineering", "Material Science"
    ]
  },
  {
    name: "Medical And Health Science",
    topics: ["Cardiology", "Dentistry", "Dermatology", "Healthcare", "Medicine", "Nursing", "Pharmacy"]
  },
  {
    name: "Business and Economics",
    topics: ["Accounting", "Banking", "Economics", "Finance", "Management", "Marketing"]
  },
  {
    name: "Education",
    topics: ["Curriculum", "E-Learning", "Educational Technology", "Pedagogy", "Teaching Methods"]
  },
  {
    name: "Social Sciences and Humanities",
    topics: ["Anthropology", "History", "Linguistics", "Philosophy", "Psychology", "Sociology"]
  },
  {
    name: "Sports Science",
    topics: ["Exercise Physiology", "Sports Medicine", "Sports Psychology", "Training"]
  },
  {
    name: "Physical and life sciences",
    topics: ["Biology", "Chemistry", "Physics", "Zoology"]
  },
  {
    name: "Agriculture",
    topics: ["Agricultural Engineering", "Agronomy", "Forestry", "Horticulture"]
  },
  {
    name: "Mathematics and statistics",
    topics: ["Algebra", "Calculus", "Data Analysis", "Probability", "Statistics"]
  },
  {
    name: "Law",
    topics: ["Constitutional Law", "Criminal Law", "International Law", "Legal Studies"]
  },
  {
    name: "Interdisciplinary",
    topics: ["Environmental Studies", "Gender Studies", "Sustainability"]
  }
];

interface SubmitPaperFormProps {
  isOpen: boolean;
  onClose: () => void;
  embedded: boolean;
  onSubmissionSuccess: () => void;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  paperDetails?: {
    title: string;
    category: string;
    status: string;
  };
}

const SubmitPaperForm: React.FC<SubmitPaperFormProps> = ({ isOpen, onClose, embedded = false, onSubmissionSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStandalone, setIsStandalone] = useState(false);
  // Add loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Determine if this is being used as a standalone page
  useEffect(() => {
    setIsStandalone(location.pathname === '/submit-paper');
  }, [location]);
  
  const [formData, setFormData] = useState({
    paperTitle: "",
    salutation: "",
    authorCategory: "",
    authorName: "",
    coauthors: "",
    university: "",
    country: "",
    email: "",
    confirmEmail: "",
    phone: "",
    category: "", // Changed from theme to category
    topic: "", // Added topic field
    participationType: "",
    presentationType: "",
    publishPaper: "",
    publishAvenue: "",
    collaborativeResearch: "",
    communicationMode: "",
    promoCode: "",
    referralSource: ""
  });
  
  // File state handlers
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  
  // File name display state
  const [abstractFileName, setAbstractFileName] = useState("Click to browse files");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate emails match
    if (formData.email !== formData.confirmEmail) {
      toast.error("Email addresses do not match!");
      return;
    }
  
    // Set loading state to true when submission starts
    setIsSubmitting(true);
    
    // Create FormData object for file upload
    const submissionFormData = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (key !== 'confirmEmail') { // Don't send confirmEmail to server
        submissionFormData.append(key, formData[key as keyof typeof formData]);
      }
    });
  
    // Append abstract file if exists
    if (abstractFile) {
      submissionFormData.append('abstract', abstractFile);
    }
  
    try {
      const response = await axios.post<SubmissionResponse>(
        'https://final-srm-back.vercel.app/submit-paper',
        submissionFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Store submission ID in localStorage for future reference
        if (response.data.submissionId) {
          localStorage.setItem('lastSubmissionId', response.data.submissionId);
        }
  
        // Call success callback or navigate
        if (onSubmissionSuccess) {
          onSubmissionSuccess();
        } else {
          navigate('/submission-success', { 
            state: { 
              submissionId: response.data.submissionId,
              paperDetails: response.data.paperDetails
            }
          });
        }
      } else {
        toast.error(response.data.message || "Submission failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error submitting paper";
        toast.error(errorMessage);
        console.error('Submission error:', error.response?.data);
      } else {
        toast.error("An unexpected error occurred");
        console.error('Submission error:', error);
      }
    } finally {
      // Set loading state to false when submission completes (success or error)
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset topic if category changes
    if (name === "category") {
      setFormData(prev => ({ ...prev, topic: "" }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'abstract' | 'photo') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file size
      if (file.size > 3 * 1024 * 1024) {
        toast.error('File size must be less than 3MB');
        return;
      }
  
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
  
      if (fileType === 'abstract') {
        setAbstractFile(file);
        setAbstractFileName(file.name);
      }
    }
  };

  // Handle the back button
  const handleBack = () => {
    if (isStandalone) {
      navigate('/call-for-papers');
    } else if (onClose) {
      onClose();
    } else {
      navigate(-1); // fallback to browser history
    }
  };

  // Get topics based on selected category
  const topics = categories.find(cat => cat.name === formData.category)?.topics || [];

  // Don't render if not open and not standalone and not embedded
  if (!isOpen && !isStandalone && !embedded) return null;

  // Category Selector Component - Integrated into the form
  const CategorySelectorSection = () => {
    return (
      <div className="form-group space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-lg text-gray-800">Research Classification</h3>
        
        <div className="space-y-2">
          <div>
            <label htmlFor="category" className="block mb-2 font-medium text-gray-700">
              Research Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLayerGroup className="text-gray-400" />
              </div>
              <select
                id="category"
                name="category"
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {formData.category && (
            <div className="mt-4">
              <label htmlFor="topic" className="block mb-2 font-medium text-gray-700">
                Research Topic <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaListUl className="text-gray-400" />
                </div>
                <select
                  id="topic"
                  name="topic"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  <option value="">Select a Topic</option>
                  {topics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Preview selected values */}
        {formData.category && formData.topic && (
          <div className="mt-4 bg-white p-3 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-800">Selected Classification:</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <span className="text-sm font-medium text-gray-600">Category:</span>
                <p className="text-[#F5A051]">{formData.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Topic:</span>
                <p className="text-[#F5A051]">{formData.topic}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // If embedded mode, just render the form content without modal/container
  if (embedded) {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="mb-4 text-gray-600">Fields marked with an * are required</p>
          
          {/* Paper Title */}
          <div className="form-group">
            <label htmlFor="paperTitle" className="block mb-2 font-medium text-gray-700">
              Title of the Paper / Abstract *
            </label>
            <input
              type="text"
              id="paperTitle"
              name="paperTitle"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.paperTitle}
              onChange={handleChange}
            />
          </div>
          
          {/* Salutation */}
          <div className="form-group">
            <label htmlFor="salutation" className="block mb-2 font-medium text-gray-700">
              Salutation of Presenting author
            </label>
            <select
              id="salutation"
              name="salutation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.salutation}
              onChange={handleChange}
            >
              <option value="">- Select Salutation -</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Assist. Prof.">Assist. Prof.</option>
              <option value="Prof.">Prof.</option>
              <option value="Rev.">Rev.</option>
            </select>
          </div>
          
          {/* Author Category */}
          <div className="form-group">
            <label htmlFor="authorCategory" className="block mb-2 font-medium text-gray-700">
              Please select the category that best describes your current status *
            </label>
            <select
              id="authorCategory"
              name="authorCategory"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.authorCategory}
              onChange={handleChange}
            >
              <option value="">- Select Author Category -</option>
              <option value="Vice Chancellor">Vice Chancellor</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Researcher">Researcher</option>
              <option value="Student">Student</option>
              <option value="Industry Professional">Industry Professional</option>
            </select>
          </div>
          
          {/* Author Name */}
          <div className="form-group">
            <label htmlFor="authorName" className="block mb-2 font-medium text-gray-700">
              Author Name (Presenting Author) *
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.authorName}
              onChange={handleChange}
            />
          </div>
          
          {/* Co-authors */}
          <div className="form-group">
            <label htmlFor="coauthors" className="block mb-2 font-medium text-gray-700">
              Names of Co-Author(s) if any (separate by comma)
            </label>
            <input
              type="text"
              id="coauthors"
              name="coauthors"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.coauthors}
              onChange={handleChange}
            />
          </div>
          
          {/* University/Organization */}
          <div className="form-group">
            <label htmlFor="university" className="block mb-2 font-medium text-gray-700">
              University / Organization *
            </label>
            <input
              type="text"
              id="university"
              name="university"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.university}
              onChange={handleChange}
            />
          </div>
          
          {/* Country */}
          <div className="form-group">
            <label htmlFor="country" className="block mb-2 font-medium text-gray-700">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          {/* Confirm Email */}
          <div className="form-group">
            <label htmlFor="confirmEmail" className="block mb-2 font-medium text-gray-700">
              Confirm Email *
            </label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.confirmEmail}
              onChange={handleChange}
            />
          </div>
          
          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
              Phone (include country code) *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9012345678"
            />
          </div>
          
          {/* ENHANCED CATEGORY SELECTOR - Replace existing implementation */}
          <CategorySelectorSection />
          
          {/* Participation Type */}
          <div className="form-group">
            <label htmlFor="participationType" className="block mb-2 font-medium text-gray-700">
              Type of Participation *
            </label>
            <select
              id="participationType"
              name="participationType"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.participationType}
              onChange={handleChange}
            >
              <option value="">- Select Participation Type -</option>
              <option value="Presenter">Presenter</option>
              <option value="Attendee">Attendee</option>
              <option value="Virtual Presenter">Virtual Presenter</option>
            </select>
          </div>
          
          {/* Presentation Type */}
          <div className="form-group">
            <label htmlFor="presentationType" className="block mb-2 font-medium text-gray-700">
              Type of Presentation *
            </label>
            <select
              id="presentationType"
              name="presentationType"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.presentationType}
              onChange={handleChange}
            >
              <option value="">- Select Presentation Type -</option>
              <option value="Oral Presentation">Oral Presentation</option>
              <option value="Poster Presentation">Poster Presentation</option>
              <option value="Video Presentation">Video Presentation</option>
              <option value="Virtual Presentation">Virtual Presentation</option>
            </select>
          </div>
          
          {/* Publish Paper */}
          <div className="form-group">
            <label htmlFor="publishPaper" className="block mb-2 font-medium text-gray-700">
              Do you want to publish your paper? *
            </label>
            <select
              id="publishPaper"
              name="publishPaper"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.publishPaper}
              onChange={handleChange}
            >
              <option value="">- Select Option -</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Decided">Not Decided</option>
            </select>
          </div>
          
          {/* Publish Avenue */}
          <div className="form-group">
            <label htmlFor="publishAvenue" className="block mb-2 font-medium text-gray-700">
              Publication Avenue
            </label>
            <select
              id="publishAvenue"
              name="publishAvenue"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.publishAvenue}
              onChange={handleChange}
            >
              <option value="">- Select Publication Avenue -</option>
              <option value="Scopus Indexed Journal">Scopus Indexed Journal</option>
              <option value="Web of Science Journal">Web of Science Journal</option>
              <option value="UGC Care Listed Journal">UGC Care Listed Journal</option>
              <option value="Conference Proceedings">Conference Proceedings</option>
              <option value="Not Decided">Not Decided</option>
            </select>
          </div>
          
          {/* Collaborative Research */}
          <div className="form-group">
            <label htmlFor="collaborativeResearch" className="block mb-2 font-medium text-gray-700">
              Would you like to be contacted for collaborative research opportunities?
            </label>
            <select
              id="collaborativeResearch"
              name="collaborativeResearch"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.collaborativeResearch}
              onChange={handleChange}
            >
              <option value="">- Select Option -</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          {/* File Upload - Abstract with improved UI */}
          <div className="form-group">
            <label className="block mb-2 font-medium text-gray-700">
              Attach the MS Word file of your abstract according to the abstract template of ICMBNT 2025 *
              <span className="block text-sm font-normal text-gray-500">(Maximum Upload File Size 3MB & Please upload in (docx, doc, pdf) format)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50">
              <input
                type="file"
                id="abstractFile"
                accept=".doc,.docx,.pdf"
                required
                className="hidden"
                onChange={(e) => handleFileChange(e, 'abstract')}
              />
              <label htmlFor="abstractFile" className="cursor-pointer flex flex-col items-center">
                <FaUpload className="text-[#F5A051] text-3xl mb-2" />
                <span className="text-gray-500">{abstractFileName}</span>
              </label>
            </div>
          </div>
         
          
          {/* Communication Mode */}
          <div className="form-group">
            <label htmlFor="communicationMode" className="block mb-2 font-medium text-gray-700">
              What is your preferred communication mode
            </label>
            <select
              id="communicationMode"
              name="communicationMode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.communicationMode}
              onChange={handleChange}
            >
              <option value="">- Select Communication Mode -</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Social Media">Social Media</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
        
          
          {/* Referral Source */}
          <div className="form-group">
            <label htmlFor="referralSource" className="block mb-2 font-medium text-gray-700">
              How did you get to know about the conference? *
            </label>
            <select
              id="referralSource"
              name="referralSource"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
              value={formData.referralSource}
              onChange={handleChange}
            >
              <option value="">- Select Source -</option>
              <option value="Conference Alert">Conference Alert</option>
              <option value="Email">Email</option>
              <option value="Google search">Google search</option>
              <option value="Google Advertisement">Google Advertisement</option>
              <option value="Social media">Social media</option>
              <option value="Through the University/ Institute or College">Through the University/ Institute or College</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#F5A051] text-white py-3 px-4 rounded-md hover:bg-[#e08c3e] transition-colors duration-300 font-medium ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Abstract"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Standard modal/standalone render
  return (
    <div className={`${isStandalone ? 'min-h-screen bg-gray-100 pt-8 pb-16' : 'fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto'}`}>
      <div className={`container mx-auto px-4 ${!isStandalone && 'py-8'}`}>
        <div className={`bg-white rounded-lg shadow-xl ${isStandalone ? 'max-w-3xl w-full mx-auto' : 'max-w-3xl w-full mx-auto max-h-[90vh] overflow-y-auto'}`}>
          <div className="bg-[#F5A051] text-white p-4 rounded-t-lg flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-xl font-bold">Submit Abstract</h2>
            <button 
              onClick={handleBack}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <p className="mb-4 text-gray-600">Fields marked with an * are required</p>
            
            {/* Form content - Using the same form elements as in embedded mode */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Paper Title */}
              <div className="form-group">
                <label htmlFor="paperTitle" className="block mb-2 font-medium text-gray-700">
                  Title of the Paper / Abstract *
                </label>
                <input
                  type="text"
                  id="paperTitle"
                  name="paperTitle"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
                  value={formData.paperTitle}
                  onChange={handleChange}
                />
              </div>
              
              {/* Add other fields here as needed */}
              {/* ... */}
              
              {/* ENHANCED CATEGORY SELECTOR in modal/standalone version */}
              <CategorySelectorSection />
              
              {/* Add other fields here as needed */}
              {/* ... */}
              
              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#F5A051] text-white py-3 px-4 rounded-md hover:bg-[#e08c3e] transition-colors duration-300 font-medium ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Abstract"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SubmitPaperForm;