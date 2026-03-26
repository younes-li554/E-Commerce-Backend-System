import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('emailQueue')
export class QueueProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(`Sending email for order ${job.data.orderId} to ${job.data.email}`);
  }
}