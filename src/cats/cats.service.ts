import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CatsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createCatDto: Prisma.CatCreateInput) {
    return this.databaseService.cat.create({ data: createCatDto });
  }

  findAll() {
    return this.databaseService.cat.findMany();
  }

  findOne(id: number) {
    return this.databaseService.cat.findUnique({ where: { id } });
  }

  update(id: number, updateCatDto: Prisma.CatUpdateInput) {
    return this.databaseService.cat.update({
      where: { id },
      data: updateCatDto,
    });
  }

  remove(id: number) {
    const isid = this.databaseService.cat.findUnique({ where: { id } });
    if (isid) {
      return this.databaseService.cat.delete({
        where: { id },
      });
    } else {
      return 'something went wrong';
    }
  }
}
