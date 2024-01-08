import { Jogador } from "src/modules/jogadores/interfaces/jogador.interface";
import { Resultado } from "../interfaces/partida.interface";
import { IsArray, IsNotEmpty } from "class-validator";

export class CriarResultadoPartidaDto {
    @IsNotEmpty()
    def: Jogador;

    @IsNotEmpty()
    @IsArray()
    resultado: Array<Resultado>;
}