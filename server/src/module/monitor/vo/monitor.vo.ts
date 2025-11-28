import { ApiProperty } from '@nestjs/swagger';

/**
 * 在线用户信息
 */
export class OnlineUserVo {
  @ApiProperty({ description: '会话编号' })
  tokenId: string;

  @ApiProperty({ description: '用户名称' })
  userName: string;

  @ApiProperty({ description: '部门名称' })
  deptName: string;

  @ApiProperty({ description: '登录IP地址' })
  ipaddr: string;

  @ApiProperty({ description: '登录地点' })
  loginLocation: string;

  @ApiProperty({ description: '浏览器类型' })
  browser: string;

  @ApiProperty({ description: '操作系统' })
  os: string;

  @ApiProperty({ description: '登录时间' })
  loginTime: Date;
}

/**
 * 在线用户列表响应
 */
export class OnlineUserListVo {
  @ApiProperty({ description: '在线用户列表', type: [OnlineUserVo] })
  rows: OnlineUserVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}

/**
 * 登录日志信息
 */
export class LoginLogVo {
  @ApiProperty({ description: '访问ID' })
  infoId: number;

  @ApiProperty({ description: '用户账号' })
  userName: string;

  @ApiProperty({ description: '登录IP地址' })
  ipaddr: string;

  @ApiProperty({ description: '登录地点' })
  loginLocation: string;

  @ApiProperty({ description: '浏览器类型' })
  browser: string;

  @ApiProperty({ description: '操作系统' })
  os: string;

  @ApiProperty({ description: '登录状态（0成功 1失败）' })
  status: string;

  @ApiProperty({ description: '提示消息' })
  msg: string;

  @ApiProperty({ description: '登录时间' })
  loginTime: Date;
}

/**
 * 登录日志列表响应
 */
export class LoginLogListVo {
  @ApiProperty({ description: '登录日志列表', type: [LoginLogVo] })
  rows: LoginLogVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}

/**
 * 操作日志信息
 */
export class OperLogVo {
  @ApiProperty({ description: '日志主键' })
  operId: number;

  @ApiProperty({ description: '模块标题' })
  title: string;

  @ApiProperty({ description: '业务类型（0其它 1新增 2修改 3删除）' })
  businessType: number;

  @ApiProperty({ description: '方法名称' })
  method: string;

  @ApiProperty({ description: '请求方式' })
  requestMethod: string;

  @ApiProperty({ description: '操作类别（0其它 1后台用户 2手机端用户）' })
  operatorType: number;

  @ApiProperty({ description: '操作人员' })
  operName: string;

  @ApiProperty({ description: '部门名称' })
  deptName: string;

  @ApiProperty({ description: '请求URL' })
  operUrl: string;

  @ApiProperty({ description: '主机地址' })
  operIp: string;

  @ApiProperty({ description: '操作地点' })
  operLocation: string;

  @ApiProperty({ description: '请求参数' })
  operParam: string;

  @ApiProperty({ description: '返回参数' })
  jsonResult: string;

  @ApiProperty({ description: '操作状态（0正常 1异常）' })
  status: number;

  @ApiProperty({ description: '错误消息' })
  errorMsg: string;

  @ApiProperty({ description: '操作时间' })
  operTime: Date;

  @ApiProperty({ description: '消耗时间（毫秒）' })
  costTime: number;
}

/**
 * 操作日志列表响应
 */
export class OperLogListVo {
  @ApiProperty({ description: '操作日志列表', type: [OperLogVo] })
  rows: OperLogVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}

/**
 * 服务器信息
 */
export class ServerInfoVo {
  @ApiProperty({ description: 'CPU信息' })
  cpu: {
    cpuNum: number;
    total: number;
    sys: number;
    used: number;
    wait: number;
    free: number;
  };

  @ApiProperty({ description: '内存信息' })
  mem: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };

  @ApiProperty({ description: 'JVM信息' })
  jvm: {
    total: number;
    max: number;
    free: number;
    version: string;
    home: string;
  };

  @ApiProperty({ description: '系统信息' })
  sys: {
    computerName: string;
    computerIp: string;
    userDir: string;
    osName: string;
    osArch: string;
  };

  @ApiProperty({ description: '磁盘信息' })
  sysFiles: Array<{
    dirName: string;
    sysTypeName: string;
    typeName: string;
    total: string;
    free: string;
    used: string;
    usage: number;
  }>;
}

/**
 * 缓存信息
 */
export class CacheInfoVo {
  @ApiProperty({ description: 'Redis信息' })
  info: Record<string, string>;

  @ApiProperty({ description: '数据库大小' })
  dbSize: number;

  @ApiProperty({ description: '命令统计' })
  commandStats: Array<{
    name: string;
    value: number;
  }>;
}

/**
 * 缓存键值信息
 */
export class CacheKeyVo {
  @ApiProperty({ description: '缓存名称' })
  cacheName: string;

  @ApiProperty({ description: '缓存键名' })
  cacheKey: string;

  @ApiProperty({ description: '缓存内容' })
  cacheValue: string;

  @ApiProperty({ description: '备注' })
  remark: string;
}
