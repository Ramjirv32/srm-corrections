import React, { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SubmitPaperFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitPaperForm: React.FC<SubmitPaperFormProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
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
    theme: "",
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
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
  // File name display state
  const [abstractFileName, setAbstractFileName] = useState("Click to browse files");
  const [photoFileName, setPhotoFileName] = useState("Click to browse files");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    console.log("Abstract file:", abstractFile);
    console.log("Photo file:", photoFile);
    
    // Show success message
    alert("Abstract submitted successfully!");
    
    // Navigate back to call for papers page
    navigate("/call-for-papers");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'abstract' | 'photo') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (fileType === 'abstract') {
        setAbstractFile(file);
        setAbstractFileName(file.name);
      } else {
        setPhotoFile(file);
        setPhotoFileName(file.name);
      }
    }
  };

  // Handle the back button
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // fallback to browser history
    }
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-gray-100 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto">
          <div className="bg-[#F5A051] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">Submit Abstract</h2>
            <button 
              onClick={handleBack}
              className="text-white hover:text-gray-200 transition-colors"
            >
{/*               <FaTimes size={24} /> */}
            </button>
          </div>
          
          <div className="p-6">
            <p className="mb-4 text-gray-600">Fields marked with an * are required</p>
            
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
              
              {/* Rest of the form fields remain the same */}
              {/* ... */}
              
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
              
              {/* File Upload - Photo with improved UI */}
              <div className="form-group">
                <label className="block mb-2 font-medium text-gray-700">
                  Upload your photo *
                  <span className="block text-sm font-normal text-gray-500">(Maximum Upload File Size 5MB & Please upload in (jpeg/png) format)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50">
                  <input
                    type="file"
                    id="photoFile"
                    accept=".jpeg,.jpg,.png"
                    required
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'photo')}
                  />
                  <label htmlFor="photoFile" className="cursor-pointer flex flex-col items-center">
                    <FaUpload className="text-[#F5A051] text-3xl mb-2" />
                    <span className="text-gray-500">{photoFileName}</span>
                  </label>
                </div>
              </div>
              
              {/* All the remaining form fields as before */}
              {/* ... */}
              
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
              
              {/* Promo Code */}
              <div className="form-group">
                <label htmlFor="promoCode" className="block mb-2 font-medium text-gray-700">
                  Abstract Promo Code
                </label>
                <input
                  type="text"
                  id="promoCode"
                  name="promoCode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051]"
                  value={formData.promoCode}
                  onChange={handleChange}
                />
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
                  className="w-full bg-[#F5A051] text-white py-3 px-4 rounded-md hover:bg-[#e08c3e] transition-colors duration-300 font-medium"
                >
                  Submit Abstract
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPaperForm;