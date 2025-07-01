import FileMetadata from '../models/FileMetadata.js';
import { S3Service } from './s3Service.js';

export class FileService {
  static async createUploadSession(uploadData) {
    try {
      // Generate pre-signed URL
      const { presignedUrl, s3Key, s3Url } = await S3Service.generatePresignedUrl(
        uploadData.fileName,
        uploadData.mimeType,
        uploadData.userId
      );

      // Create metadata record
      const fileMetadata = new FileMetadata({
        userId: uploadData.userId,
        fileName: uploadData.fileName,
        fileType: uploadData.fileType,
        mimeType: uploadData.mimeType,
        s3Key,
        s3Url,
        fileSize: uploadData.fileSize,
        duration: uploadData.duration || null,
        uploadStatus: 'pending',
      });

      await fileMetadata.save();

      return {
        uploadId: fileMetadata._id,
        presignedUrl,
        s3Key,
        metadata: {
          id: fileMetadata._id,
          fileName: fileMetadata.fileName,
          fileType: fileMetadata.fileType,
          fileSize: fileMetadata.fileSize,
          duration: fileMetadata.duration,
          uploadStatus: fileMetadata.uploadStatus,
          uploadedAt: fileMetadata.uploadedAt,
        },
      };
    } catch (error) {
      console.error('Error creating upload session:', error);
      throw new Error('Failed to create upload session');
    }
  }

  static async confirmUpload(uploadId) {
    try {
      const fileMetadata = await FileMetadata.findById(uploadId);
      
      if (!fileMetadata) {
        throw new Error('Upload session not found');
      }

      // Verify the upload with S3 (optional)
      const uploadVerified = await S3Service.verifyUpload(fileMetadata.s3Key);
      
      if (uploadVerified) {
        fileMetadata.uploadStatus = 'completed';
        await fileMetadata.save();
      } else {
        fileMetadata.uploadStatus = 'failed';
        await fileMetadata.save();
        throw new Error('Upload verification failed');
      }

      return {
        id: fileMetadata._id,
        userId: fileMetadata.userId,
        fileName: fileMetadata.fileName,
        fileType: fileMetadata.fileType,
        mimeType: fileMetadata.mimeType,
        s3Key: fileMetadata.s3Key,
        s3Url: fileMetadata.s3Url,
        fileSize: fileMetadata.fileSize,
        duration: fileMetadata.duration,
        uploadStatus: fileMetadata.uploadStatus,
        uploadedAt: fileMetadata.uploadedAt,
      };
    } catch (error) {
      console.error('Error confirming upload:', error);
      throw error;
    }
  }

  static async getUserFiles(userId, page = 1, limit = 20, fileType = null) {
    try {
      const query = { userId, uploadStatus: 'completed' };
      if (fileType) {
        query.fileType = fileType;
      }

      const skip = (page - 1) * limit;
      
      const [files, total] = await Promise.all([
        FileMetadata.find(query)
          .sort({ uploadedAt: -1 })
          .skip(skip)
          .limit(limit)
          .select('-__v'),
        FileMetadata.countDocuments(query),
      ]);

      return {
        files,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching user files:', error);
      throw new Error('Failed to fetch files');
    }
  }

  static async getFileById(fileId, userId) {
    try {
      const file = await FileMetadata.findOne({ 
        _id: fileId, 
        userId,
        uploadStatus: 'completed' 
      }).select('-__v');

      if (!file) {
        throw new Error('File not found');
      }

      return file;
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  }

  static async deleteFile(fileId, userId) {
    try {
      const file = await FileMetadata.findOne({ _id: fileId, userId });
      
      if (!file) {
        throw new Error('File not found');
      }

      // In a production environment, you might want to delete the file from S3 as well
      await FileMetadata.findByIdAndDelete(fileId);

      return { message: 'File deleted successfully' };
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}