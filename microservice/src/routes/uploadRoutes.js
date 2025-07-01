import express from 'express';
import { UploadController } from '../controllers/uploadController.js';

const router = express.Router();

// Create upload session (get pre-signed URL)
router.post('/session', UploadController.createUploadSession);

// Confirm upload completion
router.post('/confirm/:uploadId', UploadController.confirmUpload);

// Get user files
router.get('/files/:userId', UploadController.getUserFiles);

// Get specific file
router.get('/file/:fileId', UploadController.getFileById);

// Delete file
router.delete('/file/:fileId', UploadController.deleteFile);

export default router;