<template>
    <div class="area-service-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2><i class="el-icon-office-building"></i> 馆区服务</h2>
            <p class="page-subtitle">了解砺行图书馆各功能区域的分布与服务内容</p>
        </div>

        <!-- 楼层导航 -->
        <div class="floor-navigation">
            <div class="floor-tabs">
                <el-tabs v-model="activeFloor" type="border-card" @tab-click="handleFloorChange">
                    <el-tab-pane label="一楼大厅" name="1F">
                        <span slot="label"><i class="el-icon-s-home"></i> 一楼大厅</span>
                    </el-tab-pane>
                    <el-tab-pane label="二楼阅览区" name="2F">
                        <span slot="label"><i class="el-icon-reading"></i> 二楼阅览区</span>
                    </el-tab-pane>
                    <el-tab-pane label="三楼学术区" name="3F">
                        <span slot="label"><i class="el-icon-search"></i> 三楼学术区</span>
                    </el-tab-pane>
                    <el-tab-pane label="四楼特色区" name="4F">
                        <span slot="label"><i class="el-icon-star-on"></i> 四楼特色区</span>
                    </el-tab-pane>
                    <el-tab-pane label="五楼多功能区" name="5F">
                        <span slot="label"><i class="el-icon-s-grid"></i> 五楼多功能区</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!-- 主要内容 -->
        <div class="main-content">
            <el-row :gutter="30">
                <!-- 左侧：楼层平面图 -->
                <el-col :span="12">
                    <div class="floor-map-section">
                        <div class="section-header">
                            <h3><i class="el-icon-map-location"></i> 楼层平面图</h3>
                            <div class="floor-indicator">
                                <span class="current-floor">{{ currentFloor.name }}</span>
                                <span class="floor-size">面积：{{ currentFloor.area }}</span>
                            </div>
                        </div>
                        
                        <div class="floor-map-container">
                            <div class="floor-map">
                                <!-- 模拟平面图 -->
                                <div class="map-grid">
                                    <div v-for="(zone, index) in currentFloor.zones" 
                                         :key="index"
                                         :class="['map-zone', `zone-${zone.type}`]"
                                         :style="zoneStyle(zone)"
                                         @click="selectZone(zone)">
                                        <div class="zone-label">{{ zone.name }}</div>
                                        <div class="zone-info" v-if="selectedZone === zone.name">
                                            <i class="el-icon-location-information"></i>
                                            <span>{{ zone.description }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="map-legend">
                                <div class="legend-title">图例说明</div>
                                <div class="legend-items">
                                    <div class="legend-item">
                                        <span class="legend-color service"></span>
                                        <span>服务台</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color reading"></span>
                                        <span>阅览区</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color study"></span>
                                        <span>自习区</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color digital"></span>
                                        <span>数字资源区</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color special"></span>
                                        <span>特色馆藏区</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color meeting"></span>
                                        <span>会议室</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 楼层设施 -->
                    <div class="facilities-section">
                        <h3><i class="el-icon-s-tools"></i> 楼层设施</h3>
                        <div class="facilities-grid">
                            <div class="facility-item" v-for="facility in currentFloor.facilities" :key="facility.name">
                                <div class="facility-icon">
                                    <i :class="facility.icon"></i>
                                </div>
                                <div class="facility-content">
                                    <h5>{{ facility.name }}</h5>
                                    <p>{{ facility.description }}</p>
                                    <div class="facility-status">
                                        <span class="status-dot" :class="facility.status"></span>
                                        {{ facility.status === 'available' ? '正常开放' : '临时关闭' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>

                <!-- 右侧：服务详情 -->
                <el-col :span="12">
                    <!-- 服务详情 -->
                    <div class="service-detail-section">
                        <div class="section-header">
                            <h3><i class="el-icon-s-order"></i> 服务详情</h3>
                            <el-tag type="success" effect="dark">{{ currentFloor.openStatus }}</el-tag>
                        </div>
                        
                        <div class="service-cards">
                            <el-card class="service-card" shadow="hover">
                                <div slot="header" class="service-header">
                                    <i class="el-icon-s-flag"></i>
                                    <span>主要服务</span>
                                </div>
                                <div class="service-list">
                                    <div class="service-item" v-for="(service, index) in currentFloor.services" :key="index">
                                        <div class="service-name">
                                            <i class="el-icon-check"></i>
                                            {{ service.name }}
                                        </div>
                                        <div class="service-info">
                                            <span class="service-time">{{ service.time }}</span>
                                            <el-tag size="mini" :type="service.tagType">{{ service.tag }}</el-tag>
                                        </div>
                                    </div>
                                </div>
                            </el-card>

                            <el-card class="service-card" shadow="hover">
                                <div slot="header" class="service-header">
                                    <i class="el-icon-user"></i>
                                    <span>工作人员</span>
                                </div>
                                <div class="staff-list">
                                    <div class="staff-item" v-for="staff in currentFloor.staff" :key="staff.name">
                                        <div class="staff-avatar">
                                            <i class="el-icon-user-solid"></i>
                                        </div>
                                        <div class="staff-info">
                                            <h5>{{ staff.name }}<span class="staff-title">{{ staff.title }}</span></h5>
                                            <p class="staff-duty">{{ staff.duty }}</p>
                                            <div class="staff-contact">
                                                <span class="contact-item">
                                                    <i class="el-icon-phone"></i> {{ staff.phone }}
                                                </span>
                                                <span class="contact-item">
                                                    <i class="el-icon-office-building"></i> {{ staff.location }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>

                    <!-- 特别提示 -->
                    <div class="notice-section">
                        <h3><i class="el-icon-chat-dot-round"></i> 特别提示</h3>
                        <div class="notice-content">
                            <el-alert
                                title="重要提醒"
                                type="warning"
                                :closable="false"
                                show-icon>
                                疫情期间，请读者佩戴口罩入馆，保持社交距离。
                            </el-alert>
                            <div class="notice-list">
                                <div class="notice-item" v-for="(notice, index) in currentFloor.notices" :key="index">
                                    <div class="notice-icon">
                                        <i class="el-icon-info"></i>
                                    </div>
                                    <div class="notice-text">
                                        <p>{{ notice.text }}</p>
                                        <span class="notice-time">{{ notice.time }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 服务时间 -->
                    <div class="opening-hours">
                        <h3><i class="el-icon-time"></i> 服务时间</h3>
                        <el-table :data="currentFloor.hours" style="width: 100%" class="hours-table">
                            <el-table-column prop="day" label="星期" width="120"></el-table-column>
                            <el-table-column prop="time" label="服务时间"></el-table-column>
                            <el-table-column prop="remark" label="备注"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>

            <!-- 跨楼层服务 -->
            <div class="cross-floor-section">
                <h3><i class="el-icon-s-promotion"></i> 跨楼层服务</h3>
                <div class="cross-services">
                    <div class="cross-item" v-for="service in crossFloorServices" :key="service.name">
                        <div class="cross-icon">
                            <i :class="service.icon"></i>
                        </div>
                        <h4>{{ service.name }}</h4>
                        <p>{{ service.description }}</p>
                        <div class="floor-range">
                            覆盖楼层：<span v-for="floor in service.floors" :key="floor" class="floor-tag">{{ floor }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'

// 活动楼层
const activeFloor = ref('1F')

// 选中的区域
const selectedZone = ref('')

// 楼层数据
const floors = ref({
    '1F': {
        name: '一楼大厅',
        area: '2000平方米',
        openStatus: '正常开放',
        zones: [
            { name: '总服务台', type: 'service', width: '30%', height: '20%', top: '10%', left: '35%', description: '办证咨询、借还书服务' },
            { name: '咨询台', type: 'service', width: '25%', height: '15%', top: '10%', left: '5%', description: '问询、指引服务' },
            { name: '新书展示', type: 'special', width: '35%', height: '25%', top: '40%', left: '10%', description: '最新上架图书展示' },
            { name: '数字检索', type: 'digital', width: '25%', height: '30%', top: '40%', left: '55%', description: '馆藏查询、数字资源访问' },
            { name: '休闲阅读', type: 'reading', width: '40%', height: '30%', top: '70%', left: '5%', description: '报刊阅览、休闲阅读区' },
            { name: '图书漂流', type: 'special', width: '25%', height: '25%', top: '75%', left: '60%', description: '图书交换、捐赠区' }
        ],
        facilities: [
            { name: '自助借还机', icon: 'el-icon-takeaway-box', description: '支持自助借还书操作', status: 'available' },
            { name: '存包柜', icon: 'el-icon-suitcase', description: '电子存包柜，支持扫码', status: 'available' },
            { name: '饮水机', icon: 'el-icon-cold-drink', description: '冷热饮用水供应', status: 'available' },
            { name: '自助复印', icon: 'el-icon-printer', description: '自助打印复印扫描', status: 'available' },
            { name: '母婴室', icon: 'el-icon-s-home', description: '配备基本设施', status: 'available' },
            { name: '轮椅服务', icon: 'el-icon-s-help', description: '提供轮椅借用', status: 'available' }
        ],
        services: [
            { name: '办证服务', time: '8:30-17:30', tag: '现场办理', tagType: 'success' },
            { name: '借还书服务', time: '8:00-22:00', tag: '自助+人工', tagType: 'primary' },
            { name: '咨询引导', time: '8:00-22:00', tag: '随时提供', tagType: 'info' },
            { name: '失物招领', time: '8:30-17:30', tag: '一楼服务台', tagType: 'warning' }
        ],
        staff: [
            { name: '张晓琳', title: '主任', duty: '总服务台管理', phone: '020-87654321转101', location: '一楼服务台' },
            { name: '李伟', title: '馆员', duty: '办证服务', phone: '020-87654321转102', location: '咨询台' }
        ],
        notices: [
            { text: '一楼大厅提供免费WIFI，密码为：lixing2024', time: '长期有效' },
            { text: '图书漂流区每月更新图书，欢迎捐赠和交换', time: '每月1日更新' },
            { text: '自助设备故障请拨打服务电话：020-87654321转999', time: '24小时服务' }
        ],
        hours: [
            { day: '周一至周五', time: '8:00-22:00', remark: '正常开放' },
            { day: '周六', time: '9:00-21:00', remark: '正常开放' },
            { day: '周日', time: '9:00-20:00', remark: '部分服务休息' },
            { day: '节假日', time: '10:00-18:00', remark: '按公告时间开放' }
        ]
    },
    '2F': {
        name: '二楼阅览区',
        area: '2500平方米',
        openStatus: '正常开放',
        zones: [
            { name: '社科图书', type: 'reading', width: '40%', height: '45%', top: '5%', left: '5%', description: '社会科学类图书' },
            { name: '科技图书', type: 'reading', width: '40%', height: '45%', top: '5%', left: '55%', description: '自然科学类图书' },
            { name: '报刊阅览', type: 'reading', width: '40%', height: '30%', top: '65%', left: '5%', description: '报纸期刊阅览区' },
            { name: '自习区', type: 'study', width: '40%', height: '30%', top: '65%', left: '55%', description: '安静自习区域' },
            { name: '服务台', type: 'service', width: '15%', height: '15%', top: '50%', left: '42.5%', description: '楼层服务咨询' }
        ],
        facilities: [
            { name: '电子阅览室', icon: 'el-icon-monitor', description: '电脑设备50台', status: 'available' },
            { name: '电源插座', icon: 'el-icon-lightning', description: '每个座位配备', status: 'available' },
            { name: '无线网络', icon: 'el-icon-wifi', description: '全覆盖高速网络', status: 'available' },
            { name: '图书消毒', icon: 'el-icon-sunny', description: '图书紫外线消毒机', status: 'maintenance' },
            { name: '饮水间', icon: 'el-icon-coffee-cup', description: '直饮水供应', status: 'available' },
            { name: '应急药箱', icon: 'el-icon-first-aid-kit', description: '常用药品提供', status: 'available' }
        ],
        services: [
            { name: '图书阅览', time: '8:00-22:00', tag: '自由取阅', tagType: 'success' },
            { name: '自习服务', time: '8:00-22:00', tag: '预约优先', tagType: 'primary' },
            { name: '参考咨询', time: '9:00-17:00', tag: '专业指导', tagType: 'info' },
            { name: '文印服务', time: '9:00-20:00', tag: '自助设备', tagType: 'warning' }
        ],
        staff: [
            { name: '王明', title: '主管', duty: '阅览区管理', phone: '020-87654321转201', location: '二楼服务台' },
            { name: '刘芳', title: '馆员', duty: '参考咨询', phone: '020-87654321转202', location: '社科区' },
            { name: '陈建国', title: '馆员', duty: '技术维护', phone: '020-87654321转203', location: '电子阅览室' }
        ],
        notices: [
            { text: '自习区座位可通过微信公众号预约，最长预约4小时', time: '长期有效' },
            { text: '电子阅览室需持有效证件登记使用', time: '长期有效' },
            { text: '图书阅毕请放回原位或放置在书车上', time: '长期有效' }
        ],
        hours: [
            { day: '周一至周五', time: '8:00-22:00', remark: '正常开放' },
            { day: '周六', time: '9:00-21:00', remark: '正常开放' },
            { day: '周日', time: '9:00-20:00', remark: '部分服务调整' },
            { day: '节假日', time: '10:00-18:00', remark: '阅览区开放' }
        ]
    },
    '3F': {
        name: '三楼学术区',
        area: '1800平方米',
        openStatus: '正常开放',
        zones: [
            { name: '研究间', type: 'study', width: '30%', height: '30%', top: '10%', left: '5%', description: '个人研究空间' },
            { name: '研讨室', type: 'meeting', width: '40%', height: '35%', top: '10%', left: '40%', description: '小组讨论空间' },
            { name: '文献检索', type: 'digital', width: '30%', height: '25%', top: '55%', left: '65%', description: '学术数据库检索' },
            { name: '学科服务', type: 'service', width: '25%', height: '20%', top: '55%', left: '35%', description: '学科馆员办公室' },
            { name: '特藏阅览', type: 'special', width: '25%', height: '25%', top: '55%', left: '5%', description: '特藏文献阅览室' },
            { name: '培训室', type: 'meeting', width: '30%', height: '35%', top: '50%', left: '65%', description: '信息素养培训' }
        ],
        facilities: [
            { name: '投影设备', icon: 'el-icon-video-play', description: '各研讨室配备', status: 'available' },
            { name: '白板', icon: 'el-icon-edit', description: '可擦写白板', status: 'available' },
            { name: '电脑', icon: 'el-icon-cpu', description: '研究用电脑', status: 'available' },
            { name: '打印复印', icon: 'el-icon-printer', description: '学术文献打印', status: 'available' },
            { name: '扫描仪', icon: 'el-icon-picture', description: '高精度扫描仪', status: 'available' },
            { name: '茶歇区', icon: 'el-icon-coffee', description: '免费茶水供应', status: 'available' }
        ],
        services: [
            { name: '研讨室预约', time: '8:30-21:00', tag: '提前预约', tagType: 'success' },
            { name: '学科咨询', time: '9:00-17:00', tag: '预约制', tagType: 'primary' },
            { name: '文献传递', time: '9:00-17:00', tag: '有偿服务', tagType: 'info' },
            { name: '培训讲座', time: '按公告', tag: '免费参加', tagType: 'warning' }
        ],
        staff: [
            { name: '赵敏', title: '主任', duty: '学术服务管理', phone: '020-87654321转301', location: '学科服务台' },
            { name: '周强', title: '学科馆员', duty: '理工科学科服务', phone: '020-87654321转302', location: '303室' },
            { name: '吴霞', title: '学科馆员', duty: '文科学科服务', phone: '020-87654321转303', location: '304室' }
        ],
        notices: [
            { text: '研讨室需提前1-7天预约，最长使用4小时', time: '长期有效' },
            { text: '学科咨询服务请提前通过网站或电话预约', time: '长期有效' },
            { text: '培训讲座信息每月初在官网和公告栏发布', time: '每月更新' }
        ],
        hours: [
            { day: '周一至周五', time: '8:30-21:00', remark: '正常开放' },
            { day: '周六', time: '9:00-18:00', remark: '部分服务开放' },
            { day: '周日', time: '9:00-18:00', remark: '仅研讨室开放' },
            { day: '节假日', time: '10:00-17:00', remark: '按需开放' }
        ]
    },
    '4F': {
        name: '四楼特色区',
        area: '1500平方米',
        openStatus: '正常开放',
        zones: [
            { name: '古籍文献', type: 'special', width: '35%', height: '40%', top: '5%', left: '5%', description: '明清古籍特藏' },
            { name: '地方文献', type: 'special', width: '35%', height: '40%', top: '5%', left: '60%', description: '地方志、地方史料' },
            { name: '外文原版', type: 'reading', width: '50%', height: '30%', top: '55%', left: '5%', description: '外文原版图书' },
            { name: '艺术图书', type: 'special', width: '35%', height: '30%', top: '55%', left: '60%', description: '艺术类特藏图书' },
            { name: '服务台', type: 'service', width: '20%', height: '15%', top: '50%', left: '40%', description: '特藏服务咨询' }
        ],
        facilities: [
            { name: '恒温恒湿', icon: 'el-icon-sunny', description: '古籍保存环境', status: 'available' },
            { name: '紫外线防护', icon: 'el-icon-sunrise', description: '特藏文献保护', status: 'available' },
            { name: '阅览桌灯', icon: 'el-icon-light', description: '专业阅览灯光', status: 'available' },
            { name: '放大镜', icon: 'el-icon-view', description: '文献阅读辅助', status: 'available' },
            { name: '数字化设备', icon: 'el-icon-camera', description: '高精度扫描', status: 'available' },
            { name: '消毒设备', icon: 'el-icon-sunny', description: '古籍消毒设备', status: 'maintenance' }
        ],
        services: [
            { name: '特藏阅览', time: '9:00-17:00', tag: '闭架阅览', tagType: 'success' },
            { name: '文献咨询', time: '9:00-17:00', tag: '专家服务', tagType: 'primary' },
            { name: '数字化服务', time: '9:00-17:00', tag: '预约申请', tagType: 'info' },
            { name: '展览参观', time: '按公告', tag: '团体预约', tagType: 'warning' }
        ],
        staff: [
            { name: '郑文博', title: '主任', duty: '特藏文献管理', phone: '020-87654321转401', location: '特藏服务台' },
            { name: '孙晓梅', title: '馆员', duty: '古籍修复', phone: '020-87654321转402', location: '修复室' },
            { name: '钱程', title: '馆员', duty: '数字化加工', phone: '020-87654321转403', location: '数字化中心' }
        ],
        notices: [
            { text: '特藏文献阅览需提前一天预约，并出示有效证件', time: '长期有效' },
            { text: '古籍文献仅限馆内阅览，不可外借', time: '长期有效' },
            { text: '数字化服务仅对校内师生开放，需申请审批', time: '长期有效' }
        ],
        hours: [
            { day: '周一至周五', time: '9:00-17:00', remark: '正常开放' },
            { day: '周六', time: '9:00-16:00', remark: '部分开放' },
            { day: '周日', time: '闭馆', remark: '整理维护' },
            { day: '节假日', time: '按公告', remark: '特殊安排' }
        ]
    },
    '5F': {
        name: '五楼多功能区',
        area: '2200平方米',
        openStatus: '正常开放',
        zones: [
            { name: '报告厅', type: 'meeting', width: '50%', height: '40%', top: '5%', left: '5%', description: '大型学术报告厅' },
            { name: '展览厅', type: 'special', width: '40%', height: '40%', top: '5%', left: '55%', description: '文化艺术展览' },
            { name: '创意空间', type: 'digital', width: '35%', height: '25%', top: '55%', left: '5%', description: '创客空间、创意工坊' },
            { name: '休闲茶座', type: 'reading', width: '25%', height: '25%', top: '55%', left: '45%', description: '休闲交流区域' },
            { name: '管理办公', type: 'service', width: '25%', height: '25%', top: '55%', left: '75%', description: '行政办公室' },
            { name: '活动室', type: 'meeting', width: '35%', height: '25%', top: '85%', left: '60%', description: '社团活动室' }
        ],
        facilities: [
            { name: '音响系统', icon: 'el-icon-microphone', description: '专业音响设备', status: 'available' },
            { name: '灯光系统', icon: 'el-icon-light', description: '舞台灯光设备', status: 'available' },
            { name: '投影设备', icon: 'el-icon-video-camera', description: '高清投影仪', status: 'available' },
            { name: '3D打印机', icon: 'el-icon-set-up', description: '创客设备', status: 'available' },
            { name: '摄影器材', icon: 'el-icon-camera', description: '可租借使用', status: 'available' },
            { name: '茶点服务', icon: 'el-icon-coffee', description: '活动茶歇', status: 'available' }
        ],
        services: [
            { name: '场地预约', time: '8:30-17:30', tag: '团体预约', tagType: 'success' },
            { name: '活动承办', time: '按预约', tag: '审批制', tagType: 'primary' },
            { name: '展览服务', time: '9:00-17:00', tag: '策划布置', tagType: 'info' },
            { name: '设备租借', time: '9:00-17:00', tag: '押金制', tagType: 'warning' }
        ],
        staff: [
            { name: '周建国', title: '主任', duty: '活动管理', phone: '020-87654321转501', location: '行政办公室' },
            { name: '林芳', title: '馆员', duty: '活动策划', phone: '020-87654321转502', location: '活动策划部' },
            { name: '陈志强', title: '技术员', duty: '设备维护', phone: '020-87654321转503', location: '技术保障室' }
        ],
        notices: [
            { text: '报告厅预约需提前15天申请，并提交活动方案', time: '长期有效' },
            { text: '创意空间设备使用需经过培训认证', time: '长期有效' },
            { text: '展览厅档期需提前一个月预约', time: '长期有效' }
        ],
        hours: [
            { day: '周一至周五', time: '8:30-21:00', remark: '正常开放' },
            { day: '周六', time: '9:00-18:00', remark: '活动时间开放' },
            { day: '周日', time: '9:00-18:00', remark: '活动时间开放' },
            { day: '节假日', time: '按活动安排', remark: '特殊安排' }
        ]
    }
})

// 跨楼层服务
const crossFloorServices = ref([
    { name: '无线网络', icon: 'el-icon-wifi', description: '全馆覆盖高速无线网络', floors: ['1F', '2F', '3F', '4F', '5F'] },
    { name: '图书借还', icon: 'el-icon-takeaway-box', description: '各楼层均设有自助借还机', floors: ['1F', '2F', '3F'] },
    { name: '咨询服务', icon: 'el-icon-service', description: '各楼层设有服务台提供咨询', floors: ['1F', '2F', '3F', '4F'] },
    { name: '文印服务', icon: 'el-icon-printer', description: '各楼层设有自助文印设备', floors: ['1F', '2F', '3F'] },
    { name: '饮水设施', icon: 'el-icon-cold-drink', description: '各楼层设有饮水机', floors: ['1F', '2F', '3F', '4F', '5F'] },
    { name: '无障碍设施', icon: 'el-icon-s-help', description: '全馆无障碍通道和设施', floors: ['1F', '2F', '3F', '4F', '5F'] }
])

// 计算当前楼层信息
const currentFloor = computed(() => floors.value[activeFloor.value])

// 处理楼层切换
const handleFloorChange = () => {
    selectedZone.value = ''
}

// 区域样式计算
const zoneStyle = (zone: any) => {
    return {
        width: zone.width,
        height: zone.height,
        top: zone.top,
        left: zone.left
    }
}

// 选择区域
const selectZone = (zone: any) => {
    selectedZone.value = selectedZone.value === zone.name ? '' : zone.name
}
</script>

<style scoped>
.area-service-container {
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

/* 楼层导航 */
.floor-navigation {
    margin-bottom: 30px;
}

.floor-tabs :deep(.el-tabs__header) {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 12px 12px 0 0;
    padding: 0 20px;
    margin-bottom: 0;
}

.floor-tabs :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 500;
    height: 60px;
    line-height: 60px;
    padding: 0 25px;
}

.floor-tabs :deep(.el-tabs__item i) {
    margin-right: 8px;
    font-size: 18px;
}

.floor-tabs :deep(.el-tabs__item.is-active) {
    background-color: #3699aa;
    color: white;
    border-radius: 8px 8px 0 0;
}

.floor-tabs :deep(.el-tabs--border-card) {
    border: 1px solid #e8f4f8;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

/* 主要内容 */
.main-content {
    margin-top: 20px;
}

/* 楼层平面图 */
.floor-map-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.section-header h3 {
    color: #2c3e50;
    font-size: 22px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.section-header h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

.floor-indicator {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.current-floor {
    font-size: 20px;
    color: #3699aa;
    font-weight: 600;
}

.floor-size {
    font-size: 14px;
    color: #7f8c8d;
    margin-top: 5px;
}

.floor-map-container {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.floor-map {
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e4e7ed;
    height: 400px;
    position: relative;
    overflow: hidden;
}

.map-grid {
    position: relative;
    width: 100%;
    height: 100%;
}

.map-zone {
    position: absolute;
    border: 2px solid transparent;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.map-zone:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.zone-service {
    background: linear-gradient(135deg, rgba(64, 158, 255, 0.2) 0%, rgba(64, 158, 255, 0.1) 100%);
    border-color: #409eff;
}

.zone-reading {
    background: linear-gradient(135deg, rgba(103, 194, 58, 0.2) 0%, rgba(103, 194, 58, 0.1) 100%);
    border-color: #67c23a;
}

.zone-study {
    background: linear-gradient(135deg, rgba(230, 162, 60, 0.2) 0%, rgba(230, 162, 60, 0.1) 100%);
    border-color: #e6a23c;
}

.zone-digital {
    background: linear-gradient(135deg, rgba(144, 147, 153, 0.2) 0%, rgba(144, 147, 153, 0.1) 100%);
    border-color: #909399;
}

.zone-special {
    background: linear-gradient(135deg, rgba(245, 108, 108, 0.2) 0%, rgba(245, 108, 108, 0.1) 100%);
    border-color: #f56c6c;
}

.zone-meeting {
    background: linear-gradient(135deg, rgba(157, 114, 226, 0.2) 0%, rgba(157, 114, 226, 0.1) 100%);
    border-color: #9d72e2;
}

.zone-label {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    text-align: center;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    margin: 5px;
}

.zone-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    padding: 10px;
    font-size: 12px;
    color: #5a6c7d;
    border-top: 1px solid #e8f4f8;
    display: flex;
    align-items: center;
}

.zone-info i {
    color: #3699aa;
    margin-right: 5px;
}

.map-legend {
    background: white;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #e8f4f8;
}

.legend-title {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
    text-align: center;
}

.legend-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.legend-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #5a6c7d;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 10px;
    border: 2px solid transparent;
}

.legend-color.service {
    background: rgba(64, 158, 255, 0.2);
    border-color: #409eff;
}

.legend-color.reading {
    background: rgba(103, 194, 58, 0.2);
    border-color: #67c23a;
}

.legend-color.study {
    background: rgba(230, 162, 60, 0.2);
    border-color: #e6a23c;
}

.legend-color.digital {
    background: rgba(144, 147, 153, 0.2);
    border-color: #909399;
}

.legend-color.special {
    background: rgba(245, 108, 108, 0.2);
    border-color: #f56c6c;
}

.legend-color.meeting {
    background: rgba(157, 114, 226, 0.2);
    border-color: #9d72e2;
}

/* 设施区域 */
.facilities-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.facilities-section h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.facilities-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

.facilities-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.facility-item {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
}

.facility-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border-color: #3699aa;
}

.facility-icon {
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

.facility-icon i {
    font-size: 24px;
    color: #3699aa;
}

.facility-content {
    flex: 1;
}

.facility-content h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 600;
}

.facility-content p {
    color: #7f8c8d;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
}

.facility-status {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #5a6c7d;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.status-dot.available {
    background-color: #67c23a;
}

.status-dot.maintenance {
    background-color: #f56c6c;
}

/* 服务详情 */
.service-detail-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.service-cards {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.service-card {
    border: none;
    border-radius: 12px;
}

.service-card :deep(.el-card__header) {
    border-bottom: 1px solid #e8f4f8;
    background: #f8fafc;
    border-radius: 12px 12px 0 0;
}

.service-header {
    display: flex;
    align-items: center;
    color: #3699aa;
    font-weight: 600;
    font-size: 16px;
}

.service-header i {
    font-size: 18px;
    margin-right: 10px;
}

.service-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.service-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px dashed #e8f4f8;
}

.service-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.service-name {
    display: flex;
    align-items: center;
    color: #2c3e50;
    font-weight: 500;
    font-size: 15px;
}

.service-name i {
    color: #67c23a;
    margin-right: 8px;
    font-size: 16px;
}

.service-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
}

.service-time {
    font-size: 13px;
    color: #7f8c8d;
}

.service-info :deep(.el-tag) {
    font-size: 12px;
    padding: 2px 8px;
    height: 24px;
    line-height: 20px;
}

.staff-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.staff-item {
    display: flex;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e8f4f8;
}

.staff-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.staff-avatar {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3699aa 0%, #2c7b8a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.staff-avatar i {
    font-size: 24px;
    color: white;
}

.staff-info {
    flex: 1;
}

.staff-info h5 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 600;
}

.staff-title {
    font-size: 13px;
    color: #7f8c8d;
    margin-left: 10px;
    font-weight: normal;
}

.staff-duty {
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
}

.staff-contact {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.contact-item {
    font-size: 13px;
    color: #7f8c8d;
    display: flex;
    align-items: center;
}

.contact-item i {
    margin-right: 5px;
    font-size: 14px;
    color: #3699aa;
}

/* 特别提示 */
.notice-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.notice-section h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.notice-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

.notice-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.notice-list {
    background: #f8fafc;
    border-radius: 10px;
    padding: 20px;
}

.notice-item {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #dce6e9;
}

.notice-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.notice-icon {
    width: 36px;
    height: 36px;
    background: rgba(54, 153, 170, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.notice-icon i {
    color: #3699aa;
    font-size: 18px;
}

.notice-text {
    flex: 1;
}

.notice-text p {
    color: #2c3e50;
    line-height: 1.6;
    margin-bottom: 8px;
}

.notice-time {
    font-size: 13px;
    color: #7f8c8d;
}

/* 服务时间 */
.opening-hours {
    background: white;
    border-radius: 15px;
    padding: 25px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.opening-hours h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.opening-hours h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

.hours-table :deep(.el-table) {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

.hours-table :deep(.el-table th) {
    background-color: #f5f7fa;
    color: #2c3e50;
    font-weight: 600;
}

/* 跨楼层服务 */
.cross-floor-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-top: 30px;
    border: 1px solid #e8f4f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.cross-floor-section h3 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.cross-floor-section h3 i {
    color: #3699aa;
    margin-right: 10px;
    font-size: 24px;
}

.cross-services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.cross-item {
    background: #f8fafc;
    border-radius: 12px;
    padding: 25px 20px;
    text-align: center;
    border: 1px solid #e8f4f8;
    transition: all 0.3s ease;
}

.cross-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #3699aa;
}

.cross-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, rgba(54, 153, 170, 0.1) 0%, rgba(54, 153, 170, 0.05) 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.cross-icon i {
    font-size: 30px;
    color: #3699aa;
}

.cross-item h4 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
}

.cross-item p {
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 15px;
    min-height: 60px;
}

.floor-range {
    font-size: 14px;
    color: #2c3e50;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e8f4f8;
}

.floor-tag {
    display: inline-block;
    padding: 2px 8px;
    background: #e6f7ff;
    color: #3699aa;
    border-radius: 4px;
    font-size: 12px;
    margin: 0 2px;
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
@media (max-width: 1200px) {
    .cross-services {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 992px) {
    .facilities-grid {
        grid-template-columns: 1fr;
    }
    
    .cross-services {
        grid-template-columns: 1fr;
    }
    
    .legend-items {
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
    
    .floor-tabs :deep(.el-tabs__item) {
        font-size: 14px;
        padding: 0 15px;
    }
    
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .floor-indicator {
        align-items: flex-start;
    }
    
    .floor-map {
        height: 300px;
    }
    
    .service-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .service-info {
        align-items: flex-start;
    }
}

@media (max-width: 576px) {
    .page-header h2 {
        font-size: 24px;
    }
    
    .floor-tabs :deep(.el-tabs__item) {
        font-size: 12px;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
    }
    
    .floor-tabs :deep(.el-tabs__item i) {
        display: none;
    }
    
    .floor-map {
        height: 250px;
    }
    
    .cross-services {
        grid-template-columns: 1fr;
    }
}
</style>