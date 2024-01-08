import { Module } from '@nestjs/common';

import { CategoriasModule } from '../categorias/categorias.module';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

import { DesafioSchema } from './schemas/desafio.schema';

import { DesafiosController } from './controller/desafio.controller';

import { DesafiosService } from './services/desafios.service';

@Module({
    imports: [
        CategoriasModule,
        JogadoresModule,
        MongooseModule.forFeature([
            { name: 'Desafio', schema: DesafioSchema }
        ])
    ],
    controllers: [DesafiosController],
    providers: [DesafiosService],
    exports: [DesafiosService]
})
export class DesafiosModule {}
