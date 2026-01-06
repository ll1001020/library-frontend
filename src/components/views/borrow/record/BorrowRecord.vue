<template>
    <div class="bookListBox">
        <!--这里是写按钮操作面板-->
        <div class="bookHeader">
            <div class="bookForm">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="用户名" value="1" />
                            <el-option label="书籍名" value="2" />
                            <el-option label="用户ID" value="3" />
                            <el-option label="书籍ID" value="4" />
                            <el-option label="借阅状态" value="5" />
                        </el-select>
                        <el-checkbox v-model="isPrecise" label="精确查找" style="margin-left: 20px;"></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchText" :placeholder="selectName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleSearch" type="primary">查询</el-button>
                        <el-button @click="toBack" type="success">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-bottom: 20px;">
                <div>
                    <el-date-picker v-model="startTime" type="datetime" placeholder="设置截止借阅开始日期" />
                    <el-date-picker v-model="endTime" type="datetime" placeholder="设置截止借阅结束日期" />
                </div>
            </div>
            <div class="bookGroup" style="display: flex;justify-content: left;gap: 20px;">
                <el-button type="warning" @click="handleBatchDelete"><el-icon>
                        <Delete />
                    </el-icon>批量删除</el-button>
            </div>
        </div>

        <!--这里是用户列表-->
        <div class="content">
            <el-table size="large" border :data="borrowList" style="width: 100%;" cell-class-name="table-center"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="recordId" label="记录ID" width="90"></el-table-column>
                <el-table-column prop="userId" label="用户ID" width="90"></el-table-column>
                <el-table-column prop="username" label="用户名" width="130"></el-table-column>
                <el-table-column prop="copyId" label="副本ID" width="90"></el-table-column>
                <el-table-column prop="title" label="书籍名称" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowDate" label="开始借阅时间"width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="dueDate" label="截止借阅时间" width="130"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="actualReturnDate" label="实际归还时间" width="130"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowStatus" label="借阅状态" width="130"></el-table-column>
                <el-table-column prop="renewCount" label="续借次数"></el-table-column>
                <el-table-column prop="creatorId" label="操作员ID"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleRenew(scope.row)"><el-icon>
                                <Edit />
                            </el-icon>续借</el-button>
                        <el-button size="small" type="danger" @click="handleReturn(scope.row)"><el-icon>
                                <Check />
                            </el-icon>登记归还</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--这里是分页-->
            <Pagination :total="total" :page-size="pageSize" style="margin-left: 20px;"
                @getCurrentPage="handleCurrentChange" @size-change="handleChangePageSize"></Pagination>
        </div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteSelectUserList, addUserInBlack } from '@/api/modules/user'
import { getBorrowRecord, searchRecord, borrowReturn, borrowRenew, deleteSelectBorrowList } from '@/api/modules/borrowRecord'
import Pagination from '@/components/utils/pagination/Pagination.vue'
import dayjs from 'dayjs'
import Cookies from 'js-cookie';
import { useRoute } from 'vue-router'
const route = useRoute()
const borrowList = ref([]) // 定义用户列表，用于从后端获取到用户信息
const pageSize = ref(10) // 定义每页显示的数量
const total = ref(0) // 定义总共有多少条数据
const isSearch = ref(false)
const currentPage = ref(1)
const paginationForm = ref({
    currentPage,
    pageSize
})

// 获取书籍副本列表
const getAllBorrowRecord = () => {
    getBorrowRecord(paginationForm.value).then(res => {
        if (res.code == 0) {
            borrowList.value = res.data
            total.value = res.paginationVO.total
        } else {
            ElMessage.error(res.msg || "网络错误")
        }
    })
}

onMounted(() => {
    getAllBorrowRecord()
})

// 分页功能

// 这里设置当前页码
function handleCurrentChange(val) {
    // console.log('当前页码', val)
    paginationForm.value.currentPage = val
    if (isSearch.value == false) {
        getAllBorrowRecord(paginationForm.value)
    } else {
        getSearchList(searchForm.value, paginationForm.value)
    }

}

// 设置当前页面每页显示条数
function handleChangePageSize(val) {
    console.log('每页显示条数', val)
    paginationForm.value.pageSize = val
    if (isSearch.value == false) {
        getAllBorrowRecord(paginationForm.value)
    } else {
        getSearchList(searchForm.value, paginationForm.value)
    }
}

// 查询功能

const select = ref('1') // 定义select用来控制选择搜索选项
const selectList = ref({
    1: '用户名',
    2: '书籍名',
    3: '用户ID',
    4: '书籍ID',
    5: '借阅状态'
})
const selectName = computed(() => {  // 计算属性，从selectList中根据select获取到对应的选项文本
    return selectList.value[select.value]
})
const searchText = ref('') // 定义搜索文本变量
const searchContent = computed(() => {  // 计算属性，从searchText中获取到查询的文本
    return searchText.value
})
const isPrecise = ref(false)
const searchPrecise = computed(() => {  // 计算属性，根据isPrecise判断是否精确查询，0为精确查找，1为模糊查找
    return isPrecise.value ? 0 : 1
})
// 设置借阅时间的截止区间
const startTime = ref()
const endTime = ref()
const recordStartTime = computed(() => {
    return startTime.value ? dayjs(startTime.value).format('YYYY-MM-DD HH:mm:ss') : ''
})
const recordEndTime = computed(() => {
    return endTime.value ? dayjs(endTime.value).format('YYYY-MM-DD HH:mm:ss') : ''
})

// 定义上传的搜索表单
const searchForm = ref({
    searchContent: searchContent,
    searchType: selectName,
    searchPrecise: searchPrecise,
    publisherStartTime: recordStartTime,
    publisherEndTime: recordEndTime
})
const getSearchList = () => {
    searchRecord(searchForm.value, paginationForm.value).then((res) => {
        console.log('搜索结果', res.data)
        console.log(res.msg)
        borrowList.value = res.data || []
        total.value = res.paginationVO.total
    })
        .catch(err => {
            console.error("搜索记录失败", err)
        })

}
// 点击按钮事件，上传表单获取搜索的数据
const handleSearch = () => {
    if (!searchForm) {
        getAllBorrowRecord()
    }
    isSearch.value = true
    // console.log(searchForm.value)
    getSearchList()
}

// 清空查询，刷新
const toBack = () => {
    searchText.value = ''
    startTime.value = ''
    endTime.value = ''
    isSearch.value = false
    getAllBorrowRecord()
}

// 批量删除

// 批量选择监听
const selectedIds = ref([])
const handleSelectionChange = (selection) => {
    selectedIds.value = selection.map(item => item.recordId)  // 将勾选的id保存在数组中
}
const handleBatchDelete = () => {
    if (selectedIds.value.length === 0) {
        ElMessage.warning('请至少选择一条数据')
        return
    }
    ElMessageBox.confirm('确定要删除选中的借阅记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then((res) => {
        console.log(selectedIds.value)
        deleteSelectBorrowList(selectedIds.value).then((res) => {
            if (res.code === 0) {
                ElMessage.success('删除成功')
                getAllBorrowRecord()
            } else {
                ElMessage.error(res.msg || '删除失败')
            }
        })
    }).catch(err => {
        ElMessage.info('已取消删除')
    })
}

// 登记归还功能
const handleReturn = (row) => {
    ElMessageBox.confirm(`确定登记用户【${row.username}】借阅书籍【${row.title}】的记录已经完成吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log({ id: row.recordId })
        const userStr = Cookies.get("user")
        const adminStr = Cookies.get("admin")
        const user = userStr ? JSON.parse(userStr) : null
        const admin = adminStr ? JSON.parse(adminStr) : null
        const currentUser = user || admin
        borrowReturn(currentUser,{ id: row.recordId }).then(res => {
            if (res.code === 0) {
                ElMessage.success(res.msg)
                getAllBorrowRecord()
            } else {
                ElMessage.error(res.msg || '归还失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消归还登记')
    })
}

// 这里为用户进行续借操作
const handleRenew = (row) => {
    ElMessageBox.confirm(`确定要为用户【${row.username}】续借书籍【${row.title}】吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        const userStr = Cookies.get("user")
        const adminStr = Cookies.get("admin")
        const user = userStr ? JSON.parse(userStr) : null
        const admin = adminStr ? JSON.parse(adminStr) : null
        const currentUser = user || admin
        borrowRenew(currentUser,{ id: row.recordId }).then(res => {
            if (res.code === 0) {
                ElMessage.success('续借成功')
                getAllBorrowRecord() // 调用刷新的方法刷新列表
            } else {
                ElMessage.error(res.msg || '续借失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消续借')
    })
}

// 添加黑名单用户（设置状态为禁用）
const addBlackDialogVisible = ref(false)
const addBlackUserId = ref()

const handleAddBalckUser = () => {
    addBlackDialogVisible.value = true
}
const submitAddBlack = () => {
    console.log(addBlackUserId.value)
    addUserInBlack({ id: addBlackUserId.value }).then(res => {
        if (res.code === 0) {
            ElMessage.success('拉黑成功')
            addBlackDialogVisible.value = false
            getAllBorrowRecord() // 调用刷新的方法刷新列表
        } else {
            ElMessage.error(res.msg || '拉黑失败')
        }
    })

}

</script>

<style scoped>
.bookListBox {
    display: flex;
    flex-direction: column;
}

.bookHeader {
    /* border: 1px solid red; */
    margin: 10px;
    padding: 10px;
}

.group {
    border: 1px solid #eee;
    padding: 8px;
    margin-bottom: 10px;
}
</style>