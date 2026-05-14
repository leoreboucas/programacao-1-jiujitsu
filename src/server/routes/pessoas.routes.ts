import { Router } from "express";
import { pessoas } from '../controllers';

const router = Router();

router.get('/',  pessoas.Controller.getAllValidation, pessoas.Controller.getAll);
router.get('/:id',  pessoas.Controller.getByIdValidation, pessoas.Controller.getById);
router.post('/',  pessoas.Controller.createValidation, pessoas.Controller.create);
router.put('/:id',  pessoas.Controller.updateByIdValidation, pessoas.Controller.updateById);
router.delete('/:id',  pessoas.Controller.deleteByIdValidation, pessoas.Controller.deleteById);

export default router;
