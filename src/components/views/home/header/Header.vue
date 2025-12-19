<template>
    <div class="layout outcolor">
        <div class="head outcolor">
            <!-- 这里是logo和登录位置 -->
            <div class="headrow">
                <div class="headlogo">
                    <div class="headlogin">
                        <router-link to="/login" v-if="!loginStatus">
                            <div>{{ loginShow }}</div>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </router-link>
                        <div v-if="loginStatus" class="haveLogin">
                            <div>{{ loginShow }}</div>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                            <div class="smallWindow">
                                <div><router-link
                                        style="font-size: small;color:rgb(54, 153, 170);text-decoration: none;">个人中心</router-link>
                                </div>
                                <div><router-link to="/login" @click="quitLogin()"
                                        style="font-size: small;color:rgb(54, 153, 170);text-decoration: none;">退出</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center;margin-top: 10px;">
                        <img src="@/assets/imgs/home/logo.png" alt="" style="width: 80px;">
                        <span style="font-size: 40px; color: white;font-family: '华文行楷';">线上数字图书馆</span>
                    </div>
                </div>
                <hr />
            </div>
            <!-- 这里是菜单栏-->
            <div class="headrow ">
                <div class="menu">
                    <ul>
                        <li v-for="(menu, index) in menuList" :key="index" @mouseenter="menuDisplay = index"
                            @mouseleave="menuDisplay = null">
                            <router-link to="#">{{ menu.title }}</router-link>
                            <div class="submenu" v-if="menuDisplay === index && menu.children">
                                <!-- 切成 3 栏 -->
                                <div v-for="(col, i) in Math.ceil((menu.children?.length || 0) / 3)" :key="i"
                                    style="display: flex; flex-direction: column; gap: 15px;justify-content: center;gap: 30px;position: relative;">
                                    <div v-for="(child, j) in menu.children?.slice(i * 3, i * 3 + 3)" :key="j">
                                        <router-link to="#"
                                            style="color: rgb(54, 153, 170);font-size: large;text-decoration: none;">{{
                                                child.title }}</router-link>
                                    </div>
                                    <!-- 竖线：最后一栏不要 -->
                                    <span v-if="i !== Math.ceil((menu.children?.length || 0) / 3) - 1" style="position: absolute; right: 0; top: 0; bottom: 0;width: 1px; background: #ccc;
                                            transform: translateX(125px);"></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { getMenuList } from '@/api/modules/menufront'

const menuList = ref([])
const menuDisplay = ref(null)
const loginStatus = computed(() => {
    if (localStorage.getItem('startTime') + 1000 * 60 > Date.now()) {
        return localStorage.getItem('LoginStatus') === 'true'
    }
    return false
})
const loginShow = computed(() => {
    if (localStorage.getItem('LoginStatus') === 'true') {
        return '已登录'
    }
    return '去登录'
})
function quitLogin() {
    localStorage.removeItem('LoginStatus')
    localStorage.removeItem('startTime')
}
onMounted(() => {
    getMenuList().then(res => {
        // console.log(res)
        menuList.value = res.data
        console.log(res.msg)
    })
})

</script>

<style>
* {
    padding: 0px;
    margin: 0px;
}

.outline {
    border: 1px red solid;
}

.outcolor {
    background-color: rgb(54, 153, 170);
}

/* 这里是layout */
.layout {
    height: 100%;
    width: 100%;
}

/* 这里是head */
.head {
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.headrow {
    height: 50%;
    width: 100%;
}

.headlogo {
    max-width: 1200px;
    margin: auto;
    height: 100%;
    position: relative;
    /* margin-left: 250px;
    margin-right: 250px; */
}

.headlogin {
    position: absolute;
    width: 100px;
    height: 100%;
    right: -110px;
}

.headlogin>a {
    margin-top: 50%;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.haveLogin {
    margin-top: 50%;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.headlogin div {
    transition: flex 0.4s ease;
    font-size: large;
    color: white;
}

.headlogin .el-icon {
    font-size: large;
    color: white;
    transition: flex 0.4s ease;
}

.headlogin>a>div:hover,
.headlogin>a>.el-icon:hover {
    flex: 1 1 auto;
}

.smallWindow {
    width: 100px;
    height: 125%;
    position: absolute;
    bottom: -80%;
    background-color: rgb(235, 240, 241, 0.6);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.haveLogin:hover .smallWindow {
    display: flex;
}

.menu {
    max-width: 1200px;
    margin: auto;
    height: 100%;
    /* margin-left: 250px;
    margin-right: 250px; */
    background-color: rgb(54, 153, 170);
}

.menu>ul {
    height: 100%;
    list-style-type: none;
    display: flex;
    justify-content: center;
    gap: 0;
}

.menu>ul>li {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: flex 0.4s ease;
    /* position: relative; */
    /* border: 1px red solid; */

}

.menu>ul>li:hover {
    flex: 2 2 auto;
}

.menu>ul>li>a {
    color: white;
    font-size: large;
    text-decoration: none;
}

.submenu {
    position: fixed;
    top: 180px;
    left: 0;
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 250px;
    padding-top: 80px;
    background-color: rgb(235, 240, 241);
    /* border: 1px red solid; */
}
</style>