import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { logger } from '../logger/logger';
import * as fs from 'fs';


@Injectable()
export class TasksService {

    @Cron('*/10 * * * * *')
    handleCron() {
        
        logger.logger.debug('Called when the current second is 45');
    }
}
