import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRolesRepository, RolesEntity } from 'src/database/entities/roles.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolesRepository implements IRolesRepository {
    constructor (
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ) {}
    async findById (param : string) {
        try {
            return await this.rolesRepository.findOne({
                where : {
                    id : param
                }
            });
        } catch (error) {
            throw new BadRequestException('this role does not exists');
        }
    }

    async find(){
        return await this.rolesRepository.find()
    }
}
