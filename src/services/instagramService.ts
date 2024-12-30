import axios, { AxiosInstance } from 'axios';
import { instagramConfig } from '../config/instagram';
import { Logger } from '../utils/logger';

export class InstagramService {
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
            baseURL: instagramConfig.apiUrl,
            headers: {
                Authorization: `Bearer ${instagramConfig.accessToken}`
            }
        });
    }

    async postContent(mediaUrl: string, caption: string): Promise<any> {
        try {
            Logger.info(`Posting content to Instagram: mediaUrl=${mediaUrl}, caption=${caption}`);

            // Create container
            const container = await this.apiClient.post(instagramConfig.endpoints.media, {
                image_url: mediaUrl,
                caption: caption
            });

            Logger.info(`Container created: ${JSON.stringify(container.data)}`);

            // Publish content
            const result = await this.apiClient.post(instagramConfig.endpoints.mediaPublish, {
                creation_id: container.data.id
            });

            Logger.info(`Successfully posted content with ID: ${result.data.id}`);
            return result.data;
        } catch (error) {
            Logger.error(`Failed to post content: ${(error as Error).message}`);
            throw error;
        }
    }
}