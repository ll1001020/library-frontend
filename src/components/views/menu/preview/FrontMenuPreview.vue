<template>
        <div style="height: 100%;position: relative;width: 100%; margin-top: 20px;">
                <div style="height: 100px;position: absolute; left: 0px;z-index: 999;">
                        <el-button size="large" type="danger"><el-icon>
                                        <EditPen />
                                </el-icon>确认更改</el-button>
                </div>
                <div style="width: 100%;height: 100%;position: relative;transform: translateZ(0);">
                        <Header></Header>
                </div>
        </div>
</template>

<script setup lang='ts'>
import Header from '@/components/views/menu/preview/PreviewHeader.vue';
</script>

<style></style>