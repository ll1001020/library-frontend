<template>
    <div class="bookListBox">
        <!--这里是写按钮操作面板-->
        <div class="bookHeader">
            <div class="bookForm">
                <el-form :inline="true" class="demo-form-inline" >
                    <el-form-item>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="书名" value="1" />
                            <el-option label="ISBN" value="2" />
                            <el-option label="作者" value="3" />
                            <el-option label="出版社" value="4" />
                            <el-option label="书籍ID" value="5" />
                        </el-select>
                        <el-checkbox v-model="isPrecise" label="精确查找" style="margin-left: 20px;"></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchText" :placeholder="selectName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleSearch" type="primary">查询</el-button>
                        <el-button @click="toBack" type="success">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-bottom: 20px;">
                <div>
                    <el-date-picker v-model="startTime" type="date" placeholder="设置出版日期开始区间"/>
                        <el-date-picker v-model="endTime" type="date" placeholder="设置出版日期结束区间" format="YYYY-MM-DD"/>
                </div>
            </div>

            <div class="bookGroup">
                <el-button type="warning" @click="$router.push('addbook')"><el-icon>
                        <Plus />
                    </el-icon>添加新书</el-button>
                <el-button type="warning" @click="handleBatchDelete"><el-icon>
                        <Delete />
                    </el-icon>批量删除</el-button>
            </div>
        </div>

        <!--这里是产品列表-->
        <div class="content">
            <el-table size="large" border :data="bookList" style="width: 100%;" cell-class-name="table-center"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="bookId" label="ID" width="60"></el-table-column>
                <el-table-column prop="isbn" label="书籍ISBN" width="180"></el-table-column>
                <el-table-column prop="title" label="书名" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="author" label="作者" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="publisher" label="出版社" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="publishDate" label="出版日期"></el-table-column>
                <el-table-column prop="price" label="价格" width="80"></el-table-column>
                <el-table-column prop="summary" label="书籍简介" show-overflow-tooltip></el-table-column>
                <el-table-column prop="totalCopies" label="馆藏总数"></el-table-column>
                <el-table-column prop="availableCopies" label="可借出数量"></el-table-column>
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
            <Pagination :total="total" :page-size="pageSize"  style="margin-left: 20px;"
                @getCurrentPage="handleCurrentChange"
                @size-change="handleChangePageSize"></Pagination>
        </div>

        <!--这里是隐藏的编辑界面-->
        <!-- <el-dialog v-model="editDialogVisible" title="编辑商品" width="50%">
            <el-form :model="editForm" label-width="100px">
                <el-form-item label="商品名称">
                    <el-input v-model="editForm.title" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="editForm.price" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="商品类目">
                    <el-input v-model="editForm.category" placeholder="请输入商品类目"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="editForm.sellPoint" type="textarea" placeholder="请输入商品卖点"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="editForm.descs" type="textarea" placeholder="请输入商品描述"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dislog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitEdit">保存</el-button>
                </span>
            </template>
        </el-dialog> -->

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBooksList, searchBook } from '@/api/modules/books'
import Pagination from '@/components/utils/pagination/Pagination.vue'
import dayjs from 'dayjs'
const bookList = ref([]) // 定义书籍列表，用于从后端获取数据
const pageSize = ref(10) // 定义每页显示的数量
const total = ref(0) // 定义总共有多少条数据
const currentPage = ref(1)
const paginationForm = ref({
    currentPage,
    pageSize
})

// 获取书籍列表
const getBooks = () => {
    getBooksList(paginationForm.value).then((res) => {
        console.log('书籍数据', res)
        bookList.value = res.data || []
        total.value = res.paginationVO.total
    }).catch(err => {
        console.error("获取书籍信息失败", err)
    })
}
onMounted(() => {
    getBooks()
})

// 这里设置当前页码
function handleCurrentChange(val) {
    console.log('当前页码', val)
    paginationForm.value.currentPage = val
    getBooks(paginationForm.value)
}

// 设置当前页面每页显示条数
function handleChangePageSize(val) {
    console.log('每页显示条数', val)
    paginationForm.value.pageSize = val
    getbookList(paginationForm)
}

// 查询功能
const select = ref('1') // 定义select用来控制选择搜索选项
const selectList = ref({
    1: '书名',
    2: 'ISBN',
    3: '作者',
    4: '出版社',
    5: '书籍ID'
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
// 获取到出版起始时间区间
const startTime = ref()
const endTime = ref()
const publisherStartTime = computed(()=>{
    return startTime.value ? dayjs(startTime.value).format('YYYY-MM-DD'):''
})
const publisherEndTime = computed(()=>{
    return endTime.value ? dayjs(endTime.value).format('YYYY-MM-DD'):''
})

// 定义上传的表单
const searchForm = ref({
    searchContent: searchContent,
    searchType: selectName,
    searchPrecise: searchPrecise,
    publisherStartTime: publisherStartTime,
    publisherEndTime: publisherEndTime
})
// 点击按钮事件，上传表单获取搜索的数据
const handleSearch = () => {
    if (!searchForm) {
        getBooks()
    }
    // console.log(searchForm.value)
    searchBook(searchForm.value).then((res) => {
        console.log('搜索结果', res.data)
        console.log(res.msg)
        bookList.value = res.data || []
    })
        .catch(err => {
            console.error("搜索书籍失败", err)
        })
}

// 清空查询，刷新
const toBack = () => {
    searchText.value = ''
    getBooks()
}

// 批量选择监听
// const selectedIds = ref([])
// const handleSelectionChange = (selection) => {
//     selectedIds.value = selection.map(item => item.id)  // 将勾选的id保存在数组中
// }

// 批量删除
// const handleBatchDelete = () => {
//     if (selectedIds.value.length === 0) {
//         ElMessage.warning('请至少选择一条数据')
//         return
//     }
//     ElMessageBox.confirm('确定要删除选中的商品吗？', '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//     }).then((res) => {
//         axios.get('http://localhost:6688/goods/batchDelete', {
//             params: {
//                 ids: selectedIds.value.join(',')
//             }
//         })
//             .then((res) => {
//                 if (res.data.status === 200) {
//                     ElMessage.success('删除成功')
//                     getbookList()
//                 } else {
//                     ElMessage.error(res.data.msg || '删除失败')
//                 }
//             })
//             .catch(err => {
//                 console.error('删除失败', err)
//                 ElMessage.erroe('删除失败')
//             })
//     }).catch(err => {
//         ElMessage.info('已取消删除')
//     })
// }

// 单个删除功能
// const handleDelete = (row) => {
//     ElMessageBox.confirm(`确定要删除商品【${row.title}】吗？`, '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//     }).then(() => {
//         axios.get('http://localhost:6688/goods/deleteItemById', {
//             params: {
//                 id: row.id
//             }
//         })
//             .then(res => {
//                 if (res.data.status === 200) {
//                     ElMessage.success('删除成功')
//                     getbookList()
//                 } else {
//                     ElMessage.error(res.data.msg || '删除失败')
//                 }
//             })
//             .catch(err => {
//                 console.error('删除失败', err)
//                 ElMessage.error('删除失败')
//             })
//     }).catch(() => {
//         ElMessage.info('已取消删除')
//     })
// }

// 这里是书籍信息编辑
// const editDialogVisible = ref(false)
// const editForm = ref({
//     id: '',
//     title: '',
//     price: '',
//     category: '',
//     sellPoint: '',
//     descs: ''
// })
// const submitEdit = () => {
//     ElMessageBox.confirm('确定要保存修改吗？', '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//     }).then(() => {
//         axios.get('http://localhost:6688/goods/item/updateTbItem', { params: editForm.value })
//             .then(res => {
//                 if (res.data.status === 200) {
//                     ElMessage.success('修改成功')
//                     editDialogVisible.value = false
//                     getbookList() // 调用刷新的方法刷新列表
//                 } else {
//                     ElMessage.error(res.data.msg || '修改失败')
//                 }
//             })
//             .catch(err => {
//                 console.error('修改失败', err)
//                 ElMessage.erroe('修改失败')
//             })
//     }).catch(() => {
//         ElMessage.info('已取消修改')
//     })
// }
// const handleEdit = (row) => {
//     editForm.value = {
//         id: row.id,
//         title: row.title,
//         price: row.price,
//         category: row.category,
//         sellPoint: row.sellPoint,
//         descs: row.descs
//     }
//     editDialogVisible.value = true
// }

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