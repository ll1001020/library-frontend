<template>
    <el-row class="tac" style=" margin: 0px; height: 100%; ">
        <el-col :span="24" style="min-height: 100vh;">
            <el-menu :collapse="props.isCollapse" mode="vertical" active-text-color="#ffd04b"
                background-color="rgb(54, 153, 170)" class="el-menu-vertical-demo" default-active="1" text-color="#fff"
                @open="handleOpen" @close="handleClose" router
                style="background-color: rgb(54, 153, 170); width: 100%;flex: 1;height: 100%;">

                <p class="mb-2" style="text-align: center; font-size: 30px; background-color: rgb(54, 153, 170);
                color: white;margin: 0px;padding: 0px;height: 60px;line-height: 60px;font-family: '华文行楷';">砺行</p>
                <template v-for="(menuBack, index) in menubackList">
                    <el-menu-item :index="String(menuBack.path ?? index)" v-if="!menuBack.children?.length">
                        <el-icon>
                            <component :is="Icons[menuBack.icon]" />
                        </el-icon>
                        <span>{{ menuBack.title }}</span>
                    </el-menu-item>
                    <el-sub-menu :index="String(menuBack.path ?? index)"
                        v-if="menuBack.children && menuBack.children.length">
                        <template #title>
                            <el-icon>
                                <component :is="Icons[menuBack.icon]" />
                            </el-icon>
                            <span>{{ menuBack.title }}</span>
                        </template>
                        <el-menu-item-group v-for="(child, childIndex) in menuBack.children">
                            <el-menu-item :index="String(child.path ?? childIndex)">
                                <el-icon>
                                    <component :is="Icons[child.icon]" />
                                </el-icon>
                                <span>{{ child.title }}</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </template>


            </el-menu>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { Document, Menu as IconMenu, Location, Setting, } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { getMenuBackList } from '@/api/modules/menuback'
import * as Icons from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const props = defineProps(["isCollapse"])

const menubackList = ref([])

onMounted(() => {
    getMenuBackList().then(res => {
        menubackList.value = res.data
        console.log(menubackList)
    })
})



</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}

.el-menu {
    border-right: none;
}

.el-menu-item.is-active {
    background-color: rgb(54, 153, 170) !important;
    color: #fff;

    span {
        color: #fff !important;
    }
}
</style>