import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "../dtos/criar-jogador.dto";
import { Jogador } from "../interfaces/jogador.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPorEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`O jogador com o email: ${email} não foi encontrado!`);
        }

        return jogadorEncontrado;
    }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            await this.atualizar(criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }

    }

    async deletarJogador(email: string): Promise<any> {
        const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`O jogador com o email: ${email} não foi encontrado!`);
        }

        return await this.jogadorModel.deleteOne({ email }).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: criarJogadorDto }).exec();
    }
}