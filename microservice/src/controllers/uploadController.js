import { FileService } from '../services/fileService.js';
import { 
  validateUploadRequest, 
  validateFileType, 
  validateFileSize 
} from '../utils/validation.js';

export class UploadController {
  static async createUploadSession(req, res) {
    try {
      // Validate request data
      const { error, value } = validateUploadRequest(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.details.map(detail => detail.message),
        });
      }

      const { userId, fileName, fileType, mimeType, fileSize, duration } = value;

      // Validate file type and MIME type
      if (!validateFileType(fileType, mimeType)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid file type or MIME type',
        });
      }

      // Validate file size
      if (!validateFileSize(fileType, fileSize)) {
        return res.status(400).json({
          success: false,
          error: 'File size exceeds maximum allowed size',
        });
      }

      // Create upload session
      const uploadSession = await FileService.createUploadSession({
        userId,
        fileName,
        fileType,
        mimeType,
        fileSize,
        duration,
      });

      res.status(201).json({
        success: true,
        data: uploadSession,
      });
    } catch (error) {
      console.error('Create upload session error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }

  static async confirmUpload(req, res) {
    try {
      const { uploadId } = req.params;

      if (!uploadId) {
        return res.status(400).json({
          success: false,
          error: 'Upload ID is required',
        });
      }

      const fileMetadata = await FileService.confirmUpload(uploadId);

      res.json({
        success: true,
        data: fileMetadata,
      });
    } catch (error) {
      console.error('Confirm upload error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }

  static async getUserFiles(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 20, fileType } = req.query;

      const result = await FileService.getUserFiles(
        userId,
        parseInt(page),
        parseInt(limit),
        fileType
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Get user files error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }

  static async getFileById(req, res) {
    try {
      const { fileId } = req.params;
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const file = await FileService.getFileById(fileId, userId);

      res.json({
        success: true,
        data: file,
      });
    } catch (error) {
      console.error('Get file error:', error);
      res.status(404).json({
        success: false,
        error: 'File not found',
        message: error.message,
      });
    }
  }

  static async deleteFile(req, res) {
    try {
      const { fileId } = req.params;
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const result = await FileService.deleteFile(fileId, userId);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Delete file error:', error);
      res.status(404).json({
        success: false,
        error: 'File not found',
        message: error.message,
      });
    }
  }
}