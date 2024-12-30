import { Request, Response } from 'express';
import { PostService } from '../services/postService';
import { Logger } from '../utils/logger';
import multer from 'multer';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

export class PostController {
    constructor(private postService: PostService) {}

    async postContent(req: Request, res: Response): Promise<void> {
        try {
            const { caption } = req.body;
            const mediaUrl = req.file ? path.join(__dirname, '../../uploads', req.file.filename) : '';

            Logger.info(`Received mediaUrl: ${mediaUrl}, caption: ${caption}`);

            const result = await this.postService.postContent(mediaUrl, caption);
            res.status(200).json({ message: 'Post created successfully', result });
        } catch (error) {
            Logger.error(`Controller: Failed to post content: ${(error as Error).message}`);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    async setAutoReply(req: Request, res: Response): Promise<void> {
        try {
            const { replyMessage } = req.body;
            const replyType = req.path.includes('comment') ? 'comment' : 'dm';
            Logger.info(`Automatic ${replyType} reply set: ${replyMessage}`);
            res.status(200).json({ message: `Automatic ${replyType} reply set` });
        } catch (error) {
            Logger.error(`Controller: Failed to set automatic reply: ${(error as Error).message}`);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}

export const uploadMiddleware = upload.single('media');