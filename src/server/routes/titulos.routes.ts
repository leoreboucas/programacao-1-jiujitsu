import { Router } from "express";
import { titulos } from '../controllers';

const router = Router();

router.get('/',  titulos.Controller.getAllValidation, titulos.Controller.getAll);
router.get('/:id',  titulos.Controller.getByIdValidation, titulos.Controller.getById);
router.post('/',  titulos.Controller.createValidation, titulos.Controller.create);
router.put('/:id',  titulos.Controller.updateByIdValidation, titulos.Controller.updateById);
router.delete('/:id',  titulos.Controller.deleteByIdValidation, titulos.Controller.deleteById);

export default router;
