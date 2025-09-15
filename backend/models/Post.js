import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: function() {
      return !this.fileUrl; // Changed from imageUrl to fileUrl
    },
    minlength: [1, 'Content must be at least 1 character long'],
    maxlength: [2000, 'Content cannot exceed 2000 characters']
  },
  // Replaced imageUrl with fileUrl to handle PDFs
  fileUrl: {
    type: String,
    default: null
  },
  fileName :{
    type:String,
    default: null
  },
  filePublicId: {
    type: String,
    default: null
  },
  // New field to track file type (will always be 'pdf' in your case)
  fileType: {
    type: String,
    enum: ['pdf', null],
    default: null
  },
  // UUID for tracking PDF files
  fileUuid: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  imagePublicId: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Middleware to generate UUID for PDF files before saving
postSchema.pre('save', function(next) {
  // Generate UUID only for PDF files that don't have one yet
  if (this.fileType === 'pdf' && !this.fileUuid) {
    this.fileUuid = uuidv4();
  }
  next();
});

// Middleware to clean up files from Cloudinary when post is deleted
postSchema.pre('remove', async function(next) {
  if (this.filePublicId) {
    try {
      const { v2: cloudinary } = await import('cloudinary');
      
      // Use raw resource_type for PDFs
      await cloudinary.uploader.destroy(this.filePublicId, {
        resource_type: 'raw'
      });
    } catch (err) {
      console.error('Error deleting PDF from Cloudinary:', err);
    }
  }
  next();
});

const Post = mongoose.model('Post', postSchema);
export default Post;