import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IObservacao } from '../../models';

export const create = async (observacao: Omit<IObservacao, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../02_observacao.json');
      let observacoes: IObservacao[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          observacoes = JSON.parse(fileData);
        }
      }

      const novoId = observacoes.length > 0
        ? Math.max(...observacoes.map((f) => Number(f.id) || 0)) + 1
        : 1;

      const dataAtual = new Date();
      const novoRegistro: IObservacao = {
        ...observacao,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual,
      } as IObservacao;

      observacoes.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(observacoes, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};