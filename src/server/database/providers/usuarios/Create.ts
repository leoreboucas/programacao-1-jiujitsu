import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuario } from '../../models';

export const create = async (favorito: Omit<IUsuario, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../01_usuarios.json');
      let usuarios: IUsuario[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          usuarios = JSON.parse(fileData);
        }
      }

      const novoId = usuarios.length > 0
        ? Math.max(...usuarios.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: IUsuario = {
        ...favorito,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as IUsuario;

      usuarios.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
