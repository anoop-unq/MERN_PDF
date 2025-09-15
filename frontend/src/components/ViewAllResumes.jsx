

// import React, { useContext, useState, useRef, useEffect } from 'react';
// import { AppContext } from '../context/AppContext';
// import { FiDownload, FiExternalLink, FiZoomIn, FiZoomOut, FiFile, FiMinimize, FiMaximize, FiHome } from 'react-icons/fi';
// import { FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { motion } from "framer-motion";

// export const ViewAllResumes = () => {
//   const { posts } = useContext(AppContext);
//   const navigate = useNavigate();
  
//   // Filter only PDF posts
//   const pdfPosts = posts.filter(post => post.fileType === 'pdf');
//     const [isDownloading, setIsDownloading] = useState(false);
//   const [downloadComplete, setDownloadComplete] = useState(false);

//   // State for each PDF viewer
//   const [zoomLevels, setZoomLevels] = useState({});
//   const [fullScreenMode, setFullScreenMode] = useState(null);
//   const iframeRefs = useRef({});

//   // Set default zoom levels for each PDF
//   useEffect(() => {
//     const defaultZoomLevels = {};
//     pdfPosts.forEach(post => {
//       defaultZoomLevels[post.id] = 1.0;
//     });
//     setZoomLevels(defaultZoomLevels);
//   }, []);

//   const handleBackClick = () => {
//     navigate('/');
//   };

//   const zoomIn = (postId) => {
//     setZoomLevels(prev => ({ 
//       ...prev, 
//       [postId]: Math.min(2.5, (prev[postId] || 1.0) + 0.25) 
//     }));
//   };

//   const zoomOut = (postId) => {
//     setZoomLevels(prev => ({ 
//       ...prev, 
//       [postId]: Math.max(0.5, (prev[postId] || 1.0) - 0.25) 
//     }));
//   };

//   const resetZoom = (postId) => {
//     setZoomLevels(prev => ({ 
//       ...prev, 
//       [postId]: 1.0 
//     }));
//   };

//   const toggleFullScreen = (postId) => {
//     if (fullScreenMode === postId) {
//       setFullScreenMode(null);
//     } else {
//       setFullScreenMode(postId);
//     }
//   };

 
//   const handleDownload = async (post) => {
//     if (isDownloading) return;
    
//     setIsDownloading(true);
    
//     try {
//       // Fetch the PDF file
//       const response = await fetch(post.fileUrl);
//       const blob = await response.blob();
      
//       // Create a blob URL
//       const blobUrl = window.URL.createObjectURL(blob);
      
//       // Create a temporary anchor element to trigger download
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = `document-${post._id}.pdf`;
//       document.body.appendChild(link);
//       link.click();
      
//       // Clean up
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
      
//       // Show success state
//       setDownloadComplete(true);
//       setTimeout(() => setDownloadComplete(false), 3000);
//     } catch (error) {
//       console.error('Download failed:', error);
//       alert('Download failed. Please try again.');
//     } finally {
//       setIsDownloading(false);
//     }
//   }
//   // Close fullscreen when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (fullScreenMode && !event.target.closest('.pdf-viewer-container')) {
//         setFullScreenMode(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [fullScreenMode]);

//   if (pdfPosts.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
//           <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
//             <FiFile className="text-3xl text-gray-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">No Resumes Available</h2>
//           <p className="text-gray-600">There are no PDF resumes to display at the moment.</p>
//           <button
//             onClick={handleBackClick}
//             className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             <FiHome className="text-sm" />
//             Return Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 px-4">
//       {/* Sticky Back Button */}
//       <div className="sticky top-4 z-40 mb-8 max-w-6xl mx-auto">
//         <button
//           onClick={handleBackClick}
//           className="flex items-center gap-2 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-700 py-3 px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 backdrop-blur-sm"
//         >
//           <FaArrowLeft className="text-blue-600" />
//           <span className="font-medium">Back to Home</span>
//         </button>
//       </div>

//       {/* Fullscreen overlay */}
//       {fullScreenMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
//           <div className="pdf-viewer-container bg-white rounded-lg shadow-xl w-full h-full max-w-6xl max-h-screen overflow-hidden flex flex-col">
//             <div className="flex justify-between items-center p-4 border-b bg-gray-800 text-white">
//               <h3 className="font-semibold truncate">
//                 {pdfPosts.find(p => p.id === fullScreenMode)?.fileName || 'Resume'}
//               </h3>
//               <button 
//                 onClick={() => setFullScreenMode(null)}
//                 className="p-2 rounded-full hover:bg-gray-700 transition-colors"
//                 aria-label="Close fullscreen"
//               >
//                 <FiMinimize className="text-xl" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-auto p-4 bg-gray-100 flex justify-center">
//               <iframe
//                 src={pdfPosts.find(p => p.id === fullScreenMode)?.fileUrl}
//                 className="w-full h-full border-none bg-white shadow-md"
//                 title="PDF document"
//               />
//             </div>
//             <div className="p-4 border-t bg-gray-100 flex justify-between items-center">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => zoomOut(fullScreenMode)}
//                   className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
//                   title="Zoom Out"
//                 >
//                   <FiZoomOut />
//                 </button>
//                 <button
//                   onClick={() => resetZoom(fullScreenMode)}
//                   className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-sm font-medium"
//                 >
//                   {Math.round(zoomLevels[fullScreenMode] * 100)}%
//                 </button>
//                 <button
//                   onClick={() => zoomIn(fullScreenMode)}
//                   className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
//                   title="Zoom In"
//                 >
//                   <FiZoomIn />
//                 </button>
//               </div>
//               <button
//                 onClick={() => downloadResume(
//                   pdfPosts.find(p => p.id === fullScreenMode)?.fileUrl,
//                   pdfPosts.find(p => p.id === fullScreenMode)?.fileName
//                 )}
//                 className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//               >
//                 <FiDownload className="text-sm" />
//                 Download
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">All Resumes</h1>
//           <p className="text-gray-600">Browse through all shared resumes</p>
//           <div className="mt-4 bg-white inline-flex px-4 py-2 rounded-full shadow-sm">
//             <span className="text-sm font-medium text-gray-700">
//               {pdfPosts.length} {pdfPosts.length === 1 ? 'Resume' : 'Resumes'} Found
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pdfPosts.map((post) => (
//             <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg pdf-viewer-container">
//               <div className="p-4 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-gray-800 truncate">
//                     {post.fileName || 'Resume'}
//                   </h3>
//                   <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
//                     PDF
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   By: {post.author?.name || 'Unknown'}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               <div className="p-4 bg-gray-50 h-64 overflow-hidden flex flex-col">
//                 <div className="flex-1 overflow-auto relative">
//                   <div 
//                     className="bg-white shadow-inner h-full w-full flex items-center justify-center"
//                     style={{ 
//                       transform: `scale(${zoomLevels[post.id] || 1})`,
//                       transformOrigin: 'center'
//                     }}
//                   >
//                     <iframe
//                       src={post.fileUrl}
//                       className="w-full h-full border-none"
//                       title={`PDF document - ${post.fileName}`}
//                       loading="lazy"
//                     />
//                   </div>
                  
//                   {/* Overlay for mobile interaction */}
//                   <div 
//                     className="absolute inset-0 pointer-events-none md:pointer-events-auto"
//                     onClick={() => toggleFullScreen(post.id)}
//                   />
//                 </div>
                
//                 <div className="mt-3 flex justify-between items-center">
//                   <div className="text-xs text-gray-500">
//                     Zoom: {Math.round((zoomLevels[post.id] || 1.0) * 100)}%
//                   </div>
//                   <button
//                     onClick={() => toggleFullScreen(post.id)}
//                     className="text-blue-500 text-sm hover:underline flex items-center gap-1"
//                   >
//                     <FiMaximize className="text-xs" />
//                     <span className="hidden sm:inline">Fullscreen</span>
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 bg-gray-50 border-t border-gray-100">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => zoomOut(post.id)}
//                       disabled={(zoomLevels[post.id] || 1.0) <= 0.5}
//                       className="p-1 rounded-md bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                       title="Zoom Out"
//                     >
//                       <FiZoomOut className="text-gray-600" />
//                     </button>
//                     <button
//                       onClick={() => resetZoom(post.id)}
//                       className="p-1 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-xs font-medium px-2"
//                     >
//                       Reset
//                     </button>
//                     <button
//                       onClick={() => zoomIn(post.id)}
//                       disabled={(zoomLevels[post.id] || 1.0) >= 2.5}
//                       className="p-1 rounded-md bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                       title="Zoom In"
//                     >
//                       <FiZoomIn className="text-gray-600" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex space-x-2">
//                   <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={()=>handleDownload(post)}
//             disabled={isDownloading}
//             className={`flex items-center space-x-1 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
//               isDownloading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : downloadComplete 
//                   ? 'bg-green-600' 
//                   : 'bg-green-500 hover:bg-green-600'
//             }`}
//             title={downloadComplete ? "Download Complete" : "Download PDF"}
//           >
//             {isDownloading ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Downloading...</span>
//               </>
//             ) : downloadComplete ? (
//               <>
//                 <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span>Downloaded!</span>
//               </>
//             ) : (
//               <>
//                 <FiDownload className="text-sm" />
//                 <span>Download</span>
//               </>
//             )}
//           </motion.button>
//                   <button
//                     onClick={() => window.open(post.fileUrl, '_blank')}
//                     className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors"
//                     title="Open in new tab"
//                   >
//                     <FiExternalLink className="text-sm" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 768px) {
//           .pdf-viewer-container iframe {
//             min-height: 300px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };


import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FiDownload, FiExternalLink, FiZoomIn, FiZoomOut, FiFile, FiMinimize, FiMaximize } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

export const ViewAllResumes = () => {
  const { posts } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Filter only PDF posts
  const pdfPosts = posts.filter(post => post.fileType === 'pdf');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  // State for each PDF viewer
  const [zoomLevels, setZoomLevels] = useState({});
  const [fullScreenMode, setFullScreenMode] = useState(null);
  const iframeRefs = useRef({});

  // Set default zoom levels for each PDF
  useEffect(() => {
    const defaultZoomLevels = {};
    pdfPosts.forEach(post => {
      defaultZoomLevels[post.id] = 1.0;
    });
    setZoomLevels(defaultZoomLevels);
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const zoomIn = (postId) => {
    setZoomLevels(prev => ({ 
      ...prev, 
      [postId]: Math.min(2.5, (prev[postId] || 1.0) + 0.25) 
    }));
  };

  const zoomOut = (postId) => {
    setZoomLevels(prev => ({ 
      ...prev, 
      [postId]: Math.max(0.5, (prev[postId] || 1.0) - 0.25) 
    }));
  };

  const resetZoom = (postId) => {
    setZoomLevels(prev => ({ 
      ...prev, 
      [postId]: 1.0 
    }));
  };

  const toggleFullScreen = (postId) => {
    if (fullScreenMode === postId) {
      setFullScreenMode(null);
    } else {
      setFullScreenMode(postId);
    }
  };

  const handleDownload = async (post) => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Fetch the PDF file
      const response = await fetch(post.fileUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `document-${post._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      // Show success state
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }

  // Close fullscreen when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fullScreenMode && !event.target.closest('.pdf-viewer-container')) {
        setFullScreenMode(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fullScreenMode]);

  if (pdfPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
          <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
            <FiFile className="text-3xl text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Resumes Available</h2>
          <p className="text-gray-600">There are no PDF resumes to display at the moment.</p>
          <button
            onClick={handleBackClick}
            className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaArrowLeft className="text-sm" />
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 mt-20">
      {/* Header with Gradient Background */}
      <div className="fixed top-0 left-0  w-full z-50 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm  ">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-5 ">
          <div className="flex items-center">
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center bg-white text-gray-700 rounded-full p-3 w-12 h-12 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm border border-gray-200 "
              aria-label="Go back"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h1 className="text-xl font-bold ml-4 text-gray-800 sm:text-2xl">All Resumes</h1>
          </div>
          
          <div className="bg-white inline-flex px-2 py-2 rounded-full shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              {pdfPosts.length} {pdfPosts.length === 1 ? 'Resume' : 'Resumes'} Found
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {fullScreenMode && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 ">
          <div className="pdf-viewer-container bg-white rounded-lg shadow-xl w-full h-full max-w-6xl max-h-screen overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b bg-gray-800 text-white">
              <h3 className="font-semibold truncate">
                {pdfPosts.find(p => p.id === fullScreenMode)?.fileName || 'Resume'}
              </h3>
              <button 
                onClick={() => setFullScreenMode(null)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Close fullscreen"
              >
                <FiMinimize className="text-xl" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100 flex justify-center">
              <iframe
                src={pdfPosts.find(p => p.id === fullScreenMode)?.fileUrl}
                className="w-full h-full border-none bg-white shadow-md"
                title="PDF document"
              />
            </div>
            <div className="p-4 border-t bg-gray-100 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => zoomOut(fullScreenMode)}
                  className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
                  title="Zoom Out"
                >
                  <FiZoomOut />
                </button>
                <button
                  onClick={() => resetZoom(fullScreenMode)}
                  className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-sm font-medium"
                >
                  {Math.round(zoomLevels[fullScreenMode] * 100)}%
                </button>
                <button
                  onClick={() => zoomIn(fullScreenMode)}
                  className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
                  title="Zoom In"
                >
                  <FiZoomIn />
                </button>
              </div>
              <button
                onClick={() => handleDownload(pdfPosts.find(p => p.id === fullScreenMode))}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                <FiDownload className="text-sm" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg pdf-viewer-container">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {post.fileName || 'Resume'}
                  </h3>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    PDF
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  By: {post.author?.name || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="p-4 bg-gray-50 h-64 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto relative">
                  <div 
                    className="bg-white shadow-inner h-full w-full flex items-center justify-center"
                    style={{ 
                      transform: `scale(${zoomLevels[post.id] || 1})`,
                      transformOrigin: 'center'
                    }}
                  >
                    <iframe
                      src={post.fileUrl}
                      className="w-full h-full border-none"
                      title={`PDF document - ${post.fileName}`}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay for mobile interaction */}
                  <div 
                    className="absolute inset-0 pointer-events-none md:pointer-events-auto"
                    onClick={() => toggleFullScreen(post.id)}
                  />
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Zoom: {Math.round((zoomLevels[post.id] || 1.0) * 100)}%
                  </div>
                  <button
                    onClick={() => toggleFullScreen(post.id)}
                    className="text-blue-500 text-sm hover:underline flex items-center gap-1"
                  >
                    <FiMaximize className="text-xs" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => zoomOut(post.id)}
                      disabled={(zoomLevels[post.id] || 1.0) <= 0.5}
                      className="p-1 rounded-md bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      title="Zoom Out"
                    >
                      <FiZoomOut className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => resetZoom(post.id)}
                      className="p-1 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-xs font-medium px-2"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => zoomIn(post.id)}
                      disabled={(zoomLevels[post.id] || 1.0) >= 2.5}
                      className="p-1 rounded-md bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      title="Zoom In"
                    >
                      <FiZoomIn className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(post)}
                    disabled={isDownloading}
                    className={`flex items-center space-x-1 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isDownloading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : downloadComplete 
                          ? 'bg-green-600' 
                          : 'bg-green-500 hover:bg-green-600'
                    }`}
                    title={downloadComplete ? "Download Complete" : "Download PDF"}
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Downloading...</span>
                      </>
                    ) : downloadComplete ? (
                      <>
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <FiDownload className="text-sm" />
                        <span>Download</span>
                      </>
                    )}
                  </motion.button>
                  <button
                    onClick={() => window.open(post.fileUrl, '_blank')}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    title="Open in new tab"
                  >
                    <FiExternalLink className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pdf-viewer-container iframe {
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};
