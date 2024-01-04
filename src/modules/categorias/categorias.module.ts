import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasService } from './services/categorias.service';
import { CategoriaSchema } from './schemas/categoria.schema';
import { CategoriasController } from './controllers/categorias.controller';
import { JogadoresModule } from '../jogadores/jogadores.module';

@Module({
    imports: [
        JogadoresModule,
        MongooseModule.forFeature([
            { name: 'Categoria', schema: CategoriaSchema }
        ])
    ],
    controllers: [CategoriasController],
    providers: [CategoriasService]
})
export class CategoriasModule { }
