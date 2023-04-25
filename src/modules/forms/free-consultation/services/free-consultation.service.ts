import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FreeConsultationEntity } from "../free-consultation.entity";
import { Repository } from "typeorm";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateFreeConsultationDto } from "../dto/create-free-consultation.dto";
import consultationFormMessage from "src/utils/emailing/forms/consultation-form-message";

@Injectable()
export class FreeConsultationService {
  constructor(
    @InjectRepository(FreeConsultationEntity)
    private readonly freeConsultationRepository: Repository<FreeConsultationEntity>,
    private readonly mailerService: MailerService
  ) {}

  async findAll() {
    return await this.freeConsultationRepository.find();
  }

  async findById(id: number) {
    return await this.freeConsultationRepository.findOneBy({ id });
  }

  async createOne(body: CreateFreeConsultationDto) {
    const { name, phone } = body;

    this.mailerService.sendMail(consultationFormMessage(name, phone));

    const newForm = this.freeConsultationRepository.create(body);
    return await this.freeConsultationRepository.save(newForm);
  }

  async deleteOne(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`item with current id: ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return await this.freeConsultationRepository.delete(id).then(() => `item by id: ${id} was deleted successfuly`);
  }

  async deleteAll() {
    const ids = await this.findAll().then((data: FreeConsultationEntity[]) => data.map((item: FreeConsultationEntity): number => item.id));
    switch (true) {
      case ids.length === 0:
        throw new HttpException(`No free-consultation entities even don't exist`, HttpStatus.NOT_FOUND);
      case ids.length !== 0:
        return await this.freeConsultationRepository.delete(ids).then(() => `items were deleted successfuly`);
    }
  }
}
