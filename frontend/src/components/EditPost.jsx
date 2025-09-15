// import { useContext, useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { FaArrowLeft, FaTrash } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const EditPost = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { posts, updatePost,deletePostImage } = useContext(AppContext);
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [removeImage, setRemoveImage] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const post = posts.find(p => p._id === id);
//     if (post) {
//       setContent(post.content || '');
//       setImagePreview(post.imageUrl || null);
//       setLoading(false);
//     } else {
//       toast.error('Post not found');
//       navigate('/home');
//     }
//   }, [id, posts, navigate]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please select an image file (JPEG, PNG, etc.)');
//       return;
//     }
    
//     // Validate file size (5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Image size should be less than 5MB');
//       return;
//     }

//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//     setRemoveImage(false); // If adding new image, cancel removal
//   };

 
//   const handleRemoveImage = async () => {
//   try {
//     setIsSubmitting(true);
    
//     // Check if there's an existing image in the backend
//     const post = posts.find(p => p._id === id);
//     const hasBackendImage = post?.imageUrl;
    
//     // If there's a backend image, try to delete it
//     if (hasBackendImage) {
//       const success = await deletePostImage(id);
//       if (!success) return; // If deletion failed, don't proceed
//     }
    
//     // Clear the frontend image state regardless
//     setImage(null);
//     setImagePreview(null);
//     setRemoveImage(true);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
    
//     // If it was just a frontend image (not saved yet), no need for backend call
//     if (!hasBackendImage) {
//       toast.success("Image removed successfully");
//     }
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate at least one of content or image exists
//     if (!content.trim() && !image && !imagePreview && !removeImage) {
//       toast.error('Post must contain either content or an image');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       if (content.trim()) formData.append('content', content);
//       if (image) formData.append('image', image);
//       if (removeImage) formData.append('removeImage', 'true');

//       const success = await updatePost(id, formData);
//       if (success) {
//         navigate(-1); // Go back to previous page
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading post...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="px-4 py-4 flex items-center sticky top-0 bg-white z-10 border-b">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center justify-center bg-white text-gray-700 rounded-full p-3 w-12 h-12 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm border border-gray-200"
//           aria-label="Go back"
//         >
//           <FaArrowLeft className="text-xl" />
//         </button>
//         <h1 className="text-xl md:text-2xl font-bold ml-4">Edit Post</h1>
//       </div>

//       <div className="p-4">
//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Edit your post..."
//             className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="5"
//             maxLength={150}
//           />
          
//           {/* Image preview section */}
//         {imagePreview && (
//   <div className="mt-4 relative group">
//     <img 
//       src={imagePreview} 
//       alt="Preview" 
//       className="w-full max-h-96 rounded-lg object-contain border border-gray-200"
//     />
//     <div className="absolute top-3 right-3 flex space-x-2">
//       {posts.find(p => p._id === id)?.imageUrl && (
//         <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
//           Saved Image
//         </span>
//       )}
//       <button
//         type="button"
//         onClick={handleRemoveImage}
//         className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
//         aria-label="Remove image"
//       >
//         <FaTrash className="h-4 w-4" />
//       </button>
//     </div>
//   </div>
// )}
          
//           <div className="flex justify-between items-center mt-4">
//             <div className="flex items-center space-x-3">
//               <label className="inline-flex items-center space-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <span className="text-sm font-medium text-gray-700">
//                   {imagePreview ? 'Change Image' : 'Add Image'}
//                 </span>
//               </label>
              
//               <span className={`text-sm ${content.length === 500 ? 'text-red-500' : 'text-gray-500'}`}>
//                 {content.length}/150
//               </span>
//             </div>
            
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//               disabled={isSubmitting || (!content.trim() && !image && !imagePreview && !removeImage)}
//             >
//               {isSubmitting ? 'Updating...' : 'Update Post'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPost;


import { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaArrowLeft, FaTrash, FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost, deletePostFile } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [pdfFileName, setPdfFileName] = useState(''); // New state for file name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removeFile, setRemoveFile] = useState(false);
  const fileInputRef = useRef(null);

  const currentPost = posts.find(p => p._id === id);

  useEffect(() => {
    if (currentPost) {
      setContent(currentPost.content || '');
      setPdfPreview(currentPost.fileUrl || null);
      
      // Extract file name from URL if it exists
      if (currentPost.fileUrl) {
        const urlParts = currentPost.fileUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        // Clean up the filename (remove any query parameters)
        setPdfFileName(fileName.split('?')[0]);
      }
      
      setLoading(false);
    } else {
      toast.error('Post not found');
      navigate('/home');
    }
  }, [id, posts, navigate, currentPost]);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('PDF size should be less than 10MB');
      return;
    }

    setPdfFile(file);
    setPdfPreview(URL.createObjectURL(file));
    setPdfFileName(file.name); // Set the file name
    setRemoveFile(false); // If adding new PDF, cancel removal
  };

  const handleRemovePdf = () => {
    // Just set the state, don't call API here
    setPdfFile(null);
    setPdfPreview(null);
    setPdfFileName(''); // Clear the file name
    setRemoveFile(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("PDF will be removed when you save changes");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate at least one of content or PDF exists
    if (!content.trim() && !pdfFile && !pdfPreview && !removeFile) {
      toast.error('Post must contain either content or a PDF file');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (content.trim()) formData.append('content', content);
      if (pdfFile) formData.append('pdf', pdfFile);
      if (removeFile) formData.append('removeFile', 'true');

      const success = await updatePost(id, formData);
      if (success) {
        navigate(-1); // Go back to previous page
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading post...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="px-4 py-4 flex items-center sticky top-0 bg-white z-10 border-b">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center bg-white text-gray-700 rounded-full p-3 w-12 h-12 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm border border-gray-200"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold ml-4">Edit Post</h1>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit your post..."
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            maxLength={500}
          />
          
          {/* PDF preview section */}
          {pdfPreview && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaFilePdf className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="font-medium text-sm truncate max-w-xs">{currentPost.fileName}</p>
                    <p className="text-xs text-gray-500">
                      {currentPost?.fileUrl ? 'Saved PDF' : 'New PDF to upload'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemovePdf}
                  disabled={isSubmitting}
                  className="bg-red-100 text-red-600 rounded-full p-2 transition-all hover:bg-red-200 disabled:opacity-50"
                  aria-label="Remove PDF"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
              <a 
                href={pdfPreview} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline text-sm"
              >
                View PDF
              </a>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-3">
              <label className="inline-flex items-center space-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePdfChange}
                  accept=".pdf,application/pdf"
                  className="hidden"
                  disabled={isSubmitting}
                />
                <FaFilePdf className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-gray-700">
                  {pdfPreview ? 'Change PDF' : 'Add PDF'}
                </span>
              </label>
              
              <span className={`text-sm ${content.length === 500 ? 'text-red-500' : 'text-gray-500'}`}>
                {content.length}/500
              </span>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isSubmitting || (!content.trim() && !pdfFile && !pdfPreview && !removeFile)}
            >
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;