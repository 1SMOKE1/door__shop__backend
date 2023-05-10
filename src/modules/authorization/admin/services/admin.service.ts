import { Injectable } from '@nestjs/common';
import { AdminEntity } from '../admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';

@Injectable()
export class AdminService {

  @InjectRepository(AdminEntity)
  private readonly adminRepository: Repository<AdminEntity> 

  public async getAll(): Promise<AdminEntity[]>{
    return await this.adminRepository.find();
  }

  public async getOneById( id: number ): Promise<AdminEntity | null>{
    return await this.adminRepository.findOne({where: {id}});
  } 

  public async getOneByEmail( email: string ): Promise<AdminEntity | null>{
    return await this.adminRepository.findOne({where: {email}});
  }

  public async createUser( body: CreateAdminDto ): Promise<AdminEntity>{
    const newUser = this.adminRepository.create(body);
    return await this.adminRepository.save(newUser);
  }

  public async updateUser( id: number, body: UpdateAdminDto ): Promise<AdminEntity | null>{
    return await this.adminRepository.update(id, body).then(() => this.getOneById(id));
  }
}
