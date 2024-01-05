import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";

import { DesafiosService } from "../services/desafios.service";

import { ValidacaoParametrosPipe } from "src/common/pipes/validacao-parametros.pipe";
import { DesafioStatusValidacaoPipe } from "../pipes/desafio-status-validation.pipe";

import { Desafio } from "../interfaces/desafio.interface";

import { CriarDesafioDto } from "../dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "../dtos/atualizar-desafio.dto";

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) { }

    private readonly logger = new Logger(DesafiosController.name)

    @Get()
    async consultarDesafios(@Query('idJogador') _id: string): Promise<Array<Desafio>> {
        return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
        : await this.desafiosService.consultarTodosDesafios();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`);
        return await this.desafiosService.criarDesafio(criarDesafioDto);
    }

    @Put('/:desafio')
    @UsePipes(ValidationPipe)
    async atualizarDesafio(
        @Param('desafio', ValidacaoParametrosPipe) _id: string, 
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
        await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);
    }
}