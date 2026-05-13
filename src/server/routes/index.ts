import { Router } from "express";
import titulosRouters from './titulos.routes';
import usuariosRoutes from "./usuarios.routes";
import historicoPagamento from "./historicoPagamento.routes";

const router = Router();

router.use('/titulos', titulosRouters);
router.use('/usuarios', usuariosRoutes);
router.use('/historico_pagamento', historicoPagamento);

export { router };
