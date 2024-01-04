import { IsEmail, IsNotEmpty } from 'class-validator'; // https://github.com/typestack/class-validator
export class AtualizarJogadorDto {

    @IsNotEmpty()
    readonly telefoneCelular: string;

    @IsNotEmpty()
    readonly nome: string;
}