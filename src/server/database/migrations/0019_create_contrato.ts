import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.contrato, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('id_usuario').notNullable().references('id').inTable(ETableNames.usuario);
      table.bigInteger('id_plano').notNullable().references('id').inTable(ETableNames.plano);
      table.date('data_adesao').notNullable();
      table.date('data_fim_contrato').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.contrato}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.contrato)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.contrato}`);
    });
}

