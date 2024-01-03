import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        const { email, nome } = criarJogadorDto;
        return JSON.stringify({
            "nome": `${nome}`,
            "email": `${email}`
        });
    }
}
