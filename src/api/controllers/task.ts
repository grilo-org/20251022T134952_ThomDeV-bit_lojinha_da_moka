import { Controller, Get } from "@nestjs/common";
import { Cron, } from "@nestjs/schedule";
import { ApiTags } from "@nestjs/swagger";
import { Console } from "console";
import * as fs from 'fs';
import * as path from 'path'
@Controller('task')
@ApiTags('task')


export class TaskController {

    @Cron('0 0 6 * * 1')
    @Get()
    async TaskController() {

        console.log('File Reading from file.txt ..........');

        const read = fs.readFile('./console_node_log', 'utf8', readingFile);

        function readingFile(error, data) {
            if (error) {
                console.log(error);
            } else {
                fs.appendFileSync('./log.producao_backup', data, 'utf8')
                fs.truncate('./console_node_log', () => {
                    console.log('ARQUIVO RESETADO')
                })
            }
        }
    }
}
