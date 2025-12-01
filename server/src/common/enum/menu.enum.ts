/**
 * 菜单类型枚举
 * - M: 目录
 * - C: 菜单
 * - F: 按钮
 */
export enum MenuTypeEnum {
  /** 目录 */
  M = 'M',
  /** 菜单 */
  C = 'C',
  /** 按钮 */
  F = 'F',
}

/** MenuTypeEnum Swagger Schema */
export const MenuTypeEnumSchema = {
  description: `菜单类型枚举
- M: 目录
- C: 菜单
- F: 按钮`,
};
