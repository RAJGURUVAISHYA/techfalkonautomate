import dotenv from 'dotenv';
import path from 'path';

// Load .env file from root
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
    instagram: {
        apiKey: process.env.INSTAGRAM_API_KEY,
        apiSecret: process.env.INSTAGRAM_API_SECRET,
        accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
        userId: process.env.INSTAGRAM_USER_ID,
        apiUrl: process.env.INSTAGRAM_API_URL
    },
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
};