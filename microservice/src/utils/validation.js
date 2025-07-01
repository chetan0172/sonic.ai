import Joi from 'joi';

// Supported file types and their MIME types
export const SUPPORTED_FILE_TYPES = {
  mp4: ['video/mp4'],
  mp3: ['audio/mpeg', 'audio/mp3'],
  pdf: ['application/pdf'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// Maximum file sizes (in bytes)
export const MAX_FILE_SIZES = {
  mp4: 500 * 1024 * 1024, // 500MB
  mp3: 100 * 1024 * 1024, // 100MB
  pdf: 50 * 1024 * 1024,  // 50MB
  docx: 25 * 1024 * 1024, // 25MB
};

export const validateUploadRequest = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().min(1).max(100),
    fileName: Joi.string().required().min(1).max(255),
    fileType: Joi.string().valid(...Object.keys(SUPPORTED_FILE_TYPES)).required(),
    mimeType: Joi.string().required(),
    fileSize: Joi.number().integer().min(1).required(),
    duration: Joi.number().min(0).optional(),
  });

  return schema.validate(data);
};

export const validateFileType = (fileType, mimeType) => {
  const allowedMimeTypes = SUPPORTED_FILE_TYPES[fileType];
  return allowedMimeTypes && allowedMimeTypes.includes(mimeType);
};

export const validateFileSize = (fileType, fileSize) => {
  const maxSize = MAX_FILE_SIZES[fileType];
  return fileSize <= maxSize;
};

export const sanitizeFileName = (fileName) => {
  // Remove special characters and spaces, keep only alphanumeric, dots, hyphens, and underscores
  return fileName.replace(/[^a-zA-Z0-9.-_]/g, '_').substring(0, 100);
};