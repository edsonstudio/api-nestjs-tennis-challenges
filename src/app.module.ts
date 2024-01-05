import { Module } from '@nestjs/common';

import { CategoriasModule } from './modules/categorias/categorias.module';
import { DesafiosModule } from './modules/desafios/desafios.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidasModule } from './modules/partidas/partidas.module';

@Module({
  imports: [
    CategoriasModule,
    DesafiosModule,
    JogadoresModule,
    MongooseModule.forRoot('mongodb+srv://edsonstudio:rud6JHpd8oqJJukV@cluster0.d8g8xgw.mongodb.net/tennischallenges'),
    PartidasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
