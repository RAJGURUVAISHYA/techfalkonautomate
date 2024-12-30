import cron from 'node-cron';
import { Logger } from '../utils/logger';

export class SchedulerService {
    private tasks: Map<string, cron.ScheduledTask>;

    constructor() {
        this.tasks = new Map();
    }

    scheduleTask(id: string, cronExpression: string, task: () => void): void {
        try {
            const scheduledTask = cron.schedule(cronExpression, task);
            this.tasks.set(id, scheduledTask);
            Logger.info(`Task ${id} scheduled with expression: ${cronExpression}`);
        } catch (error) {
            Logger.error(`Failed to schedule task ${id}: ${(error as Error).message}`);
            throw error;
        }
    }

    cancelTask(id: string): void {
        const task = this.tasks.get(id);
        if (task) {
            task.stop();
            this.tasks.delete(id);
            Logger.info(`Task ${id} cancelled`);
        }
    }
}