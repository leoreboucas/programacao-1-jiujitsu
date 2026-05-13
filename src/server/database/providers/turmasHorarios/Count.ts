import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurmaHorario } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../11_turma_horario.json');

    if (!existsSync(filePath)) {
      return 0;
    }

    const fileData = readFileSync(filePath, 'utf-8');
    const turmasHorarios: ITurmaHorario[] = fileData.trim() !== '' ? JSON.parse(fileData) : [];

    return turmasHorarios.filter((item) => item.id.toString().includes(id.toString())).length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
