import express from 'express';
import {EquipamentoController} from '../controllers/equipamentoController.js';  // Importando a instância do controlador

const router = express.Router();
const equipamentocontroller = EquipamentoController.getInstance();
console.log('EquipamentoController foi instanciado:', equipamentocontroller);


// Rotas para equipamentos
router.get('/v1/listar/equipamentos', equipamentocontroller.getAll.bind(equipamentocontroller));  // Rota para listar todos os equipamentos
router.get('/v1/listar/equipamentos/:id', equipamentocontroller.getById.bind(equipamentocontroller));  // Rota para buscar um equipamento por ID
router.post('/v1/criar/equipamentos', equipamentocontroller.create.bind(equipamentocontroller));  // Rota para criar um novo equipamento
router.put('/v1/editar/equipamentos/:id', equipamentocontroller.update.bind(equipamentocontroller));  // Rota para atualizar um equipamento
router.delete('/v1/excluir/equipamentos/:id', equipamentocontroller.delete.bind(equipamentocontroller));  // Rota para excluir um equipamento

export default router;
