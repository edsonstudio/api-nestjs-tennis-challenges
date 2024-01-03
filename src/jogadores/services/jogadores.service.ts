import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CriarJogadorDto } from "../dtos/criar-jogador.dto";
import { Jogador } from "../interfaces/jogador.interface";

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        await this.criar(criarJogadorDto);
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
}