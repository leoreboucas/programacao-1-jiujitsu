import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.usuario, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('idPessoa')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.pessoa)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.string('senha').notNullable().checkLength('>=', 6);
      table.string('email').index().unique().notNullable().checkLength('>=', 5);
      table.decimal('comissaoPorAluno').notNullable().defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela usada para armazenar usuários do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.usuario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.usuario}`);
    });
}
