<template>
    <div class="entry-guide-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2><i class="el-icon-reading"></i> 入馆须知</h2>
            <p class="page-subtitle">为了营造良好的阅读环境，请遵守以下入馆规定</p>
        </div>

        <!-- 重要提示 -->
        <div class="important-notice">
            <el-alert
                title="重要提示"
                type="warning"
                :closable="false"
                show-icon>
                <div class="notice-content">
                    <p>为了保障所有读者的权益，请务必遵守图书馆的各项规定。违规行为将按照相关规定处理。</p>
                </div>
            </el-alert>
        </div>

        <!-- 主要内容 -->
        <div class="main-content">
            <el-row :gutter="30">
                <!-- 左侧主要规定 -->
                <el-col :span="16">
                    <!-- 基本规定 -->
                    <div class="regulation-section">
                        <h3><i class="el-icon-s-flag"></i> 基本规定</h3>
                        
                        <div class="regulation-cards">
                            <el-card class="regulation-card" shadow="hover">
                                <div class="card-icon">
                                    <i class="el-icon-user"></i>
                                </div>
                                <div class="card-content">
                                    <h4>证件要求</h4>
                                    <div class="requirement-list">
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>进入图书馆必须携带有效读者证</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>读者证仅限本人使用，不得转借</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>临时来访人员需登记身份证件</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>

                            <el-card class="regulation-card" shadow="hover">
                                <div class="card-icon">
                                    <i class="el-icon-lock"></i>
                                </div>
                                <div class="card-content">
                                    <h4>安全要求</h4>
                                    <div class="requirement-list">
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>遵守消防安全规定，严禁吸烟</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>不得携带易燃易爆物品入馆</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>配合安检，遵守安保人员指引</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>

                            <el-card class="regulation-card" shadow="hover">
                                <div class="card-icon">
                                    <i class="el-icon-office-building"></i>
                                </div>
                                <div class="card-content">
                                    <h4>秩序要求</h4>
                                    <div class="requirement-list">
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>保持安静，手机调至静音或振动</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>不得抢占座位，离开时请带走个人物品</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>遵守各区域的使用规定</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>

                            <el-card class="regulation-card" shadow="hover">
                                <div class="card-icon">
                                    <i class="el-icon-takeaway-box"></i>
                                </div>
                                <div class="card-content">
                                    <h4>物品管理</h4>
                                    <div class="requirement-list">
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>贵重物品请自行保管，遗失自负</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>使用存包柜存放个人物品</span>
                                        </div>
                                        <div class="requirement-item">
                                            <i class="el-icon-check requirement-icon"></i>
                                            <span>闭馆时请带离所有个人物品</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>

                    <!-- 禁止行为 -->
                    <div class="prohibition-section">
                        <h3><i class="el-icon-warning-outline"></i> 禁止行为</h3>
                        
                        <div class="prohibition-grid">
                            <div class="prohibition-item" v-for="(item, index) in prohibitions" :key="index">
                                <div class="prohibition-icon">
                                    <i class="el-icon-close"></i>
                                </div>
                                <div class="prohibition-content">
                                    <h5>{{ item.title }}</h5>
                                    <p>{{ item.description }}</p>
                                    <span class="consequence">处理：{{ item.consequence }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 入馆流程 -->
                    <div class="entry-process-section">
                        <h3><i class="el-icon-s-marketing"></i> 入馆流程</h3>
                        
                        <div class="process-container">
                            <div class="process-steps">
                                <div class="process-step" v-for="(step, index) in entrySteps" :key="index">
                                    <div class="step-header">
                                        <div class="step-number">{{ index + 1 }}</div>
                                        <h4>{{ step.title }}</h4>
                                    </div>
                                    <div class="step-content">
                                        <p>{{ step.description }}</p>
                                        <div class="step-details" v-if="step.details">
                                            <div class="detail-item" v-for="(detail, i) in step.details" :key="i">
                                                <i class="el-icon-info detail-icon"></i>
                                                <span>{{ detail }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="step-arrow" v-if="index < entrySteps.length - 1">
                                        <i class="el-icon-arrow-down"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>

                <!-- 右侧侧边栏 -->
                <el-col :span="8">
                    <!-- 开放时间 -->
                    <div class="opening-hours-section">
                        <h3><i class="el-icon-time"></i> 开放时间</h3>
                        
                        <div class="hours-card">
                            <div class="hours-header">
                                <i class="el-icon-date"></i>
                                <span>常规开放时间</span>
                            </div>
                            <div class="hours-content">
                                <div class="time-item" v-for="(item, index) in openingHours" :key="index">
                                    <div class="day">{{ item.day }}</div>
                                    <div class="time">{{ item.time }}</div>
                                    <div class="status" :class="item.status">{{ item.statusText }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="special-hours">
                            <div class="special-header">
                                <i class="el-icon-warning"></i>
                                <span>特别提醒</span>
                            </div>
                            <div class="special-content">
                                <p>法定节假日开放时间另行公告，请关注图书馆网站或公告栏。</p>
                                <p>寒暑假期间开放时间有调整，具体安排请提前查询。</p>
                            </div>
                        </div>
                    </div>

                    <!-- 入馆提示 -->
                    <div class="tips-section">
                        <h3><i class="el-icon-info"></i> 温馨提示</h3>
                        
                        <div class="tips-list">
                            <div class="tip-item" v-for="(tip, index) in tips" :key="index">
                                <div class="tip-icon">
                                    <i class="el-icon-chat-dot-round"></i>
                                </div>
                                <div class="tip-content">
                                    <p>{{ tip }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 疫情防控 -->
                    <div class="epidemic-section">
                        <h3><i class="el-icon-first-aid-kit"></i> 疫情防控要求</h3>
                        
                        <div class="epidemic-card">
                            <div class="epidemic-content">
                                <div class="measure-item" v-for="(measure, index) in epidemicMeasures" :key="index">
                                    <div class="measure-icon">
                                        <i :class="measure.icon"></i>
                                    </div>
                                    <div class="measure-content">
                                        <h5>{{ measure.title }}</h5>
                                        <p>{{ measure.description }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="epidemic-note">
                                <p>根据疫情防控需要，相关规定可能随时调整，请配合工作人员安排。</p>
                            </div>
                        </div>
                    </div>

                    <!-- 紧急情况 -->
                    <div class="emergency-section">
                        <h3><i class="el-icon-s-help"></i> 紧急情况处理</h3>
                        
                        <div class="emergency-card">
                            <div class="emergency-content">
                                <div class="emergency-item">
                                    <div class="emergency-icon">
                                        <i class="el-icon-s-flag"></i>
                                    </div>
                                    <div class="emergency-info">
                                        <h5>火警应急</h5>
                                        <p>保持冷静，听从工作人员指挥，按照疏散指示撤离。</p>
                                    </div>
                                </div>
                                <div class="emergency-item">
                                    <div class="emergency-icon">
                                        <i class="el-icon-phone-outline"></i>
                                    </div>
                                    <div class="emergency-info">
                                        <h5>紧急联系电话</h5>
                                        <div class="contact-info">
                                            <p><i class="el-icon-phone"></i> 图书馆安保：020-87654321转999</p>
                                            <p><i class="el-icon-phone"></i> 校园保卫处：020-87650000</p>
                                            <p><i class="el-icon-phone"></i> 医疗急救：120</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- 违规处理 -->
            <div class="violation-section">
                <h3><i class="el-icon-s-release"></i> 违规处理</h3>
                
                <div class="violation-table">
                    <el-table :data="violationActions" style="width: 100%">
                        <el-table-column prop="violation" label="违规行为" width="200"></el-table-column>
                        <el-table-column prop="description" label="行为描述"></el-table-column>
                        <el-table-column prop="action" label="处理措施" width="180"></el-table-column>
                        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
                    </el-table>
                </div>
                
                <div class="violation-note">
                    <p>多次违规或情节严重者，将暂停其读者权限。造成损失的，需承担相应赔偿责任。</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

// 禁止行为数据
const prohibitions = ref([
    { 
        title: '吸烟饮酒', 
        description: '馆内任何区域禁止吸烟、饮酒及食用有刺激性气味的食品', 
        consequence: '劝离并通报批评' 
    },
    { 
        title: '占座行为', 
        description: '使用物品占座超过30分钟且无人使用', 
        consequence: '物品将收至服务台，累计3次暂停借阅权限' 
    },
    { 
        title: '大声喧哗', 
        description: '在阅览区、自习区大声接打电话、交谈或外放音频', 
        consequence: '警告并劝离阅览区' 
    },
    { 
        title: '破坏设施', 
        description: '故意损坏图书、设备或馆内设施', 
        consequence: '照价赔偿并暂停权限' 
    },
    { 
        title: '宠物入馆', 
        description: '携带宠物（导盲犬除外）进入图书馆', 
        consequence: '立即劝离' 
    },
    { 
        title: '商业活动', 
        description: '未经许可在馆内进行商业宣传、推销等活动', 
        consequence: '没收宣传材料并劝离' 
    },
    { 
        title: '不文明行为', 
        description: '躺卧、脱鞋、穿着不雅等不文明行为', 
        consequence: '劝止并记录' 
    },
    { 
        title: '违规用电', 
        description: '私拉电线、使用大功率电器或违规充电', 
        consequence: '没收电器并通报批评' 
    }
])

// 入馆流程
const entrySteps = ref([
    {
        title: '准备证件',
        description: '携带有效读者证或身份证件',
        details: ['读者证仅限本人使用', '临时访客需登记身份证件']
    },
    {
        title: '安全检查',
        description: '通过安检门，配合安全检查',
        details: ['禁止携带危险物品', '大件物品需寄存']
    },
    {
        title: '刷卡入馆',
        description: '在闸机处刷读者证入馆',
        details: ['一人一证，不得尾随', '无证人员需办理临时证件']
    },
    {
        title: '寄存物品',
        description: '将个人物品存入存包柜',
        details: ['贵重物品请随身携带', '闭馆前请取回物品']
    },
    {
        title: '文明阅览',
        description: '遵守馆内秩序，保持安静',
        details: ['手机调至静音', '不得在阅览区饮食']
    }
])

// 开放时间
const openingHours = ref([
    { day: '周一至周四', time: '8:00 - 22:00', status: 'open', statusText: '正常开放' },
    { day: '周五', time: '8:00 - 21:30', status: 'open', statusText: '正常开放' },
    { day: '周六', time: '9:00 - 21:00', status: 'open', statusText: '正常开放' },
    { day: '周日', time: '9:00 - 20:00', status: 'open', statusText: '正常开放' },
    { day: '节假日', time: '另行公告', status: 'special', statusText: '特殊安排' }
])

// 温馨提示
const tips = ref([
    '图书馆为公共场所，请注意保管好个人财物',
    '雨伞请放在入口处的伞架上，不得带入阅览区',
    '请保持环境卫生，垃圾分类投放',
    '如需长时间离开，请带走个人物品或使用存包柜',
    '发现可疑情况或需要帮助，请及时联系工作人员'
])

// 疫情防控措施
const epidemicMeasures = ref([
    { icon: 'el-icon-mask', title: '佩戴口罩', description: '进入图书馆必须全程佩戴口罩' },
    { icon: 'el-icon-sunny', title: '体温检测', description: '入馆前需接受体温检测，体温异常者不得入内' },
    { icon: 'el-icon-s-order', title: '健康申报', description: '按要求完成健康信息登记' },
    { icon: 'el-icon-place', title: '保持距离', description: '保持安全社交距离，避免聚集' }
])

// 违规处理措施
const violationActions = ref([
    { 
        violation: '占座行为', 
        description: '使用物品占座超过规定时间无人使用', 
        action: '物品收至服务台，首次警告', 
        remark: '累计3次暂停权限' 
    },
    { 
        violation: '大声喧哗', 
        description: '在阅览区大声接打电话或交谈影响他人', 
        action: '警告并劝离阅览区', 
        remark: '情节严重者记录在案' 
    },
    { 
        violation: '损坏图书', 
        description: '污损、撕毁、涂划馆藏图书', 
        action: '按图书定价2-5倍赔偿', 
        remark: '暂停借阅权限3个月' 
    },
    { 
        violation: '违规用电', 
        description: '私拉电线或使用违规电器', 
        action: '没收电器，通报批评', 
        remark: '暂停权限1个月' 
    },
    { 
        violation: '冒用证件', 
        description: '使用他人读者证入馆或借书', 
        action: '暂扣证件，双方暂停权限', 
        remark: '通报所在单位' 
    },
    { 
        violation: '不配合管理', 
        description: '不服从工作人员管理，态度恶劣', 
        action: '立即劝离，暂停权限', 
        remark: '视情节严重程度处理' 
    }
])
</script>

<style scoped>
.entry-guide-container {
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

/* 重要提示 */
.important-notice {
    margin-bottom: 30px;
}

.notice-content {
    line-height: 1.6;
}

/* 主要内容 */
.main-content {
    margin-top: 20px;
}

/* 基本规定 */
.regulation-section {
    margin-bottom: 40px;
}

.regulation-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.regulation-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 26px;
}

.regulation-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
}

.regulation-card {
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    height: 100%;
}

.regulation-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.regulation-card :deep(.el-card__body) {
    padding: 25px;
    display: flex;
    align-items: flex-start;
}

.card-icon {
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

.card-icon i {
    font-size: 28px;
    color: #3699aa;
}

.card-content {
    flex: 1;
}

.card-content h4 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 600;
}

.requirement-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.requirement-item {
    display: flex;
    align-items: flex-start;
}

.requirement-icon {
    color: #67c23a;
    font-size: 16px;
    margin-right: 10px;
    margin-top: 3px;
    flex-shrink: 0;
}

.requirement-item span {
    color: #5a6c7d;
    line-height: 1.6;
    font-size: 15px;
}

/* 禁止行为 */
.prohibition-section {
    margin-bottom: 40px;
}

.prohibition-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.prohibition-section h3 i {
    color: #f56c6c;
    margin-right: 10px;
    font-size: 26px;
}

.prohibition-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
}

.prohibition-item {
    background: white;
    border-radius: 12px;
    padding: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    display: flex;
    align-items: flex-start;
}

.prohibition-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #f56c6c;
}

.prohibition-icon {
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

.prohibition-icon i {
    font-size: 24px;
    color: #f56c6c;
}

.prohibition-content {
    flex: 1;
}

.prohibition-content h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 600;
}

.prohibition-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 14px;
}

.consequence {
    display: inline-block;
    padding: 6px 12px;
    background: rgba(245, 108, 108, 0.1);
    color: #f56c6c;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
}

/* 入馆流程 */
.entry-process-section {
    margin-bottom: 40px;
}

.entry-process-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.entry-process-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 26px;
}

.process-container {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 15px;
    padding: 30px;
    border: 1px solid #e8f4f8;
}

.process-steps {
    position: relative;
}

.process-step {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.process-step:last-child {
    margin-bottom: 0;
}

.step-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
    font-size: 20px;
    margin-right: 20px;
}

.step-header h4 {
    color: #2c3e50;
    font-size: 20px;
    margin: 0;
    font-weight: 600;
}

.step-content {
    padding-left: 60px;
}

.step-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin-bottom: 15px;
}

.step-details {
    background: #f8fafc;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
}

.detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.detail-item:last-child {
    margin-bottom: 0;
}

.detail-icon {
    color: #3699aa;
    font-size: 14px;
    margin-right: 10px;
    flex-shrink: 0;
}

.detail-item span {
    color: #7f8c8d;
    font-size: 14px;
    line-height: 1.5;
}

.step-arrow {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: #3699aa;
    font-size: 24px;
    z-index: 1;
}

/* 侧边栏样式 */
.opening-hours-section,
.tips-section,
.epidemic-section,
.emergency-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.opening-hours-section h3,
.tips-section h3,
.epidemic-section h3,
.emergency-section h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.opening-hours-section h3 i,
.tips-section h3 i,
.epidemic-section h3 i,
.emergency-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

/* 开放时间 */
.hours-card {
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 20px;
    overflow: hidden;
    border: 1px solid #e8f4f8;
}

.hours-header {
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e8f4f8;
}

.hours-header i {
    color: #3699aa;
    font-size: 20px;
    margin-right: 10px;
}

.hours-header span {
    color: #2c3e50;
    font-weight: 600;
    font-size: 16px;
}

.hours-content {
    padding: 20px;
}

.time-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px dashed #e8f4f8;
}

.time-item:last-child {
    border-bottom: none;
}

.day {
    color: #2c3e50;
    font-weight: 500;
    font-size: 15px;
    flex: 1;
}

.time {
    color: #5a6c7d;
    font-size: 14px;
    flex: 1;
    text-align: center;
}

.status {
    font-size: 13px;
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 500;
    text-align: center;
    min-width: 70px;
}

.status.open {
    background: rgba(103, 194, 58, 0.1);
    color: #67c23a;
}

.status.special {
    background: rgba(230, 162, 60, 0.1);
    color: #e6a23c;
}

.special-hours {
    background: linear-gradient(135deg, rgba(230, 162, 60, 0.1) 0%, rgba(230, 162, 60, 0.05) 100%);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(230, 162, 60, 0.2);
}

.special-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.special-header i {
    color: #e6a23c;
    font-size: 20px;
    margin-right: 10px;
}

.special-header span {
    color: #2c3e50;
    font-weight: 600;
    font-size: 16px;
}

.special-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin-bottom: 10px;
    font-size: 14px;
}

.special-content p:last-child {
    margin-bottom: 0;
}

/* 温馨提示 */
.tips-list {
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
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.tip-icon i {
    font-size: 20px;
    color: #3699aa;
}

.tip-content {
    flex: 1;
    padding: 8px 0;
}

.tip-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
    font-size: 15px;
}

/* 疫情防控 */
.epidemic-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e8f4f8;
}

.epidemic-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
}

.measure-item {
    display: flex;
    align-items: flex-start;
}

.measure-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(245, 108, 108, 0.1) 0%, rgba(245, 108, 108, 0.05) 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.measure-icon i {
    font-size: 24px;
    color: #f56c6c;
}

.measure-content {
    flex: 1;
}

.measure-content h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 600;
}

.measure-content p {
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
}

.epidemic-note {
    padding-top: 15px;
    border-top: 1px dashed #e8f4f8;
}

.epidemic-note p {
    color: #7f8c8d;
    font-size: 13px;
    font-style: italic;
    line-height: 1.6;
    text-align: center;
}

/* 紧急情况 */
.emergency-card {
    background: linear-gradient(135deg, rgba(245, 108, 108, 0.05) 0%, rgba(245, 108, 108, 0.02) 100%);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(245, 108, 108, 0.2);
}

.emergency-content {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.emergency-item {
    display: flex;
    align-items: flex-start;
}

.emergency-icon {
    width: 50px;
    height: 50px;
    background: rgba(245, 108, 108, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.emergency-icon i {
    font-size: 24px;
    color: #f56c6c;
}

.emergency-info {
    flex: 1;
}

.emergency-info h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 600;
}

.emergency-info p {
    color: #5a6c7d;
    line-height: 1.6;
    margin-bottom: 10px;
}

.contact-info {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 15px;
    margin-top: 10px;
}

.contact-info p {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 8px;
}

.contact-info i {
    color: #f56c6c;
    margin-right: 8px;
    font-size: 16px;
}

/* 违规处理 */
.violation-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-top: 40px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.violation-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.violation-section h3 i {
    color: #f56c6c;
    margin-right: 10px;
    font-size: 26px;
}

.violation-table :deep(.el-table) {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

.violation-table :deep(.el-table th) {
    background-color: #f5f7fa;
    color: #2c3e50;
    font-weight: 600;
}

.violation-note {
    margin-top: 25px;
    padding: 20px;
    background: linear-gradient(135deg, rgba(245, 108, 108, 0.1) 0%, rgba(245, 108, 108, 0.05) 100%);
    border-radius: 10px;
    border: 1px solid rgba(245, 108, 108, 0.2);
}

.violation-note p {
    color: #5a6c7d;
    line-height: 1.6;
    text-align: center;
    margin: 0;
}

/* 读者承诺 */
.commitment-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-top: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.commitment-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.commitment-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 26px;
}

.commitment-card {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 12px;
    padding: 30px;
    border: 2px solid #e8f4f8;
    text-align: center;
}

.commitment-content p {
    color: #2c3e50;
    line-height: 1.8;
    font-size: 18px;
    margin-bottom: 30px;
    font-weight: 500;
}

.signature {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #e8f4f8;
}

.signature span {
    color: #2c3e50;
    font-size: 16px;
    font-weight: 500;
}

.date {
    color: #3699aa !important;
    font-weight: 600 !important;
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
@media (max-width: 1200px) {
    .regulation-cards {
        grid-template-columns: 1fr;
    }
    
    .prohibition-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .page-header h2 {
        font-size: 28px;
    }
    
    .page-subtitle {
        font-size: 16px;
    }
    
    .regulation-section h3,
    .prohibition-section h3,
    .entry-process-section h3,
    .violation-section h3,
    .commitment-section h3 {
        font-size: 22px;
    }
    
    .step-content {
        padding-left: 0;
    }
    
    .regulation-card :deep(.el-card__body) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .card-icon {
        margin-right: 0;
        margin-bottom: 20px;
    }
    
    .prohibition-item {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .prohibition-icon {
        margin-right: 0;
        margin-bottom: 20px;
    }
}

@media (max-width: 576px) {
    .page-header h2 {
        font-size: 24px;
    }
    
    .opening-hours-section,
    .tips-section,
    .epidemic-section,
    .emergency-section,
    .violation-section,
    .commitment-section {
        padding: 20px;
    }
    
    .signature {
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }
    
    .step-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .step-number {
        margin-right: 0;
    }
}
</style>