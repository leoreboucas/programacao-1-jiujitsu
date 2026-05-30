import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.turmaHorario, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_filial').notNullable().references('id').inTable(ETableNames.filial);
      table.bigInteger('id_turma').notNullable().references('id').inTable(ETableNames.turma);
      table.bigInteger('id_horario').notNullable().references('id').inTable(ETableNames.horario);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.turmaHorario}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.turmaHorario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.turmaHorario}`);
    });
}
