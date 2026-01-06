<template>
        <div style="height: 100%;position: relative;width: 100%; margin-top: 20px;">
                <div style="height: 100px;position: absolute; left: 0px;z-index: 999;">
                        <el-button size="large" type="danger" @click="submitEditMenu()"><el-icon>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateFrontMenu } from '@/api/modules/menuCopy'

const submitEditMenu = ()=>{
ElMessageBox.confirm('确定要发送修改到前台页面吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        updateFrontMenu().then(res => {
            if (res.code === 0) {
                ElMessage.success('修改成功')
            } else {
                ElMessage.error(res.msg || '修改失败')
            }
        })
    }).catch(() => {
        ElMessage.info('已取消修改')
    })
}

</script>

<style>

</style>