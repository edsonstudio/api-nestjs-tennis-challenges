import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Jogador } from "../interfaces/jogador.interface";

import { CriarJogadorDto } from "../dtos/criar-jogador.dto";
import { AtualizarJogadorDto } from "../dtos/atualizar-jogador.dto";

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPorId(_id: string): Promise<Jogador> {
        return await this.jogadorEncontrado(_id);
    }

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criarJogadorDto;

        const jogadorEncontradoPorEmail = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontradoPorEmail) {
            throw new BadRequestException(`Já existe um jogador cadastrado com o e-mail: ${email}`);
        }

        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        await this.jogadorEncontrado(_id);
        await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec();
    }

    async deletarJogador(_id: string): Promise<any> {
        await this.jogadorEncontrado(_id);
        return await this.jogadorModel.deleteOne({ _id }).exec();
    }

    private async jogadorEncontrado(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findById(_id).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`O jogador com o ID: ${_id} não foi encontrado!`);
        }

        return jogadorEncontrado;
    }
}