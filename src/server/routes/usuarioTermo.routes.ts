import { Router } from "express";
import { usuarioTermos } from '../controllers';

const router = Router();

router.get('/', usuarioTermos.Controller.getAllValidation, usuarioTermos.Controller.getAll);
router.get('/:id', usuarioTermos.Controller.getByIdValidation, usuarioTermos.Controller.getById);
router.post('/', usuarioTermos.Controller.createValidation, usuarioTermos.Controller.create);
router.put('/:id', usuarioTermos.Controller.updateByIdValidation, usuarioTermos.Controller.updateById);
router.delete('/:id', usuarioTermos.Controller.deleteByIdValidation, usuarioTermos.Controller.deleteById);

export default router;
