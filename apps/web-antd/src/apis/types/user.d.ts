export type GetCaptchaResponse = CaptchaDto;

/**
 *  接口 [管理员登录]
 *  @标签 管理端用户模块/管理员登录
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserLoginRequest {
  /* 引用类型 */
  data: UserLoginDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserLoginResponse = LoginResponseDto;

/**
 *  接口 [管理员登出]
 *  @标签 管理端用户模块/管理员登出
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserLogoutRequest {
  /* 引用类型 */
  data: TokenDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserLogoutResponse = boolean;

/**
 *  接口 [用户注册]
 *  @标签 管理端用户模块/用户注册
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserRegisterRequest {
  /* 引用类型 */
  data: UserRegisterDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserRegisterResponse = IdDto;

/**
 *  接口 [刷新访问令牌]
 *  @标签 管理端用户模块/刷新访问令牌
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserRefreshTokenRequest {
  /* 引用类型 */
  data: RefreshTokenDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserRefreshTokenResponse = RefreshTokenResponseDto;

/**
 *  接口 [修改密码]
 *  @标签 管理端用户模块/修改密码
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserUpdatePasswordRequest {
  /* 引用类型 */
  data: UpdatePasswordDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserUpdatePasswordResponse = UserDto;

/**
 *  接口 [更新用户信息]
 *  @标签 管理端用户模块/更新用户信息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserUpdateInfoRequest {
  /* 引用类型 */
  data: UpdateUserDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserUpdateInfoResponse = UserDto;

export type UserInfoResponse = UserDto;

/**
 *  接口 [根据ID获取用户信息]
 *  @标签 管理端用户模块/根据ID获取用户信息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserInfoByIdRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserInfoByIdResponse = UserDto;

/**
 *  接口 [获取管理端用户分页列表]
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserPageRequest {
  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 当前页码 */
  pageIndex?: number;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 开始时间 */
  startDate?: string;

  /* 结束时间 */
  endDate?: string;

  /* 用户名 */
  username?: string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 角色 0普通管理员 1超级管理员 */
  role?: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: UserDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [删除用户]
 *  @标签 管理端用户模块/删除用户
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UserDeleteRequest {
  /* 引用类型 */
  data: IdDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UserDeleteResponse = IdDto;

/**
 *  类型定义 [CaptchaDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type CaptchaDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 验证码 */
  data: string;

  /* 验证码 key */
  id: string;
};

/**
 *  类型定义 [UserLoginDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UserLoginDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 验证码 */
  captcha: string;
  /* 验证码ID */
  captchaId: string;
  /* 密码 */
  password: string;

  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [LoginResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type LoginResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 令牌信息 */
  tokens: any;

  /* 用户信息 */
  user: any;
};

/**
 *  类型定义 [TokenDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type TokenDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 账号令牌 */
  accessToken: string;

  /* 刷新令牌 */
  refreshToken: string;
};

/**
 *  类型定义 [UserRegisterDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UserRegisterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像 */
  avatar?: string;
  /* 密码 */
  confirmPassword: string;
  /* 手机号 */
  mobile: string;
  /* 密码 */
  password: string;
  /* 角色 0普通管理员 1超级管理员 */
  role: number;

  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [RefreshTokenDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type RefreshTokenDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 刷新令牌 */
  refreshToken: string;
};

/**
 *  类型定义 [RefreshTokenResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type RefreshTokenResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 刷新令牌响应 */
  tokens: any;
};

/**
 *  类型定义 [UpdatePasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UpdatePasswordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 密码 */
  confirmPassword: string;
  /* 密码 */
  newPassword: string;
  /* 密码 */
  oldPassword: string;

  /* 刷新令牌 */
  refreshToken: string;
};

/**
 *  类型定义 [UserDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UserDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像 */
  avatar?: string;
  /* 创建时间 */
  createdAt: string;
  /* 用户ID */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 是否锁定 */
  isLocked: boolean;
  /* 最后登录时间 */
  lastLoginAt?: string;
  /* 最后登录IP */
  lastLoginIp?: string;
  /* 登录失败次数 */
  loginFailCount: number;
  /* 手机号 */
  mobile: string;
  /* 角色 0普通管理员 1超级管理员 */
  role: number;
  /* 更新时间 */
  updatedAt: string;

  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [UpdateUserDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UpdateUserDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像 */
  avatar?: string;
  /* 用户ID */
  id?: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 手机号 */
  mobile: string;
  /* 角色 0普通管理员 1超级管理员 */
  role: number;

  /* 用户名 */
  username: string;
};
