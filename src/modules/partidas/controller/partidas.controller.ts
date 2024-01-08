import { Body, Controller, Logger, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PartidasService } from "../services/partidas.service";
import { Partida } from "../interfaces/partida.interface";
import { ValidacaoParametrosPipe } from "src/common/pipes/validacao-parametros.pipe";
import { CriarResultadoPartidaDto } from "../dtos/criar-resultado-partida.dto";

@Controller('api/v1/partidas')
export class PartidasController {

    constructor(private readonly partidasService: PartidasService) { }

    private readonly logger = new Logger(PartidasController.name)

    @Post('/:desafio')
    @UsePipes(ValidationPipe)
    async criarResultadoPartida(
        @Param('desafio', ValidacaoParametrosPipe) _id: string,
        @Body() criarResultadoPartidaDto: CriarResultadoPartidaDto): Promise<Partida> {
        return await this.partidasService.criarResultadoPartida(_id, criarResultadoPartidaDto);
    }

}