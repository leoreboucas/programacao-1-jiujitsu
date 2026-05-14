import { Router } from "express";
import { telefones } from '../controllers';

const router = Router();

router.get('/',  telefones.Controller.getAllValidation, telefones.Controller.getAll);
router.get('/:id',  telefones.Controller.getByIdValidation, telefones.Controller.getById);
router.post('/',  telefones.Controller.createValidation, telefones.Controller.create);
router.put('/:id',  telefones.Controller.updateByIdValidation, telefones.Controller.updateById);
router.delete('/:id',  telefones.Controller.deleteByIdValidation, telefones.Controller.deleteById);

export default router;
