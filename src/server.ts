import express from 'express';
import atividadeRoutes from './routes/atividadeRoutes';  // Importando as rotas de atividade
import dotenv from 'dotenv';
import servicoRoutes from './routes/servicoRoutes';
import maodeobraRoutes from './routes/maodeobraRoutes';
import motivodepausaRoutes from './routes/motivodepausaRoutes';
import contratoRoutes from './routes/contratoRoutes';
dotenv.config();


const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Definindo o caminho base para as rotas de atividades
app.use('/api', atividadeRoutes);  // As rotas de atividades estarão disponíveis em /api/atividades
// Definindo o caminho base para as rotas de serviços
app.use('/api', servicoRoutes);  // As rotas de serviços estarão disponíveis em /api/servicos
// Definindo o caminho base para as rotas de mãos de obra
app.use('/api', maodeobraRoutes);  // As rotas de mãos de obra estarão disponíveis em /api/maos-de-obra
// Definindo o caminho base para as rotas de motivos de pausa
app.use('/api', motivodepausaRoutes);  // As rotas de motivos de pausa estarão disponíveis em /api/motivos-de-pausa
// Definindo o caminho base para as rotas de contratos
app.use('/api', contratoRoutes);  // As rotas de contratos estarão disponíveis em /api/contratos


// Configuração de porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
