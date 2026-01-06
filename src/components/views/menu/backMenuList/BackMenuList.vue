<template>
    <div class="bookListBox">
        <!--这里是写按钮操作面板-->
        <div class="bookHeader">
            <div class="bookForm">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="菜单名称" value="1" />
                            <el-option label="菜单ID" value="2" />
                            <el-option label="父菜单ID" value="3" />
                            <el-option label="菜单状态" value="4" />
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
                    </el-icon>添加新菜单</el-button>
            </div>
        </div>

        <!--这里是用户列表-->
        <div class="content">
            <el-table size="large" border :data="menuList" style="width: 100%;" cell-class-name="table-center"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="menuBackId" label="菜单ID" width="90"></el-table-column>
                <el-table-column prop="title" label="菜单名称" width="100"></el-table-column>
                <el-table-column prop="icon" label="菜单图标" width="100"></el-table-column>
                <el-table-column prop="path" label="组件路径" width="180"></el-table-column>
                <el-table-column prop="parentId" label="父菜单ID" width="130"></el-table-column>
                <el-table-column prop="creatorId" label="创建者ID" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="菜单状态" width="130" show-overflow-tooltip>
                    <template #default="{ row }">
                        {{ row.status === 1 ? '启用' : '禁用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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
        <el-dialog v-model="editDialogVisible" title="编辑菜单信息" width="50%">
            <el-form :model="editForm" label-width="100px">
                <el-form-item label="菜单ID" required>
                    <el-input v-model="editForm.menuBackId" placeholder="请输入菜单ID" disabled></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" required>
                    <el-input v-model="editForm.title" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="组件路径" required>
                    <el-input v-model="editForm.path" placeholder="请输入组件路径"></el-input>
                </el-form-item>
                <el-form-item label="父菜单ID">
                    <el-input v-model="editForm.parentId" placeholder="请输入父菜单ID"></el-input>
                </el-form-item>
                <el-form-item label="创建者ID" required>
                    <el-input v-model="editForm.creatorId" placeholder="请输入创建者ID" disabled></el-input>
                </el-form-item>
                <el-form-item label="菜单状态">
                    <el-select v-model="editForm.status" placeholder="请选择菜单状态" style="width: 240px">
                        <el-option v-for="status in options" :key="status.value" :label="status.label"
                            :value="status.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单图标" required>
                    <ElIconPicker v-model="editForm.icon" :fatherIcon="iconList"></ElIconPicker>
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
        <el-dialog v-model="addDialogVisible" title="新增菜单" width="50%">
            <el-form :model="addForm" label-width="100px">
                <el-form-item label="菜单名称" required>
                    <el-input v-model="addForm.title" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="组件路径" required>
                    <el-input v-model="addForm.path" placeholder="请输入组件路径"></el-input>
                </el-form-item>
                <el-form-item label="父菜单ID">
                    <el-input v-model="addForm.parentId" placeholder="请输入父菜单ID，默认为0"></el-input>
                </el-form-item>
                <el-form-item label="创建者ID" required>
                    <el-input v-model="addForm.creatorId" placeholder="请输入创建者ID"></el-input>
                </el-form-item>
                <el-form-item label="菜单状态" required>
                    <el-select v-model="addForm.status" placeholder="请选择菜单状态" style="width: 240px">
                        <el-option v-for="status in optionTypes" :key="status.value" :label="status.label"
                            :value="status.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单图标" required>
                    <ElIconPicker v-model="addForm.icon" :fatherIcon="iconList"></ElIconPicker>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dislog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMenuBack, searchMenuBack, addMenuBack, deleteSelectMenuBack, editSelectMenuBack } from '@/api/modules/menuBack'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Pagination from '@/components/utils/pagination/Pagination.vue'
import ElIconPicker from '@/components/utils/icon/Icon.vue'
const menuList = ref([]) // 定义用户列表，用于从后端获取到用户信息
const pageSize = ref(10) // 定义每页显示的数量
const total = ref(0) // 定义总共有多少条数据
const isSearch = ref(false)
const currentPage = ref(1)
const paginationForm = ref({
    currentPage,
    pageSize
})
// 获取带分页的前台菜单列表
const getAllMenu = () => {
    getMenuBack(paginationForm.value).then(res => {
        if (res.code == 0) {
            menuList.value = res.data
            total.value = res.paginationVO.total
        } else {
            ElMessage.error(res.msg || "网络错误")
        }
    })
}

onMounted(() => {
    getAllMenu()
    getIcons()
})

// 分页功能

// 这里设置当前页码
function handleCurrentChange(val) {
    // console.log('当前页码', val)
    paginationForm.value.currentPage = val
    if (isSearch.value == false) {
        getAllMenu(paginationForm.value)
    } else {
        getSearchList(searchForm.value, paginationForm.value)
    }

}

// 设置当前页面每页显示条数
function handleChangePageSize(val) {
    console.log('每页显示条数', val)
    paginationForm.value.pageSize = val
    if (isSearch.value == false) {
        getAllMenu(paginationForm.value)
    } else {
        getSearchList(searchForm.value, paginationForm.value)
    }
}

// 查询功能

const select = ref('1') // 定义select用来控制选择搜索选项
const selectList = ref({
    1: '菜单名称',
    2: '菜单ID',
    3: '父菜单ID',
    4: '菜单状态'
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
    searchMenuBack(searchForm.value, paginationForm.value).then((res) => {
        console.log('搜索结果', res.data)
        console.log(res.msg)
        menuList.value = res.data || []
        total.value = res.paginationVO.total
    })
        .catch(err => {
            console.error("搜索菜单失败", err)
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
    getAllMenu()
}

// 单个删除功能
const handleDelete = (row) => {
    ElMessageBox.confirm(`确定要删除菜单【${row.title}】吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log({ id: row.menuBackId })
        deleteSelectMenuBack({ id: row.menuBackId }).then(res => {
            if (res.code === 0) {
                ElMessage.success(res.msg)
                getAllMenu()
            } else {
                ElMessage.error(res.msg || '删除失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 这里是初始化图标组件
const iconList = ref([]);
const getIcons = () => {
    iconList.value = Object.keys(ElementPlusIconsVue).map(key => ({
        value: key
    }));
};


// 这里是新增菜单
const addDialogVisible = ref(false)
const addForm = ref({
    title: '',
    icon: '请选择图标',
    path: '',
    parentId: '',
    creatorId: '',
    status: ''
})
const optionTypes = [
    {
        value: 0,
        label: '禁用'
    },
    {
        value: 1,
        label: '启用'
    }
]
const submitAdd = () => {
    ElMessageBox.confirm('确定要保存修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log(addForm.value)
        addMenuBack(addForm.value).then(res => {
            if (res.code === 0) {
                ElMessage.success('修改成功')
                addDialogVisible.value = false
                getAllMenu() // 调用刷新的方法刷新列表
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
    menuId: '',
    title: '',
    icon: '',
    path: '',
    parentId: 0,
    creatorId: '',
    status: ''
})
const options = [
    {
        value: '1',
        label: '启用'
    },
    {
        value: '0',
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
        if (editForm.value.status === '启用') {
            editForm.value.status = 1
        } else {
            editForm.value.status = 0
        }
        editSelectMenuBack(editForm.value).then(res => {
            if (res.code === 0) {
                ElMessage.success('修改成功')
                editDialogVisible.value = false
                getAllMenu() // 调用刷新的方法刷新列表
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
        menuId: row.menuBackId,
        title: row.title,
        icon: row.icon,
        path: row.path,
        parentId: row.parentId,
        creatorId: row.creatorId,
        status: row.status === 1 ? "启用" : "禁用",
    }
    editDialogVisible.value = true
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