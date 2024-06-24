/*
 * @Description: 返回值封装对象
 */
export class AjaxResult {
  readonly code: number;
  readonly msg: string;
  readonly data: any;

  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static success(data?: any, msg = '操作成功') {
    return new AjaxResult(200, msg, data);
  }

  static error(msg = '操作失败', code = 500) {
    return new AjaxResult(code, msg, null);
  }
}
