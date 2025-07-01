import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, AWS_CONFIG } from '../config/aws.js';
import { sanitizeFileName } from '../utils/validation.js';

export class S3Service {
  static async generatePresignedUrl(fileName, mimeType, userId) {
    try {
      // Create a unique S3 key
      const sanitizedFileName = sanitizeFileName(fileName);
      const timestamp = Date.now();
      const s3Key = `uploads/${userId}/${timestamp}-${sanitizedFileName}`;

      // Create the S3 command
      const command = new PutObjectCommand({
        Bucket: AWS_CONFIG.bucketName,
        Key: s3Key,
        ContentType: mimeType,
        Metadata: {
          'uploaded-by': userId,
          'original-name': fileName,
          'upload-timestamp': timestamp.toString(),
        },
      });

      // Generate the pre-signed URL
      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: AWS_CONFIG.presignedUrlExpiry,
      });

      // Generate the final S3 URL (for accessing the file after upload)
      const s3Url = `https://${AWS_CONFIG.bucketName}.s3.${AWS_CONFIG.region}.amazonaws.com/${s3Key}`;

      return {
        presignedUrl,
        s3Key,
        s3Url,
      };
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      throw new Error('Failed to generate upload URL');
    }
  }

  static async verifyUpload(s3Key) {
    try {
      // In a production environment, you might want to verify the file exists
      // For now, we'll assume the upload was successful if this method is called
      return true;
    } catch (error) {
      console.error('Error verifying upload:', error);
      return false;
    }
  }
}