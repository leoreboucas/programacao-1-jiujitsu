import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';
import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const create = async (graduacao: Omit<IGraduacao, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
      const [result] = await Knex(ETableNames.graduacao).insert(graduacao).returning('id');
      
          if (typeof result === 'object') {
            return result.id;
          } else if (typeof result === 'number') {
            return result;
          }
      
          return new Error('Erro ao cadastrar o registro');

    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};