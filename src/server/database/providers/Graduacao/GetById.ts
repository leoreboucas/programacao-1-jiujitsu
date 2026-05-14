import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';

export const getById = async (id: number): Promise<IGraduacao | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../03_graduacao.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let graduacoes: IGraduacao[] = [];

    if (fileData.trim() !== '') {
      graduacoes = JSON.parse(fileData);
    }

    const result = graduacoes.find((graduacao: IGraduacao) => Number(graduacao.id) === Number(id));

    if (result) {
      return {
        ...result,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt)
      } as IGraduacao;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};