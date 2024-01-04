import { Module } from '@nestjs/common';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './modules/categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://edsonstudio:rud6JHpd8oqJJukV@cluster0.d8g8xgw.mongodb.net/tennischallenges'),
    CategoriasModule,
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
