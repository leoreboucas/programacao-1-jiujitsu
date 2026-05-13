import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurmaHorario } from '../../models';

export const getById = async (id: number): Promise<ITurmaHorario | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../11_turma_horario.json');

    if (!existsSync(filePath)) {
      return new Error('Registro nao encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmasHorarios: ITurmaHorario[] = [];

    if (fileData.trim() !== '') {
      turmasHorarios = JSON.parse(fileData);
    }

    const result = turmasHorarios.find((item) => Number(item.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      };
    }

    return new Error('Registro nao encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
