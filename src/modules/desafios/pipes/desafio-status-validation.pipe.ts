import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { DesafioStatusEnum } from "../enums/desafio-status.enum";

export class DesafioStatusValidacaoPipe implements PipeTransform {
    // Exemplo do instrutor:

    // readonly statusPermitidos = [
    //     DesafioStatusEnum.ACEITO,
    //     DesafioStatusEnum.NEGADO,
    //     DesafioStatusEnum.CANCELADO
    // ];

    // transform(value: any) {
    //     const status = value.status.toUpperCase();

    //     if (!this.ehStatusValido(status)) {
    //         throw new BadRequestException(`O status ${status} é inválido.`);
    //     }

    //     return value;
    // }

    // private ehStatusValido(status: any) {
    //     const index = this.statusPermitidos.indexOf(status);
    //     // -1 se o elemento não for encontrado.
    //     return index !== -1;
    // }
    

    // Meu exemplo:
    transform(value: any) {
        const status = value.status.toUpperCase() as DesafioStatusEnum;

        this.validarStatus(status);
        return value;
    }

    private validarStatus(status: DesafioStatusEnum) {
        switch (status) {
            case DesafioStatusEnum.ACEITO:
            case DesafioStatusEnum.NEGADO:
            case DesafioStatusEnum.CANCELADO:
                break;
            default:
                throw new BadRequestException(`O status ${status} é inválido.`);
        }
    }
}