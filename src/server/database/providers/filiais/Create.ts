import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const create = async (filial: Omit<IFilial, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../06_filial.json');
      let filiais: IFilial[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          filiais = JSON.parse(fileData);
        }
      }

      const novoId = filiais.length > 0
        ? Math.max(...filiais.map((f) => Number(f.id) || 0)) + 1
        : 1;

      const dataAtual = new Date();
      const novoRegistro: IFilial = {
        ...filial,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as IFilial;

      filiais.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(filiais, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
