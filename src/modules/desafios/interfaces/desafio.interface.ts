import { Document } from "mongoose";
import { DesafioStatusEnum } from "../enums/desafio-status.enum";
import { Jogador } from "src/modules/jogadores/interfaces/jogador.interface";
import { Partida } from "src/modules/partidas/interfaces/partida.interface";

export interface Desafio extends Document {
    dataHoraDesafio: Date;
    status: DesafioStatusEnum;
    dataHoraSolicitacao: Date;
    dataHoraResposta: Date;
    solicitante: Jogador;
    categoria: string;
    jogadores: Array<Jogador>
    partida: Partida;
}