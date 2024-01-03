import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CriarJogadorDto } from "../dtos/criar-jogador.dto";
import { Jogador } from "../interfaces/jogador.interface";

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        if (jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }

    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { nome, telefoneCelular, email } = criarJogadorDto;

        const jogador: Jogador = {
            _id: uuid(),
            nome: nome,
            telefoneCelular: telefoneCelular,
            email: email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com/foto13.png'
        };

        this.logger.log(`jogador: ${JSON.stringify(jogador)}`);

        this.jogadores.push(jogador);
    }

    private async atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }
}