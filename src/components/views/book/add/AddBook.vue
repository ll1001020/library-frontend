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
                <div class="rightTitle">添加书籍</div>
                <hr />
                <h2>请在下面的表单内添加书籍信息</h2>
                <div class="elbox">
                    <el-form :model="bookForm" label-width="auto" style="max-width: 600px">
                        <el-form-item label="请输入书籍的ISBN">
                            <el-input v-model="bookForm.isbn" placeholder="书籍ISBN" prop="isbn" />
                        </el-form-item>
                        <el-form-item label="请输入书籍名称" required>
                            <el-input v-model="bookForm.title" placeholder="书籍名称" prop="title" />
                        </el-form-item>
                        <el-form-item label="请输入书籍作者">
                            <el-input v-model="bookForm.author" placeholder="书籍作者" prop="author" />
                        </el-form-item>
                        <el-form-item label="请输入书籍的出版社">
                            <el-input v-model="bookForm.publisher" placeholder="出版社" prop="publisher" />
                        </el-form-item>
                        <el-form-item label="请输入书籍出版时间">
                            <el-date-picker v-model="bookForm.publishDate" placeholder="出版时间" prop="publishDate" />
                        </el-form-item>
                        <el-form-item label="请输入书籍价格">
                            <el-input-number :precision="1" v-model="bookForm.price" placeholder="书籍价格" prop="price" />
                        </el-form-item>
                        <el-form-item label="请输入书籍简介">
                            <el-input v-model="bookForm.summary" placeholder="书籍简介" type="textarea" prop="summary" />
                        </el-form-item>
                        <el-form-item label="请输入书籍所属分类ID" required>
                            <el-input v-model="bookForm.categoryId" placeholder="分类ID" readonly prop="categoryId" />
                        </el-form-item>
                        <el-form-item label="请输入书籍所属分类名称" required>
                            <el-input v-model="bookForm.categoryName" placeholder="分类名称" readonly prop="categoryName" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">
                                添加商品
                            </el-button>
                            <el-button type="danger" @click="resetForm">清空列表</el-button>
                            <el-button type="success" @click="backProductList">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import ProductTree from './BookCategoryTree.vue'
import { ElMessage } from 'element-plus';
import { addBook } from '@/api/modules/books.js'
import { useRouter } from 'vue-router';
import dayjs from 'dayjs'
const router = useRouter()

let bookForm = reactive({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishDate: '',
    price: '',
    summary: '',
    categoryName: '',
    categoryId: '',
    coverImage: ''
})

const getTreeData = (val) => {
    bookForm.categoryName = val.clcName;
    bookForm.categoryId = val.categoryId;
}



function submitForm() {
    if (bookForm.categoryId === '') {
        ElMessage.error('添加失败，请选择类型')
    } else if (bookForm.title === '') {
        ElMessage.error('添加失败，请填写书名')
    } else {
        console.log(bookForm)
        bookForm.publishDate = dayjs(bookForm.publishDate).format("YYYY-MM-DD")
        addBook(bookForm).then((res) => {
            if (res.code == 0) {
                ElMessage.success('添加成功')
                resetForm()
            } else {
                ElMessage.error(res.msg || '添加失败')
                // console.log('添加书籍失败',res.msg)
            }
        })

    }
}

function resetForm() {

    bookForm.isbn = '',
        bookForm.title = '',
        bookForm.author = '',
        bookForm.publisher = '',
        bookForm.publishDate = '',
        bookForm.price = '',
        bookForm.summary = '',
        bookForm.coverImage = ''
}

function backProductList() {
    router.push('bookList')
}

</script>

<style>
* {
    margin: 0px;
    padding: 0px;
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


.box1 {
    border-right: 2px solid #868383;
    min-height: 93vh;
}

.box2 {
    /* border: 1px solid red; */
    min-height: 93vh;
}


.elbox {
    /* border: 1px solid red; */
    margin-left: 25px;
    margin-top: 20px;
    padding-top: 20px;
    padding-left: 20px;
    min-height: 500px;
    max-width: 900px;
}
</style>