import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RequireLogin } from 'src/core/decorator/custom.decorator';

@RequireLogin()
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  // @Get('list')
  // async findByParentId(@Query('name') name: string) {
  //   return await this.menuService.findByParentId(name);
  // }
  @Get('list')
  async findByParentId(@Req() req) {
    return await this.menuService.getMenuListByUserId(req.user.id);
  }

  // 查询菜单树
  @Get('tree')
  async findMenuTree() {
    return await this.menuService.findMenuTree();
  }

  // 获取菜单
  @Get('routes')
  async getMenuListByUserId(@Req() req) {
    return await this.menuService.getMenuListByUserId(req.user.id);
  }

  // 删除菜单
  @Delete('delete')
  async removeMenusById(@Query('id', ParseIntPipe) id: number) {
    return await this.menuService.removeMenusById(id);
  }

  @Put('update')
  async updateMenusById(@Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.updateMenusById(updateMenuDto);
  }
}
