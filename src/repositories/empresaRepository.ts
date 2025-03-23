import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

export class EmpresaRepository extends BaseRepository<typeof prisma.empresa> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.empresa);  // Passando o modelo correto para o BaseRepository
  }
}

