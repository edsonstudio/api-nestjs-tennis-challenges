import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { DesafiosService } from "../services/desafios.service";
import { Desafio } from "../interfaces/desafio.interface";
import { CriarDesafioDto } from "../dtos/criar-desafio.dto";

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) { }

    private readonly logger = new Logger(DesafiosController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`);
        return await this.desafiosService.criarDesafio(criarDesafioDto);
    }
}