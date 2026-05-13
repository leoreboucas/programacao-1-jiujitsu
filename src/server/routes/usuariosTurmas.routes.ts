import { Router } from "express";
import { usuariosTurmas } from '../controllers';

const router = Router();

router.get('/', usuariosTurmas.Controller.getAllValidation, usuariosTurmas.Controller.getAll);
router.get('/:id', usuariosTurmas.Controller.getByIdValidation, usuariosTurmas.Controller.getById);
router.post('/', usuariosTurmas.Controller.createValidation, usuariosTurmas.Controller.create);
router.put('/:id', usuariosTurmas.Controller.updateByIdValidation, usuariosTurmas.Controller.updateById);
router.delete('/:id', usuariosTurmas.Controller.deleteByIdValidation, usuariosTurmas.Controller.deleteById);

export default router;
