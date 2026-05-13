import { Router } from "express";
import { turmas } from '../controllers';

const router = Router();

router.get('/',  turmas.Controller.getAllValidation, turmas.Controller.getAll);
router.get('/:id', turmas.Controller.getByIdValidation, turmas.Controller.getById);
router.post('/', turmas.Controller.createValidation, turmas.Controller.create);
router.put('/:id', turmas.Controller.updateByIdValidation, turmas.Controller.updateById);
router.delete('/:id', turmas.Controller.deleteByIdValidation, turmas.Controller.deleteById);

export default router;
