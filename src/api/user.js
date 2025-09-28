import request from '@/utils/request'

/**
 * 用户注册
 * @param {Object} data - 注册数据
 * @param {string} data.userAccount - 用户账号，长度不少于4位
 * @param {string} data.userPassword - 用户密码，长度不少于8位
 * @param {string} data.checkPassword - 确认密码，需与密码一致
 * @returns {Promise} 返回新用户ID
 */
export const userRegister = (data) => {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

/**
 * 用户登录
 * @param {Object} data - 登录数据
 * @param {string} data.userAccount - 用户账号
 * @param {string} data.userPassword - 用户密码
 * @returns {Promise} 返回登录用户信息
 */
export const userLogin = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      // 将对象转换为 form-data 格式
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret.slice(0, -1)
    }]
  })
}

/**
 * 获取当前登录用户信息
 * @returns {Promise} 返回当前登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    url: '/user/get/login',
    method: 'get'
  })
}

/**
 * 用户注销
 * @returns {Promise} 返回注销结果
 */
export const userLogout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 创建用户（管理员）
 * @param {Object} data - 用户数据
 * @param {string} data.userName - 用户昵称
 * @param {string} data.userAccount - 用户账号
 * @param {string} data.userAvatar - 用户头像URL
 * @param {string} data.userProfile - 用户简介
 * @param {string} data.userRole - 用户角色（user/admin）
 * @returns {Promise} 返回新用户ID
 */
export const createUser = (data) => {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

/**
 * 根据ID获取用户详细信息（管理员）
 * @param {number} id - 用户ID
 * @returns {Promise} 返回用户完整信息
 */
export const getUserById = (id) => {
  return request({
    url: '/user/get',
    method: 'get',
    params: { id }
  })
}

/**
 * 根据ID获取用户脱敏信息
 * @param {number} id - 用户ID
 * @returns {Promise} 返回用户脱敏信息
 */
export const getUserVOById = (id) => {
  return request({
    url: '/user/get/vo',
    method: 'get',
    params: { id }
  })
}

/**
 * 删除用户（管理员）
 * @param {number} id - 要删除的用户ID
 * @returns {Promise} 返回删除结果
 */
export const deleteUser = (id) => {
  return request({
    url: '/user/delete',
    method: 'post',
    data: { id }
  })
}

/**
 * 更新用户信息（管理员）
 * @param {Object} data - 用户数据
 * @param {number} data.id - 用户ID
 * @param {string} data.userName - 用户昵称
 * @param {string} data.userAvatar - 用户头像URL
 * @param {string} data.userProfile - 用户简介
 * @param {string} data.userRole - 用户角色（user/admin）
 * @returns {Promise} 返回更新结果
 */
export const updateUser = (data) => {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

/**
 * 分页获取用户列表（管理员）
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @param {string} params.sortField - 排序字段
 * @param {string} params.sortOrder - 排序方式（ascend/descend），默认descend
 * @param {number} params.id - 用户ID（筛选条件）
 * @param {string} params.userName - 用户昵称（模糊查询）
 * @param {string} params.userAccount - 用户账号（模糊查询）
 * @param {string} params.userProfile - 用户简介（模糊查询）
 * @param {string} params.userRole - 用户角色（筛选条件）
 * @returns {Promise} 返回分页用户信息
 */
export const getUserListPage = (params) => {
  return request({
    url: '/user/list/page/vo',
    method: 'post',
    data: params
  })
}