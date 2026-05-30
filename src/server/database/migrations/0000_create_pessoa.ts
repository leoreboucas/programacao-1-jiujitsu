import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoa, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable();
      table.string('sobrenome').notNullable();
      table.decimal('peso', 10, 2).notNullable();
      table.date('dataNascimento').notNullable();
      table.date('dataMatricula').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o cadastro de pessoas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}
