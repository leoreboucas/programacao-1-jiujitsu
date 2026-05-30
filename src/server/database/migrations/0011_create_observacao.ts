import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.observacao, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_usuario').notNullable().references('id').inTable(ETableNames.usuario);
      table.bigInteger('id_instrutor').notNullable().references('id').inTable(ETableNames.usuario);
      table.date('data_observacao').notNullable();
      table.text('descricao').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.observacao}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.observacao)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.observacao}`);
    });
}

