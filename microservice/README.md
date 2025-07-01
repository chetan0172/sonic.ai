# S3 Upload Microservice

A Node.js Express microservice for generating AWS S3 pre-signed URLs and managing file metadata with MongoDB.

## Features

- Generate pre-signed URLs for secure file uploads to S3
- Support for MP4, MP3, PDF, and DOCX files
- Store file metadata in MongoDB
- File size validation and type checking
- Rate limiting and security middleware
- RESTful API endpoints
- Error handling and logging

## Supported File Types

| Type | Extensions | Max Size | MIME Types |
|------|------------|----------|------------|
| Video | MP4 | 500MB | video/mp4 |
| Audio | MP3 | 100MB | audio/mpeg, audio/mp3 |
| Document | PDF | 50MB | application/pdf |
| Document | DOCX | 25MB | application/vnd.openxmlformats-officedocument.wordprocessingml.document |

## Installation

1. Navigate to the microservice directory:
```bash
cd microservice
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/zsonic-uploads
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_BUCKET_NAME=your-bucket-name
CORS_ORIGIN=http://localhost:5173
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Create Upload Session
```
POST /api/upload/session
Content-Type: application/json

{
  "userId": "user123",
  "fileName": "video.mp4",
  "fileType": "mp4",
  "mimeType": "video/mp4",
  "fileSize": 1048576,
  "duration": 120
}
```

Response:
```json
{
  "success": true,
  "data": {
    "uploadId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "presignedUrl": "https://bucket.s3.region.amazonaws.com/...",
    "s3Key": "uploads/user123/1234567890-video.mp4",
    "metadata": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fileName": "video.mp4",
      "fileType": "mp4",
      "fileSize": 1048576,
      "duration": 120,
      "uploadStatus": "pending",
      "uploadedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Confirm Upload
```
POST /api/upload/confirm/:uploadId
```

### Get User Files
```
GET /api/upload/files/:userId?page=1&limit=20&fileType=mp4
```

### Get Specific File
```
GET /api/upload/file/:fileId?userId=user123
```

### Delete File
```
DELETE /api/upload/file/:fileId?userId=user123
```

## Upload Flow

1. **Create Upload Session**: Client sends file metadata to get pre-signed URL
2. **Upload to S3**: Client uploads file directly to S3 using pre-signed URL
3. **Confirm Upload**: Client notifies microservice that upload is complete
4. **Metadata Updated**: File status is updated to 'completed' in MongoDB

## Security Features

- Rate limiting (100 requests per 15 minutes for uploads)
- CORS protection
- Helmet security headers
- File type and size validation
- Input sanitization
- Error handling without sensitive data exposure

## MongoDB Schema

```javascript
{
  userId: String,
  fileName: String,
  fileType: String, // 'mp4', 'mp3', 'pdf', 'docx'
  mimeType: String,
  s3Key: String,
  s3Url: String,
  fileSize: Number,
  duration: Number, // For media files only
  uploadStatus: String, // 'pending', 'completed', 'failed'
  uploadedAt: Date,
  metadata: Object
}
```

## Error Handling

The service returns consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "details": ["Additional error details"]
}
```

## Integration with Frontend

To integrate with your React application, update your upload component to use this microservice:

```javascript
// Create upload session
const response = await fetch('http://localhost:3001/api/upload/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    fileName: file.name,
    fileType: 'mp4',
    mimeType: file.type,
    fileSize: file.size,
    duration: 120
  })
});

const { data } = await response.json();

// Upload to S3
await fetch(data.presignedUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type }
});

// Confirm upload
await fetch(`http://localhost:3001/api/upload/confirm/${data.uploadId}`, {
  method: 'POST'
});
```