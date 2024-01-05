import { IsOptional } from "class-validator";
import { DesafioStatusEnum } from "../enums/desafio-status.enum";

export class AtualizarDesafioDto {
    @IsOptional()
    dataHoraDesafio: Date;
    
    @IsOptional()
    status: DesafioStatusEnum;
}