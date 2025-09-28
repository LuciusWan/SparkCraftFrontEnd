<template>
  <div class="user-management p-4 sm:p-6 lg:p-8">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2" style="font-family: 'ZYSong', serif;">
        用户管理
      </h1>
      <p class="text-gray-600">管理平台用户信息</p>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <SearchBox
        :loading="loading"
        :show-advanced-toggle="true"
        :search-fields="searchFields"
        placeholder="搜索用户账号或昵称"
        @search="handleSearch"
        @clear="handleClear"
        @reset="handleReset"
      />
      
      <!-- 操作按钮 -->
      <div class="flex items-center justify-end mt-4 space-x-3">
        <el-button
          type="success"
          @click="showAddDialog = true"
          class="bg-yellow-500 hover:bg-yellow-600 border-none text-gray-800"
        >
          <i class="fas fa-plus mr-2"></i>
          新增用户
        </el-button>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- 移动端卡片视图 -->
      <div class="block lg:hidden">
        <div v-if="loading" class="p-8 text-center">
          <el-loading />
        </div>
        <div v-else-if="userList.length === 0" class="p-8 text-center text-color-primary-charcoal">
          <i class="fas fa-users text-4xl mb-4 opacity-50"></i>
          <p>暂无用户数据</p>
        </div>
        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="user in userList"
            :key="user.id"
            class="p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="flex items-start space-x-4">
              <el-avatar
                :src="user.userAvatar"
                :size="50"
                class="flex-shrink-0"
              >
                <i class="fas fa-user"></i>
              </el-avatar>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-color-text-dark truncate">
                    {{ user.userName || user.userAccount }}
                  </h3>
                  <el-tag
                    :type="user.userRole === 'admin' ? 'danger' : 'primary'"
                    size="small"
                  >
                    {{ user.userRole === 'admin' ? '管理员' : '普通用户' }}
                  </el-tag>
                </div>
                <p class="text-sm text-color-primary-charcoal mb-1">
                  账号：{{ user.userAccount }}
                </p>
                <p class="text-sm text-color-primary-charcoal mb-1">
                  ID：{{ user.id }}
                </p>
                <p class="text-sm text-color-primary-charcoal mb-3">
                  创建时间：{{ formatDate(user.createTime) }}
                </p>
                <div class="flex space-x-2">
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleViewUser(user)"
                    class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
                  >
                    查看
                  </el-button>
                  <el-button
                    size="small"
                    @click="handleEditUser(user)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDeleteUser(user)"
                    :disabled="user.userRole === 'admin'"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 桌面端表格视图 -->
      <div class="hidden lg:block">
        <el-table
          :data="userList"
          :loading="loading"
          stripe
          class="w-full"
          @sort-change="handleSortChange"
        >
          <el-table-column prop="id" label="用户ID" width="100" sortable="custom" />
          
          <el-table-column label="头像" width="80">
            <template #default="{ row }">
              <el-avatar :src="row.userAvatar" :size="40">
                <i class="fas fa-user"></i>
              </el-avatar>
            </template>
          </el-table-column>

          <el-table-column prop="userAccount" label="用户账号" min-width="120" sortable="custom" />
          
          <el-table-column prop="userName" label="用户昵称" min-width="120" sortable="custom">
            <template #default="{ row }">
              {{ row.userName || '-' }}
            </template>
          </el-table-column>

          <el-table-column prop="userRole" label="用户角色" width="100">
            <template #default="{ row }">
              <el-tag
                :type="row.userRole === 'admin' ? 'danger' : 'primary'"
                size="small"
              >
                {{ row.userRole === 'admin' ? '管理员' : '普通用户' }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="userProfile" label="用户简介" min-width="150">
            <template #default="{ row }">
              <span class="truncate">{{ row.userProfile || '-' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" width="180" sortable="custom">
            <template #default="{ row }">
              {{ formatDate(row.createTime) }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <div class="flex space-x-2">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleViewUser(row)"
                  class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
                >
                  查看
                </el-button>
                <el-button
                  size="small"
                  @click="handleEditUser(row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDeleteUser(row)"
                  :disabled="row.userRole === 'admin'"
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <Pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-size-options="[10, 20, 50, 100]"
        @change="handlePaginationChange"
      />
    </div>

    <!-- 用户详情弹窗 -->
    <UserDetailDialog
      v-model="detailVisible"
      :user="selectedUser"
    />

    <!-- 用户编辑弹窗 -->
    <UserEditDialog
      v-model="showEditDialog"
      :user="selectedUser"
      @success="handleEditSuccess"
    />

    <!-- 新增用户弹窗 -->
    <UserAddDialog
      v-model="showAddDialog"
      @success="handleAddSuccess"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserListPage, deleteUser } from '@/api/user'
import UserDetailDialog from '@/components/user/UserDetailDialog.vue'
import UserEditDialog from '@/components/user/UserEditDialog.vue'
import UserAddDialog from '@/components/user/UserAddDialog.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import Pagination from '@/components/common/Pagination.vue'

const store = useStore()

// 响应式数据
const loading = ref(false)
const userList = ref([])
const selectedUser = ref(null)
const detailVisible = ref(false)
const showEditDialog = ref(false)
const showAddDialog = ref(false)

// 搜索字段配置
const searchFields = [
  {
    key: 'userAccount',
    label: '用户账号',
    type: 'text',
    placeholder: '请输入用户账号'
  },
  {
    key: 'userName',
    label: '用户昵称',
    type: 'text',
    placeholder: '请输入用户昵称'
  },
  {
    key: 'userRole',
    label: '用户角色',
    type: 'select',
    placeholder: '请选择用户角色',
    options: [
      { label: '普通用户', value: 'user' },
      { label: '管理员', value: 'admin' }
    ]
  },
  {
    key: 'id',
    label: '用户ID',
    type: 'number',
    placeholder: '请输入用户ID',
    min: 1
  }
]

// 搜索参数
const searchParams = reactive({})

// 分页数据
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  sortField: 'createTime',
  sortOrder: 'descend'
})

// 检查管理员权限
const isAdmin = computed(() => store.getters['user/isAdmin'])

// 加载用户列表
const loadUserList = async () => {
  if (!isAdmin.value) {
    ElMessage.error('您没有权限访问此页面')
    return
  }

  loading.value = true
  try {
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      sortField: pagination.sortField,
      sortOrder: pagination.sortOrder,
      ...searchParams
    }

    // 过滤空值
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    })

    const result = await getUserListPage(params)
    userList.value = result.records || []
    pagination.total = result.totalRow || 0

  } catch (error) {
    console.error('加载用户列表失败:', error)
    ElMessage.error('加载用户列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索用户
const handleSearch = (searchData) => {
  if (searchData.type === 'simple') {
    // 简单搜索
    Object.assign(searchParams, {
      userAccount: searchData.keyword,
      userName: searchData.keyword
    })
  } else if (searchData.type === 'advanced') {
    // 高级搜索
    Object.assign(searchParams, searchData.params)
  }
  
  pagination.current = 1
  loadUserList()
}

// 清空搜索
const handleClear = () => {
  Object.keys(searchParams).forEach(key => {
    delete searchParams[key]
  })
  pagination.current = 1
  loadUserList()
}

// 重置搜索
const handleReset = () => {
  Object.keys(searchParams).forEach(key => {
    delete searchParams[key]
  })
  pagination.current = 1
  loadUserList()
}

// 查看用户详情
const handleViewUser = (user) => {
  selectedUser.value = user
  detailVisible.value = true
}

// 编辑用户
const handleEditUser = (user) => {
  selectedUser.value = user
  showEditDialog.value = true
}

// 新增用户
const handleAddUser = () => {
  showAddDialog.value = true
}

// 删除用户
const handleDeleteUser = async (user) => {
  if (user.userRole === 'admin') {
    ElMessage.warning('不能删除管理员用户')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${user.userName || user.userAccount}" 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    await deleteUser(user.id)
    ElMessage.success('删除成功')
    loadUserList()

  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除用户失败:', error)
      ElMessage.error('删除用户失败')
    }
  }
}

// 排序变化
const handleSortChange = ({ prop, order }) => {
  pagination.sortField = prop
  pagination.sortOrder = order === 'ascending' ? 'ascend' : 'descend'
  loadUserList()
}

// 分页变化
const handlePaginationChange = ({ currentPage, pageSize }) => {
  pagination.current = currentPage
  pagination.pageSize = pageSize
  loadUserList()
}

// 编辑成功回调
const handleEditSuccess = () => {
  showEditDialog.value = false
  loadUserList()
}

const handleAddSuccess = () => {
  showAddDialog.value = false
  loadUserList()
}



// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 页面挂载时加载数据
onMounted(() => {
  loadUserList()
})
</script>

<style scoped>
/* 自定义表格样式 */
:deep(.el-table) {
  @apply text-color-text-dark;
}

:deep(.el-table th) {
  @apply bg-color-primary-sage/10 text-color-text-dark font-semibold;
}

:deep(.el-table tr:hover > td) {
  @apply bg-color-primary-sage/5;
}

/* 自定义分页样式 */
:deep(.el-pagination) {
  @apply text-color-text-dark;
}

:deep(.el-pagination .el-pager li.is-active) {
  @apply bg-color-accent-crimson border-color-accent-crimson text-white;
}

/* 移动端适配 */
@media (max-width: 1024px) {
  .search-form :deep(.el-form-item) {
    margin-bottom: 16px;
  }
}

/* 响应式网格 */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>