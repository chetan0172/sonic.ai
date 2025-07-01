import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, Youtube, FileText, Mic, Video, AlertCircle, CheckCircle, X, Trash2 } from 'lucide-react';
import { UploadService } from '../services/uploadService';

interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  metadata?: any;
  error?: string;
}

const ACCEPTED_TYPES = {
  'video/mp4': ['.mp4'],
  'audio/mpeg': ['.mp3'],
  'audio/mp3': ['.mp3'],
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

const EnhancedUpload: React.FC = () => {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const updateUpload = (id: string, updates: Partial<FileUpload>) => {
    setUploads(prev => prev.map(upload => 
      upload.id === id ? { ...upload, ...updates } : upload
    ));
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);

    for (const file of acceptedFiles) {
      const uploadId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      // Add to uploads list
      const newUpload: FileUpload = {
        id: uploadId,
        file,
        progress: 0,
        status: 'uploading',
      };

      setUploads(prev => [...prev, newUpload]);

      try {
        // Upload file using the microservice
        const metadata = await UploadService.uploadFile(
          file,
          'demo-user-123', // In real app, get from auth context
          (progress) => {
            updateUpload(uploadId, { progress });
          }
        );

        updateUpload(uploadId, { 
          status: 'completed', 
          progress: 100,
          metadata 
        });

      } catch (error) {
        console.error('Upload failed:', error);
        updateUpload(uploadId, { 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Upload failed' 
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle YouTube URL processing
    console.log('Processing YouTube URL:', youtubeUrl);
    setYoutubeUrl('');
  };

  const getStatusIcon = (status: FileUpload['status']) => {
    switch (status) {
      case 'uploading':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Upload Error</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}

            {fileRejections.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg">
                <p className="font-medium">Some files were rejected:</p>
                <ul className="mt-2 list-disc list-inside">
                  {fileRejections.map(({ file, errors }) => (
                    <li key={file.name}>
                      {file.name}: {errors.map(e => e.message).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* File Upload Section */}
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all duration-300
                  ${isDragActive 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
                  }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center">
                  <UploadIcon className="w-16 h-16 text-primary-600 dark:text-primary-400 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-2 text-lg">
                    {isDragActive ? 'Drop files here...' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Support for MP4, MP3, PDF, and DOCX files
                  </p>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Max file size: 500MB for videos, 100MB for audio, 50MB for PDFs, 25MB for DOCX
                  </div>
                </div>
              </div>

              {/* YouTube URL Section */}
              <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-8">
                <form onSubmit={handleYoutubeSubmit}>
                  <div className="flex flex-col items-center text-center">
                    <Youtube className="w-16 h-16 text-red-600 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-4 text-lg">
                      Or paste a YouTube URL
                    </p>
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={!youtubeUrl.trim()}
                      className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Process Video
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Upload Progress */}
            {uploads.length > 0 && (
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Progress</h3>
                <div className="space-y-3">
                  {uploads.map((upload) => (
                    <div key={upload.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(upload.status)}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{upload.file.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatFileSize(upload.file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeUpload(upload.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {upload.status === 'uploading' && (
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${upload.progress}%` }}
                          />
                        </div>
                      )}
                      
                      {upload.status === 'error' && upload.error && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{upload.error}</p>
                      )}
                      
                      {upload.status === 'completed' && upload.metadata && (
                        <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                          ✓ Upload completed successfully
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supported Content Types */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Video className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Video</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MP4 up to 500MB</p>
                </div>
              </div>
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Mic className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Audio</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MP3 up to 100MB</p>
                </div>
              </div>
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">PDF</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Up to 50MB</p>
                </div>
              </div>
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">DOCX</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Up to 25MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedUpload;