interface UploadSessionRequest {
  userId: string;
  fileName: string;
  fileType: 'mp4' | 'mp3' | 'pdf' | 'docx';
  mimeType: string;
  fileSize: number;
  duration?: number;
}

interface UploadSessionResponse {
  success: boolean;
  data: {
    uploadId: string;
    presignedUrl: string;
    s3Key: string;
    metadata: {
      id: string;
      fileName: string;
      fileType: string;
      fileSize: number;
      duration?: number;
      uploadStatus: string;
      uploadedAt: string;
    };
  };
}

interface FileMetadata {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  fileSize: number;
  duration?: number;
  uploadStatus: 'pending' | 'completed' | 'failed';
  uploadedAt: string;
}

const MICROSERVICE_BASE_URL = 'http://localhost:3001/api/upload';

export class UploadService {
  static async createUploadSession(request: UploadSessionRequest): Promise<UploadSessionResponse> {
    try {
      const response = await fetch(`${MICROSERVICE_BASE_URL}/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create upload session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating upload session:', error);
      throw error;
    }
  }

  static async uploadToS3(presignedUrl: string, file: File, onProgress?: (progress: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  }

  static async confirmUpload(uploadId: string): Promise<{ success: boolean; data: FileMetadata }> {
    try {
      const response = await fetch(`${MICROSERVICE_BASE_URL}/confirm/${uploadId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to confirm upload');
      }

      return await response.json();
    } catch (error) {
      console.error('Error confirming upload:', error);
      throw error;
    }
  }

  static async getUserFiles(
    userId: string,
    page: number = 1,
    limit: number = 20,
    fileType?: string
  ): Promise<{
    success: boolean;
    data: {
      files: FileMetadata[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    };
  }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (fileType) {
        params.append('fileType', fileType);
      }

      const response = await fetch(`${MICROSERVICE_BASE_URL}/files/${userId}?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch files');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user files:', error);
      throw error;
    }
  }

  static async getFileById(fileId: string, userId: string): Promise<{ success: boolean; data: FileMetadata }> {
    try {
      const response = await fetch(`${MICROSERVICE_BASE_URL}/file/${fileId}?userId=${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch file');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  }

  static async deleteFile(fileId: string, userId: string): Promise<{ success: boolean; data: { message: string } }> {
    try {
      const response = await fetch(`${MICROSERVICE_BASE_URL}/file/${fileId}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete file');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  static getFileTypeFromMime(mimeType: string): 'mp4' | 'mp3' | 'pdf' | 'docx' | null {
    const mimeToType: Record<string, 'mp4' | 'mp3' | 'pdf' | 'docx'> = {
      'video/mp4': 'mp4',
      'audio/mpeg': 'mp3',
      'audio/mp3': 'mp3',
      'application/pdf': 'pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    };

    return mimeToType[mimeType] || null;
  }

  static async uploadFile(
    file: File,
    userId: string,
    onProgress?: (progress: number) => void
  ): Promise<FileMetadata> {
    try {
      // Determine file type
      const fileType = this.getFileTypeFromMime(file.type);
      if (!fileType) {
        throw new Error('Unsupported file type');
      }

      // Create upload session
      const sessionResponse = await this.createUploadSession({
        userId,
        fileName: file.name,
        fileType,
        mimeType: file.type,
        fileSize: file.size,
      });

      // Upload to S3
      await this.uploadToS3(sessionResponse.data.presignedUrl, file, onProgress);

      // Confirm upload
      const confirmResponse = await this.confirmUpload(sessionResponse.data.uploadId);

      return confirmResponse.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}