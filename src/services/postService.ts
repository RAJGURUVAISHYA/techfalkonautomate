import { InstagramService } from './instagramService';
import { Logger } from '../utils/logger';

export class PostService {
    constructor(private instagramService: InstagramService) {}

    async postContent(mediaUrl: string, caption: string): Promise<any> {
        try {
            const result = await this.instagramService.postContent(mediaUrl, caption);
            Logger.info(`Post created successfully with ID: ${result.id}`);
            return result;
        } catch (error) {
            Logger.error(`Failed to post content: ${(error as Error).message}`);
            throw error;
        }
    }
}