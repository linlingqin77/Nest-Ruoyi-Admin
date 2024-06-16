import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTree } from 'src/utils/convertToTree';
@Injectable()
export class PositionService {
  @InjectRepository(Position)
  private readonly positionRespository: Repository<Position>;

  async create(val: CreatePositionDto) {
    const position = this.positionRespository.create();
    position.id = +val.id;
    position.name = val.name;
    position.code = val.code;
    position.order = val.order;
    position.remark = val.remark;
    return await this.positionRespository.save(position);
  }

  // async findAll({ name = '', status = '', page = 1, pageSize = 10 }) {
  //   const QueryBuilder =
  //     this.positionRespository.createQueryBuilder('Position');
  //   if (name) {
  //     QueryBuilder.where('Position.name LIKE :name', { name: `%${name}%` });
  //   }
  //   if (status) {
  //     QueryBuilder.andWhere('Position.status = :status', { status });
  //   }
  //   const list = await QueryBuilder.skip((page - 1) * pageSize)
  //     .take(pageSize)
  //     .getMany();

  //   return {
  //     list: list,
  //     total: await QueryBuilder.getCount(),
  //   };
  // }

  // 查询列表分页
  /***
   * @param: all 1:查询所有 0:查询分页 默认为0 
   */
  async findList(parmas) {
    const QueryBuilder = this.positionRespository.createQueryBuilder('position');
    const { name, code, status, all = 0, page = 1, pageSize = 10 } = parmas;
    if (name) QueryBuilder.andWhere('position.name LIKE :name', {
      name: `%${name}%`,
    });
    if (code) QueryBuilder.andWhere('position.code =:code', { code });
    if (status) QueryBuilder.andWhere('position.status =:status', { status });
    QueryBuilder.addOrderBy('position.order', 'ASC')
    const [list, total] = all ? await QueryBuilder.getManyAndCount() : await QueryBuilder.skip((page - 1) * pageSize)
      .take(pageSize).getManyAndCount()
    return all ? { list, total } : { list, total, page, pageSize }
  }

  async findOne(id: number) {
    return await this.positionRespository.findOneBy({ id });
  }

  async update(val: UpdatePositionDto) {
    const position = this.positionRespository.create();
    position.id = +val.id;
    position.name = val.name;
    position.order = val.order;
    position.status = val.status;
    return await this.positionRespository.save(position);
  }

  async remove(id: number) {
    return await this.positionRespository.delete(id);
  }
}