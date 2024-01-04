import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Categoria } from "../interfaces/categoria.interface";

import { CriarCategoriaDto } from "../dtos/criar-categoria.dto";
import { AtualizarCategoriaDto } from "../dtos/atualizar-categoria.dto";
import { JogadoresService } from "src/modules/jogadores/services/jogadores.service";

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService) { }

    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel
            .find()
            .populate("jogadores")
            .exec();
    }

    async consultarCategoriaPorId(categoria: string): Promise<Categoria> {
        return await this.categoriaEncontrada(categoria);
    }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {

        const { categoria } = criarCategoriaDto;
        const caregoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (caregoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        await this.categoriaEncontrada(categoria);
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec();
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria'];
        const idJogador = params['idJogador']; // TODO: Criar validação para verificar se o id é um GUID/UUID válido.

        const categoriaValida = await this.categoriaEncontrada(categoria);
        const jogadorValido = await this.jogadoresService.jogadorEncontrado(idJogador);

        const jogadorJaCadastradoCategoria = await this.categoriaModel.
            find({ categoria })
            .where('jogadores')
            .in(idJogador)
            .exec();

        if (jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`O jogador ${jogadorValido.nome} já está cadastrado na categoria ${categoria}!`);
        }

        categoriaValida.jogadores.push(idJogador);
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaValida }).exec();
    }

    public async categoriaEncontrada(categoria: string): Promise<Categoria> {
        const caregoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!caregoriaEncontrada) {
            throw new NotFoundException(`A Categoria: '${categoria}' não foi encontrada!`);
        }

        return caregoriaEncontrada;
    }
}