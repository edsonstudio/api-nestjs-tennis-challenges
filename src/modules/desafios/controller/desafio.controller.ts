import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { DesafiosService } from "../services/desafios.service";
import { Desafio } from "../interfaces/desafio.interface";
import { CriarDesafioDto } from "../dtos/criar-desafio.dto";

@Controller('api/v1/desafios')
export class DesafioController {

    constructor(private readonly desafiosService: DesafiosService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        return await this.desafiosService.criarDesafio(criarDesafioDto);
    }
}