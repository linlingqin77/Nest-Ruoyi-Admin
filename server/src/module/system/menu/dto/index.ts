export * from './create-menu.dto';
export * from './update-menu.dto';
export * from './list-menu.dto';

// 保持向后兼容，ListDeptDto 是 ListMenuDto 的别名
export { ListMenuDto as ListDeptDto } from './list-menu.dto';
