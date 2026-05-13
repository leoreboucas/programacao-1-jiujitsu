import { Router } from "express";
import { horarios } from '../controllers';

const router = Router();

router.get('/', horarios.Controller.getAllValidation, horarios.Controller.getAll);
router.get('/:id', horarios.Controller.getByIdValidation, horarios.Controller.getById);
router.post('/', horarios.Controller.createValidation, horarios.Controller.create);
router.put('/:id', horarios.Controller.updateByIdValidation, horarios.Controller.updateById);
router.delete('/:id', horarios.Controller.deleteByIdValidation, horarios.Controller.deleteById);

export default router;
