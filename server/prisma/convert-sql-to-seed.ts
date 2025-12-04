/**
 * SQL to Prisma Seed Converter
 *
 * 此脚本将 init.sql 中的 INSERT 语句转换为 Prisma seed 数据格式
 * 运行方式: npx ts-node prisma/convert-sql-to-seed.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// SQL 文件路径
const sqlFilePath = path.join(__dirname, '../db/init.sql');
// 输出文件路径
const outputFilePath = path.join(__dirname, 'seed.ts');

// 表名到 Prisma 模型名的映射
const tableToModelMap: Record<string, string> = {
  sys_tenant: 'sysTenant',
  sys_tenant_package: 'sysTenantPackage',
  sys_client: 'sysClient',
  sys_config: 'sysConfig',
  sys_dept: 'sysDept',
  sys_dict_data: 'sysDictData',
  sys_dict_type: 'sysDictType',
  sys_job: 'sysJob',
  sys_menu: 'sysMenu',
  sys_notice: 'sysNotice',
  sys_post: 'sysPost',
  sys_role: 'sysRole',
  sys_role_dept: 'sysRoleDept',
  sys_role_menu: 'sysRoleMenu',
  sys_user: 'sysUser',
  sys_user_post: 'sysUserPost',
  sys_user_role: 'sysUserRole',
};

// MySQL 列名到 Prisma 字段名的映射（驼峰转换）
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 解析 SQL 值
function parseValue(value: string): any {
  value = value.trim();

  // NULL 值
  if (value.toUpperCase() === 'NULL') {
    return null;
  }

  // 字符串值（去掉引号）
  if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
    // 处理转义字符
    let str = value.slice(1, -1);
    str = str.replace(/''/g, "'"); // SQL 中的转义单引号
    str = str.replace(/\\'/g, "'"); // 反斜杠转义的单引号
    str = str.replace(/\\"/g, '"'); // 反斜杠转义的双引号
    str = str.replace(/\\\\/g, '\\'); // 反斜杠转义
    return str;
  }

  // 数字值
  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  if (/^-?\d+\.\d+$/.test(value)) {
    return parseFloat(value);
  }

  // 布尔值（tinyint）
  if (value === '0' || value === '1') {
    return parseInt(value, 10);
  }

  return value;
}

// 解析 INSERT 语句中的值列表
function parseValues(valuesStr: string): string[] {
  const values: string[] = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let depth = 0;

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    const prevChar = i > 0 ? valuesStr[i - 1] : '';

    if (!inString && (char === "'" || char === '"')) {
      inString = true;
      stringChar = char;
      current += char;
    } else if (inString && char === stringChar && prevChar !== '\\') {
      // 检查是否是连续的两个引号（SQL转义）
      if (i + 1 < valuesStr.length && valuesStr[i + 1] === stringChar) {
        current += char;
        current += valuesStr[i + 1];
        i++;
      } else {
        inString = false;
        stringChar = '';
        current += char;
      }
    } else if (!inString && char === '(') {
      depth++;
      if (depth > 1) current += char;
    } else if (!inString && char === ')') {
      depth--;
      if (depth > 0) current += char;
    } else if (!inString && char === ',' && depth === 1) {
      values.push(current.trim());
      current = '';
    } else if (depth >= 1) {
      current += char;
    }
  }

  if (current.trim()) {
    values.push(current.trim());
  }

  return values;
}

// 解析单条 INSERT 语句
function parseInsertStatement(sql: string): { tableName: string; columns: string[]; rows: any[] } | null {
  // 匹配 INSERT INTO `table_name` (`col1`, `col2`, ...) VALUES (...), (...)
  const insertRegex =
    /INSERT\s+INTO\s+`?(\w+)`?\s*\(([^)]+)\)\s*VALUES\s*(.+)/is;
  const match = sql.match(insertRegex);

  if (!match) {
    return null;
  }

  const tableName = match[1];
  const columnsStr = match[2];
  const valuesStr = match[3];

  // 解析列名
  const columns = columnsStr.split(',').map((col) => {
    return col.trim().replace(/`/g, '');
  });

  // 解析所有 VALUES 组
  const rows: any[] = [];
  const valuesGroups = valuesStr.split(/\)\s*,\s*\(/);

  for (let i = 0; i < valuesGroups.length; i++) {
    let group = valuesGroups[i];
    // 清理首尾括号
    if (i === 0) group = group.replace(/^\s*\(/, '');
    if (i === valuesGroups.length - 1) group = group.replace(/\)\s*;?\s*$/, '');

    const values = parseValues('(' + group + ')');
    if (values.length === columns.length) {
      const row: Record<string, any> = {};
      for (let j = 0; j < columns.length; j++) {
        const fieldName = snakeToCamel(columns[j]);
        row[fieldName] = parseValue(values[j]);
      }
      rows.push(row);
    }
  }

  return { tableName, columns, rows };
}

// 需要添加 tenantId 的表
const tablesWithTenantId = [
  'sys_config',
  'sys_dept',
  'sys_dict_data',
  'sys_dict_type',
  'sys_job',
  'sys_logininfor',
  'sys_menu',
  'sys_notice',
  'sys_oper_log',
  'sys_post',
  'sys_role',
  'sys_upload',
  'sys_user',
];

// 特殊字段处理
function processSpecialFields(tableName: string, row: Record<string, any>): Record<string, any> {
  const processed = { ...row };

  // 处理布尔字段
  if (tableName === 'sys_role') {
    if ('menuCheckStrictly' in processed) {
      processed.menuCheckStrictly = processed.menuCheckStrictly === 1;
    }
    if ('deptCheckStrictly' in processed) {
      processed.deptCheckStrictly = processed.deptCheckStrictly === 1;
    }
  }

  // 处理日期字段 - 转换为 Date 对象
  const dateFields = ['createTime', 'updateTime', 'loginTime', 'loginDate', 'operTime', 'expireTime'];
  for (const field of dateFields) {
    if (field in processed && processed[field] !== null) {
      processed[field] = `new Date('${processed[field]}')`;
    }
  }

  // 为需要 tenantId 的表添加默认租户ID
  if (tablesWithTenantId.includes(tableName) && !('tenantId' in processed)) {
    processed.tenantId = '000000';
  }

  return processed;
}

// 生成 Prisma 创建语句
function generatePrismaCreate(modelName: string, rows: any[], tableName: string): string {
  if (rows.length === 0) return '';

  const processedRows = rows.map((row) => processSpecialFields(tableName, row));

  let code = `  // ${tableName}\n`;
  code += `  await prisma.${modelName}.createMany({\n`;
  code += `    data: [\n`;

  for (const row of processedRows) {
    code += `      {\n`;
    for (const [key, value] of Object.entries(row)) {
      if (value === null) {
        code += `        ${key}: null,\n`;
      } else if (typeof value === 'string' && value.startsWith('new Date(')) {
        code += `        ${key}: ${value},\n`;
      } else if (typeof value === 'string') {
        // 转义特殊字符
        const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        code += `        ${key}: '${escaped}',\n`;
      } else if (typeof value === 'boolean') {
        code += `        ${key}: ${value},\n`;
      } else {
        code += `        ${key}: ${value},\n`;
      }
    }
    code += `      },\n`;
  }

  code += `    ],\n`;
  code += `    skipDuplicates: true,\n`;
  code += `  });\n\n`;

  return code;
}

// 主函数
async function main() {
  console.log('开始读取 SQL 文件...');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

  // 提取所有 INSERT 语句
  const insertStatements: string[] = [];
  const lines = sqlContent.split('\n');
  let currentStatement = '';
  let inInsert = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.toUpperCase().startsWith('INSERT INTO')) {
      inInsert = true;
      currentStatement = trimmedLine;
    } else if (inInsert) {
      currentStatement += ' ' + trimmedLine;
    }

    if (inInsert && trimmedLine.endsWith(';')) {
      insertStatements.push(currentStatement);
      currentStatement = '';
      inInsert = false;
    }
  }

  console.log(`找到 ${insertStatements.length} 条 INSERT 语句`);

  // 按表名分组
  const tableData: Record<string, any[]> = {};

  for (const stmt of insertStatements) {
    const parsed = parseInsertStatement(stmt);
    if (parsed && tableToModelMap[parsed.tableName]) {
      if (!tableData[parsed.tableName]) {
        tableData[parsed.tableName] = [];
      }
      tableData[parsed.tableName].push(...parsed.rows);
    }
  }

  // 生成 seed.ts 文件
  let seedContent = `/**
 * Prisma Seed Data
 *
 * 由 convert-sql-to-seed.ts 脚本自动生成
 * 生成时间: ${new Date().toISOString()}
 *
 * 运行方式: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始导入种子数据...');

`;

  // 定义导入顺序（根据外键依赖）
  const importOrder = [
    'sys_tenant_package',
    'sys_tenant',
    'sys_client',
    'sys_dict_type',
    'sys_dict_data',
    'sys_config',
    'sys_dept',
    'sys_post',
    'sys_role',
    'sys_menu',
    'sys_user',
    'sys_notice',
    'sys_job',
    'sys_role_dept',
    'sys_role_menu',
    'sys_user_post',
    'sys_user_role',
  ];

  for (const tableName of importOrder) {
    if (tableData[tableName] && tableData[tableName].length > 0) {
      const modelName = tableToModelMap[tableName];
      console.log(`处理表 ${tableName}: ${tableData[tableName].length} 条记录`);
      seedContent += generatePrismaCreate(modelName, tableData[tableName], tableName);
    }
  }

  seedContent += `  console.log('种子数据导入完成!');
}

main()
  .catch((e) => {
    console.error('种子数据导入失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

  // 写入文件
  fs.writeFileSync(outputFilePath, seedContent, 'utf-8');
  console.log(`\n种子数据已生成到: ${outputFilePath}`);

  // 打印统计信息
  console.log('\n=== 统计信息 ===');
  for (const [tableName, rows] of Object.entries(tableData)) {
    console.log(`${tableName}: ${rows.length} 条记录`);
  }
}

main().catch(console.error);
