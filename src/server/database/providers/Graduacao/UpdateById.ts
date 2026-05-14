import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';

export const updateById = async (id: number, graduacao: Omit<IGraduacao, 'id' | 'createdAt' | 'updatedAt'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../03_graduacao.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let graduacoes: IGraduacao[] = [];

    if (fileData.trim() !== '') {
      graduacoes = JSON.parse(fileData);
    }

    const index = graduacoes.findIndex((item: IGraduacao) => Number(item.id) === Number(id));

    if (index !== -1) {
      graduacoes[index] = {
        ...graduacoes[index],
        ...graduacao,
        updatedAt: new Date()
      };

      writeFileSync(filePath, JSON.stringify(graduacoes, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};