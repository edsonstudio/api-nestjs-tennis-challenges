import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { JogadoresService } from '../services/jogadores.service';
import { Jogador } from '../interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from '../pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) { }

    // Ignorada a boa pratica de criar um endpoint para cada ação, apenas para testes.
    @Post()
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    // Ignorada a boa pratica de criar um endpoint para cada ação, apenas para testes.
    @Get() 
    async consultarJogadores(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return this.jogadoresService.consultarJogadorPorEmail(email);
        } else {
            return this.jogadoresService.consultarTodosJogadores();   
        }
    }

    @Delete()
    async deletarJogador(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<void> {
        await this.jogadoresService.deletarJogador(email);
    }
}
