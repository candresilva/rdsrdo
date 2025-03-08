import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class EmpresaRepository extends BaseRepository<typeof prisma.empresa> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.empresa);  // Passando o modelo correto para o BaseRepository
  }
}

