import { readFileSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../03_graduacao.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const graduacoes = JSON.parse(fileData);

    const registrosFiltrados = graduacoes.filter((graduacao: IGraduacao) =>
      graduacao.id.toString().includes(id)
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};