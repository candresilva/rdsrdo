import express from 'express';
import atividadeRoutes from './routes/atividadeRoutes';  // Importando as rotas de atividade

const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Definindo o caminho base para as rotas de atividades
app.use('/api', atividadeRoutes);  // As rotas de atividades estarão disponíveis em /api/atividades

// Configuração de porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
