<template>
    <div class="certificate-guide-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2><i class="el-icon-postcard"></i> 办证须知</h2>
            <p class="page-subtitle">砺行图书馆读者证办理相关规定与流程</p>
        </div>

        <!-- 公告提醒 -->
        <div class="notice-section">
            <el-alert
                title="重要公告"
                type="warning"
                :closable="false"
                show-icon>
                <div class="notice-content">
                    <p>根据图书馆管理规定，读者证办理、补办业务<strong>全部采用线下办理方式</strong>，暂不提供线上办理服务。</p>
                    <p>请读者本人携带所需材料到图书馆一楼服务台办理相关业务。</p>
                </div>
            </el-alert>
        </div>

        <!-- 主要内容 -->
        <div class="main-content">
            <el-row :gutter="30">
                <!-- 左侧主要信息 -->
                <el-col :span="16">
                    <!-- 办证指南 -->
                    <div class="guide-section">
                        <h3><i class="el-icon-s-order"></i> 办证指南</h3>
                        
                        <!-- 办证条件 -->
                        <div class="info-card">
                            <div class="card-header">
                                <i class="el-icon-user"></i>
                                <h4>办证条件</h4>
                            </div>
                            <div class="card-content">
                                <p>凡在校学生、教职工均可申请办理砺行图书馆读者证。</p>
                                <div class="condition-list">
                                    <div class="condition-item">
                                        <div class="condition-icon">
                                            <i class="el-icon-s-custom"></i>
                                        </div>
                                        <div class="condition-content">
                                            <h5>在校学生</h5>
                                            <p>凭本人有效学号办理，需提供身份证原件。</p>
                                        </div>
                                    </div>
                                    <div class="condition-item">
                                        <div class="condition-icon">
                                            <i class="el-icon-s-custom"></i>
                                        </div>
                                        <div class="condition-content">
                                            <h5>教职员工</h5>
                                            <p>凭工作证或人事处证明办理，需提供身份证原件。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 办证材料 -->
                        <div class="info-card">
                            <div class="card-header">
                                <i class="el-icon-document"></i>
                                <h4>所需材料</h4>
                            </div>
                            <div class="card-content">
                                <div class="material-table">
                                    <el-table :data="materials" style="width: 100%">
                                        <el-table-column prop="category" label="读者类型" width="120"></el-table-column>
                                        <el-table-column prop="materials" label="所需材料"></el-table-column>
                                        <el-table-column prop="notes" label="备注" width="150"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>

                        <!-- 办证流程 -->
                        <div class="info-card">
                            <div class="card-header">
                                <i class="el-icon-s-marketing"></i>
                                <h4>办证流程</h4>
                            </div>
                            <div class="card-content">
                                <div class="process-steps">
                                    <div class="step-item" v-for="(step, index) in applySteps" :key="index">
                                        <div class="step-number">{{ index + 1 }}</div>
                                        <div class="step-content">
                                            <h5>{{ step.title }}</h5>
                                            <p>{{ step.description }}</p>
                                            <div class="step-details" v-if="step.details">
                                                <p v-for="(detail, i) in step.details" :key="i">{{ detail }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 补办指南 -->
                    <div class="reissue-section">
                        <h3><i class="el-icon-refresh"></i> 补办指南</h3>
                        
                        <div class="info-card">
                            <div class="card-content">
                                <div class="reissue-info">
                                    <div class="reissue-item">
                                        <div class="reissue-icon">
                                            <i class="el-icon-warning"></i>
                                        </div>
                                        <div class="reissue-content">
                                            <h5>补办条件</h5>
                                            <ul>
                                                <li>读者证遗失、损坏无法正常使用</li>
                                                <li>读者证信息变更（如学号变更）</li>
                                                <li>读者证磁条失效</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div class="reissue-item">
                                        <div class="reissue-icon">
                                            <i class="el-icon-document-checked"></i>
                                        </div>
                                        <div class="reissue-content">
                                            <h5>补办材料</h5>
                                            <ul>
                                                <li>本人有效身份证件（原件）</li>
                                                <li>原读者证（如损坏需交回）</li>
                                                <li>补办申请表（服务台领取）</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div class="reissue-item">
                                        <div class="reissue-icon">
                                            <i class="el-icon-money"></i>
                                        </div>
                                        <div class="reissue-content">
                                            <h5>补办费用</h5>
                                            <div class="fee-info">
                                                <div class="fee-item">
                                                    <span class="fee-label">补办工本费：</span>
                                                    <span class="fee-value">15元</span>
                                                </div>
                                                <div class="fee-note">
                                                    * 如原证损坏交回，可减免5元工本费
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="reissue-process">
                                    <h5>补办流程</h5>
                                    <div class="process-flow">
                                        <div class="flow-step">
                                            <div class="flow-icon">①</div>
                                            <div class="flow-content">填写《读者证补办申请表》</div>
                                        </div>
                                        <div class="flow-arrow">→</div>
                                        <div class="flow-step">
                                            <div class="flow-icon">②</div>
                                            <div class="flow-content">缴纳补办工本费</div>
                                        </div>
                                        <div class="flow-arrow">→</div>
                                        <div class="flow-step">
                                            <div class="flow-icon">③</div>
                                            <div class="flow-content">现场制作新读者证</div>
                                        </div>
                                        <div class="flow-arrow">→</div>
                                        <div class="flow-step">
                                            <div class="flow-icon">④</div>
                                            <div class="flow-content">领取新证，原证注销</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>

                <!-- 右侧侧边栏 -->
                <el-col :span="8">
                    <!-- 服务信息 -->
                    <div class="service-info-section">
                        <h3><i class="el-icon-service"></i> 服务信息</h3>
                        
                        <div class="service-card">
                            <div class="service-header">
                                <i class="el-icon-location"></i>
                                <h4>办理地点</h4>
                            </div>
                            <div class="service-content">
                                <p>砺行图书馆一楼总服务台</p>
                                <div class="location-details">
                                    <p><i class="el-icon-map-location"></i> 地址：砺行大学城图书馆大楼一楼</p>
                                    <p><i class="el-icon-phone"></i> 咨询电话：020-87654321转101</p>
                                </div>
                            </div>
                        </div>

                        <div class="service-card">
                            <div class="service-header">
                                <i class="el-icon-time"></i>
                                <h4>办理时间</h4>
                            </div>
                            <div class="service-content">
                                <div class="time-table">
                                    <div class="time-item">
                                        <span class="time-day">周一至周五</span>
                                        <span class="time-hours">8:30 - 12:00<br>14:00 - 17:30</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="time-day">周六</span>
                                        <span class="time-hours">9:00 - 12:00<br>14:00 - 17:00</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="time-day">周日</span>
                                        <span class="time-hours">暂停办理</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="time-day">节假日</span>
                                        <span class="time-hours">按公告时间</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="service-card">
                            <div class="service-header">
                                <i class="el-icon-warning-outline"></i>
                                <h4>注意事项</h4>
                            </div>
                            <div class="service-content">
                                <div class="notice-list">
                                    <div class="notice-item" v-for="(notice, index) in importantNotices" :key="index">
                                        <div class="notice-icon">
                                            <i class="el-icon-info"></i>
                                        </div>
                                        <div class="notice-text">
                                            <p>{{ notice }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 读者证功能 -->
                    <div class="function-section">
                        <h3><i class="el-icon-s-opportunity"></i> 读者证功能</h3>
                        
                        <div class="function-list">
                            <div class="function-item" v-for="(func, index) in cardFunctions" :key="index">
                                <div class="function-icon">
                                    <i :class="func.icon"></i>
                                </div>
                                <div class="function-content">
                                    <h5>{{ func.title }}</h5>
                                    <p>{{ func.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 常见问题 -->
                    <div class="faq-section">
                        <h3><i class="el-icon-question"></i> 常见问题</h3>
                        
                        <el-collapse accordion>
                            <el-collapse-item title="读者证的有效期是多久？" name="1">
                                <p>在校学生读者证有效期与学制一致，教职工读者证长期有效。</p>
                            </el-collapse-item>
                            <el-collapse-item title="可以委托他人代办吗？" name="2">
                                <p>首次办理必须本人到场。补办业务如需委托他人办理，需提供委托书及双方身份证复印件。</p>
                            </el-collapse-item>
                            <el-collapse-item title="读者证可以借给他人使用吗？" name="3">
                                <p>读者证仅限本人使用，不得转借他人。违规使用将暂停借阅权限。</p>
                            </el-collapse-item>
                            <el-collapse-item title="补办后原证的借书记录还在吗？" name="4">
                                <p>补办新证后，原读者证作废，但借书记录会自动转移到新证。</p>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-col>
            </el-row>

            <!-- 办证提示 -->
            <div class="tips-section">
                <h3><i class="el-icon-info"></i> 温馨提示</h3>
                <div class="tips-content">
                    <div class="tip-item" v-for="(tip, index) in tips" :key="index">
                        <div class="tip-icon">
                            <i class="el-icon-chat-dot-round"></i>
                        </div>
                        <div class="tip-text">
                            <p>{{ tip }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

// 所需材料数据
const materials = ref([
    { category: '在校学生', materials: '1. 本人有效身份证件（原件）\n2. 学号信息\n3. 一寸免冠照片1张', notes: '必须本人到场办理' },
    { category: '教职员工', materials: '1. 本人有效身份证件（原件）\n2. 工作证或人事处证明\n3. 一寸免冠照片1张', notes: '必须本人到场办理' }
])

// 办证流程
const applySteps = ref([
    {
        title: '准备材料',
        description: '根据读者类型准备相应材料',
        details: ['在校学生：身份证原件、学号信息、一寸照片', '教职员工：身份证原件、工作证明、一寸照片']
    },
    {
        title: '前往服务台',
        description: '携带材料到图书馆一楼总服务台',
        details: ['地点：砺行图书馆一楼大厅', '时间：参见右侧服务时间']
    },
    {
        title: '填写申请表',
        description: '现场填写《读者证申请表》',
        details: ['申请表在服务台领取', '请使用黑色签字笔填写']
    },
    {
        title: '信息核对',
        description: '工作人员核对信息并录入系统',
        details: ['核对身份信息', '录入学号/工号信息']
    },
    {
        title: '制作读者证',
        description: '现场制作读者证',
        details: ['现场拍照（如需）', '制作实体读者证']
    },
    {
        title: '领取读者证',
        description: '当场领取读者证',
        details: ['签字确认', '了解使用须知']
    }
])

// 重要注意事项
const importantNotices = ref([
    '读者证仅限本人使用，不得转借他人',
    '首次办理必须本人到场，不可代办',
    '办理时请确保携带所有必需材料',
    '补办需缴纳工本费，请准备好现金',
    '读者证丢失后请及时挂失，避免被冒用'
])

// 读者证功能
const cardFunctions = ref([
    { icon: 'el-icon-reading', title: '图书借阅', description: '凭读者证可在馆内借阅图书' },
    { icon: 'el-icon-monitor', title: '数字资源', description: '访问电子图书、数据库等数字资源' },
    { icon: 'el-icon-search', title: '文献检索', description: '使用馆内文献检索系统' },
    { icon: 'el-icon-office-building', title: '空间预约', description: '预约研讨室、个人研修室' },
    { icon: 'el-icon-printer', title: '文印服务', description: '使用自助打印、复印设备' },
    { icon: 'el-icon-s-cooperation', title: '活动参与', description: '参加图书馆举办的各类活动' }
])

// 温馨提示
const tips = ref([
    '建议办理读者证时随身携带学生证或工作证以备查验',
    '读者证请妥善保管，避免与手机、磁卡等物品放在一起',
    '如发现读者证丢失，请立即到服务台挂失',
    '读者证损坏影响使用时，请及时到服务台更换',
    '毕业离校前请到图书馆办理读者证注销手续'
])
</script>

<style scoped>
.certificate-guide-container {
    animation: fadeIn 0.6s ease-out;
}

/* 页面标题 */
.page-header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
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

/* 公告提醒 */
.notice-section {
    margin-bottom: 30px;
}

.notice-content {
    line-height: 1.6;
}

.notice-content p {
    margin-bottom: 8px;
}

.notice-content strong {
    color: #f56c6c;
}

/* 主要内容 */
.main-content {
    margin-top: 20px;
}

/* 通用卡片样式 */
.info-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e8f4f8;
    margin-bottom: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    overflow: hidden;
}

.card-header {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    padding: 20px 25px;
    border-bottom: 1px solid #e8f4f8;
    display: flex;
    align-items: center;
}

.card-header i {
    font-size: 24px;
    color: #3699aa;
    margin-right: 12px;
}

.card-header h4 {
    color: #2c3e50;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
}

.card-content {
    padding: 25px;
}

/* 办证指南部分 */
.guide-section h3,
.reissue-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.guide-section h3 i,
.reissue-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 26px;
}

/* 办证条件 */
.condition-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.condition-item {
    display: flex;
    align-items: flex-start;
}

.condition-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    flex-shrink: 0;
}

.condition-icon i {
    font-size: 24px;
    color: #3699aa;
}

.condition-content {
    flex: 1;
}

.condition-content h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 600;
}

.condition-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
}

/* 材料表格 */
.material-table :deep(.el-table) {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

.material-table :deep(.el-table th) {
    background-color: #f5f7fa;
    color: #2c3e50;
    font-weight: 600;
}

.material-table :deep(.el-table td) {
    white-space: pre-line;
    line-height: 1.6;
}

/* 办证流程 */
.process-steps {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.step-item {
    display: flex;
    align-items: flex-start;
}

.step-number {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-right: 20px;
    flex-shrink: 0;
}

.step-content {
    flex: 1;
    padding-bottom: 25px;
    border-bottom: 1px dashed #e8f4f8;
}

.step-item:last-child .step-content {
    border-bottom: none;
    padding-bottom: 0;
}

.step-content h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
}

.step-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin-bottom: 10px;
}

.step-details {
    background: #f8fafc;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
}

.step-details p {
    color: #7f8c8d;
    font-size: 14px;
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
}

.step-details p:before {
    content: '•';
    color: #3699aa;
    position: absolute;
    left: 8px;
}

/* 补办指南 */
.reissue-info {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 30px;
}

.reissue-item {
    display: flex;
    align-items: flex-start;
}

.reissue-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(245, 108, 108, 0.1) 0%, rgba(245, 108, 108, 0.05) 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    flex-shrink: 0;
}

.reissue-icon i {
    font-size: 24px;
    color: #f56c6c;
}

.reissue-content {
    flex: 1;
}

.reissue-content h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
}

.reissue-content ul {
    margin: 0;
    padding-left: 25px;
}

.reissue-content li {
    color: #5a6c7d;
    line-height: 1.8;
    margin-bottom: 8px;
}

.fee-info {
    background: #f8fafc;
    border-radius: 10px;
    padding: 20px;
    margin-top: 15px;
}

.fee-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.fee-label {
    color: #2c3e50;
    font-weight: 500;
}

.fee-value {
    color: #f56c6c;
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px;
}

.fee-note {
    color: #7f8c8d;
    font-size: 13px;
    font-style: italic;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed #dce6e9;
}

.reissue-process {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 12px;
    padding: 25px;
    border: 1px solid #e8f4f8;
}

.reissue-process h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 600;
    text-align: center;
}

.process-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.flow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    min-width: 120px;
}

.flow-icon {
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
    margin-bottom: 15px;
}

.flow-content {
    color: #2c3e50;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
}

.flow-arrow {
    color: #3699aa;
    font-size: 24px;
    margin: 0 10px;
}

/* 侧边栏样式 */
.service-info-section,
.function-section,
.faq-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.service-info-section h3,
.function-section h3,
.faq-section h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.service-info-section h3 i,
.function-section h3 i,
.faq-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

/* 服务卡片 */
.service-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
}

.service-card:last-child {
    margin-bottom: 0;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.service-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.service-header i {
    font-size: 22px;
    color: #3699aa;
    margin-right: 10px;
}

.service-header h4 {
    color: #2c3e50;
    font-size: 18px;
    margin: 0;
    font-weight: 600;
}

.service-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin-bottom: 15px;
}

.location-details {
    background: white;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
}

.location-details p {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 10px;
}

.location-details i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 16px;
}

/* 办理时间 */
.time-table {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.time-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px dashed #e8f4f8;
}

.time-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.time-day {
    color: #2c3e50;
    font-weight: 500;
    font-size: 15px;
}

.time-hours {
    color: #5a6c7d;
    font-size: 14px;
    text-align: right;
    line-height: 1.5;
}

/* 注意事项列表 */
.notice-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.notice-item {
    display: flex;
    align-items: flex-start;
}

.notice-icon {
    width: 30px;
    height: 30px;
    background: rgba(245, 108, 108, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.notice-icon i {
    color: #f56c6c;
    font-size: 16px;
}

.notice-text p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
    font-size: 14px;
}

/* 功能列表 */
.function-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.function-item {
    display: flex;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e8f4f8;
}

.function-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.function-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.function-icon i {
    font-size: 24px;
    color: #3699aa;
}

.function-content {
    flex: 1;
}

.function-content h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 600;
}

.function-content p {
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
}

/* 常见问题 */
:deep(.el-collapse) {
    border: none;
}

:deep(.el-collapse-item__header) {
    font-size: 15px;
    font-weight: 500;
    color: #2c3e50;
    border-bottom: none;
    padding: 15px 0;
    background: none;
}

:deep(.el-collapse-item__content) {
    padding: 15px 0;
    color: #5a6c7d;
    line-height: 1.7;
}

/* 温馨提示 */
.tips-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-top: 30px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.tips-section h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.tips-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

.tips-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.tip-item {
    display: flex;
    align-items: flex-start;
}

.tip-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, rgba(103, 194, 58, 0.1) 0%, rgba(103, 194, 58, 0.05) 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    flex-shrink: 0;
}

.tip-icon i {
    font-size: 20px;
    color: #67c23a;
}

.tip-text {
    flex: 1;
    padding: 12px 0;
}

.tip-text p {
    color: #5a6c7d;
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
    .process-flow {
        flex-direction: column;
        align-items: center;
    }
    
    .flow-arrow {
        margin: 15px 0;
        transform: rotate(90deg);
    }
    
    .flow-step {
        min-width: auto;
        width: 100%;
        margin-bottom: 20px;
    }
}

@media (max-width: 768px) {
    .page-header h2 {
        font-size: 28px;
    }
    
    .page-subtitle {
        font-size: 16px;
    }
    
    .guide-section h3,
    .reissue-section h3 {
        font-size: 22px;
    }
    
    .card-content {
        padding: 20px;
    }
    
    .condition-item {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .condition-icon {
        margin-right: 0;
        margin-bottom: 15px;
    }
    
    .step-item {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .step-number {
        margin-right: 0;
        margin-bottom: 15px;
    }
    
    .step-content {
        padding-bottom: 20px;
    }
    
    .reissue-item {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .reissue-icon {
        margin-right: 0;
        margin-bottom: 15px;
    }
}

@media (max-width: 576px) {
    .page-header h2 {
        font-size: 24px;
    }
    
    .service-info-section,
    .function-section,
    .faq-section,
    .tips-section {
        padding: 20px;
    }
    
    .time-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .time-hours {
        text-align: left;
    }
}
</style>