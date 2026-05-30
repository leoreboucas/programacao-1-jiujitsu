
import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.graduacao, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_aluno').notNullable().references('id').inTable(ETableNames.usuario);
      table.text('tipo').notNullable();
      table.text('faixa_atual').notNullable();
      table.text('grau_atual').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.graduacao}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.graduacao)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.graduacao}`);
    });
}
