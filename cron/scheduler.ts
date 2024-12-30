import { SchedulerService } from '../src/services/schedulerService';

// Initialize the SchedulerService
const scheduler = new SchedulerService();

// Schedule tasks
scheduler.scheduleTask('0 * * * *', () => {
    console.log('Running hourly task...');
    // Add your task logic here
});

scheduler.scheduleTask('*/5 * * * *', () => {
    console.log('Running every 5 minutes task...');
    // Add your task logic here
});

// Add more scheduled tasks as needed
