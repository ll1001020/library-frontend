<template>
    <el-scrollbar style="height: 88vh;">
        <el-tree style="max-width: 600px;overflow: auto; height: 100%; " :props="props" :data="data" @current-Change="currentChange" :accordion="true"
        :auto-expand-parent="true" :highlight-current="true"  />
    </el-scrollbar>
    
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { getBookCategoryTree } from '@/api/modules/bookCategory.js'
const emit = defineEmits(['getTreeData'])
const data = ref([])

const props = reactive({
    label: 'clcName',
    children: 'children',
    isLeaf: (data, node) => {
        // 自定义判断是否为叶子节点
        return !data.children || data.children.length === 0
    }
})

const currentChange = (data) => {
    // console.log('data', data)
    emit('getTreeData', data)
}

onMounted(() => {
    getBookCategoryTree().then(res => {
        // console.log(res.data)
        data.value = res.data
    })
})
</script>

<style></style>