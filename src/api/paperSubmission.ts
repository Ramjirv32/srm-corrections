export const submitPaper = async (formData: FormData) => {
  try {
    const response = await fetch('https://final-srm-back.vercel.app/submit-paper', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit paper');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting paper:', error);
    throw error;
  }
};