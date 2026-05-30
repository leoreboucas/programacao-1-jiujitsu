import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.turma, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_filial').notNullable().references('id').inTable(ETableNames.filial);
      table.text('nome').notNullable();
      table.integer('qtd_alunos').notNullable();
      table.integer('max_alunos_permitidos').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.turma}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.turma)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.turma}`);
    });
}
