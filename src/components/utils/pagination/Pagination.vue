<template>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="props.pageSize"
                layout="total, sizes, prev, pager, next, jumper"   :total="props.total" @current-change="handleCurrentChange" @size-change="handleChangePageSize"/>
</template>
    
<script setup lang='ts'>
    import {  ref } from 'vue'
    const props = defineProps(['total','pageSize']);
    const currentPage = ref(1);
    const pageSize = ref(10)
    const emit = defineEmits(['getCurrentPage','handleChangePageSize']);

    function handleChangePageSize(pageSize){
        emit('handleChangePageSize',pageSize)
    }
    function handleCurrentChange(currentPage) {
        emit('getCurrentPage', currentPage);    
    }
</script>
    
<style>
    
</style>