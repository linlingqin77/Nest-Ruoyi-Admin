/**
 * 排序规则枚举
 * - ASCENDING: 升序
 * - DESCENDING: 降序
 */
export enum SortRuleEnum {
  /** 升序 */
  ASCENDING = 'ascending',
  /** 降序 */
  DESCENDING = 'descending',
}

/** SortRuleEnum Swagger Schema */
export const SortRuleEnumSchema = {
  description: `排序规则枚举
- ASCENDING: 升序
- DESCENDING: 降序`,
};

/**
 * 字符类型字段枚举
 * - ENABLE (0): 启用/是
 * - DISABLE (1): 禁用/否
 */
export enum CharEnum {
  /** 启用/是 */
  ENABLE = '0',
  /** 禁用/否 */
  DISABLE = '1',
}

/** CharEnum Swagger Schema */
export const CharEnumSchema = {
  description: `字符类型字段枚举
- ENABLE (0): 启用/是
- DISABLE (1): 禁用/否`,
};
