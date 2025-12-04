/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace Monitor
   *
   * backend api module: "monitor"
   */
  namespace Monitor {
    /** 业务操作类型 */
    type BusinessType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

    /** oper log */
    type OperLog = Common.CommonRecord<{
      /** 日志主键 */
      operId: CommonType.IdType;
      /** 租户编号 */
      tenantId: CommonType.IdType;
      /** 系统模块 */
      title: string;
      /** 操作类型 */
      businessType: Monitor.BusinessType;
      /** 方法名称 */
      method: string;
      /** 请求方式 */
      requestMethod: string;
      /** 操作类别 */
      operatorType: string;
      /** 操作人员 */
      operName: string;
      /** 部门名称 */
      deptName: string;
      /** 请求URL */
      operUrl: string;
      /** 操作IP */
      operIp: string;
      /** 操作地点 */
      operLocation: string;
      /** 请求参数 */
      operParam: string;
      /** 返回参数 */
      jsonResult: string;
      /** 操作状态 */
      status: Common.EnableStatus;
      /** 错误消息 */
      errorMsg: string;
      /** 操作时间 */
      operTime: string;
      /** 消耗时间 */
      costTime: number;
    }>;

    /** oper log search params */
    type OperLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.OperLog, 'title' | 'businessType' | 'operName' | 'operIp' | 'status' | 'operTime'> &
        Api.Common.CommonSearchParams
    >;

    /** oper log list */
    type OperLogList = Api.Common.PaginatingQueryRecord<OperLog>;

    /** login infor */
    type LoginInfor = Common.CommonRecord<{
      /** 访问ID */
      infoId: CommonType.IdType;
      /** 租户编号 */
      tenantId: CommonType.IdType;
      /** 用户账号 */
      userName: string;
      /** 客户端 */
      clientKey: string;
      /** 设备类型 */
      deviceType: System.DeviceType;
      /** 登录IP地址 */
      ipaddr: string;
      /** 登录地点 */
      loginLocation: string;
      /** 浏览器类型 */
      browser: string;
      /** 操作系统 */
      os: string;
      /** 登录状态（0成功 1失败） */
      status: Common.EnableStatus;
      /** 提示消息 */
      msg: string;
      /** 访问时间 */
      loginTime: string;
    }>;

    /** login infor search params */
    type LoginInforSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.LoginInfor, 'userName' | 'ipaddr' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** login infor list */
    type LoginInforList = Api.Common.PaginatingQueryRecord<LoginInfor>;

    /** cache info */
    type CacheInfo = Common.CommonRecord<{
      /** info */
      info: {
        /** Redis 版本 */
        redis_version: string;
        /** 运行模式 */
        redis_mode: string;
        /** 端口 */
        tcp_port: number;
        /** 客户端数 */
        connected_clients: number;
        /** 运行时间(天) */
        uptime_in_days: number;
        /** 使用内存 */
        used_memory_human: string;
        /** 使用 CPU */
        used_cpu_user_children: string;
        /** 内存配置 */
        maxmemory_human: number;
        /** AOF 是否开启 */
        aof_enabled: string;
        /** RDB 是否成功 */
        rdb_last_bgsave_status: string;
        /** Key 数量 */
        dbSize: number;
        /** 网络入口 */
        instantaneous_input_kbps: number;
        /** 网络出口 */
        instantaneous_output_kbps: number;
      };
      /** db size */
      dbSize: number;
      /** command stats */
      commandStats: {
        name: string;
        value: number;
      }[];
    }>;

    /** 缓存名称 */
    type CacheName = Common.CommonRecord<{
      /** 缓存名称 */
      cacheName: string;
      /** 备注 */
      remark: string;
    }>;

    /** 缓存内容 */
    type CacheContent = Common.CommonRecord<{
      /** 缓存名称 */
      cacheName: string;
      /** 缓存键名 */
      cacheKey: string;
      /** 缓存内容 */
      cacheValue: string;
    }>;

    type OnlineUser = Common.CommonRecord<{
      /** 用户账号 */
      userName: string;
      /** 登录IP地址 */
      ipaddr: string;
      /** 登录地点 */
      loginLocation: string;
      /** 浏览器类型 */
      browser: string;
      /** 操作系统 */
      os: string;
      /** 所在部门 */
      deptName: string;
      /** 设备类型 */
      deviceType: System.DeviceType;
      /** 登录时间 */
      loginTime: number;
      /** 令牌ID */
      tokenId: string;
    }>;

    /** online user list */
    type OnlineUserList = Api.Common.PaginatingQueryRecord<OnlineUser>;

    /** online user search params */
    type OnlineUserSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.OnlineUser, 'userName' | 'ipaddr'> & Api.Common.CommonSearchParams
    >;

    /** ==================== 服务器监控 ==================== */

    /** CPU 信息 */
    type CpuInfo = {
      /** 核心数 */
      cpuNum: number;
      /** 用户使用率 */
      used: number;
      /** 系统使用率 */
      sys: number;
      /** 空闲率 */
      free: number;
    };

    /** 内存信息 */
    type MemInfo = {
      /** 总内存 */
      total: number;
      /** 已用内存 */
      used: number;
      /** 剩余内存 */
      free: number;
      /** 使用率 */
      usage: number;
    };

    /** 系统信息 */
    type SysInfo = {
      /** 服务器名称 */
      computerName: string;
      /** 服务器IP */
      computerIp: string;
      /** 操作系统 */
      osName: string;
      /** 系统架构 */
      osArch: string;
      /** 项目路径 */
      userDir?: string;
    };

    /** Node.js 信息 */
    type NodeInfo = {
      /** Node 名称 */
      name: string;
      /** Node 版本 */
      version: string;
      /** 启动时间 */
      startTime: string;
      /** 运行时长 */
      runTime: string;
      /** 安装路径 */
      home: string;
      /** 总内存 */
      total: number;
      /** 最大内存 */
      max: number;
      /** 空闲内存 */
      free: number;
      /** 已用内存 */
      used?: number;
      /** 使用率 */
      usage: number;
      /** 运行参数 */
      inputArgs?: string;
    };

    /** 磁盘信息 */
    type SysFile = {
      /** 盘符路径 */
      dirName: string;
      /** 文件系统 */
      sysTypeName: string;
      /** 盘符类型 */
      typeName: string;
      /** 总大小 */
      total: string;
      /** 剩余大小 */
      free: string;
      /** 已用大小 */
      used: string;
      /** 使用率 */
      usage: number;
    };

    /** 服务器监控信息 */
    type ServerInfo = {
      /** CPU 信息 */
      cpu: CpuInfo;
      /** 内存信息 */
      mem: MemInfo;
      /** 系统信息 */
      sys: SysInfo;
      /** Node.js 信息 */
      node?: NodeInfo;
      /** 磁盘信息 */
      sysFiles: SysFile[];
    };

    /** ==================== 定时任务 ==================== */

    /** 执行策略 */
    type MisfirePolicy = '1' | '2' | '3';

    /** 是否并发 */
    type Concurrent = '0' | '1';

    /** 定时任务 */
    type Job = Common.CommonRecord<{
      /** 任务ID */
      jobId: CommonType.IdType;
      /** 任务名称 */
      jobName: string;
      /** 任务组名 */
      jobGroup: string;
      /** 调用目标字符串 */
      invokeTarget: string;
      /** cron执行表达式 */
      cronExpression: string;
      /** 执行策略（1立即执行 2执行一次 3放弃执行） */
      misfirePolicy: MisfirePolicy;
      /** 是否并发执行（0允许 1禁止） */
      concurrent: Concurrent;
      /** 状态（0正常 1暂停） */
      status: Common.EnableStatus;
      /** 创建时间 */
      createTime: string;
      /** 下次执行时间 */
      nextValidTime?: string;
      /** 备注 */
      remark?: string;
    }>;

    /** 定时任务搜索参数 */
    type JobSearchParams = CommonType.RecordNullable<
      Pick<Job, 'jobName' | 'jobGroup' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** 定时任务列表 */
    type JobList = Api.Common.PaginatingQueryRecord<Job>;

    /** 定时任务操作参数 */
    type JobOperateParams = CommonType.RecordNullable<
      Pick<
        Job,
        'jobId' | 'jobName' | 'jobGroup' | 'invokeTarget' | 'cronExpression' | 'misfirePolicy' | 'concurrent' | 'status'
      >
    >;

    /** ==================== 调度日志 ==================== */

    /** 调度日志 */
    type JobLog = Common.CommonRecord<{
      /** 日志ID */
      jobLogId: CommonType.IdType;
      /** 任务名称 */
      jobName: string;
      /** 任务组名 */
      jobGroup: string;
      /** 调用目标字符串 */
      invokeTarget: string;
      /** 日志信息 */
      jobMessage: string;
      /** 执行状态（0成功 1失败） */
      status: Common.EnableStatus;
      /** 异常信息 */
      exceptionInfo?: string;
      /** 创建时间 */
      createTime: string;
    }>;

    /** 调度日志搜索参数 */
    type JobLogSearchParams = CommonType.RecordNullable<
      Pick<JobLog, 'jobName' | 'jobGroup' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** 调度日志列表 */
    type JobLogList = Api.Common.PaginatingQueryRecord<JobLog>;
  }
}
