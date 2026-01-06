<template>
    <div class="borrow-guide-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2><i class="el-icon-document-copy"></i> 借阅须知</h2>
            <p class="page-subtitle">砺行图书馆图书借阅流程与规定</p>
        </div>

        <!-- 核心规定 -->
        <div class="core-rules">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="rule-card primary">
                        <div class="card-icon">
                            <i class="el-icon-timer"></i>
                        </div>
                        <div class="card-content">
                            <h4>借阅期限</h4>
                            <div class="rule-value">45天</div>
                            <p class="rule-desc">每次借阅可使用45天</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="rule-card success">
                        <div class="card-icon">
                            <i class="el-icon-refresh"></i>
                        </div>
                        <div class="card-content">
                            <h4>续借规则</h4>
                            <div class="rule-value">3次 × 15天</div>
                            <p class="rule-desc">可续借3次，每次延长15天</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 借阅流程 -->
        <div class="borrow-process">
            <h3><span class="el-icon-s-marketing"  style="margin-top: 20px;color: black;">借阅流程</span> </h3>
            
            <div class="process-container">
                <div class="process-steps">
                    <div class="process-step" v-for="(step, index) in processSteps" :key="index">
                        <div class="step-header">
                            <div class="step-number">{{ index + 1 }}</div>
                            <h4>{{ step.title }}</h4>
                        </div>
                        <div class="step-content">
                            <p>{{ step.description }}</p>
                        </div>
                        <div class="step-arrow" v-if="index < processSteps.length - 1">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 续借说明 -->
        <div class="renew-section">
            <h3><i class="el-icon-refresh"></i> 续借说明</h3>
            
            <div class="renew-content">
                <div class="renew-card">
                    <div class="renew-header">
                        <i class="el-icon-circle-check"></i>
                        <h4>续借方式</h4>
                    </div>
                    <div class="renew-list">
                        <div class="renew-item">
                            <i class="el-icon-monitor"></i>
                            <span>图书馆网站续借</span>
                        </div>
                        <div class="renew-item">
                            <i class="el-icon-mobile-phone"></i>
                            <span>微信公众号续借</span>
                        </div>
                        <div class="renew-item">
                            <i class="el-icon-office-building"></i>
                            <span>服务台人工续借</span>
                        </div>
                        <div class="renew-item">
                            <i class="el-icon-takeaway-box"></i>
                            <span>自助借还机续借</span>
                        </div>
                    </div>
                </div>
                
                <div class="renew-card">
                    <div class="renew-header">
                        <i class="el-icon-warning-outline"></i>
                        <h4>注意事项</h4>
                    </div>
                    <div class="notice-list">
                        <div class="notice-item" v-for="(notice, index) in renewNotices" :key="index">
                            <i class="el-icon-info"></i>
                            <span>{{ notice }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 还书说明 -->
        <div class="return-section">
            <h3><i class="el-icon-s-release"></i> 还书说明</h3>
            
            <div class="return-content">
                <div class="return-methods">
                    <div class="method-card">
                        <div class="method-icon">
                            <i class="el-icon-takeaway-box"></i>
                        </div>
                        <div class="method-info">
                            <h5>自助还书</h5>
                            <p>使用馆内自助借还机24小时还书</p>
                        </div>
                    </div>
                    <div class="method-card">
                        <div class="method-icon">
                            <i class="el-icon-office-building"></i>
                        </div>
                        <div class="method-info">
                            <h5>服务台还书</h5>
                            <p>开馆时间内到服务台人工办理还书</p>
                        </div>
                    </div>
                </div>
                
                <div class="return-tips">
                    <h5><i class="el-icon-chat-dot-round"></i> 温馨提示</h5>
                    <p>请按期归还图书，逾期将按规定处理。还书时请确认图书归还成功。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

// 流程步骤
const processSteps = ref([
    {
        title: '查找图书',
        description: '通过查询系统查找所需图书，记录索书号和馆藏位置'
    },
    {
        title: '取书',
        description: '根据索书号到书架上找到图书并取出'
    },
    {
        title: '办理借阅',
        description: '携带读者证和图书到服务台或自助借还机办理借阅'
    },
    {
        title: '核对信息',
        description: '确认借阅信息，记好还书日期'
    },
    {
        title: '使用与归还',
        description: '在规定期限内使用图书，到期前归还或续借'
    }
])

// 续借注意事项
const renewNotices = ref([
    '图书到期前7天内可办理续借',
    '每本图书最多续借3次，每次延长15天',
    '逾期图书不可续借',
    '已被预约的图书不可续借',
    '续借后请记好新的还书日期'
])
</script>

<style scoped>
.borrow-guide-container {
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

/* 核心规定 */
.core-rules {
    margin-bottom: 50px;
}

.rule-card {
    border-radius: 15px;
    padding: 30px;
    display: flex;
    align-items: center;
    height: 100%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.rule-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.rule-card.primary {
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    color: white;
}

.rule-card.success {
    background: linear-gradient(135deg, #67c23a 0%, #5aaf2f 100%);
    color: white;
}

.card-icon {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 25px;
    flex-shrink: 0;
}

.card-icon i {
    font-size: 36px;
}

.card-content {
    flex: 1;
}

.card-content h4 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;
    opacity: 0.9;
}

.rule-value {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 8px;
    letter-spacing: 1px;
}

.rule-desc {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
}

/* 借阅流程 */
.borrow-process {
    margin-bottom: 50px;
}

.borrow-process h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.borrow-process h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 26px;
}

.process-container {
    background: white;
    border-radius: 15px;
    padding: 40px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.process-steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
}

.process-step {
    flex: 1;
    position: relative;
    text-align: center;
    padding: 0 15px;
}

.step-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
}

.step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
    box-shadow: 0 8px 20px rgba(54, 153, 170, 0.3);
}

.step-header h4 {
    color: #2c3e50;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.step-content {
    background: #f8fafc;
    border-radius: 12px;
    padding: 25px 20px;
    border: 1px solid #e8f4f8;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-content p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
    font-size: 15px;
}

.step-arrow {
    position: absolute;
    top: 30px;
    right: -15px;
    color: #3699aa;
    font-size: 28px;
    z-index: 2;
}

/* 续借说明 */
.renew-section {
    margin-bottom: 50px;
}

.renew-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.renew-section h3 i {
    color: #67c23a;
    margin-right: 10px;
    font-size: 26px;
}

.renew-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}

.renew-card {
    background: white;
    border-radius: 15px;
    padding: 30px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.renew-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
}

.renew-header i {
    font-size: 28px;
    color: #3699aa;
    margin-right: 15px;
}

.renew-header h4 {
    color: #2c3e50;
    font-size: 20px;
    margin: 0;
    font-weight: 600;
}

.renew-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.renew-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
}

.renew-item:hover {
    transform: translateX(5px);
    border-color: #3699aa;
    background: rgba(54, 153, 170, 0.05);
}

.renew-item i {
    color: #3699aa;
    font-size: 20px;
    margin-right: 12px;
}

.renew-item span {
    color: #2c3e50;
    font-size: 16px;
    font-weight: 500;
}

.notice-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.notice-item {
    display: flex;
    align-items: flex-start;
}

.notice-item i {
    color: #e6a23c;
    font-size: 18px;
    margin-right: 12px;
    margin-top: 3px;
    flex-shrink: 0;
}

.notice-item span {
    color: #5a6c7d;
    line-height: 1.6;
    font-size: 15px;
}

/* 还书说明 */
.return-section {
    margin-bottom: 30px;
}

.return-section h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.return-section h3 i {
    color: #f56c6c;
    margin-right: 10px;
    font-size: 26px;
}

.return-content {
    background: white;
    border-radius: 15px;
    padding: 40px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.return-methods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 40px;
}

.method-card {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 12px;
    padding: 30px;
    border: 1px solid #e8f4f8;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.method-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #3699aa;
}

.method-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 25px;
    flex-shrink: 0;
}

.method-icon i {
    font-size: 32px;
    color: #3699aa;
}

.method-info {
    flex: 1;
}

.method-info h5 {
    color: #2c3e50;
    font-size: 20px;
    margin-bottom: 12px;
    font-weight: 600;
}

.method-info p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
    font-size: 15px;
}

.return-tips {
    background: linear-gradient(135deg, rgba(230, 162, 60, 0.1) 0%, rgba(230, 162, 60, 0.05) 100%);
    border-radius: 12px;
    padding: 25px;
    border: 1px solid rgba(230, 162, 60, 0.2);
}

.return-tips h5 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.return-tips h5 i {
    color: #e6a23c;
    margin-right: 10px;
    font-size: 20px;
}

.return-tips p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
    font-size: 15px;
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
    .process-steps {
        flex-direction: column;
        align-items: center;
    }
    
    .process-step {
        width: 100%;
        margin-bottom: 40px;
    }
    
    .step-arrow {
        display: none;
    }
    
    .renew-content {
        grid-template-columns: 1fr;
        gap: 25px;
    }
    
    .return-methods {
        grid-template-columns: 1fr;
        gap: 25px;
    }
}

@media (max-width: 768px) {
    .page-header h2 {
        font-size: 28px;
    }
    
    .page-subtitle {
        font-size: 16px;
    }
    
    .borrow-process h3,
    .renew-section h3,
    .return-section h3 {
        font-size: 22px;
    }
    
    .process-container {
        padding: 25px;
    }
    
    .rule-card {
        flex-direction: column;
        text-align: center;
        padding: 25px 20px;
    }
    
    .card-icon {
        margin-right: 0;
        margin-bottom: 20px;
    }
    
    .renew-card,
    .return-content {
        padding: 25px;
    }
}

@media (max-width: 576px) {
    .page-header h2 {
        font-size: 24px;
    }
    
    .rule-value {
        font-size: 30px;
    }
    
    .method-card {
        flex-direction: column;
        text-align: center;
        padding: 25px 20px;
    }
    
    .method-icon {
        margin-right: 0;
        margin-bottom: 20px;
    }
}
</style>