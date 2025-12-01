/**
 * 数据权限范围枚举
 * - DATA_SCOPE_ALL (1): 全部数据权限
 * - DATA_SCOPE_CUSTOM (2): 自定数据权限
 * - DATA_SCOPE_DEPT (3): 本部门数据权限
 * - DATA_SCOPE_DEPT_AND_CHILD (4): 本部门及以下数据权限
 * - DATA_SCOPE_SELF (5): 仅本人数据权限
 */
export enum DataScopeEnum {
  /** 全部数据权限 */
  DATA_SCOPE_ALL = '1',
  /** 自定数据权限 */
  DATA_SCOPE_CUSTOM = '2',
  /** 本部门数据权限 */
  DATA_SCOPE_DEPT = '3',
  /** 本部门及以下数据权限 */
  DATA_SCOPE_DEPT_AND_CHILD = '4',
  /** 仅本人数据权限 */
  DATA_SCOPE_SELF = '5',
}

/** DataScopeEnum Swagger Schema */
export const DataScopeEnumSchema = {
  description: `数据权限范围枚举
- DATA_SCOPE_ALL (1): 全部数据权限
- DATA_SCOPE_CUSTOM (2): 自定数据权限
- DATA_SCOPE_DEPT (3): 本部门数据权限
- DATA_SCOPE_DEPT_AND_CHILD (4): 本部门及以下数据权限
- DATA_SCOPE_SELF (5): 仅本人数据权限`,
};
