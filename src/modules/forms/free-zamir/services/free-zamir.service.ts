import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreeZamirEntity } from '../free-zamir.entity';
import { Repository } from 'typeorm';
import { CreateFreeZamirDto } from '../dto/create-free-zamir.dto';
import { MailerService } from '@nestjs-modules/mailer';
import zamirFormMessage from 'src/utils/emailing/forms/zamir-form-message';

@Injectable()
export class FreeZamirService {

  constructor(
    @InjectRepository(FreeZamirEntity)
    private readonly freeZamirRepository: Repository<FreeZamirEntity>,
    private readonly mailerService: MailerService
  ){}

  async findAll() {
    return await this.freeZamirRepository.find();
  }

  async findById(id: number){
    return await this.freeZamirRepository.findOneBy({id});
  }

  async createOne(body: CreateFreeZamirDto){

    const { name, phone, address } = body;

    this.mailerService.sendMail(zamirFormMessage(name, phone, address));

    const newForm = this.freeZamirRepository.create(body);
    return await this.freeZamirRepository.save(newForm);
  }

  async deleteOne(id: number){

    const curItem = await this.findById(id);

    if(curItem == null)
    throw new HttpException(`item with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return await this.freeZamirRepository.delete(id).then(() => `item by id: ${id} was deleted successfuly`)
  }

  async deleteAll(){
    const ids = await this.findAll()
    .then((data: FreeZamirEntity[]) => 
      data.map((item: FreeZamirEntity): number => 
        (item.id)
      )
    );
    switch(true){
      case ids.length === 0:
        throw new HttpException(`No free-zamir entities even don't exist`, HttpStatus.NOT_FOUND);
      case ids.length !== 0:
        return await this.freeZamirRepository.delete(ids)
        .then(() => `items were deleted successfuly`);
    }
    
  }

}
