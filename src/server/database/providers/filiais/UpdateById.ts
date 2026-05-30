import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const updateById = async (
  id: number,
  filial: Omit<IFilial, 'id' | 'created_at' | 'updated_at'>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.filial)
          .update(filial)
          .where('id', '=', id);
    
        if (result > 0) return;

    return new Error('Filial com o ID especificado não encontrada');

  } catch (error) {
    console.error('Erro detalhado:', error);
    return new Error('Erro interno ao atualizar o registro');
  }
};

