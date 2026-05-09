import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITitulo } from '../../models';

export const create = async (favorito: Omit<ITitulo, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../18_titulos.json');
      let titulos: ITitulo[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          titulos = JSON.parse(fileData);
        }
      }

      const novoId = titulos.length > 0
        ? Math.max(...titulos.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: ITitulo = {
        ...favorito,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as ITitulo;

      titulos.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(titulos, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
