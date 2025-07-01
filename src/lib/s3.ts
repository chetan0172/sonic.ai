import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export async function getPresignedUrl(fileName: string, contentType: string) {
  if (!import.meta.env.VITE_AWS_BUCKET_NAME) {
    throw new Error('AWS bucket name is not configured');
  }

  try {
    // Sanitize the filename to prevent S3 key issues
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `uploads/${Date.now()}-${sanitizedFileName}`;
    
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    if (!url) {
      throw new Error('Failed to generate presigned URL');
    }

    return { url, key };
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw new Error(
      error instanceof Error 
        ? `AWS S3 Error: ${error.message}`
        : 'Failed to generate upload URL. Please check your AWS configuration.'
    );
  }
}