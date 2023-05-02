import { Module } from '@nestjs/common';
import { SealerCircuitService } from './services/sealer-circuit.service';
import { SealerCircuitController } from './controllers/sealer-circuit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SealerCircuitEntity } from './sealer-circuit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SealerCircuitEntity])
  ],
  providers: [SealerCircuitService],
  controllers: [SealerCircuitController],
  exports: [
    TypeOrmModule.forFeature([SealerCircuitEntity])
  ]
})
export class SealerCircuitModule {}
