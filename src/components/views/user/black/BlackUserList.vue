<template>
    <div class="bookListBox">
        <!--这里是写按钮操作面板-->
        <div class="bookHeader">
            <div class="bookForm">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="学号" value="1" />
                            <el-option label="用户名" value="2" />
                            <el-option label="用户ID" value="3" />
                            <el-option label="电话号码" value="4" />
                            <el-option label="真名" value="5" />
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
        </div>

        <!--这里是用户列表-->
        <div class="content">
            <el-table size="large" border :data="userList" style="width: 100%;" cell-class-name="table-center"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="userId" label="用户ID" width="90"></el-table-column>
                <el-table-column prop="username" label="用户名" width="100"></el-table-column>
                <el-table-column prop="realName" label="真名" width="90"></el-table-column>
                <el-table-column prop="studentId" label="学号" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="电话号码" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowLimit" label="最大借阅数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowedCount" label="当前借阅数"></el-table-column>
                <el-table-column prop="borrowLimitDay" label="初次借阅天数" width="130"></el-table-column>
                <el-table-column prop="lastLoginTime" label="上次登录时间" width="130"></el-table-column>
                <el-table-column prop="status" label="账户状态"></el-table-column>
                <el-table-column prop="notes" label="备注"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="submitRemoveBlack(scope.row)"><el-icon>
                                <Edit />
                            </el-icon>移出黑名单</el-button>
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
import { getBlackUser,removeUserInBlack,searchBlackUser } from '@/api/modules/user'
import Pagination from '@/components/utils/pagination/Pagination.vue'
const userList = ref([]) // 定义用户列表，用于从后端获取到用户信息
const pageSize = ref(10) // 定义每页显示的数量
const total = ref(0) // 定义总共有多少条数据
const isSearch = ref(false)
const currentPage = ref(1)
const paginationForm = ref({
    currentPage,
    pageSize
})

// 获取黑名单用户列表
const getAllUser = () => {
    getBlackUser(paginationForm.value).then(res => {
        if (res.code == 0) {
            userList.value = res.data
            total.value = res.paginationVO.total
        } else {
            ElMessage.error(res.msg || "网络错误")
        }
    })
}

onMounted(() => {
    getAllUser()
})

// 分页功能

// 这里设置当前页码
function handleCurrentChange(val) {
    // console.log('当前页码', val)
    paginationForm.value.currentPage = val
    if (isSearch.value == false) {
        getAllUser(paginationForm.value)
    } else {
        getSearchList(searchForm.value, paginationForm.value)
    }

}

// 设置当前页面每页显示条数
function handleChangePageSize(val) {
    console.log('每页显示条数', val)
    paginationForm.value.pageSize = val
    if (isSearch.value == false) {
        getAllUser(paginationForm.value)
    } else {
        getSearchList(searchForm.value, paginationForm.value)
    }
}

// 查询功能

const select = ref('1') // 定义select用来控制选择搜索选项
const selectList = ref({
    1: '学号',
    2: '用户名',
    3: '用户ID',
    4: '电话号码',
    5: '真名'
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

// 定义上传的搜索表单
const searchForm = ref({
    searchContent: searchContent,
    searchType: selectName,
    searchPrecise: searchPrecise,
    publisherStartTime: '',
    publisherEndTime: ''
})
const getSearchList = () => {
    searchBlackUser(searchForm.value, paginationForm.value).then((res) => {
        console.log('搜索结果', res.data)
        console.log(res.msg)
        userList.value = res.data || []
        total.value = res.paginationVO.total
    })
        .catch(err => {
            console.error("搜索书籍失败", err)
        })

}
// 点击按钮事件，上传表单获取搜索的数据
const handleSearch = () => {
    if (!searchForm) {
        getBooks()
    }
    isSearch.value = true
    // console.log(searchForm.value)
    getSearchList()
}

// 清空查询，刷新
const toBack = () => {
    searchText.value = ''
    isSearch.value = false
    getAllUser()
}

// 移除黑名单（设置状态为正常）
const submitRemoveBlack = (row)=>{
    ElMessageBox.confirm(`确定将用户 "${row.username}" 移出黑名单吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log(row.userId)
        removeUserInBlack({id:row.userId}).then(res => {
            if (res.code === 0) {
                ElMessage.success('移除成功')
                getAllUser() // 调用刷新的方法刷新列表
            } else {
                ElMessage.error(res.msg || '移除失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消')
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