import { readFileSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../07_turma.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const turmas = JSON.parse(fileData);

    const registrosFiltrados = turmas.filter((turma: IFilial) =>
      turma.id.toString().includes(id.toString())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
