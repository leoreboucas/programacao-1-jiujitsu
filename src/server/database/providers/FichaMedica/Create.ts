import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFichaMedica } from '../../models';

export const create = async (fichaMedica: Omit<IFichaMedica, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../04_fichaMedica.json');
      let fichasMedicas: IFichaMedica[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          fichasMedicas = JSON.parse(fileData);
        }
      }

      const novoId = fichasMedicas.length > 0
        ? Math.max(...fichasMedicas.map((f) => Number(f.id) || 0)) + 1
        : 1;

      const dataAtual = new Date();
      const novoRegistro: IFichaMedica = {
        ...fichaMedica,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual,
      } as IFichaMedica;

      fichasMedicas.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(fichasMedicas, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};