import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';

export const create = async (graduacao: Omit<IGraduacao, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../03_graduacao.json');
      let graduacoes: IGraduacao[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          graduacoes = JSON.parse(fileData);
        }
      }

      const novoId = graduacoes.length > 0
        ? Math.max(...graduacoes.map((f) => Number(f.id) || 0)) + 1
        : 1;

      const dataAtual = new Date();
      const novoRegistro: IGraduacao = {
        ...graduacao,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual,
      } as IGraduacao;

      graduacoes.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(graduacoes, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};