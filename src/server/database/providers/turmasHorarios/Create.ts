import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurmaHorario } from '../../models';

export const create = async (turmaHorario: Omit<ITurmaHorario, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../11_turma_horario.json');
    let turmasHorarios: ITurmaHorario[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        turmasHorarios = JSON.parse(fileData);
      }
    }

    const novoId = turmasHorarios.length > 0
      ? Math.max(...turmasHorarios.map((item) => Number(item.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: ITurmaHorario = {
      ...turmaHorario,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    };

    turmasHorarios.push(novoRegistro);
    writeFileSync(filePath, JSON.stringify(turmasHorarios, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
