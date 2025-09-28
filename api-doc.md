# SparkCraft 用户管理 API 接口文档

## 基础信息
- **基础URL**: `http://localhost:8080`
- **API前缀**: `/user`
- **数据格式**: JSON
- **字符编码**: UTF-8

## 通用响应格式

所有接口都使用统一的响应格式：

```json
{
  "code": 0,
  "data": {},
  "message": "ok"
}
```

- `code`: 状态码，0表示成功，非0表示失败
- `data`: 响应数据
- `message`: 响应消息

## 接口列表

### 1. 用户注册

**接口名称**: 用户注册  
**URL**: `POST /user/register`  
**描述**: 新用户注册账号

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| userAccount | String | 是 | 用户账号，长度不少于4位 |
| userPassword | String | 是 | 用户密码，长度不少于8位 |
| checkPassword | String | 是 | 确认密码，需与密码一致 |

#### 请求示例

```json
{
  "userAccount": "testuser",
  "userPassword": "12345678",
  "checkPassword": "12345678"
}
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | Long | 新用户ID |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": 1234567890,
  "message": "ok"
}
```

---

### 2. 用户登录

**接口名称**: 用户登录  
**URL**: `POST /user/login`  
**描述**: 用户账号密码登录

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| userAccount | String | 是 | 用户账号 |
| userPassword | String | 是 | 用户密码 |

#### 请求示例

```
POST /user/login
Content-Type: application/x-www-form-urlencoded

userAccount=testuser&userPassword=12345678
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | LoginUserVO | 登录用户信息 |
| message | String | 响应消息 |

**LoginUserVO 结构**:

| 参数名 | 类型 | 描述 |
|--------|------|------|
| id | Long | 用户ID |
| userAccount | String | 用户账号 |
| userName | String | 用户昵称 |
| userAvatar | String | 用户头像 |
| userProfile | String | 用户简介 |
| userRole | String | 用户角色 |
| createTime | LocalDateTime | 创建时间 |
| updateTime | LocalDateTime | 更新时间 |

#### 响应示例

```json
{
  "code": 0,
  "data": {
    "id": 1234567890,
    "userAccount": "testuser",
    "userName": "测试用户",
    "userAvatar": "https://example.com/avatar.jpg",
    "userProfile": "这是一个测试用户",
    "userRole": "user",
    "createTime": "2024-01-01T10:00:00",
    "updateTime": "2024-01-01T10:00:00"
  },
  "message": "ok"
}
```

---

### 3. 获取当前登录用户

**接口名称**: 获取当前登录用户  
**URL**: `GET /user/get/login`  
**描述**: 获取当前登录用户信息

#### 请求参数

无需参数，通过Session获取当前登录用户

#### 请求示例

```
GET /user/get/login
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | LoginUserVO | 当前登录用户信息 |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": {
    "id": 1234567890,
    "userAccount": "testuser",
    "userName": "测试用户",
    "userAvatar": "https://example.com/avatar.jpg",
    "userProfile": "这是一个测试用户",
    "userRole": "user",
    "createTime": "2024-01-01T10:00:00",
    "updateTime": "2024-01-01T10:00:00"
  },
  "message": "ok"
}
```

---

### 4. 用户注销

**接口名称**: 用户注销  
**URL**: `POST /user/logout`  
**描述**: 用户退出登录

#### 请求参数

无需参数

#### 请求示例

```
POST /user/logout
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | Boolean | 注销结果 |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": true,
  "message": "ok"
}
```

---

### 5. 创建用户（管理员）

**接口名称**: 创建用户  
**URL**: `POST /user/add`  
**描述**: 管理员创建新用户  
**权限**: 需要管理员权限

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| userName | String | 否 | 用户昵称 |
| userAccount | String | 是 | 用户账号 |
| userAvatar | String | 否 | 用户头像URL |
| userProfile | String | 否 | 用户简介 |
| userRole | String | 否 | 用户角色（user/admin） |

#### 请求示例

```json
{
  "userName": "新用户",
  "userAccount": "newuser",
  "userAvatar": "https://example.com/avatar.jpg",
  "userProfile": "这是一个新用户",
  "userRole": "user"
}
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | Long | 新用户ID |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": 1234567891,
  "message": "ok"
}
```

---

### 6. 根据ID获取用户（管理员）

**接口名称**: 根据ID获取用户  
**URL**: `GET /user/get?id={id}`  
**描述**: 管理员根据ID获取用户详细信息  
**权限**: 需要管理员权限

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

#### 请求示例

```
GET /user/get?id=1234567890
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | User | 用户完整信息 |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": {
    "id": 1234567890,
    "userAccount": "testuser",
    "userName": "测试用户",
    "userAvatar": "https://example.com/avatar.jpg",
    "userProfile": "这是一个测试用户",
    "userRole": "user",
    "createTime": "2024-01-01T10:00:00",
    "updateTime": "2024-01-01T10:00:00",
    "editTime": "2024-01-01T10:00:00",
    "isDelete": 0
  },
  "message": "ok"
}
```

---

### 7. 根据ID获取用户VO

**接口名称**: 根据ID获取用户VO  
**URL**: `GET /user/get/vo?id={id}`  
**描述**: 获取用户脱敏信息

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

#### 请求示例

```
GET /user/get/vo?id=1234567890
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | UserVO | 用户脱敏信息 |
| message | String | 响应消息 |

**UserVO 结构**:

| 参数名 | 类型 | 描述 |
|--------|------|------|
| id | Long | 用户ID |
| userAccount | String | 用户账号 |
| userName | String | 用户昵称 |
| userAvatar | String | 用户头像 |
| userProfile | String | 用户简介 |
| userRole | String | 用户角色 |
| createTime | LocalDateTime | 创建时间 |

#### 响应示例

```json
{
  "code": 0,
  "data": {
    "id": 1234567890,
    "userAccount": "testuser",
    "userName": "测试用户",
    "userAvatar": "https://example.com/avatar.jpg",
    "userProfile": "这是一个测试用户",
    "userRole": "user",
    "createTime": "2024-01-01T10:00:00"
  },
  "message": "ok"
}
```

---

### 8. 删除用户（管理员）

**接口名称**: 删除用户  
**URL**: `POST /user/delete`  
**描述**: 管理员删除用户  
**权限**: 需要管理员权限

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| id | Long | 是 | 要删除的用户ID |

#### 请求示例

```json
{
  "id": 1234567890
}
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | Boolean | 删除结果 |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": true,
  "message": "ok"
}
```

---

### 9. 更新用户（管理员）

**接口名称**: 更新用户  
**URL**: `POST /user/update`  
**描述**: 管理员更新用户信息  
**权限**: 需要管理员权限

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |
| userName | String | 否 | 用户昵称 |
| userAvatar | String | 否 | 用户头像URL |
| userProfile | String | 否 | 用户简介 |
| userRole | String | 否 | 用户角色（user/admin） |

#### 请求示例

```json
{
  "id": 1234567890,
  "userName": "更新后的用户名",
  "userAvatar": "https://example.com/new-avatar.jpg",
  "userProfile": "更新后的用户简介",
  "userRole": "user"
}
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | Boolean | 更新结果 |
| message | String | 响应消息 |

#### 响应示例

```json
{
  "code": 0,
  "data": true,
  "message": "ok"
}
```

---

### 10. 分页获取用户列表（管理员）

**接口名称**: 分页获取用户列表  
**URL**: `POST /user/list/page/vo`  
**描述**: 管理员分页查询用户列表  
**权限**: 需要管理员权限

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| pageNum | Integer | 否 | 页码，默认1 |
| pageSize | Integer | 否 | 每页大小，默认10 |
| sortField | String | 否 | 排序字段 |
| sortOrder | String | 否 | 排序方式（ascend/descend），默认descend |
| id | Long | 否 | 用户ID（筛选条件） |
| userName | String | 否 | 用户昵称（模糊查询） |
| userAccount | String | 否 | 用户账号（模糊查询） |
| userProfile | String | 否 | 用户简介（模糊查询） |
| userRole | String | 否 | 用户角色（筛选条件） |

#### 请求示例

```json
{
  "pageNum": 1,
  "pageSize": 10,
  "sortField": "createTime",
  "sortOrder": "descend",
  "userName": "测试",
  "userRole": "user"
}
```

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | Integer | 状态码 |
| data | Page&lt;UserVO&gt; | 分页用户信息 |
| message | String | 响应消息 |

**Page&lt;UserVO&gt; 结构**:

| 参数名 | 类型 | 描述 |
|--------|------|------|
| pageNumber | Long | 当前页码 |
| pageSize | Long | 每页大小 |
| totalRow | Long | 总记录数 |
| records | List&lt;UserVO&gt; | 用户列表 |

#### 响应示例

```json
{
  "code": 0,
  "data": {
    "pageNumber": 1,
    "pageSize": 10,
    "totalRow": 100,
    "records": [
      {
        "id": 1234567890,
        "userAccount": "testuser1",
        "userName": "测试用户1",
        "userAvatar": "https://example.com/avatar1.jpg",
        "userProfile": "这是测试用户1",
        "userRole": "user",
        "createTime": "2024-01-01T10:00:00"
      },
      {
        "id": 1234567891,
        "userAccount": "testuser2",
        "userName": "测试用户2",
        "userAvatar": "https://example.com/avatar2.jpg",
        "userProfile": "这是测试用户2",
        "userRole": "user",
        "createTime": "2024-01-01T11:00:00"
      }
    ]
  },
  "message": "ok"
}
```

---

## 错误码说明

| 错误码 | 描述 |
|--------|------|
| 0 | 成功 |
| 40000 | 请求参数错误 |
| 40001 | 请求数据为空 |
| 40101 | 未登录 |
| 40301 | 无权限 |
| 40400 | 请求数据不存在 |
| 50000 | 系统内部异常 |
| 50001 | 操作失败 |

## 注意事项

1. 所有需要登录的接口都需要在请求头中携带有效的Session信息
2. 标记为"管理员"权限的接口只有管理员角色的用户才能访问
3. 密码在传输和存储时都会进行加密处理
4. 用户角色包括：`user`（普通用户）、`admin`（管理员）
5. 所有时间字段格式为：`yyyy-MM-ddTHH:mm:ss`
6. 分页查询支持多种排序和筛选条件
7. 删除操作为逻辑删除，不会真正删除数据库记录
### 2. 创建应用

**接口名称**: 创建一个新的图片生成应用

**请求方法**: `POST`

**请求路径**: `/api/imageProject/add`

**接口描述**:
该接口用于创建一个新的图片生成应用（Image Project）。用户需要提供应用的名称和一段初始描述（`projectDesc`），该描述将作为后续AI生成图片的初始 Prompt。服务器接收到请求后，会为当前登录的用户创建一个新的应用记录，并返回该应用的唯一ID。

**请求参数**:

**Body** (`application/json`):

| 参数名        | 类型   | 是否必须 | 描述                               |
|---------------|--------|----------|------------------------------------|
| `projectName` | String | 是       | 应用的名称。                       |
| `projectDesc` | String | 是       | 应用的初始描述，将作为初始 Prompt。 |

**请求示例**:

```json
{
  "projectName": "我的第一个AI作品",
  "projectDesc": "一只可爱的猫咪，戴着一顶小帽子，坐在草地上。"
}
```

**响应参数**:

**成功响应**:

| 参数名  | 类型   | 描述                                     |
|---------|--------|------------------------------------------|
| `code`  | Number | 状态码，`0` 表示成功。                   |
| `data`  | Long   | 新创建的应用的唯一ID。                   |
| `message`| String | 响应消息，成功时为 "ok"。                |

**成功响应示例**:

```json
{
  "code": 0,
  "data": 179826962019328,
  "message": "ok"
}
```

**失败响应**:

| 参数名  | 类型   | 描述                                     |
|---------|--------|------------------------------------------|
| `code`  | Number | 错误码，非 `0` 的值表示失败。            |
| `data`  | Object | `null`                                   |
| `message`| String | 错误描述信息。                           |

**失败响应示例**:

*   **参数错误** (例如，`projectDesc` 为空):
    ```json
    {
      "code": 40000,
      "data": null,
      "message": "初始化 prompt 不能为空"
    }
    ```
*   **操作失败** (例如，数据库插入失败):
    ```json
    {
      "code": 50000,
      "data": null,
      "message": "操作失败"
    }
    ```

**CURL 请求示例**:

```bash
cURL -X POST 'http://localhost:8080/api/imageProject/add' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_AUTH_TOKEN>' \
-d '{
  "projectName": "未来都市",
  "projectDesc": "一幅描绘未来城市的画作，有飞行汽车和全息广告牌。"
}'
```
### 11. 与AI对话获取灵感 (流式接口)

**接口名称**: 与AI对话获取灵感
**URL**: `GET /imageProject/chat/get/idea`
**描述**: 用户通过与AI对话，获取文创设计灵感。该接口基于 **Server-Sent Events (SSE)** 实现长连接和流式响应，允许后端实时将AI生成的文字片段推送给前端。

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 | 示例值 |
|---|---|---|---|---|
| imageProjectId | Long | 是 | 应用ID | `12345` |
| message | String | 是 | 用户发送给AI的消息 | `你好，我想设计一款以熊猫为主题的茶杯` |

#### 响应说明

**成功响应**:
- **状态码**: `200 OK`
- **Content-Type**: `text/event-stream;charset=UTF-8`
- **数据结构**: 响应是一个事件流 (Event Stream)。

**事件流协议**:
1.  **消息事件 (message)**:
    - 后端会持续发送 `message` 事件。
    - 每个事件的数据部分 (`data:`) 是一个 JSON 对象，格式为 `{"d": "内容"}`，其中“内容”是AI生成的文字片段。
2.  **结束事件 (end)**:
    - 当AI完成所有内容的生成后，后端会发送一个名为 `end` 的自定义事件。
    - 该事件的数据为 `[DONE]`。
    - 前端监听到此事件后，应主动关闭连接。

**错误响应**:
- 如果请求参数校验失败或发生其他错误，将返回一个标准的JSON错误响应，而不是事件流。
- **40000**: 请求参数错误（例如，`imageProjectId` 或 `message` 为空）
- **40101**: 未登录
- **50000**: 系统内部异常

#### 请求示例

```bash
# -N 选项用于禁用缓冲，实时查看流式输出
curl -N 'http://localhost:8080/api/imageProject/chat/get/idea?imageProjectId=12345&message=你好，我想设计一款以熊猫为主题的茶杯' \
  -H 'Cookie: sessionId=your_session_id'
```

#### 响应示例

**成功响应示例 (原始事件流)**:
```http
event: message
data: {"d":"当然"}

event: message
data: {"d":"！熊猫"}

event: message
data: {"d":"主题的"}

event: message
data: {"d":"茶杯"}

event: message
data: {"d":"听起来"}

event: message
data: {"d":"很棒"}

event: message
data: {"d":"。"}

event: end
data: [DONE]
```

**错误响应示例 (JSON)**:
```json
{
  "code": 40000,
  "message": "请求参数错误: 用户消息不能为空",
  "data": null
}
```

#### 前端实现示例 (JavaScript)

```javascript
const eventSource = new EventSource('http://localhost:8080/api/imageProject/chat/get/idea?imageProjectId=12345&message=你好');

// 监听 message 事件，处理收到的数据
eventSource.onmessage = function(event) {
    // event.data 的内容是 {"d": "内容"}
    const data = JSON.parse(event.data);
    const content = data.d;
    console.log('收到消息:', content);
    // 在这里将内容追加到你的UI上
};

// 监听自定义的 end 事件，用于关闭连接
eventSource.addEventListener('end', function(event) {
    console.log('数据流结束:', event.data);
    // 关闭连接
    eventSource.close();
});

// 监听错误事件
eventSource.onerror = function(err) {
    console.error("EventSource 发生错误:", err);
    eventSource.close();
};