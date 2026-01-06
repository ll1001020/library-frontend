<template>
    <div class="reader-guide-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2><i class="el-icon-guide"></i> 读者指南</h2>
            <p class="page-subtitle">欢迎使用砺行图书馆，本指南将帮助您更好地了解和使用图书馆的各项服务</p>
        </div>

        <!-- 主要内容 -->
        <div class="main-content">
            <el-row :gutter="30">
                <!-- 左侧主要内容 -->
                <el-col :span="16">
                    <!-- 读者服务介绍 -->
                    <div class="service-section">
                        <h3><i class="el-icon-s-opportunity"></i> 读者服务概览</h3>
                        <p class="section-intro">
                            砺行图书馆致力于为读者提供全面、便捷、高效的文献信息服务。我们拥有丰富的馆藏资源、现代化的服务设施和专业的服务团队。
                        </p>
                        
                        <el-row :gutter="20" class="service-grid">
                            <el-col :span="12">
                                <div class="service-item" @click="activeTab = 'borrow'">
                                    <div class="service-icon">
                                        <i class="el-icon-takeaway-box"></i>
                                    </div>
                                    <div class="service-content">
                                        <h4>图书借阅</h4>
                                        <p>馆藏图书100万+册，支持线上线下借阅</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="service-item" @click="activeTab = 'digital'">
                                    <div class="service-icon">
                                        <i class="el-icon-monitor"></i>
                                    </div>
                                    <div class="service-content">
                                        <h4>数字资源</h4>
                                        <p>电子图书50万+册，数据库30+个</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="service-item" @click="activeTab = 'research'">
                                    <div class="service-icon">
                                        <i class="el-icon-search"></i>
                                    </div>
                                    <div class="service-content">
                                        <h4>学术支持</h4>
                                        <p>文献检索、学科咨询、论文查重</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="service-item" @click="activeTab = 'space'">
                                    <div class="service-icon">
                                        <i class="el-icon-office-building"></i>
                                    </div>
                                    <div class="service-content">
                                        <h4>空间服务</h4>
                                        <p>阅览座位、研讨室、个人研修室</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 详细内容标签页 -->
                    <div class="tab-section">
                        <el-tabs v-model="activeTab" type="card" class="detail-tabs">
                            <el-tab-pane label="借阅服务" name="borrow">
                                <div class="tab-content">
                                    <h4><i class="el-icon-reading"></i> 借阅服务指南</h4>
                                    <div class="info-card">
                                        <div class="info-item">
                                            <h5><i class="el-icon-check"></i> 借阅权限</h5>
                                            <ul>
                                                <li><strong>普通读者：</strong>可借图书5册，借期45天</li>
                                            </ul>
                                        </div>
                                        <div class="info-item">
                                            <h5><i class="el-icon-refresh"></i> 续借规则</h5>
                                            <ul>
                                                <li>每册图书可续借3次，续期15天</li>
                                                <li>逾期图书不可续借</li>
                                                <li>已被预约的图书不可续借</li>
                                            </ul>
                                        </div>
                                        <div class="info-item">
                                            <h5><i class="el-icon-warning-outline"></i> 逾期处理</h5>
                                            <ul>
                                                <li>逾期图书每册每天收取0.1元滞纳金</li>
                                                <li>逾期超过60天视为图书丢失</li>
                                                <li>累计逾期3次以上将暂停借阅权限</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            
                            <el-tab-pane label="数字资源" name="digital">
                                <div class="tab-content">
                                    <h4><i class="el-icon-monitor"></i> 数字资源使用指南</h4>
                                    <el-table :data="digitalResources" style="width: 100%">
                                        <el-table-column prop="name" label="资源名称" width="180"></el-table-column>
                                        <el-table-column prop="type" label="类型" width="120"></el-table-column>
                                        <el-table-column prop="access" label="访问方式"></el-table-column>
                                        <el-table-column prop="remark" label="说明"></el-table-column>
                                    </el-table>
                                    <div class="tips-box">
                                        <h5><i class="el-icon-info"></i> 使用提示：</h5>
                                        <p>1. 校内访问：校园网内可直接访问所有数字资源</p>
                                        <p>2. 校外访问：需使用VPN或远程访问系统</p>
                                        <p>3. 技术支持：数字资源部 电话：020-87654321转801</p>
                                    </div>
                                </div>
                            </el-tab-pane>
                            
                            <el-tab-pane label="学术支持" name="research">
                                <div class="tab-content">
                                    <h4><i class="el-icon-search"></i> 学术支持服务</h4>
                                    <el-collapse v-model="activeCollapse">
                                        <el-collapse-item title="文献检索服务" name="1">
                                            <div class="collapse-content">
                                                <p><strong>服务内容：</strong>为师生提供专业文献检索、定题检索、查新检索等服务</p>
                                                <p><strong>服务时间：</strong>周一至周五 8:30-11:30, 14:00-17:00</p>
                                                <p><strong>联系方式：</strong>信息咨询部 电话：020-87654321转802</p>
                                            </div>
                                        </el-collapse-item>
                                        <el-collapse-item title="学科咨询服务" name="2">
                                            <div class="collapse-content">
                                                <p><strong>服务内容：</strong>按学科领域提供专业咨询服务，协助解决学术研究中遇到的问题</p>
                                                <p><strong>学科馆员：</strong>每个学院配备1-2名学科馆员</p>
                                                <p><strong>预约方式：</strong>图书馆网站预约或到馆预约</p>
                                            </div>
                                        </el-collapse-item>
                                        <el-collapse-item title="论文查重服务" name="3">
                                            <div class="collapse-content">
                                                <p><strong>服务内容：</strong>提供学位论文查重检测服务</p>
                                                <p><strong>检测系统：</strong>知网、万方、维普等主流检测系统</p>
                                                <p><strong>收费标准：</strong>校内师生享受优惠价格，具体请咨询服务台</p>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-tab-pane>
                            
                            <el-tab-pane label="空间服务" name="space">
                                <div class="tab-content">
                                    <h4><i class="el-icon-office-building"></i> 空间服务指南</h4>
                                    <el-row :gutter="20">
                                        <el-col :span="8">
                                            <div class="space-card">
                                                <div class="space-icon">
                                                    <i class="el-icon-reading"></i>
                                                </div>
                                                <h5>普通阅览区</h5>
                                                <p>开放时间：8:00-22:00</p>
                                                <p>座位数：1200个</p>
                                                <p class="space-status">当前空位：<span class="available">较多</span></p>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="space-card">
                                                <div class="space-icon">
                                                    <i class="el-icon-chat-line-round"></i>
                                                </div>
                                                <h5>研讨室</h5>
                                                <p>开放时间：8:30-21:00</p>
                                                <p>数量：15间（需预约）</p>
                                                <p class="space-status">当前状态：<span class="partly">部分可用</span></p>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="space-card">
                                                <div class="space-icon">
                                                    <i class="el-icon-user"></i>
                                                </div>
                                                <h5>个人研修室</h5>
                                                <p>开放时间：8:30-21:00</p>
                                                <p>数量：40间（需预约）</p>
                                                <p class="space-status">当前状态：<span class="limited">较少</span></p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div class="reservation-info">
                                        <h5><i class="el-icon-timer"></i> 预约说明</h5>
                                        <p>1. 研讨室和个人研修室需提前1-7天预约</p>
                                        <p>2. 预约方式：到馆预约</p>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>

                <!-- 右侧侧边栏 -->
                <el-col :span="8">
                    <!-- 常见问题 -->
                    <div class="faq-section">
                        <h3><i class="el-icon-question"></i> 常见问题</h3>
                        <el-collapse accordion>
                            <el-collapse-item title="如何办理读者证？" name="1">
                                <p>持本人有效身份证件（身份证、学生证、工作证等）到图书馆一楼服务台办理。详情请见"办证须知"页面。</p>
                            </el-collapse-item>
                            <el-collapse-item title="忘记读者证密码怎么办？" name="2">
                                <p>请携带读者证和有效身份证件到服务台重置密码，或通过图书馆网站"找回密码"功能自助重置。</p>
                            </el-collapse-item>
                            <el-collapse-item title="图书逾期如何处理？" name="3">
                                <p>请及时归还图书并缴纳滞纳金。逾期超过60天视为图书丢失，需按原价赔偿。</p>
                            </el-collapse-item>
                            <el-collapse-item title="如何预约研讨室？" name="4">
                                <p>可通过图书馆网站、微信公众号或到馆服务台预约。需提前1-7天预约。</p>
                            </el-collapse-item>
                            <el-collapse-item title="校外读者可以借书吗？" name="5">
                                <p>校外读者需办理临时读者证，可借图书5册，借期30天。详情请见"办证须知"页面。</p>
                            </el-collapse-item>
                        </el-collapse>
                    </div>

                    <!-- 服务流程 -->
                    <div class="process-section">
                        <h3><i class="el-icon-s-marketing"></i> 服务流程图</h3>
                        <div class="process-chart">
                            <div class="process-step">
                                <div class="step-icon">1</div>
                                <div class="step-content">
                                    <h5>办理读者证</h5>
                                    <p>持有效证件到服务台办理</p>
                                </div>
                            </div>
                            <div class="process-arrow">→</div>
                            <div class="process-step">
                                <div class="step-icon">2</div>
                                <div class="step-content">
                                    <h5>借阅图书</h5>
                                    <p>查找图书并办理借阅手续</p>
                                </div>
                            </div>
                            <div class="process-arrow">→</div>
                            <div class="process-step">
                                <div class="step-icon">3</div>
                                <div class="step-content">
                                    <h5>使用资源</h5>
                                    <p>访问数字资源和使用空间服务</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 读者权利与义务 -->
                    <div class="rights-section">
                        <h3><i class="el-icon-s-custom"></i> 读者权利与义务</h3>
                        <div class="rights-card">
                            <div class="rights-item">
                                <h5><i class="el-icon-check rights-icon"></i> 读者权利</h5>
                                <ul>
                                    <li>免费使用图书馆公共资源</li>
                                    <li>平等获取文献信息服务</li>
                                    <li>参与图书馆组织的活动</li>
                                    <li>对图书馆工作提出建议</li>
                                </ul>
                            </div>
                            <div class="rights-item">
                                <h5><i class="el-icon-warning rights-icon"></i> 读者义务</h5>
                                <ul>
                                    <li>遵守图书馆规章制度</li>
                                    <li>爱护图书及公共设施</li>
                                    <li>保持安静整洁的环境</li>
                                    <li>按时归还所借图书</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

// 活动标签页
const activeTab = ref('borrow')

// 活动折叠面板
const activeCollapse = ref(['1'])

// 数字资源数据
const digitalResources = ref([
    { name: '中国知网(CNKI)', type: '期刊数据库', access: '校园网/IP认证', remark: '全库开放' },
    { name: '万方数据', type: '综合数据库', access: '校园网/IP认证', remark: '全库开放' },
    { name: '超星电子书', type: '电子图书', access: '校园网/IP认证', remark: '50万册图书' },
    { name: 'Web of Science', type: '外文数据库', access: '校园网/IP认证', remark: '部分学科' },
    { name: 'Elsevier ScienceDirect', type: '外文数据库', access: '校园网/IP认证', remark: '部分学科' },
    { name: '砺行学位论文库', type: '特色资源', access: '校园网内开放', remark: '本校学位论文' }
])
</script>

<style scoped>
.reader-guide-container {
    animation: fadeIn 0.6s ease-out;
}

/* 页面标题 */
.page-header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 25px;
    border-bottom: 2px solid #e8f4f8;
}

.page-header h2 {
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 600;
}

.page-header h2 i {
    color: #3699aa;
    margin-right: 12px;
    font-size: 34px;
}

.page-subtitle {
    font-size: 18px;
    color: #5a6c7d;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
}

/* 主要内容 */
.main-content {
    margin-top: 20px;
}

/* 服务介绍部分 */
.service-section {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 30px;
    border: 1px solid #e8f4f8;
}

.service-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
}

.service-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 26px;
}

.section-intro {
    color: #5a6c7d;
    line-height: 1.8;
    margin-bottom: 30px;
    font-size: 16px;
}

.service-grid {
    margin-top: 20px;
}

.service-item {
    background: white;
    border-radius: 12px;
    padding: 25px 20px;
    margin-bottom: 20px;
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.service-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #3699aa;
}

.service-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    flex-shrink: 0;
}

.service-icon i {
    font-size: 28px;
    color: #3699aa;
}

.service-content {
    flex: 1;
}

.service-content h4 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 600;
}

.service-content p {
    color: #7f8c8d;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
}

.service-link {
    color: #3699aa;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
}

.service-item:hover .service-link {
    color: #2c7b8a;
}

/* 详细内容标签页 */
.tab-section {
    margin-top: 40px;
}

.detail-tabs :deep(.el-tabs__header) {
    margin-bottom: 0;
}

.detail-tabs :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 500;
    padding: 0 25px;
    height: 50px;
    line-height: 50px;
}

.detail-tabs :deep(.el-tabs__item.is-active) {
    background-color: #e6f7ff;
    color: #3699aa;
}

.tab-content {
    padding: 30px;
    background: white;
    border-radius: 0 12px 12px 12px;
    border: 1px solid #e4e7ed;
    border-top: none;
}

.tab-content h4 {
    color: #2c3e50;
    font-size: 20px;
    margin-bottom: 25px;
    font-weight: 600;
}

.tab-content h4 i {
    color: #3699aa;
    margin-right: 10px;
}

.info-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    margin-top: 20px;
}

.info-item {
    margin-bottom: 25px;
}

.info-item:last-child {
    margin-bottom: 0;
}

.info-item h5 {
    color: #3699aa;
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.info-item h5 i {
    margin-right: 8px;
    font-size: 18px;
}

.info-item ul {
    margin: 0;
    padding-left: 25px;
}

.info-item li {
    color: #5a6c7d;
    line-height: 1.8;
    margin-bottom: 8px;
}

.info-item li strong {
    color: #2c3e50;
}

/* 表格样式 */
:deep(.el-table) {
    margin-top: 15px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

:deep(.el-table th) {
    background-color: #f5f7fa;
    color: #2c3e50;
    font-weight: 600;
}

.tips-box {
    background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
    border-radius: 10px;
    padding: 20px;
    margin-top: 25px;
    border-left: 4px solid #3699aa;
}

.tips-box h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.tips-box h5 i {
    color: #3699aa;
    margin-right: 8px;
}

.tips-box p {
    color: #5a6c7d;
    line-height: 1.8;
    margin-bottom: 8px;
}

/* 折叠面板 */
:deep(.el-collapse) {
    border: none;
}

:deep(.el-collapse-item__header) {
    font-size: 15px;
    font-weight: 500;
    color: #2c3e50;
    border-bottom: none;
    padding: 15px 0;
}

:deep(.el-collapse-item__content) {
    padding: 15px 0;
    color: #5a6c7d;
    line-height: 1.7;
}

.collapse-content p {
    margin-bottom: 10px;
}

/* 空间卡片 */
.space-card {
    background: white;
    border-radius: 12px;
    padding: 25px 20px;
    text-align: center;
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.space-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.space-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.space-icon i {
    font-size: 30px;
    color: #3699aa;
}

.space-card h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
}

.space-card p {
    color: #7f8c8d;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 8px;
}

.space-status {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e8f4f8;
    font-weight: 500;
}

.available {
    color: #67c23a;
    font-weight: 600;
}

.partly {
    color: #e6a23c;
    font-weight: 600;
}

.limited {
    color: #f56c6c;
    font-weight: 600;
}

.reservation-info {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    margin-top: 30px;
}

.reservation-info h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.reservation-info h5 i {
    color: #3699aa;
    margin-right: 8px;
}

.reservation-info p {
    color: #5a6c7d;
    line-height: 1.8;
    margin-bottom: 8px;
}

/* 侧边栏部分 */
.faq-section, .process-section, .rights-section, .quick-links {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.faq-section h3, .process-section h3, .rights-section h3, .quick-links h3 {
    color: #2c3e50;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.faq-section h3 i, .process-section h3 i, .rights-section h3 i, .quick-links h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 22px;
}

.faq-more {
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8f4f8;
}

/* 服务流程 */
.process-chart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
}

.process-step {
    text-align: center;
    flex: 1;
}

.step-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin: 0 auto 15px;
}

.step-content h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 600;
}

.step-content p {
    color: #7f8c8d;
    font-size: 13px;
    line-height: 1.4;
}

.process-arrow {
    color: #3699aa;
    font-size: 24px;
    margin: 0 5px;
}

/* 权利与义务 */
.rights-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 20px;
    margin-top: 15px;
}

.rights-item {
    margin-bottom: 25px;
}

.rights-item:last-child {
    margin-bottom: 0;
}

.rights-item h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.rights-icon {
    margin-right: 8px;
    font-size: 18px;
}

.rights-item ul {
    margin: 0;
    padding-left: 25px;
}

.rights-item li {
    color: #5a6c7d;
    line-height: 1.8;
    margin-bottom: 8px;
}

/* 快速链接 */
.links-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 15px;
}

.link-item {
    background: #f8fafc;
    border-radius: 10px;
    padding: 18px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid #e8f4f8;
}

.link-item:hover {
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-color: #3699aa;
}

.link-item i {
    font-size: 28px;
    color: #3699aa;
    margin-bottom: 10px;
}

.link-item span {
    color: #2c3e50;
    font-size: 14px;
    font-weight: 500;
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
    .service-item {
        flex-direction: column;
        text-align: center;
        padding: 20px 15px;
    }
    
    .service-icon {
        margin-right: 0;
        margin-bottom: 15px;
    }
    
    .process-chart {
        flex-direction: column;
    }
    
    .process-arrow {
        margin: 15px 0;
        transform: rotate(90deg);
    }
}

@media (max-width: 768px) {
    .page-header h2 {
        font-size: 28px;
    }
    
    .page-subtitle {
        font-size: 16px;
    }
    
    .service-section, .tab-content, .faq-section, .process-section, .rights-section, .quick-links {
        padding: 20px;
    }
    
    .tab-content h4 {
        font-size: 18px;
    }
    
    .links-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .page-header h2 {
        font-size: 24px;
    }
    
    .service-section h3 {
        font-size: 20px;
    }
    
    .space-card {
        margin-bottom: 20px;
    }
}
</style>