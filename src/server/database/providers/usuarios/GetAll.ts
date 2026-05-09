import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IUsuario } from '../../models';

export const getAll = async (page: number, limit: number, email: string, id = 0): Promise<IUsuario[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_usuarios.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let usuarios: IUsuario[] = [];

    if (fileData.trim() !== '') {
      usuarios = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = usuarios.filter((item: IUsuario) => {
      const matchId = Number(item.id) === searchId;
      const matchEmail = item.email.toLowerCase().includes(email.toLowerCase());

      return matchId || matchEmail;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IUsuario) => Number(item.id) !== searchId)) {
      const resultById = usuarios.find((item: IUsuario) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IUsuario) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as IUsuario[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
