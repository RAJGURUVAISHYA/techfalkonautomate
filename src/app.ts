import express from 'express';
import { config } from './config/config';
import { PostController, uploadMiddleware } from './controllers/postController';
import { InstagramService } from './services/instagramService';
import { PostService } from './services/postService';
import { errorHandler } from './utils/errorHandler';

console.log('Config:', config);

const app = express();
app.use(express.json());

const instagramService = new InstagramService();
const postService = new PostService(instagramService);
const postController = new PostController(postService);

app.post('/post-content', uploadMiddleware, (req, res) => postController.postContent(req, res));
app.post('/auto-comment-reply', (req, res) => postController.setAutoReply(req, res));
app.post('/auto-dm-reply', (req, res) => postController.setAutoReply(req, res));

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});