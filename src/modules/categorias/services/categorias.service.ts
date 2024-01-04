import { BadRequestException, Injectable } from "@nestjs/common";
import { CriarCategoriaDto } from "../dtos/criar-categoria.dto";
import { Categoria } from "../interfaces/categoria.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        
        const { categoria } = criarCategoriaDto;
        const caregoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (caregoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }
}