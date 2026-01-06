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

            <div class="bookGroup" style="display: flex;justify-content: left;gap: 20px;">
                <el-button type="warning" @click="handleAdd()"><el-icon>
                        <Plus />
                    </el-icon>添加新用户</el-button>
                <el-upload class="upload-demo" :http-request="uploadExcel" :show-file-list="false">
                    <el-button type="warning"><el-icon>
                            <FolderAdd />
                        </el-icon>批量录入</el-button>
                </el-upload>
                <el-button type="warning" @click="handleBatchDelete"><el-icon>
                        <Delete />
                    </el-icon>批量删除</el-button>
                <el-button type="warning" @click="handleAddBalckUser"><el-icon>
                        <Plus />
                    </el-icon>添加黑名单</el-button>
            </div>
        </div>

        <!--这里是用户列表-->
        <div class="content">
            <el-table size="large" border :data="userList" style="width: 100%;" cell-class-name="table-center"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="userId" label="用户ID" width="90"></el-table-column>
                <el-table-column prop="username" label="用户名" width="120"></el-table-column>
                <el-table-column prop="realName" label="真名" width="90"></el-table-column>
                <el-table-column prop="studentId" label="学号" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="电话号码" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowLimit" label="最大借阅数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowCount" label="当前借阅数"></el-table-column>
                <el-table-column prop="borrowLimitDay" label="初次借阅天数" width="130"></el-table-column>
                <el-table-column prop="lastLoginTime" label="上次登录时间" width="180"></el-table-column>
                <el-table-column prop="status" label="账户状态"></el-table-column>
                <el-table-column prop="notes" label="备注"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.row)"><el-icon>
                                <Edit />
                            </el-icon>编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)"><el-icon>
                                <Delete />
                            </el-icon>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--这里是分页-->
            <Pagination :total="total" :page-size="pageSize" style="margin-left: 20px;"
                @getCurrentPage="handleCurrentChange" @size-change="handleChangePageSize"></Pagination>
        </div>

        <!--这里是隐藏的副本信息编辑界面-->
        <el-dialog v-model="editDialogVisible" title="编辑用户信息" width="50%">
            <el-form :model="editForm" label-width="100px">
                <el-form-item label="用户ID" required>
                    <el-input v-model="editForm.userId" placeholder="请输入用户ID" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" required>
                    <el-input v-model="editForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input v-model="editForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="editForm.realName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="学号" required>
                    <el-input v-model="editForm.studentId" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="editForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-select v-model="editForm.status" placeholder="请选择用户状态" style="width: 240px">
                        <el-option v-for="status in options" :key="status.value" :label="status.label"
                            :value="status.value" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dislog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitEdit">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 这里是隐藏的添加新用户窗口 -->
        <el-dialog v-model="addDialogVisible" title="新增新用户" width="50%">
            <el-form :model="addForm" label-width="100px">
                <el-form-item label="用户名" required>
                    <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" required>
                    <el-input v-model="addForm.password" placeholder="请输入用户名" show-password></el-input>
                </el-form-item>
                <el-form-item label="真名">
                    <el-input v-model="addForm.realName" placeholder="请输入真名"></el-input>
                </el-form-item>
                <el-form-item label="学号" required>
                    <el-input v-model="addForm.studentId" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="addForm.phone" placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" required>
                    <el-select v-model="addForm.userTypeId" placeholder="请选择用户类型" style="width: 240px">
                        <el-option v-for="status in optionTypes" :key="status.value" :label="status.label"
                            :value="status.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" required>
                    <el-select v-model="addForm.status" placeholder="请选择用户状态" style="width: 240px">
                        <el-option v-for="status in options" :key="status.value" :label="status.label"
                            :value="status.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addForm.notes" placeholder="请输入备注" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dislog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 隐藏的拉黑界面 -->
        <el-dialog v-model="addBlackDialogVisible" title="拉黑用户" width="30%">
            <el-form label-width="100px">
                <el-form-item label="用户ID" required>
                    <el-input v-model="addBlackUserId" placeholder="请输入要拉黑的用户ID"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dislog-footer">
                    <el-button @click="addBlackDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddBlack">确定</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUser, searchUser, editSelectUser, addUser, addBatchUser, deleteSelectUser, deleteSelectUserList, addUserInBlack } from '@/api/modules/user'
import Pagination from '@/components/utils/pagination/Pagination.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userList = ref([]) // 定义用户列表，用于从后端获取到用户信息
const pageSize = ref(10) // 定义每页显示的数量
const total = ref(0) // 定义总共有多少条数据
const isSearch = ref(false)
const currentPage = ref(1)
const paginationForm = ref({
    currentPage,
    pageSize
})

// 获取用户列表
const getAllUser = () => {
    getUser(paginationForm.value).then(res => {
        if (res.code == 0) {
            console.log(res.data)
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
    searchUser(searchForm.value, paginationForm.value).then((res) => {
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
        getUser()
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

// 批量删除

// 批量选择监听
const selectedIds = ref([])
const handleSelectionChange = (selection) => {
    selectedIds.value = selection.map(item => item.userId)  // 将勾选的id保存在数组中
}
const handleBatchDelete = () => {
    if (selectedIds.value.length === 0) {
        ElMessage.warning('请至少选择一条数据')
        return
    }
    ElMessageBox.confirm('确定要删除选中的书籍吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then((res) => {
        console.log(selectedIds.value)
        deleteSelectUserList(selectedIds.value).then((res) => {
            if (res.code === 0) {
                ElMessage.success('删除成功')
                getAllUser()
            } else {
                ElMessage.error(res.msg || '删除失败')
            }
        })
    }).catch(err => {
        ElMessage.info('已取消删除')
    })
}

// 单个删除功能
const handleDelete = (row) => {
    ElMessageBox.confirm(`确定要删除该用户信息【${row.username}】吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log({ id: row.userId })
        deleteSelectUser({ id: row.userId }).then(res => {
            if (res.code === 0) {
                ElMessage.success(res.msg)
                getAllUser()
            } else {
                ElMessage.error(res.msg || '删除失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 批量新增
const uploadExcel = (upload) => {
    const formData = new FormData()
    formData.append("file", upload.file)
    console.log(upload.file)
    addBatchUser(formData).then(res => {
        if (res.code == 0) {
            getAllUser()
            ElMessage.success(res.msg)
        } else {
            console.log(res.msg)
            ElMessage.error(res.msg || "导入失败")
        }
    })

}

// 这里是新增用户
const addDialogVisible = ref(false)
const addForm = ref({
    username: '',
    password: '',
    realName: '',
    studentId: '',
    userTypeId: '',
    phone: '',
    status: '',
    notes: '普通用户'
})
const optionTypes = [
    {
        value: 0,
        label: '管理员'
    },
    {
        value: 1,
        label: '普通用户'
    }
]
const submitAdd = () => {
    ElMessageBox.confirm('确定要保存修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log(addForm.value)
        addUser(addForm.value).then(res => {
            if (res.code === 0) {
                ElMessage.success('修改成功')
                addDialogVisible.value = false
                getAllUser() // 调用刷新的方法刷新列表
            } else {
                ElMessage.error(res.msg || '修改失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消修改')
    })
}
const handleAdd = () => {
    addDialogVisible.value = true
}

// 这里是用户信息编辑
const editDialogVisible = ref(false)
const editForm = ref({
    userId: '',
    username: '',
    password: '',
    realName: '',
    studentId: '',
    phone: '',
    status: ''
})
const options = [
    {
        value: '正常',
        label: '正常'
    },
    {
        value: '停用',
        label: '停用'
    },
    {
        value: '禁用',
        label: '禁用'
    }
]
const submitEdit = () => {
    ElMessageBox.confirm('确定要保存修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log(editForm.value)
        editSelectUser(editForm.value).then(res => {
            if (res.code === 0) {
                ElMessage.success('修改成功')
                editDialogVisible.value = false
                getAllUser() // 调用刷新的方法刷新列表
            } else {
                ElMessage.error(res.msg || '修改失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消修改')
    })
}
const handleEdit = (row) => {
    editForm.value = {
        userId: row.userId,
        username: row.username,
        password: '',
        realName: row.realName,
        studentId: row.studentId,
        phone: row.phone,
        status: row.status
    }
    editDialogVisible.value = true
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
            getAllUser() // 调用刷新的方法刷新列表
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