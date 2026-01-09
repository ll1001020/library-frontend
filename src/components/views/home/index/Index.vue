<template>
    <div class="indexRoot">
        <div class="indexContanier">

            <div class="el-lunbotu" style="position: relative; padding-top: 30px;">
                <el-carousel height="400px" direction="vertical" type="card" :autoplay="true" :interval="2000"
                    :loop="true">
                    <el-carousel-item v-for="(img, index) in imgs" :key="index"
                        style="width: fit-content;margin: 0 auto; ">
                        <img justify="center" :src="img" alt="#" style="width: auto;height: auto;max-width: 100%;
                        max-height: 100%;margin: auto;display: block;">
                    </el-carousel-item>
                </el-carousel>
                <div
                    style="position: absolute;top: 0px;right: 0px;width: 600px; height: 100%;padding: 20px;box-sizing: border-box;">
                    <h1 style="text-align: center;margin-bottom: 20px;color: #333;">砺行数字图书馆<br><span
                            style="font-size: 14px;color: #666;">访问数据统计</span></h1>
                    <div ref="chartRef" style="width: 100%;height: 320px;"></div>
                </div>
            </div>

            <!-- 新书速递模块 -->
            <div class="new-books-section" style="margin-top: 40px; margin-bottom: 40px;" v-if="newBooks[0]">
                <h2
                    style="text-align: center; margin-bottom: 30px; color: #333; font-size: 24px; border-bottom: 2px solid #409EFF; padding-bottom: 10px; display: inline-block;">
                    新书速递
                </h2>

                <div class="new-books-container"
                    style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <!-- 新书1 -->
                    <div class="book-card" v-if="newBooks[0]"
                        style="flex: 1; min-width: 250px; max-width: 300px; margin: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden; transition: transform 0.3s;">
                        <div
                            style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f7fa;">
                            <img :src="newBooks[0].coverImage ?
                                `/src/assets/imgs/books/${newBooks[0].coverImage}`
                                : `/src/assets/imgs/books/common/暂无图片.png`" alt="新书封面"
                                style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">
                                {{ newBooks[0].title }}
                            </h3>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                作者：{{ newBooks[0].author }}
                            </p>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                出版社：{{ newBooks[0].publisher }}
                            </p>
                            <p style="color: #999; margin: 5px 0; font-size: 12px;">
                                入库时间：{{ newBooks[0].publishDate }}
                            </p>
                            <div style="margin-top: 15px;">
                                <el-button @click="handleBorrow(newBooks[0])" size="small" type="primary"
                                    style="float: right; padding: 5px 15px;">
                                    立即借阅
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <!-- 新书2 -->
                    <div class="book-card" v-if="newBooks[1]"
                        style="flex: 1; min-width: 250px; max-width: 300px; margin: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden; transition: transform 0.3s;">
                        <div
                            style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f7fa;">
                            <img :src="newBooks[1].coverImage ?
                                `/src/assets/imgs/books/${newBooks[1].coverImage}`
                                : `/src/assets/imgs/books/common/暂无图片.png`" alt="新书封面"
                                style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">
                                {{ newBooks[1].title }}
                            </h3>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                作者：{{ newBooks[1].author }}
                            </p>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                出版社：{{ newBooks[1].publisher }}
                            </p>
                            <p style="color: #999; margin: 5px 0; font-size: 12px;">
                                入库时间：{{ newBooks[1].publishDate }}
                            </p>
                            <div style="margin-top: 15px;">
                                <el-button @click="handleBorrow(newBooks[1])" size="small" type="primary"
                                    style="float: right; padding: 5px 15px;">
                                    立即借阅
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <!-- 新书3 -->
                    <div class="book-card" v-if="newBooks[2]"
                        style="flex: 1; min-width: 250px; max-width: 300px; margin: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden; transition: transform 0.3s;">
                        <div
                            style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f7fa;">
                            <img :src="newBooks[2].coverImage ?
                                `/src/assets/imgs/books/${newBooks[2].coverImage}`
                                : `/src/assets/imgs/books/common/暂无图片.png`" alt="新书封面"
                                style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">
                                {{ newBooks[2].title }}
                            </h3>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                作者：{{ newBooks[2].author }}
                            </p>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                出版社：{{ newBooks[2].publisher }}
                            </p>
                            <p style="color: #999; margin: 5px 0; font-size: 12px;">
                                入库时间：{{ newBooks[2].publishDate }}
                            </p>
                            <div style="margin-top: 15px;">
                                <el-button @click="handleBorrow(newBooks[2])" size="small" type="primary"
                                    style="float: right; padding: 5px 15px;">
                                    立即借阅
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <div class="book-card" v-if="newBooks[3]"
                        style="flex: 1; min-width: 250px; max-width: 300px; margin: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden; transition: transform 0.3s;">
                        <div
                            style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f7fa;">
                            <img :src="newBooks[3].coverImage ?
                                `/src/assets/imgs/books/${newBooks[3].coverImage}`
                                : `/src/assets/imgs/books/common/暂无图片.png`" alt="新书封面"
                                style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">
                                {{ newBooks[3].title }}
                            </h3>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                作者：{{ newBooks[3].author }}
                            </p>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                出版社：{{ newBooks[3].publisher }}
                            </p>
                            <p style="color: #999; margin: 5px 0; font-size: 12px;">
                                入库时间：{{ newBooks[3].publishDate }}
                            </p>
                            <div style="margin-top: 15px;">
                                <el-button @click="handleBorrow(newBooks[3])" size="small" type="primary"
                                    style="float: right; padding: 5px 15px;">
                                    立即借阅
                                </el-button>
                            </div>
                        </div>
                    </div>


                    <div class="book-card" v-if="newBooks[4]"
                        style="flex: 1; min-width: 250px; max-width: 300px; margin: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden; transition: transform 0.3s;">
                        <div
                            style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f7fa;">
                            <img :src="newBooks[4].coverImage ?
                                `/src/assets/imgs/books/${newBooks[4].coverImage}`
                                : `/src/assets/imgs/books/common/暂无图片.png`" alt="新书封面"
                                style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">
                                {{ newBooks[4].title }}
                            </h3>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                作者：{{ newBooks[4].author }}
                            </p>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                出版社：{{ newBooks[4].publisher }}
                            </p>
                            <p style="color: #999; margin: 5px 0; font-size: 12px;">
                                入库时间：{{ newBooks[4].publishDate }}
                            </p>
                            <div style="margin-top: 15px;">
                                <el-button @click="handleBorrow(newBooks[4])" size="small" type="primary"
                                    style="float: right; padding: 5px 15px;">
                                    立即借阅
                                </el-button>
                            </div>
                        </div>
                    </div>


                    <div class="book-card" v-if="newBooks[5]"
                        style="flex: 1; min-width: 250px; max-width: 300px; margin: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden; transition: transform 0.3s;">
                        <div
                            style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f7fa;">
                            <img :src="newBooks[5].coverImage ?
                                `/src/assets/imgs/books/${newBooks[5].coverImage}`
                                : `/src/assets/imgs/books/common/暂无图片.png`" alt="新书封面"
                                style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">
                                {{ newBooks[5].title }}
                            </h3>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                作者：{{ newBooks[5].author }}
                            </p>
                            <p style="color: #666; margin: 5px 0; font-size: 14px;">
                                出版社：{{ newBooks[5].publisher }}
                            </p>
                            <p style="color: #999; margin: 5px 0; font-size: 12px;">
                                入库时间：{{ newBooks[5].publishDate }}
                            </p>
                            <div style="margin-top: 15px;">
                                <el-button @click="handleBorrow(newBooks[5])" size="small" type="primary"
                                    style="float: right; padding: 5px 15px;">
                                    立即借阅
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 隐藏的图书副本界面 -->
            <el-dialog v-model="borrowDialogVisible" title="可以借阅" width="50%">
                <el-descriptions :column="1" size="small" border>
                    <el-descriptions-item label="书籍编号">{{ borrowBookForm.bookId }}</el-descriptions-item>
                    <el-descriptions-item label="书名">{{ borrowBookForm.title }}</el-descriptions-item>
                    <el-descriptions-item label="馆藏总量">{{ borrowBookForm.totalCopies }}</el-descriptions-item>
                    <el-descriptions-item label="可借册数">{{ borrowBookForm.availableCopies }}</el-descriptions-item>
                    <el-descriptions-item label="馆藏编号">{{ borrowBookForm.barcode }}</el-descriptions-item>
                    <el-descriptions-item label="书籍副本编号">{{ borrowBookForm.copyId }}</el-descriptions-item>
                    <el-descriptions-item label="存放位置">{{ borrowBookForm.location }}</el-descriptions-item>
                    <el-descriptions-item label="定价">{{ borrowBookForm.price }}</el-descriptions-item>
                </el-descriptions>
                <template #footer>
                    <span class="dislog-footer">
                        <el-button @click="borrowDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="borrowBook(borrowBookForm)">确认借阅</el-button>
                    </span>
                </template>
            </el-dialog>


        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue'
import * as echarts from 'echarts';
import { getNewBookList } from '@/api/modules/books'
import { getBookCopyById } from '@/api/modules/bookCopy'
import { applyBorrow } from '@/api/modules/borrowRecordRequest'
import { ElMessage, ElMessageBox } from 'element-plus';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'
const route = useRouter()


// 图片导入
import img1 from '@/assets/imgs/home/读书如稼穑，勤耕致富饶.png'
import img2 from '@/assets/imgs/home/文旅同行，联合筑梦.jpg'
import img3 from '@/assets/imgs/home/问渠哪得清如许.jpg'
import img4 from '@/assets/imgs/home/宪法入人心.jpg'
import img5 from '@/assets/imgs/home/中华古籍智慧化服务平台.jpg'

// 响应式数据
const imgs = ref([img1, img2, img3, img4, img5])
const chartRef = ref<HTMLElement>() // 图表容器引用,将图表挂载到chartRef元素上



// 模拟新书速递数据
const newBooks = ref([])

// 这里开始写借阅功能
const borrowDialogVisible = ref(false)
const borrowBookForm = ref({
    bookId: '',
    title: '',
    totalCopies: '',
    availableCopies: '',
    copyId: '',
    barcode: '',
    location: '',
    price: ''
})

const handleBorrow = (book: any) => {

    getBookCopyById({
        id: book.bookId
    }).then(res => {
        if (res.code == 0) {
            console.log(res.data)
            borrowDialogVisible.value = true
            borrowBookForm.value = {
                bookId: book.bookId,
                title: book.title,
                totalCopies: book.totalCopies,
                availableCopies: book.availableCopies,
                copyId: res.data.copyId,
                barcode: res.data.barcode,
                location: res.data.location,
                price: book.price
            }
        } else {
            ElMessage.error(res.msg || "借阅失败")
        }

    })
        .catch(() => {
            ElMessage.info('当前书籍暂不可借')
        })
}

const borrowBook = (bookBorrowForm: any) => {
    ElMessageBox.confirm('确定要借阅当前书籍吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then((res) => {
        console.log(bookBorrowForm)
        const userStr = Cookies.get("user")
        const adminStr = Cookies.get("admin")
        const user = userStr ? JSON.parse(userStr) : null
        const admin = adminStr ? JSON.parse(adminStr) : null
        console.log(user)
        console.log(admin)
        if (!user && !admin) {
            ElMessage.warning("请先登录")
            goLogin()
            return
        }
        const currentUser = user || admin
        const id = { id: bookBorrowForm.bookId }
        applyBorrow(currentUser, id).then(res => {
            if (res.code === 0) {
                findBook()
                ElMessage.success('借阅申请成功，请及时前往馆内领取核销')
                borrowDialogVisible.value = false
            } else {
                ElMessage.error(res.msg || '借阅失败')
            }
        })
    }).catch(err => {
        ElMessage.info('已取消借阅')
    })
}
// 去登录
const goLogin = () => {
    route.push('/login')
}


const findBook = () => {
    getNewBookList().then(res => {
        console.log("这里是获取到的新书数据："+res.data)
        newBooks.value = res.data.slice(0, 6)
    })
}


// 初始化图表 - 图书管理系统访问数据统计
onMounted(() => {
    findBook()
    if (!chartRef.value) return

    const myChart = echarts.init(chartRef.value)

    // 模拟最近一周的数据
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    // 模拟访问数据（单位：人次）
    const visitData = [1250, 1130, 1420, 1680, 2050, 2350, 1950]

    // 模拟借阅数据（单位：本）
    const borrowData = [45, 52, 48, 60, 75, 82, 68]

    // 模拟新注册用户（单位：人）
    const newUserData = [8, 10, 12, 15, 18, 22, 14]

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: function (params: any) {
                let result = params[0].name + '<br/>'
                params.forEach((item: any) => {
                    let value = item.value
                    let unit = ''

                    if (item.seriesName === '访问量') {
                        unit = ' 人次'
                    } else if (item.seriesName === '借阅量') {
                        unit = ' 本'
                    } else if (item.seriesName === '新用户') {
                        unit = ' 人'
                    }

                    const color = item.color
                    const marker = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${color};"></span>`
                    result += `${marker}${item.seriesName}: <span style="font-weight:bold;">${value}${unit}</span><br/>`
                })
                return result
            }
        },
        legend: {
            data: ['访问量', '借阅量', '新用户'],
            top: 'bottom',
            textStyle: {
                fontSize: 12
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: days,
                axisLabel: {
                    color: '#666'
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '访问量(人次)',
                min: 0,
                max: 2500,
                interval: 500,
                axisLabel: {
                    formatter: '{value}',
                    color: '#666'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#5470c6'
                    }
                },
                nameTextStyle: {
                    color: '#5470c6'
                }
            },
            {
                type: 'value',
                name: '借阅量(本)/新用户(人)',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value}',
                    color: '#666'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#91cc75'
                    }
                },
                nameTextStyle: {
                    color: '#91cc75'
                }
            }
        ],
        series: [
            {
                name: '访问量',
                type: 'line',
                data: visitData,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#5470c6'
                },
                itemStyle: {
                    color: '#5470c6'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(84, 112, 198, 0.3)' },
                        { offset: 1, color: 'rgba(84, 112, 198, 0.05)' }
                    ])
                },
                symbol: 'circle',
                symbolSize: 8,
                yAxisIndex: 0
            },
            {
                name: '借阅量',
                type: 'bar',
                data: borrowData,
                itemStyle: {
                    color: '#91cc75',
                    borderRadius: [2, 2, 0, 0]
                },
                barWidth: '40%',
                yAxisIndex: 1
            },
            {
                name: '新用户',
                type: 'line',
                data: newUserData,
                smooth: true,
                lineStyle: {
                    width: 3,
                    type: 'dashed',
                    color: '#fac858'
                },
                itemStyle: {
                    color: '#fac858'
                },
                symbol: 'diamond',
                symbolSize: 10,
                yAxisIndex: 1
            }
        ],
        color: ['#5470c6', '#91cc75', '#fac858']
    }

    myChart.setOption(option)

    // 响应式调整图表大小
    const resizeChart = () => {
        myChart.resize()
    }

    window.addEventListener('resize', resizeChart)

    // 组件卸载时清理
    return () => {
        window.removeEventListener('resize', resizeChart)
        myChart.dispose()
    }
})

</script>

<style>
* {
    margin: 0px;
    padding: 0px;
    list-style: none;
    text-decoration: none;
}

.indexRoot {
    width: 100%;
    min-height: 300px;
}

.indexContanier {
    max-width: 1200px;
    min-height: 300px;
    margin: auto;
    margin-top: 80px;
    /* border: 1px solid red; */
}

/**这里开始写小模块 */
/* 自定义搜索框样式 */
:deep(.indexSearch) {
    width: 100%;
    height: 60px;
    border-radius: 50px;
    border: 2px solid rgb(54, 153, 170);
    background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
    box-shadow: 0 2px 8px rgba(54, 153, 170, 0.2);
}

/* 移除选择器和输入框的边框 */
:deep(.indexSearch .el-select .el-input__wrapper),
:deep(.indexSearch .el-input .el-input__wrapper) {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
    padding: 0 5px;
}

:deep(.indexSearch .el-select .el-input__inner),
:deep(.indexSearch .el-input .el-input__inner) {
    font-size: 14px;
}

/* 调整选择器下拉框样式 */
:deep(.indexSearch .el-select .el-select__popper) {
    margin-top: 5px !important;
}

/* 按钮样式调整 */
:deep(.indexSearch .el-button--primary) {
    background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
    border: none;
    transition: all 0.3s ease;
}

:deep(.indexSearch .el-button--primary:hover) {
    background: linear-gradient(135deg, #66b1ff 0%, #409EFF 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/**这里是轮播图 */
.el-lunbotu {
    margin-top: 60px;
    margin-bottom: 20px;
    height: 400px;
    position: relative;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

/* 新书卡片悬停效果 */
.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .15);
}

.book-card {
    width: 100%;
    /* 让卡片填满 grid 单元 */
    max-width: none;
    /* 去掉原来的 max-width 限制 */
}

.new-books-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 每行 3 列，等宽 */
    gap: 30px;
    /* 卡片间距 */
    justify-items: center;
    /* 卡片居中 */
}

/* 排行榜项悬停效果 */
.user-item:hover,
.book-item:hover {
    cursor: pointer;
}
</style>