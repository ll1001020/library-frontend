<template>
    <div class="personal-center-container">
        <!-- 用户信息头部 -->
        <div class="user-header">
            <div class="user-info">
                <div class="user-name">
                    <i class="el-icon-user-solid"></i>
                    <h2>欢迎你：{{ userInfo.username }}</h2>
                </div>
                <div class="user-details">
                    <div class="detail-item">
                        <i class="el-icon-reading"></i>
                        <span>{{ userInfo.readerType }}</span>
                    </div>
                    <div class="detail-item">
                        <i class="el-icon-s-custom"></i>
                        <span>用户ID：{{ currentUser.userId }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
                <!-- 当前借阅 -->
                <el-tab-pane label="当前借阅" name="current-borrow">
                    <div class="tab-content">
                        <div v-if="currentBorrowList.length > 0" class="data-table">
                            <el-table :data="currentBorrowList" style="width: 100%" size="medium">
                                <el-table-column prop="copyId" label="副本ID" width="100"></el-table-column>
                                <el-table-column prop="title" label="图书名称">
                                    <template #default="scope">
                                        <div class="book-info">
                                            <div class="book-title">{{ scope.row.title }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowDate" label="借阅日期" width="140">
                                    <template #default="scope">
                                        <span>{{ formatDateTime(scope.row.borrowDate) }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="dueDate" label="应还日期" width="140">
                                    <template #default="scope">
                                        <span :class="{ 'overdue-date': isOverdue(scope.row.dueDate) }">
                                            {{ formatDateTime(scope.row.dueDate) }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="renewCount" label="续借次数" width="90">
                                    <template #default="scope">
                                        <span>{{ scope.row.renewCount }}/3</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowStatus" label="状态" width="100">
                                    <template #default="scope">
                                        <span :class="getBorrowStatusClass(scope.row.borrowStatus)">
                                            {{ scope.row.borrowStatus }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template #default="scope">
                                        <el-button size="mini" type="primary" plain @click="handleRenew(scope.row)"
                                            :disabled="scope.row.renewCount >= 3">
                                            续借
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else class="empty-state">
                            <i class="el-icon-notebook-2"></i>
                            <p>暂无当前借阅记录</p>
                        </div>
                    </div>
                </el-tab-pane>

                <!-- 我的预约 -->
                <el-tab-pane label="我的预约" name="reservation">
                    <div class="tab-content">
                        <div v-if="requestBorrowList.length > 0" class="data-table">
                            <el-table :data="requestBorrowList" style="width: 100%" size="medium">
                                <el-table-column prop="copyId" label="副本ID" width="100"></el-table-column>
                                <el-table-column prop="title" label="图书名称">
                                    <template #default="scope">
                                        <div class="book-info">
                                            <div class="book-title">{{ scope.row.title }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowrequestDate" label="预约日期" width="140">
                                    <template #default="scope">
                                        <span>{{ formatDateTime(scope.row.borrowrequestDate) }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowpermitDate" label="处理日期" width="140">
                                    <template #default="scope">
                                        <span>{{ scope.row.borrowpermitDate ? formatDateTime(scope.row.borrowpermitDate)
                                            : '待处理' }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowrequestStatus" label="预约状态" width="100">
                                    <template #default="scope">
                                        <span :class="getRequestStatusClass(scope.row.borrowrequestStatus)">
                                            {{ scope.row.borrowrequestStatus }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="120">
                                    <template #default="scope">
                                        <el-button v-if="scope.row.borrowrequestStatus === '申请中'" size="mini"
                                            type="text" @click="handleCancelReservation(scope.row)">
                                            取消预约
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else class="empty-state">
                            <i class="el-icon-s-order"></i>
                            <p>暂无预约记录</p>
                        </div>
                    </div>
                </el-tab-pane>

                <!-- 借阅历史 -->
                <el-tab-pane label="借阅历史" name="borrow-history">
                    <div class="tab-content">
                        <div v-if="passBorrowList.length > 0" class="data-table">
                            <el-table :data="passBorrowList" style="width: 100%" size="medium">
                                <el-table-column prop="copyId" label="副本ID" width="100"></el-table-column>
                                <el-table-column prop="title" label="图书名称">
                                    <template #default="scope">
                                        <div class="book-info">
                                            <div class="book-title">{{ scope.row.title }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowDate" label="借阅日期" width="140">
                                    <template #default="scope">
                                        <span>{{ formatDateTime(scope.row.borrowDate) }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="actualReturnDate" label="归还日期" width="140">
                                    <template #default="scope">
                                        <span>{{ scope.row.actualReturnDate ? formatDateTime(scope.row.actualReturnDate)
                                            : '未归还' }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="dueDate" label="应还日期" width="140">
                                    <template #default="scope">
                                        <span>{{ formatDateTime(scope.row.dueDate) }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="renewCount" label="续借次数" width="90">
                                    <template #default="scope">
                                        <span>{{ scope.row.renewCount }}次</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="borrowStatus" label="借阅状态" width="100">
                                    <template #default="scope">
                                        <span :class="getBorrowStatusClass(scope.row.borrowStatus)">
                                            {{ scope.row.borrowStatus }}
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
                        <div v-else class="empty-state">
                            <i class="el-icon-document"></i>
                            <p>暂无借阅历史记录</p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPersonalBorrowInfoByUserId } from '@/api/modules/user'
import { permitRequestReject } from '@/api/modules/borrowRecordRequest'
import { borrowRenew } from '@/api/modules/borrowRecord'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const activeTab = ref('current-borrow')
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

// 获取用户信息
const userStr = ref(Cookies.get('user'))
const adminStr = ref(Cookies.get('admin'))
const user = userStr.value ? JSON.parse(userStr.value) : null
const admin = adminStr.value ? JSON.parse(adminStr.value) : null
const currentUser = user || admin || null

// 去登录
const goLogin = () => {
    router.push('/login')
}

// 用户信息
const userInfo = ref({
    username: currentUser?.username || '未登录',
    userId: currentUser?.userId || '',
    readerType: currentUser?.userTypeId == 0 ? "管理员" : "普通用户",
})

// 数据列表
const currentBorrowList = ref<any[]>([])
const passBorrowList = ref<any[]>([])
const requestBorrowList = ref<any[]>([])

// 方法
const handleTabClick = (tab: any) => {
    console.log('切换到标签:', tab.name)
}

// 日期格式化
const formatDateTime = (dateStr: string) => {
    if (!dateStr) return ''
    try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('zh-CN')
    } catch (e) {
        return dateStr
    }
}

// 判断是否逾期
const isOverdue = (dueDateStr: string) => {
    if (!dueDateStr) return false
    try {
        const dueDate = new Date(dueDateStr)
        const now = new Date()
        return dueDate < now
    } catch (e) {
        return false
    }
}

// 借阅状态样式
const getBorrowStatusClass = (status: string) => {
    return {
        'status-borrowing': status === '借阅中',
        'status-returned': status === '已归还',
        'status-overdue': status === '逾期',
    }
}

// 预约状态样式
const getRequestStatusClass = (status: string) => {
    return {
        'status-waiting': status === '申请中',
        'status-approved': status === '已通过',
        'status-rejected': status === '已拒绝',
        'status-cancelled': status === '已取消',
    }
}

const handleRenew = (row: any) => {
    if (row.renewCount >= 3) {
        ElMessage.warning('该图书已达到最大续借次数')
        return
    }

    ElMessageBox.confirm(`确定要续借书籍【${row.title}】吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        borrowRenew(currentUser, { id: row.recordId }).then(res => {
            if (res.code === 0) {
                ElMessage.success('续借成功')
                getPersonalBorrowInfo() // 调用刷新的方法刷新列表
            } else {
                ElMessage.error(res.msg || '续借失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消续借')
    })
}

const handleCancelReservation = (row: any) => {
    ElMessageBox.confirm(`确定要取消书籍【${row.title}】的预约吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        permitRequestReject(currentUser, { id: row.recordId }).then(res => {
            if (res.code === 0) {
                ElMessage.success('取消预约成功')
                getPersonalBorrowInfo() // 调用刷新的方法刷新列表
            } else {
                ElMessage.error('取消预约失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已放弃取消')
    })
}


// 获取用户所有借阅的信息
const getPersonalBorrowInfo = () => {
    if (!currentUser || !currentUser.userId) {
        ElMessage.error('用户信息获取失败，请重新登录')
        goLogin()
        return
    }

    getPersonalBorrowInfoByUserId({ id: currentUser.userId })
        .then(res => {
            if (res.code == 0) {
                // 处理当前借阅
                currentBorrowList.value = res.data.currentBorrow || []

                // 处理历史借阅
                passBorrowList.value = res.data.pastBorrow || []
                totalCount.value = passBorrowList.value.length

                // 处理预约记录
                requestBorrowList.value = res.data.requestBorrow || []
            } else if (res.code == -1) {
                ElMessage.warning("当前用户暂无任何借阅记录")
                currentBorrowList.value = []
                passBorrowList.value = []
                requestBorrowList.value = []
            }
        })
        .catch(error => {
            console.error('获取借阅信息失败:', error)
            ElMessage.error('获取借阅信息失败，请稍后重试')
        })
}

// 初始化
onMounted(() => {
    if (!currentUser) {
        ElMessage.error('请先登录')
        goLogin()
        return
    }

    getPersonalBorrowInfo()
    console.log('个人中心页面加载完成')
})
</script>

<style scoped>
.personal-center-container {
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
}

/* 用户信息头部 */
.user-header {
    background: white;
    border-radius: 8px;
    padding: 25px 30px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.user-name {
    display: flex;
    align-items: center;
    gap: 12px;
}

.user-name i {
    font-size: 28px;
    color: #3699aa;
}

.user-name h2 {
    font-size: 24px;
    color: #2c3e50;
    margin: 0;
    font-weight: 600;
}

.user-details {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #5a6c7d;
    font-size: 15px;
}

.detail-item i {
    color: #909399;
    font-size: 16px;
}

/* 主要内容区域 */
.main-content {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

/* 标签页样式 */
:deep(.el-tabs__header) {
    margin-bottom: 0;
    background: #f8fafc;
    padding: 0 20px;
}

:deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 500;
    height: 50px;
    line-height: 50px;
    padding: 0 25px;
}

:deep(.el-tabs__item.is-active) {
    background-color: white;
    color: #3699aa;
    border-bottom-color: white;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border: none;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    border: none;
    border-radius: 4px 4px 0 0;
    margin-right: 5px;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
    border-bottom: 2px solid #3699aa;
}

/* 标签内容区域 */
.tab-content {
    padding: 25px;
}

/* 图书信息 */
.book-info {
    line-height: 1.4;
}

.book-title {
    color: #2c3e50;
    font-weight: 500;
    margin-bottom: 4px;
}

/* 状态样式 */
.status-borrowing {
    color: #67c23a;
    font-weight: 500;
}

.status-returned {
    color: #909399;
}

.status-overdue {
    color: #f56c6c;
    font-weight: 500;
}

.status-waiting {
    color: #e6a23c;
    font-weight: 500;
}

.status-approved {
    color: #67c23a;
    font-weight: 500;
}

.status-rejected {
    color: #f56c6c;
}

.status-cancelled {
    color: #909399;
}

/* 逾期日期 */
.overdue-date {
    color: #f56c6c;
    font-weight: 500;
}

/* 空状态 */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #909399;
}

.empty-state i {
    font-size: 60px;
    margin-bottom: 20px;
    opacity: 0.5;
}

.empty-state p {
    font-size: 16px;
    margin: 0;
}

/* 分页 */
.pagination {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

/* 表格样式 */
.data-table {
    margin-top: 10px;
}

:deep(.el-table) {
    font-size: 14px;
}

:deep(.el-table th) {
    background-color: #f5f7fa;
    color: #2c3e50;
    font-weight: 600;
}

:deep(.el-table tr) {
    transition: background-color 0.2s;
}

:deep(.el-table tr:hover) {
    background-color: #f8fafc;
}

/* 按钮样式 */
:deep(.el-button--mini) {
    padding: 5px 10px;
    font-size: 12px;
}

:deep(.el-button--text) {
    padding: 5px 0;
    font-size: 13px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .personal-center-container {
        padding: 15px;
    }

    .user-header {
        padding: 20px;
    }

    .user-name h2 {
        font-size: 20px;
    }

    .user-details {
        flex-direction: column;
        gap: 12px;
    }

    :deep(.el-tabs__item) {
        padding: 0 15px;
        font-size: 14px;
    }

    .tab-content {
        padding: 20px 15px;
    }
}

@media (max-width: 576px) {
    .user-name {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    :deep(.el-tabs__item) {
        padding: 0 10px;
        font-size: 13px;
    }

    :deep(.el-table) {
        font-size: 13px;
    }

    :deep(.el-button--mini) {
        padding: 4px 8px;
        font-size: 11px;
    }
}
</style>