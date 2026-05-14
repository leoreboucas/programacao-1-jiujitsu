import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../03_graduacao.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let graduacoes: IGraduacao[] = [];

    if (fileData.trim() !== '') {
      graduacoes = JSON.parse(fileData);
    }

    const index = graduacoes.findIndex((graduacao: IGraduacao) => Number(graduacao.id) === Number(id));

    if (index !== -1) {
      graduacoes.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(graduacoes, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};