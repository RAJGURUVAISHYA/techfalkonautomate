import { config } from './config';

export const instagramConfig = {
    apiUrl: config.instagram.apiUrl,
    accessToken: config.instagram.accessToken,
    endpoints: {
        media: `/${config.instagram.userId}/media`,
        mediaPublish: `/${config.instagram.userId}/media_publish`
    },
    rateLimit: {
        maxRequests: 200,
        windowMs: 3600000 // 1 hour
    }
};