import { Controller } from '@nestjs/common';
import { OpeningTypeService } from '../services/opening-type.service';

@Controller('opening-type')
export class OpeningTypeController {

  constructor(
    private readonly openingTypeService: OpeningTypeService
  ){}
}
