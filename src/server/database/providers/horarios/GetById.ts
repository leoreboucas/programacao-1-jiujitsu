import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IHorario } from '../../models';

export const getById = async (id: number): Promise<IHorario | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../10_horario.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let horarios: IHorario[] = [];

    if (fileData.trim() !== '') {
      horarios = JSON.parse(fileData);
    }

    const result = horarios.find((turma: IHorario) => Number(turma.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as IHorario;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
