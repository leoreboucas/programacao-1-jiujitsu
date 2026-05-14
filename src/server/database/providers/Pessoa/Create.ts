import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IPessoa } from '../../models';

export const create = async (pessoa: Omit<IPessoa, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
      console.log('prov', {pessoa})
      const filePath = path.resolve(__dirname, '../../../../../01_pessoa.json');
      let pessoas: IPessoa[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          pessoas = JSON.parse(fileData);
        }
      }

      const novoId = pessoas.length > 0
        ? Math.max(...pessoas.map((f) => Number(f.id) || 0)) + 1
        : 1;

      const dataAtual = new Date();
      const novoRegistro: IPessoa = {
        ...pessoa,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual,
      } as IPessoa;

      pessoas.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(pessoas, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};