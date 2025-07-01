import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, Youtube, FileText, Mic, Video, AlertCircle } from 'lucide-react';
import { getPresignedUrl } from '../lib/s3';
import { supabase } from '../lib/supabase';

const ACCEPTED_TYPES = {
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  blog: ['text/plain', 'text/markdown', '.md'],
};

const Upload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      setUploading(true);
      setError(null);
      const file = acceptedFiles[0];
      
      // Determine content type
      let contentType = 'blog';
      if (file.type.startsWith('video/')) contentType = 'video';
      if (file.type.startsWith('audio/')) contentType = 'audio';

      // Get presigned URL
      const { url, key } = await getPresignedUrl(file.name, file.type);

      // Create XMLHttpRequest for upload with progress tracking
      const xhr = new XMLHttpRequest();
      
      // Setup upload progress tracking
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      // Create a promise to handle the upload
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
      });

      // Configure and send the request
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);

      // Wait for upload to complete
      await uploadPromise;

      // Create content item in Supabase
      const { data: contentItem, error: contentError } = await supabase
        .from('content_items')
        .insert({
          title: file.name,
          content_type: contentType,
          storage_path: key,
        })
        .select()
        .single();

      if (contentError) throw contentError;

      // Trigger content processing
      const processResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId: contentItem.id,
          contentType,
        }),
      });

      if (!processResponse.ok) {
        throw new Error('Failed to process content');
      }

      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ACCEPTED_TYPES.video,
      'audio/*': ACCEPTED_TYPES.audio,
      'text/*': ACCEPTED_TYPES.blog,
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
  });

  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle YouTube URL processing
    console.log('Processing YouTube URL:', youtubeUrl);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Upload Failed</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Upload Section */}
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                  ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center">
                  <UploadIcon className="w-12 h-12 text-purple-600 mb-4" />
                  <p className="text-gray-700 font-medium mb-2">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Support for video, audio, and text files
                  </p>
                  {uploading && (
                    <div className="w-full mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {uploadProgress === 100 ? 'Processing...' : `Uploading: ${uploadProgress}%`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* YouTube URL Section */}
              <div className="border-2 rounded-lg p-6">
                <form onSubmit={handleYoutubeSubmit}>
                  <div className="flex flex-col items-center text-center">
                    <Youtube className="w-12 h-12 text-purple-600 mb-4" />
                    <p className="text-gray-700 font-medium mb-4">
                      Or paste a YouTube URL
                    </p>
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Process Video
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Supported Content Types */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Video className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Raw Video</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Mic className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Podcast Audio</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Text Blog</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Youtube className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">YouTube Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;