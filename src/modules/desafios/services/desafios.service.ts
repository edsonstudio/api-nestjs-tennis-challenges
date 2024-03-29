import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { JogadoresService } from "src/modules/jogadores/services/jogadores.service";
import { CategoriasService } from "src/modules/categorias/services/categorias.service";

import { Desafio } from "../interfaces/desafio.interface";
import { Jogador } from "src/modules/jogadores/interfaces/jogador.interface";

import { CriarDesafioDto } from "../dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "../dtos/atualizar-desafio.dto";

import { DesafioStatusEnum } from "../enums/desafio-status.enum";

@Injectable()
export class DesafiosService {

    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService,
        private readonly categoriaService: CategoriasService
    ) { }

    private readonly logger = new Logger(DesafiosService.name);

    async consultarTodosDesafios(): Promise<Array<Desafio>> {
        return await this.desafioModel
            .find()
            .populate('solicitante')
            .populate('jogadores')
            .populate('partida')
            .exec();
    }

    async consultarDesafiosDeUmJogador(_id: any): Promise<Array<Desafio>> {
        await this.jogadoresService.consultarJogadorPorId(_id);
        return await this.desafioModel
            .find()
            .where('jogadores')
            .in(_id)
            .populate('solicitante')
            .populate('jogadores')
            .populate('partida')
            .exec();
    }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        await this.validarJogadores(criarDesafioDto);

        const categoriaSolicitante = await this.categoriaService.consultarCategoriaDoJogador(criarDesafioDto.solicitante._id);

        if (!categoriaSolicitante) {
            throw new BadRequestException('O jogador solicitante não está registrado em uma Categoria!');
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto);
        desafioCriado.categoria = categoriaSolicitante.categoria;
        desafioCriado.dataHoraSolicitacao = new Date();
        desafioCriado.status = DesafioStatusEnum.PENDENTE;

        return await desafioCriado.save();
    }

    async atualizarDesafio(_id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
        const desafioValido = await this.desafioEncontrado(_id);

        if (atualizarDesafioDto.status) {
            desafioValido.dataHoraResposta = new Date();
        }

        desafioValido.status = atualizarDesafioDto.status;
        desafioValido.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio;
        await this.desafioModel.findOneAndUpdate({ _id }, { $set: desafioValido }).exec();
    }

    // Exclusão lógica
    async deletarDesafio(_id: string): Promise<void> {
        const desafioValido = await this.desafioEncontrado(_id);
        desafioValido.status = DesafioStatusEnum.CANCELADO;
        await this.desafioModel.findOneAndUpdate({ _id }, { $set: desafioValido }).exec();
    }

    private async validarJogadores(criarDesafioDto: CriarDesafioDto): Promise<void> {
        await this.jogadoresService.jogadorEncontrado(criarDesafioDto.solicitante._id);

        for (const jogador of criarDesafioDto.jogadores) {
            await this.jogadoresService.jogadorEncontrado(jogador._id);
        }

        const solicitanteFazParteDesafio = this.solicitanteFazParteDesafio(criarDesafioDto);

        if (!solicitanteFazParteDesafio) {
            throw new BadRequestException('O jogador solicitante deve fazer parte do desafio!');
        }

        const jogadorRepetido = await this.existeJogadorRepetido(criarDesafioDto.jogadores);

        if (jogadorRepetido) {
            throw new BadRequestException('Você informou jogadores repetidos!');
        }
    }

    private solicitanteFazParteDesafio(criarDesafioDto: CriarDesafioDto): boolean {
        return criarDesafioDto.jogadores.some(jogador =>
            jogador._id.toString() === criarDesafioDto.solicitante._id.toString()
        );
    }

    private async existeJogadorRepetido(jogadores: Array<Jogador>): Promise<boolean> {
        const elementosUnicos = new Set<string>();

        for (const jogador of jogadores) {
            const chaveUnica = await this.gerarChaveUnica(jogador);

            if (elementosUnicos.has(chaveUnica)) {
                return true; // Encontrou um jogador repetido
            }

            elementosUnicos.add(chaveUnica);
        }

        return false; // Nenhum jogador repetido encontrado
    }

    private async gerarChaveUnica(jogador: Jogador): Promise<string> {
        const { _id, telefoneCelular, email, nome, ranking, posicaoRanking, urlFotoJogador } = jogador;
        return `${_id}-${telefoneCelular}-${email}-${nome}-${ranking}-${posicaoRanking}-${urlFotoJogador}`;
    }

    public async desafioEncontrado(_id: string): Promise<Desafio> {
        const desafioValido = await this.desafioModel.findById(_id).exec();

        if (!desafioValido) {
            throw new NotFoundException(`O Desafio de ID: '${_id}' não foi encontrado!`);
        }

        return desafioValido;
    }
}