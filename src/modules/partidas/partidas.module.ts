import { Module } from '@nestjs/common';
import { CategoriasModule } from '../categorias/categorias.module';
import { DesafiosModule } from '../desafios/desafios.module';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

import { PartidasController } from './controller/partidas.controller';
import { PartidasService } from './services/partidas.service';

import { PartidaSchema } from './schemas/partida.schema';
import { DesafioSchema } from '../desafios/schemas/desafio.schema';

@Module({
    imports: [
        CategoriasModule,
        DesafiosModule,
        JogadoresModule,
        MongooseModule.forFeature([
            { name: 'Partida', schema: PartidaSchema },
            { name: 'Desafio', schema: DesafioSchema }
        ]),
        PartidasModule
    ],
    controllers: [PartidasController],
    providers: [PartidasService],
})
export class PartidasModule {}