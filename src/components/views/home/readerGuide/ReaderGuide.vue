<template>
    <div class="guide-container">
        <!-- 背景图片部分 -->
        <div class="background-section">
            <div class="background-overlay"></div>
            <img src="/src/assets/imgs/home/韵那湖畔.jpg" alt="砺行图书馆背景" class="background-image">
            <div class="background-content">
                <h1 class="title">砺行图书馆</h1>
                <p class="subtitle">读者指南与服务</p>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <el-container class="guide-layout">
                <el-container>
                    <!-- 左侧导航 -->
                    <el-aside width="280px">
                        <div class="side-menu">
                            <div class="menu-header">
                                <i class="el-icon-notebook-2"></i>
                                <span>服务导航</span>
                            </div>
                            <el-menu :default-active="activeMenu" class="menu-list" @select="handleMenuSelect"
                                active-text-color="#3699aa">
                                <el-menu-item :index="getMenuIndex(1)">
                                    <i class="el-icon-guide"></i>
                                    <span>读者指南</span>
                                </el-menu-item>
                                <el-menu-item :index="getMenuIndex(2)">
                                    <i class="el-icon-office-building"></i>
                                    <span>馆区服务</span>
                                </el-menu-item>
                                <el-menu-item :index="getMenuIndex(3)">
                                    <i class="el-icon-postcard"></i>
                                    <span>办证须知</span>
                                </el-menu-item>
                                <el-menu-item :index="getMenuIndex(4)">
                                    <i class="el-icon-reading"></i>
                                    <span>入馆须知</span>
                                </el-menu-item>
                                <el-menu-item :index="getMenuIndex(5)">
                                    <i class="el-icon-document-copy"></i>
                                    <span>借阅须知</span>
                                </el-menu-item>
                            </el-menu>

                            <!-- 快速服务入口 -->
                            <div class="quick-service">
                                <h4><i class="el-icon-time"></i> 开放时间</h4>
                                <p>周一至周五：8:00-22:00</p>
                                <p>周末：9:00-21:00</p>
                                <p>节假日：10:00-18:00</p>

                                <div class="contact-info">
                                    <h4><i class="el-icon-phone"></i> 联系我们</h4>
                                    <p>📞 服务热线：020-87654321</p>
                                    <p>📧 邮箱：lixing@library.edu</p>
                                    <p>📍 地址：翻斗大街砺行图书馆</p>
                                </div>
                            </div>
                        </div>
                    </el-aside>

                    <!-- 右侧内容 -->
                    <el-main>
                        <div class="content-wrapper">
                            <!-- 面包屑导航 -->
                            <div class="breadcrumb" v-if="showBreadcrumb">
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                    <el-breadcrumb-item>读者指南</el-breadcrumb-item>
                                    <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
                                </el-breadcrumb>
                            </div>

                            <!-- 路由视图 -->
                            <div class="router-view-wrapper">
                                <router-view></router-view>
                            </div>

                            <!-- 当没有路由匹配时显示默认内容 -->
                            <div v-if="!hasRouteContent" class="default-content">
                                <div class="welcome-card">
                                    <div class="welcome-icon">
                                        <i class="el-icon-reading"></i>
                                    </div>
                                    <h2>欢迎来到砺行图书馆读者指南</h2>
                                    <p class="welcome-text">请从左侧菜单选择您需要了解的内容，我们将为您提供详细的服务指南和说明。</p>

                                    <div class="quick-tips">
                                        <el-row :gutter="20">
                                            <el-col :span="8">
                                                <div class="tip-card">
                                                    <i class="el-icon-location-information tip-icon"></i>
                                                    <h4>快速定位</h4>
                                                    <p>点击左侧菜单快速找到您需要的信息</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="tip-card">
                                                    <i class="el-icon-search tip-icon"></i>
                                                    <h4>搜索功能</h4>
                                                    <p>可在各页面使用搜索功能查找信息</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="tip-card">
                                                    <i class="el-icon-question tip-icon"></i>
                                                    <h4>问题反馈</h4>
                                                    <p>遇到问题可随时联系我们</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 菜单项配置
const menuItems = [
    { index: 'index1', title: '读者指南', route: '/home/readerGuide/index1' },
    { index: 'index2', title: '馆区服务', route: '/home/readerGuide/index2' },
    { index: 'index3', title: '办证须知', route: '/home/readerGuide/index3' },
    { index: 'index4', title: '入馆须知', route: '/home/readerGuide/index4' },
    { index: 'index5', title: '借阅须知', route: '/home/readerGuide/index5' }
]

const activeMenu = ref('index1')
const hasRouteContent = ref(false)

// 生成菜单index
const getMenuIndex = (num: number) => {
    return `index${num}`
}

// 根据当前路由计算页面标题
const currentPageTitle = computed(() => {
    const currentItem = menuItems.find(item => {
        // 检查当前路由是否匹配
        return route.path.includes(item.index) || route.path === item.route
    })
    return currentItem ? currentItem.title : '读者指南'
})

// 是否显示面包屑
const showBreadcrumb = computed(() => {
    return route.path !== '/readerGuide' && route.path !== '/home/readerGuide'
})

// 处理菜单选择
const handleMenuSelect = (index: string) => {
    activeMenu.value = index
    // 路由跳转到对应的index组件
    const menuItem = menuItems.find(item => item.index === index)
    if (menuItem && route.path !== menuItem.route) {
        router.push(menuItem.route)
    }
}

// 监控路由变化
watch(
    () => route.path,
    (newPath) => {
        // 设置激活的菜单项
        const matchedItem = menuItems.find(item =>
            newPath === item.route || newPath.includes(item.index)
        )
        if (matchedItem) {
            activeMenu.value = matchedItem.index
            hasRouteContent.value = true
        } else {
            hasRouteContent.value = false
        }
    },
    { immediate: true }
)

onMounted(() => {
    // 初始化：如果当前路由是父路由，跳转到第一个子路由
    if (route.path === '/readerGuide' || route.path === '/home/readerGuide') {
        router.push('/home/readerGuide/index1')
        activeMenu.value = 'index1'
    } else {
        // 设置当前激活的菜单
        const currentItem = menuItems.find(item => route.path.includes(item.index))
        if (currentItem) {
            activeMenu.value = currentItem.index
        }
    }
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.guide-container {
    width: 100%;
    position: relative;
    background-color: #f8fafc;
    min-height: 100vh;
}

/* 背景图片部分 */
.background-section {
    position: relative;
    height: 400px;
    overflow: hidden;
}

.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
    filter: brightness(0.9);
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.85) 0%, rgba(54, 153, 170, 0.4) 100%);
    z-index: 1;
}

.background-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 0 20px;
}

.title {
    font-size: 52px;
    font-weight: 700;
    margin-bottom: 15px;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    letter-spacing: 2px;
    font-family: 'SimSun', 'STSong', serif;
}

.subtitle {
    font-size: 24px;
    opacity: 0.95;
    font-weight: 300;
    letter-spacing: 1px;
}

/* 主要内容区域 */
.main-content {
    max-width: 1400px;
    margin: -80px auto 50px;
    padding: 0 20px;
    position: relative;
    z-index: 3;
}

.guide-layout {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
    background: white;
    min-height: 700px;
}

/* 左侧导航 */
.side-menu {
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    min-height: 100%;
    border-right: 1px solid #e8f4f8;
    display: flex;
    flex-direction: column;
}

.menu-header {
    height: 80px;
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 22px;
    font-weight: 600;
    padding: 0 25px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.menu-header i {
    font-size: 26px;
    margin-right: 12px;
}

.menu-list {
    border: none;
    padding: 20px 15px;
    flex: 1;
}

.menu-list :deep(.el-menu-item) {
    height: 62px;
    line-height: 62px;
    margin: 8px 0;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 16px;
    font-weight: 500;
    color: #5a6c7d;
    border-left: 4px solid transparent;
}

.menu-list :deep(.el-menu-item):hover {
    background: linear-gradient(90deg, rgba(54, 153, 170, 0.08) 0%, rgba(54, 153, 170, 0.03) 100%);
    transform: translateX(5px);
    color: #3699aa;
    border-left-color: rgba(54, 153, 170, 0.3);
}

.menu-list :deep(.el-menu-item.is-active) {
    background: linear-gradient(90deg, rgba(54, 153, 170, 0.15) 0%, rgba(54, 153, 170, 0.05) 100%);
    color: #3699aa;
    border-left: 4px solid #3699aa;
    font-weight: 600;
}

.menu-list :deep(.el-menu-item i) {
    color: #3699aa;
    font-size: 20px;
    margin-right: 15px;
    transition: transform 0.3s ease;
}

.menu-list :deep(.el-menu-item:hover i) {
    transform: scale(1.1);
}

/* 快速服务区域 */
.quick-service {
    padding: 25px 20px;
    border-top: 1px solid #e8f4f8;
    background: rgba(248, 250, 252, 0.8);
}

.quick-service h4 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.quick-service h4 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 18px;
}

.quick-service p {
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 8px;
    padding-left: 28px;
}

.contact-info {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px dashed #dce6e9;
}

.contact-info p {
    padding-left: 28px;
    position: relative;
}

.contact-info p:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #3699aa;
    border-radius: 50%;
}

/* 右侧内容 */
.content-wrapper {
    padding: 30px 35px;
    min-height: 700px;
}

/* 面包屑导航 */
.breadcrumb {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.breadcrumb :deep(.el-breadcrumb__inner) {
    font-weight: 500;
}

.breadcrumb :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    color: #3699aa;
    font-weight: 600;
}

/* 路由视图容器 */
.router-view-wrapper {
    animation: fadeIn 0.5s ease-out;
    min-height: 500px;
}

/* 默认欢迎内容 */
.default-content {
    animation: fadeIn 0.8s ease-out;
}

.welcome-card {
    text-align: center;
    padding: 60px 40px;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 20px;
    border: 2px dashed #dce6e9;
    margin: 40px 0;
}

.welcome-icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    color: white;
    font-size: 40px;
    box-shadow: 0 10px 25px rgba(54, 153, 170, 0.2);
}

.welcome-card h2 {
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 600;
}

.welcome-text {
    color: #5a6c7d;
    font-size: 18px;
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto 40px;
}

/* 快速提示卡片 */
.quick-tips {
    max-width: 800px;
    margin: 0 auto;
}

.tip-card {
    padding: 30px 20px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
    height: 100%;
}

.tip-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: #3699aa;
}

.tip-icon {
    font-size: 36px;
    color: #3699aa;
    margin-bottom: 20px;
    display: block;
}

.tip-card h4 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 600;
}

.tip-card p {
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式设计 */
@media (max-width: 992px) {
    .main-content {
        margin-top: -60px;
        padding: 0 15px;
    }

    .guide-layout {
        flex-direction: column;
    }

    .side-menu {
        width: 100%;
        margin-bottom: 20px;
    }

    .content-wrapper {
        padding: 20px;
    }

    .welcome-card {
        padding: 40px 20px;
    }

    .quick-tips {
        margin-top: 30px;
    }

    .tip-card {
        margin-bottom: 20px;
    }
}

@media (max-width: 768px) {
    .background-content .title {
        font-size: 40px;
    }

    .background-content .subtitle {
        font-size: 20px;
    }

    .menu-header {
        height: 70px;
        font-size: 20px;
        padding: 0 20px;
    }

    .content-wrapper {
        padding: 15px;
    }

    .welcome-icon {
        width: 80px;
        height: 80px;
        font-size: 32px;
    }

    .welcome-card h2 {
        font-size: 28px;
    }

    .title {
        font-size: 42px;
        letter-spacing: 1px;
    }
}

@media (max-width: 576px) {
    .title {
        font-size: 36px;
    }

    .subtitle {
        font-size: 18px;
    }

    .welcome-card h2 {
        font-size: 24px;
    }

    .welcome-text {
        font-size: 16px;
    }
}
</style>