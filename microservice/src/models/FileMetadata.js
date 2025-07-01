import mongoose from 'mongoose';

const fileMetadataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
    enum: ['mp4', 'mp3', 'pdf', 'docx'],
  },
  mimeType: {
    type: String,
    required: true,
  },
  s3Key: {
    type: String,
    required: true,
    unique: true,
  },
  s3Url: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: null, // Only for media files (mp4, mp3)
  },
  uploadStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
fileMetadataSchema.index({ userId: 1, uploadedAt: -1 });
fileMetadataSchema.index({ fileType: 1 });
fileMetadataSchema.index({ uploadStatus: 1 });

export default mongoose.model('FileMetadata', fileMetadataSchema);