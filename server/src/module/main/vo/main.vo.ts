import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum, StatusEnumSchema, SexEnum, SexEnumSchema } from 'src/common/enum';

/**
 * 角色简要信息
 */
export class RoleInfoVo {
  @ApiProperty({ description: '角色ID' })
  roleId: number;

  @ApiProperty({ description: '角色名称' })
  roleName: string;

  @ApiProperty({ description: '角色权限字符串' })
  roleKey: string;
}

/**
 * 用户概要信息
 */
export class UserProfileVo {
  @ApiProperty({ description: '用户ID' })
  userId: number;

  @ApiProperty({ description: '部门ID' })
  deptId: number;

  @ApiProperty({ description: '用户账号' })
  userName: string;

  @ApiProperty({ description: '用户昵称' })
  nickName: string;

  @ApiProperty({ description: '用户类型' })
  userType: string;

  @ApiProperty({ description: '用户邮箱' })
  email: string;

  @ApiProperty({ description: '手机号码' })
  phonenumber: string;

  @ApiProperty({ description: '用户性别', enum: SexEnum, enumName: 'SexEnum', enumSchema: SexEnumSchema })
  sex: string;

  @ApiProperty({ description: '头像地址' })
  avatar: string;

  @ApiProperty({ description: '帐号状态', enum: StatusEnum, enumName: 'StatusEnum', enumSchema: StatusEnumSchema })
  status: string;

  @ApiProperty({ description: '最后登录IP' })
  loginIp: string;

  @ApiProperty({ description: '最后登录时间' })
  loginDate: Date;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @ApiProperty({ description: '部门信息', required: false })
  dept?: {
    deptId: number;
    deptName: string;
  };

  @ApiProperty({ description: '角色列表', type: [RoleInfoVo], required: false })
  roles?: RoleInfoVo[];
}

/**
 * 登录响应
 */
export class LoginVo {
  @ApiProperty({ description: 'JWT访问令牌' })
  token: string;
}

/**
 * 验证码响应
 */
export class CaptchaVo {
  @ApiProperty({ description: '是否开启验证码' })
  captchaEnabled: boolean;

  @ApiProperty({ description: '验证码唯一标识' })
  uuid: string;

  @ApiProperty({ description: '验证码图片Base64' })
  img: string;
}

/**
 * 用户信息响应（getInfo）
 */
export class GetInfoVo {
  @ApiProperty({ description: '用户信息', type: UserProfileVo })
  user: UserProfileVo;

  @ApiProperty({ description: '角色权限字符串集合', type: [String] })
  roles: string[];

  @ApiProperty({ description: '菜单权限集合', type: [String] })
  permissions: string[];
}

/**
 * 注册响应
 */
export class RegisterVo {
  @ApiProperty({ description: '注册结果消息' })
  msg: string;
}
