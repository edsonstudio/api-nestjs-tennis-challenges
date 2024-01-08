import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CategoriasService } from "src/modules/categorias/services/categorias.service";
import { JogadoresService } from "src/modules/jogadores/services/jogadores.service";
import { DesafiosService } from "src/modules/desafios/services/desafios.service";

import { Partida } from "../interfaces/partida.interface";
import { Desafio } from "src/modules/desafios/interfaces/desafio.interface";

import { CriarResultadoPartidaDto } from "../dtos/criar-resultado-partida.dto";

import { DesafioStatusEnum } from "src/modules/desafios/enums/desafio-status.enum";

@Injectable()
export class PartidasService {

    constructor(
        @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly desafiosService: DesafiosService,
        private readonly jogadoresService: JogadoresService) { }

    private readonly logger = new Logger(PartidasService.name);

    async criarResultadoPartida(_id: string, criarResultadoPartidaDto: CriarResultadoPartidaDto): Promise<Partida> {
        const desafioEncontrado = await this.desafiosService.desafioEncontrado(_id);
        this.logger.log(`desafioEncontrado: ${desafioEncontrado}`);

        const jogadorEncontrado = await this.jogadoresService.jogadorEncontrado(criarResultadoPartidaDto.def._id);
        this.logger.log(`jogadorEncontrado: ${jogadorEncontrado}`);

        const jogadorVencedor = desafioEncontrado.jogadores.filter(jogador => jogador._id == criarResultadoPartidaDto.def._id);

        if (jogadorVencedor.length == 0) {
            throw new BadRequestException(`O jogador ${jogadorEncontrado.nome} não faz parte do desafio!`);
        }

        const resultadoPartidaCriado = new this.partidaModel(criarResultadoPartidaDto);
        resultadoPartidaCriado.categoria = desafioEncontrado.categoria;
        resultadoPartidaCriado.jogadores = desafioEncontrado.jogadores;

        const resultadoSalvo = await resultadoPartidaCriado.save();

        desafioEncontrado.status = DesafioStatusEnum.REALIZADO;
        desafioEncontrado.partida = resultadoSalvo._id;

        try {
            await this.desafioModel.findOneAndUpdate({ _id }, { $set: desafioEncontrado }).exec();
            return resultadoSalvo;
        } catch (error) {
            await this.partidaModel.deleteOne({ _id: resultadoSalvo._id }).exec();
            throw new InternalServerErrorException();
        }
    }
}