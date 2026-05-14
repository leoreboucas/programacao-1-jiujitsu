import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITelefone } from '../../models';

export const create = async (telefone: Omit<ITelefone, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../00_telefones.json');
      let telefones: ITelefone[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          telefones = JSON.parse(fileData);
        }
      }

      const novoId = telefones.length > 0
        ? Math.max(...telefones.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: ITelefone = {
        ...telefone,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual,
      } as ITelefone;

      telefones.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(telefones, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
