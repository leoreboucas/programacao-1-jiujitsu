import { Router } from "express";
import { fichasMedicas } from '../controllers';

const router = Router();

router.get('/',  fichasMedicas.Controller.getAllValidation, fichasMedicas.Controller.getAll);
router.get('/:id',  fichasMedicas.Controller.getByIdValidation, fichasMedicas.Controller.getById);
router.post('/',  fichasMedicas.Controller.createValidation, fichasMedicas.Controller.create);
router.put('/:id',  fichasMedicas.Controller.updateByIdValidation, fichasMedicas.Controller.updateById);
router.delete('/:id',  fichasMedicas.Controller.deleteByIdValidation, fichasMedicas.Controller.deleteById);

export default router;
