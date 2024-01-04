import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from '../dtos/criar-categoria.dto';
import { Categoria } from '../interfaces/categoria.interface';
import { CategoriasService } from '../services/categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto);
    }
}
