import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { JogadoresService } from '../services/jogadores.service';

import { JogadoresValidacaoParametrosPipe } from '../pipes/jogadores-validacao-parametros.pipe';

import { Jogador } from '../interfaces/jogador.interface';

import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from '../dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) { }

    @Get() 
    async consultarJogadores(): Promise<Jogador[]> {
        return this.jogadoresService.consultarTodosJogadores();   
    }

    @Get('/:_id') 
    async consultarJogadorPorId(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador> {
        return this.jogadoresService.consultarJogadorPorId(_id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
       return await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string, 
        @Body() atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
        await this.jogadoresService.deletarJogador(_id);
    }
}