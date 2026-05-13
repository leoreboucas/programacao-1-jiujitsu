import { Router } from "express";
import { historicoCategorias } from '../controllers';

const router = Router();

router.get('/', historicoCategorias.Controller.getAllValidation, historicoCategorias.Controller.getAll);
router.get('/:id', historicoCategorias.Controller.getByIdValidation, historicoCategorias.Controller.getById);
router.post('/', historicoCategorias.Controller.createValidation, historicoCategorias.Controller.create);
router.put('/:id', historicoCategorias.Controller.updateByIdValidation, historicoCategorias.Controller.updateById);
router.delete('/:id', historicoCategorias.Controller.deleteByIdValidation, historicoCategorias.Controller.deleteById);

export default router;
