<template>
    <el-row>
        <el-col :span="4">
            <div class="box1">
                <div class="leftTitle" style="">中图法第五版图书类型列表</div>
                <div>
                    <ProductTree @getTreeData="getTreeData"></ProductTree>
                </div>
            </div>
        </el-col>
        <el-col :span="20" style="height: 100%;">
            <div class='box2'>
                <div class="rightTitle">图书分类展示</div>
                <div style="display: flex;flex-wrap: wrap;gap: 10px;">
                    <div style="margin: 20px;" v-for="(book, index) in data" :key="index">
                        <el-card style="width: 360px;min-height: 270px;flex: 0 0 360px;">
                            <template #header>
                                <h2>{{ book.title }}</h2>
                            </template>
                            <div style="display: flex; gap: 10px;min-height: 270px;">
                                <div style="width: 30%;">
                                    <img :src="book.coverImage ?
                                        `/src/assets/imgs/books/${book.coverImage}`
                                        : `/src/assets/imgs/books/common/暂无图片.png`" style="max-width: 100%;" />
                                </div>
                                <div style="width: 70%;position: relative;">
                                    <h3 style="padding-left: 10px;">作者：{{ book.author }}</h3>
                                    <p style="line-height: 30px;padding: 10px;">简介：{{ book.summary }}</p>
                                    <div style="position: absolute;bottom: 0;right: 0;">
                                        <el-button @click="handleBorrow(book)">申请借阅</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>

    <!-- 这里是隐藏的图书信息副本 -->
    <el-dialog v-model="borrowDialogVisible" title="可以借阅" width="50%">
        <el-descriptions :column="1" size="small" border>
            <el-descriptions-item label="书籍编号">{{ borrowBookForm.bookId }}</el-descriptions-item>
            <el-descriptions-item label="书名">{{ borrowBookForm.title }}</el-descriptions-item>
            <el-descriptions-item label="馆藏总量">{{ borrowBookForm.totalCopies }}</el-descriptions-item>
            <el-descriptions-item label="可借册数">{{ borrowBookForm.availableCopies }}</el-descriptions-item>
            <el-descriptions-item label="馆藏编号">{{ borrowBookForm.barcode }}</el-descriptions-item>
            <el-descriptions-item label="书籍副本编号">{{ borrowBookForm.copyId }}</el-descriptions-item>
            <el-descriptions-item label="存放位置">{{ borrowBookForm.location }}</el-descriptions-item>
            <el-descriptions-item label="定价">{{ borrowBookForm.price }}</el-descriptions-item>
        </el-descriptions>
        <template #footer>
            <span class="dislog-footer">
                <el-button @click="borrowDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="borrowBook(borrowBookForm)">确认借阅</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import ProductTree from '@/components/views/book/add/BookCategoryTree.vue'
import { onMounted, ref } from 'vue'
import { findBookByCategoryId } from '@/api/modules/books.js'
import { getBookCopyById } from '@/api/modules/bookCopy'
import { applyBorrow } from '@/api/modules/borrowRecordRequest'
import { ElMessage, ElMessageBox } from 'element-plus'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'
const route = useRouter()

// 去登录
const goLogin = () => {
    route.push('/login')
}


onMounted(() => {
    findBook()
})

const categoryId = ref(1)

const getTreeData = (val) => {
    categoryId.value = val.categoryId
    console.log('这是val', val)
    findBook()
}


const data = ref([])

const findBook = () => {
    findBookByCategoryId({ currentId: categoryId.value })
        .then(res => {
            if (res.code == 0) {
                data.value = res.data
                console.log(data.value)
            } else if (res.code == -1) {
                ElMessage.warning("当前分类下没有书籍")
                data.value = null
            } else {
                ElMessage.error('获取失败')
            }
        })
}


// 申请借书
const borrowDialogVisible = ref(false)
const borrowBookForm = ref({
    bookId: '',
    title: '',
    totalCopies: '',
    availableCopies: '',
    copyId: '',
    barcode: '',
    location: '',
    price: ''
})

const handleBorrow = (book: any) => {
    
    getBookCopyById({ id: book.bookId
    }).then(res => {
        if (res.code == 0) {
            console.log(res.data)
            borrowDialogVisible.value = true
            borrowBookForm.value = {
                bookId: book.bookId,
                title: book.title,
                totalCopies: book.totalCopies,
                availableCopies: book.availableCopies,
                copyId: res.data.copyId,
                barcode: res.data.barcode,
                location: res.data.location,
                price: book.price
            }
        } else {
            ElMessage.error(res.msg || "借阅失败")
        }

    })
    .catch(() => {
        ElMessage.info('当前书籍暂不可借')
    })
}

const borrowBook = (bookBorrowForm: any) => {
    ElMessageBox.confirm('确定要借阅当前书籍吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then((res) => {
        console.log(bookBorrowForm)
        const userStr = Cookies.get("user")
        const adminStr = Cookies.get("admin")
        const user = userStr ? JSON.parse(userStr) : null
        const admin = adminStr ? JSON.parse(adminStr) : null
        console.log(user)
        console.log(admin)
        if (!user && !admin) {
            ElMessage.warning("请先登录")
            goLogin()
            return
        }
        const currentUser = user || admin
        const id = { id: bookBorrowForm.bookId }
        applyBorrow(currentUser, id).then(res => {
            if (res.code === 0) {
                findBook()
                ElMessage.success('借阅申请成功，请及时前往馆内领取核销')
                borrowDialogVisible.value = false
            } else {
                ElMessage.error(res.msg || '借阅失败')
            }
        })
    }).catch(err => {
        ElMessage.info('已取消借阅')
    })
}



</script>

<style>
.box1 {
    border-right: 2px solid #868383;
    min-height: 93vh;
}

.box2 {
    /* border: 1px solid red; */
    min-height: 93vh;
}

.leftTitle {
    /* border: 1px solid red; */
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
}

.rightTitle {
    /* border: 1px solid red; */
    text-align: center;
    font-size: 30px;
}
</style>