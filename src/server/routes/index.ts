import { Router } from "express";
import titulosRouters from './titulos.routes';
import usuariosRoutes from "./usuarios.routes";

const router = Router();

router.use('/titulos', titulosRouters);
router.use('/usuarios', usuariosRoutes);

export { router };
