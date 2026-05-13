import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IInstrutorTurma } from '../../models';

export const create = async (instrutorTurma: Omit<IInstrutorTurma, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../09_instrutor_turma.json');
    let instrutoresTurmas: IInstrutorTurma[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        instrutoresTurmas = JSON.parse(fileData);
      }
    }

    const novoId = instrutoresTurmas.length > 0
      ? Math.max(...instrutoresTurmas.map((item) => Number(item.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: IInstrutorTurma = {
      ...instrutorTurma,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    };

    instrutoresTurmas.push(novoRegistro);
    writeFileSync(filePath, JSON.stringify(instrutoresTurmas, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
