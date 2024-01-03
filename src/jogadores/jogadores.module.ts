import { Module } from '@nestjs/common';
import { JogadoresController } from './controllers/jogadores.controller';

@Module({
  controllers: [JogadoresController]
})
export class JogadoresModule {}
