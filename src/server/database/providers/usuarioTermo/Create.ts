import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuarioTermo } from '../../models';

export const create = async (usuarioTermo: Omit<IUsuarioTermo, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../17_usuario_termo.json');
    let usuarioTermos: IUsuarioTermo[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        usuarioTermos = JSON.parse(fileData);
      }
    }

    const novoId = usuarioTermos.length > 0
      ? Math.max(...usuarioTermos.map((u) => Number(u.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: IUsuarioTermo = {
      ...usuarioTermo,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    } as IUsuarioTermo;

    usuarioTermos.push(novoRegistro);

    writeFileSync(filePath, JSON.stringify(usuarioTermos, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
