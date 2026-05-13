import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurma } from '../../models';

export const create = async (turma: Omit<ITurma, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../07_turma.json');
      let turmas: ITurma[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          turmas = JSON.parse(fileData);
        }
      }

      const novoId = turmas.length > 0
        ? Math.max(...turmas.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: ITurma = {
        ...turma,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as ITurma;

      turmas.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(turmas, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
