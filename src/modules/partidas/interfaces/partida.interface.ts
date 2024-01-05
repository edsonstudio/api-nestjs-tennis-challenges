import { Document } from "mongoose";
import { Jogador } from "src/modules/jogadores/interfaces/jogador.interface";

export interface Partida extends Document {
    categoria: string;
    jogadores: Array<Jogador>;
    def: Jogador;
    resultado: Array<Resultado>;
}

export interface Resultado {
    set: string;
}