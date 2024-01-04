import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';

import { Categoria } from '../interfaces/categoria.interface';

import { CriarCategoriaDto } from '../dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from '../dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriasService.consultarCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPorId(@Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPorId(categoria);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Param('categoria') categoria: string,
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
        // console.log(`params: ${JSON.stringify(params)}`);
        await this.categoriasService.atribuirCategoriaJogador(params);
    }
}
