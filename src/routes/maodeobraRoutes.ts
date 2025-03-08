import express from 'express';
import {MaoDeObraController} from '../controllers/maodeobraController';  // Importando a instância do controlador

const router = express.Router();
const maodeobracontroller = MaoDeObraController.getInstance();
console.log('MaoDeObraController foi instanciado:', maodeobracontroller);


// Rotas para mãos de obra
router.get('/v1/listar/maos-de-obra', maodeobracontroller.getAll.bind(maodeobracontroller));  // Rota para listar todas as mãos de obra
router.get('/v1/listar/maos-de-obra/:id', maodeobracontroller.getById.bind(maodeobracontroller));  // Rota para buscar uma mão de obra por ID
router.post('/v1/criar/maos-de-obra', maodeobracontroller.create.bind(maodeobracontroller));  // Rota para criar uma nova mão de obra
router.put('/v1/editar/maos-de-obra/:id', maodeobracontroller.update.bind(maodeobracontroller));  // Rota para atualizar uma mão de obra
router.delete('/v1/excluir/maos-de-obra/:id', maodeobracontroller.delete.bind(maodeobracontroller));  // Rota para excluir uma mão de obra

export default router;
