import { Module } from '@nestjs/common';
import { FormController } from './controllers/form.controller';
import { FreeConsultationModule } from './free-consultation/free-consultation.module';
import { FreeZamirModule } from './free-zamir/free-zamir.module';
import { FreeZamirService } from './free-zamir/services/free-zamir.service';
import { FreeConsultationService } from './free-consultation/services/free-consultation.service';

@Module({
  imports: [
    FreeZamirModule,
    FreeConsultationModule
  ],
  controllers: [FormController],
  providers: [FreeZamirService, FreeConsultationService]
})
export class FormsModule {}
