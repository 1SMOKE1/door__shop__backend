import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SealerCircuitEntity } from '../sealer-circuit.entity';
import { Repository } from 'typeorm';
import { CreateSealerCircuitDto } from '../dto/create-sealer-circuit.dto';
import { UpdateSealerCircuitDto } from '../dto/update-sealer-circuit.dto';

@Injectable()
export class SealerCircuitService {
  
  constructor(
    @InjectRepository(SealerCircuitEntity)
    private readonly sealerCircuitRepository: Repository<SealerCircuitEntity>
  ){}

  async findAll() {
    return await this.sealerCircuitRepository.find();
  }

  async findById(id: number) {
    const curItem = await this.sealerCircuitRepository.findOneBy({ id });

    if (curItem == null) throw new HttpException(`Item by id: ${id} doesn't exists`, HttpStatus.FORBIDDEN);

    return curItem;
  }

  async createOne(body: CreateSealerCircuitDto) {
    const newEntity = this.sealerCircuitRepository.create(body);

    return await this.sealerCircuitRepository.save(newEntity);
  }

  async updateById(id: number, body: UpdateSealerCircuitDto) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.sealerCircuitRepository.update(id, body).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const curItem = await this.findById(id);

    if (curItem == null) throw new HttpException(`This item doesn't exists`, HttpStatus.FORBIDDEN);

    return await this.sealerCircuitRepository.delete({ id }).then(() => `successfully delete by id: ${id}`);
  }
}
