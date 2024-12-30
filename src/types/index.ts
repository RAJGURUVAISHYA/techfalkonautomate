export interface InstagramPost {
    id: string;
    caption: string;
    mediaUrl: string;
    scheduledTime: Date;
}

export interface Comment {
    id: string;
    postId: string;
    text: string;
    createdAt: Date;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    createdAt: Date;
}

export interface User {
    id: string;
    username: string;
    profilePicture: string;
}

export interface AutomationSettings {
    schedule: string; // Cron format
    autoReplyEnabled: boolean;
    errorLoggingEnabled: boolean;
}