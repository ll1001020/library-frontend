<template>
    <video id="video" src="@/../public/videos/login/登录视频.mp4" autoplay muted loop>

    </video>
    <div
        style="width: 100%;height: 100vh;display: flex;justify-content: center;align-items: center;position: relative;">
        <div
            style="width: 400px; height: 400px; background-color: aliceblue;opacity: 0.9;
        display: flex;justify-content: center;align-items: center;flex-flow: column;gap:10px; position: absolute;left: 70%;">
            <h2>图书管理系统</h2>
            <el-form ref="ruleFormRef" style="min-width: 300px;min-height:200px;" :model="ruleForm" status-icon
                :rules="rules" label-width="auto" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="登录类型" prop="loginType">
                    <el-radio-group v-model="ruleForm.loginType">
                        <el-radio value="1">用户</el-radio>
                        <el-radio value="0">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="padding-left: 80px;">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';
import { login } from '@/api/modules/users';
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()


const validateUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}
const validatePassWord = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    username: '',
    password: '',
    loginType: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ required: true, validator: validateUserName, trigger: 'blur' }],
    password: [{ required: true, validator: validatePassWord, trigger: 'blur' }],
    loginType: [
        {
            required: true,
            message: '请选择登录类型',
            trigger: 'change',
        },
    ],
})

var nowTime = Date.now()
console.log(nowTime)

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log(ruleForm)
            console.log('提交成功!')
            login(ruleForm).then(function (resp) {
                // console.log(ruleForm)  打印上传信息
                console.log(resp) // 打印传回信息
                if (resp.data == null) {
                    if (resp.code == -1) {
                        ElMessageBox.alert(resp.msg, '提示',) // 账号不存在
                    } else if (resp.code == -2) {
                        ElMessageBox.alert(resp.msg, '提示',) // 密码错误
                    }
                } else {
                    ElMessageBox.alert(resp.msg, '提示',) //登录成功
                    if(resp.data.userTypeId == "1"){
                        localStorage.setItem('LoginStatus', 'true')
                        localStorage.setItem('startTime', nowTime.toString())
                        router.push('/')
                    }
                    if(resp.data.userTypeId == "0"){
                        localStorage.setItem('adminLoginStatus', 'true')
                        localStorage.setItem('adminStartTime', nowTime.toString())
                        router.push('/adminHome')
                    }
                }
            })
        } else {
            console.log('提交失败!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    ruleForm.password = ""
    ruleForm.username = ""
}

</script>

<style>
* {
    padding: 0px;
    margin: 0px;
}

#video {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    /* 沉到底层 */
}
</style>