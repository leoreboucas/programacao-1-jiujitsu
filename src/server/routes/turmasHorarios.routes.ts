import { Router } from "express";
import { turmasHorarios } from '../controllers';

const router = Router();

router.get('/', turmasHorarios.Controller.getAllValidation, turmasHorarios.Controller.getAll);
router.get('/:id', turmasHorarios.Controller.getByIdValidation, turmasHorarios.Controller.getById);
router.post('/', turmasHorarios.Controller.createValidation, turmasHorarios.Controller.create);
router.put('/:id', turmasHorarios.Controller.updateByIdValidation, turmasHorarios.Controller.updateById);
router.delete('/:id', turmasHorarios.Controller.deleteByIdValidation, turmasHorarios.Controller.deleteById);

export default router;
