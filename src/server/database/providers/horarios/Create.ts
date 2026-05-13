import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHorario } from '../../models';

export const create = async (horario: Omit<IHorario, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../10_horario.json');
      let horarios: IHorario[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          horarios = JSON.parse(fileData);
        }
      }

      const novoId = horarios.length > 0
        ? Math.max(...horarios.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: IHorario = {
        ...horario,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as IHorario;

      horarios.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(horarios, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
