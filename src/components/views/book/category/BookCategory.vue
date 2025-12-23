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
            <el-scrollbar style="height: 93vh;overflow: auto;">
                <div class='box2'>
                    <div class="rightTitle">图书分类展示</div>
                    <div style="display: flex;flex-wrap: wrap;gap: 10px;">
                        <div style="margin: 20px;" v-for="(book, index) in data" :key="index">
                            <el-card style="max-width: 360px;min-height: 270px;flex: 0 0 360px;">
                                <template #header>
                                    <h2>{{ book.title }}</h2>
                                </template>
                                <div style="display: flex; gap: 10px;min-height: 270px;">
                                    <div style="width: 30%;">
                                        <img :src="book.coverImage ? 
                                        `/src/assets/imgs/books/${book.coverImage}` 
                                        : `/src/assets/imgs/books/common/暂无图片.png`"
                                            style="max-width: 100%;" />
                                    </div>
                                    <div style="width: 70%;position: relative;">
                                        <h3 style="padding-left: 10px;">作者：{{ book.author }}</h3>
                                        <p style="line-height: 30px;padding: 10px;">简介：{{ book.summary }}</p>
                                        <div style="position: absolute;bottom: 0;right: 0;">
                                            <router-link :to="{ name: 'bookCopy', query: { bookId: book.bookId } }">
                                                <el-button>查看馆藏</el-button>
                                            </router-link>
                                        </div>
                                    </div>

                                </div>
                            </el-card>
                        </div>
                    </div>
                </div>
            </el-scrollbar>

        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import ProductTree from '../add/BookCategoryTree.vue'
import { onMounted, ref } from 'vue'
import { findBookByCategoryId } from '@/api/modules/books.js'
import { ElMessage } from 'element-plus'

onMounted(()=>{
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
                ElMessage.warning("当前分类下没有书籍,请前往图书列表添加")
                data.value = null
            } else {
                ElMessage.error('获取失败')
            }
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