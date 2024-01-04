import { Module } from '@nestjs/common';
import { JogadoresController } from './controllers/jogadores.controller';
import { JogadoresService } from './services/jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './schemas/jogador.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Jogador', schema: JogadorSchema}
    ])
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports:[JogadoresService]
})
export class JogadoresModule {}
