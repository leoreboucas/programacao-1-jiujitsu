import { knex, type Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.historicoPagamento, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_titulo').notNullable().references('id').inTable(ETableNames.titulo);
      table.date('data_pagamento').notNullable();
      table.text('metodo_pagamento').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.historicoPagamento}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.historicoPagamento)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.historicoPagamento}`);
    });
}

