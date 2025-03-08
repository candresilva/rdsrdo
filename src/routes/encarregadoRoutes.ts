import express from 'express';
import {EncarregadoController} from '../controllers/encarregadoController';  // Importando a instância do controlador

const router = express.Router();
const encarregadocontroller = EncarregadoController.getInstance();
console.log('EncarregadoController foi instanciado:', encarregadocontroller);


// Rotas para encarregados
router.get('/v1/listar/encarregados', encarregadocontroller.getAll.bind(encarregadocontroller));  // Rota para listar todos os encarregados
router.get('/v1/listar/encarregados/:id', encarregadocontroller.getById.bind(encarregadocontroller));  // Rota para buscar um encarregado por ID
router.post('/v1/criar/encarregados', encarregadocontroller.create.bind(encarregadocontroller));  // Rota para criar um novo encarregado
router.put('/v1/editar/encarregados/:id', encarregadocontroller.update.bind(encarregadocontroller));  // Rota para atualizar um encarregado
router.delete('/v1/excluir/encarregados/:id', encarregadocontroller.delete.bind(encarregadocontroller));  // Rota para excluir um encarregado

export default router;
