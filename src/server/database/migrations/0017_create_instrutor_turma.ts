import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.instrutorTurma, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_instrutor').notNullable().references('id').inTable(ETableNames.usuario);
      table.bigInteger('id_turma').notNullable().references('id').inTable(ETableNames.turma);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.instrutorTurma}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.instrutorTurma)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.instrutorTurma}`);
    });
}

