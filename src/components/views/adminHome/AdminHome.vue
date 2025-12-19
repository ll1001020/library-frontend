<template>
    <div class="common-layout">
        <el-row>
            <el-col :span="isCollapse ? 1 : 3" style="min-height: 100vh;">
                <el-aside style="width: 100%;position: sticky;top: 0;">
                    <Menu :isCollapse="isCollapse"></Menu>
                </el-aside>
            </el-col>
            <el-col :span="isCollapse ? 23 : 21">
                <el-main style=" padding: 0px; width: 100%;">
                    <Main style="width: 100%;" :isCollapse="isCollapse" @changeCollapse="changeCollapse"></Main>
                </el-main>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang='ts'>
import Menu from './menu/MenuBack.vue';
import Main from './main/Main.vue';
import { ref } from 'vue';
const isCollapse = ref(false);
const changeCollapse = () => {
    isCollapse.value = !isCollapse.value;
    // console.log(isCollapse.value);
}

</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}

.el-col {
    transition: all 0.4s ease-in-out ;
}
</style>