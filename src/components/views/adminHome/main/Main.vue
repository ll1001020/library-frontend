<template>
        <div style="height:100vh;overflow:auto;">
                <el-Header class="header" style="position:sticky;top:0;z-index:100;">
                <el-button>
                        <el-icon @click="setCollapse" size="30px">
                                <component :is="props.isCollapse ? 'Expand' : 'Fold'" />
                        </el-icon></el-button>
                <span><img src="@/assets/imgs/home/logo.png" style="width: 30px;"></img>欢迎使用砺行线上数字图书管理系统</span>
                <span></span>
        </el-Header>
        <router-view></router-view>
        </div>
        
</template>

<script setup>
import { ref } from 'vue';
const setCollapse = () => {
        emit('changeCollapse');
}
const props = defineProps(["isCollapse"])
const emit = defineEmits(['changeCollapse'])
</script>

<style>
* {
        margin: 0px;
        padding: 0px;
}

.header {
        background-color: rgb(54, 153, 170);
        text-align: center;
        line-height: 60px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
}
</style>