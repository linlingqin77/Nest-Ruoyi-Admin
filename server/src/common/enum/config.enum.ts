/**
 * 系统参数类型枚举
 * - YES (Y): 是（系统内置）
 * - NO (N): 否
 */
export enum ConfigTypeEnum {
  /** 是（系统内置） */
  YES = 'Y',
  /** 否 */
  NO = 'N',
}

/** ConfigTypeEnum Swagger Schema */
export const ConfigTypeEnumSchema = {
  description: `系统参数类型枚举
- YES (Y): 是（系统内置）
- NO (N): 否`,
};
