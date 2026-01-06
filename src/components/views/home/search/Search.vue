<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <div class="search-header" style="margin-bottom: 40px;">
      <div
        style="display: flex; align-items: center; height: 100%; background: white; border-radius: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; padding: 5px; max-width: 800px; margin: 0 auto;">
        <!-- 搜索图标 -->
        <div style="flex-shrink: 0; padding: 0 15px;">
          <el-icon style="font-size: 20px; color: #409EFF;">
            <Search />
          </el-icon>
        </div>

        <!-- 搜索类型选择 -->
        <div style="flex-shrink: 0; margin-right: 10px;">
          <el-select v-model="searchType" placeholder="选择类型" style="width: 120px; border: none;" :teleported="false">
            <el-option label="书名" value="1" />
            <el-option label="ISBN" value="2" />
            <el-option label="作者" value="3" />
            <el-option label="出版社" value="4" />
            <el-option label="书籍ID" value="5" />
          </el-select>
        </div>

        <!-- 精确查找选项 -->
        <div style="flex-shrink: 0; margin-right: 10px;">
          <el-checkbox v-model="isPrecise" label="精确查找"></el-checkbox>
        </div>

        <!-- 分割线 -->
        <div style="flex-shrink: 0; width: 1px; height: 24px; background: #e4e7ed; margin-right: 10px;"></div>

        <!-- 搜索输入框 -->
        <div style="flex: 1;">
          <el-input v-model="searchText" :placeholder="selectName" style="border: none;" @keyup.enter="handleSearch" />
        </div>

        <!-- 搜索按钮 -->
        <div style="flex-shrink: 0; padding: 0 10px;">
          <el-button @click="handleSearch" type="primary" style="border-radius: 20px; padding: 10px 24px; font-weight: 500;">
            搜索
          </el-button>
          <el-button @click="clearSearch" style="border-radius: 20px; padding: 10px 24px; margin-left: 10px;">
            重置
          </el-button>
        </div>
      </div>
    </div>

    <!-- 搜索结果统计 -->
    <div v-if="hasSearched" style="text-align: center; margin-bottom: 30px;">
      <h3 style="color: #409EFF;">
        找到 {{ total }} 条结果
        <span v-if="searchText" style="color: #666; font-size: 14px;">
          （搜索关键词："{{ searchText }}"）
        </span>
      </h3>
    </div>

    <!-- 书籍卡片展示区域 -->
    <div v-if="bookList.length > 0" class="books-grid">
      <div v-for="book in bookList" :key="book.bookId" class="book-card" @click="showBookDetail(book)">
        <div class="book-cover">
          <img :src="getBookCover(book.coverImage)" alt="书籍封面" />
        </div>
        <div class="book-info">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">作者：{{ book.author }}</p>
          <p class="book-publisher">出版社：{{ book.publisher }}</p>
          <p class="book-isbn">ISBN：{{ book.isbn }}</p>
          <p class="book-date">出版日期：{{ formatDate(book.publishDate) }}</p>
          <p class="book-summary" :title="book.summary">
            {{ truncateText(book.summary, 50) }}
          </p>
          <div class="book-status">
            <span class="status-label">馆藏：{{ book.totalCopies }}</span>
            <span class="status-label" :class="{ 'available': book.availableCopies > 0 }">
              可借：{{ book.availableCopies }}
            </span>
          </div>
          <div class="book-actions">
            <el-button v-if="book.availableCopies > 0" size="small" type="primary" @click.stop="handleBorrow(book)">
              立即借阅
            </el-button>
            <el-button v-else size="small" type="info" disabled>
              已借完
            </el-button>
            <el-button size="small" @click.stop="showBookDetail(book)">
              查看详情
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 没有结果的提示 -->
    <div v-else-if="hasSearched" class="no-results">
      <el-empty description="没有找到相关书籍" :image-size="200">
        <p style="color: #999; margin-top: 10px;">
          尝试使用其他关键词或调整搜索条件
        </p>
      </el-empty>
    </div>

    <!-- 未搜索时的提示 -->
    <div v-else class="search-prompt">
      <div style="text-align: center; padding: 100px 0;">
        <el-icon style="font-size: 80px; color: #c0c4cc; margin-bottom: 20px;">
          <Search />
        </el-icon>
        <h3 style="color: #909399; margin-bottom: 20px;">请输入关键词开始搜索</h3>
        <p style="color: #c0c4cc;">支持按书名、ISBN、作者、出版社、书籍ID搜索</p>
      </div>
    </div>

    <!-- 分页组件 -->
    <div v-if="total > pageSize" class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 书籍详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="书籍详情" width="600px">
      <div v-if="currentBook" class="book-detail">
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
          <div class="detail-cover">
            <img :src="getBookCover(currentBook.coverImage)" alt="书籍封面" style="max-width: 150px;" />
          </div>
          <div class="detail-info" style="flex: 1;">
            <h2 style="margin-bottom: 10px; color: #333;">{{ currentBook.title }}</h2>
            <p><strong>作者：</strong>{{ currentBook.author }}</p>
            <p><strong>出版社：</strong>{{ currentBook.publisher }}</p>
            <p><strong>出版日期：</strong>{{ formatDate(currentBook.publishDate) }}</p>
            <p><strong>ISBN：</strong>{{ currentBook.isbn }}</p>
            <p><strong>价格：</strong>¥{{ currentBook.price }}</p>
            <p><strong>分类ID：</strong>{{ currentBook.categoryId }}</p>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 10px; color: #333;">书籍简介</h3>
          <p style="line-height: 1.6; color: #666;">{{ currentBook.summary || '暂无简介' }}</p>
        </div>
        <el-descriptions :column="2" size="small" border>
          <el-descriptions-item label="书籍ID">{{ currentBook.bookId }}</el-descriptions-item>
          <el-descriptions-item label="馆藏总量">{{ currentBook.totalCopies }}</el-descriptions-item>
          <el-descriptions-item label="可借数量">{{ currentBook.availableCopies }}</el-descriptions-item>
          <el-descriptions-item label="已借数量">{{ currentBook.totalCopies - currentBook.availableCopies }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
          <el-button v-if="currentBook && currentBook.availableCopies > 0" type="primary" @click="handleBorrow(currentBook)">
            立即借阅
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 借阅对话框 -->
    <el-dialog v-model="borrowDialogVisible" title="可以借阅" width="50%">
      <el-descriptions v-if="borrowBookForm.copyId" :column="1" size="small" border>
        <el-descriptions-item label="书籍编号">{{ borrowBookForm.bookId }}</el-descriptions-item>
        <el-descriptions-item label="书名">{{ borrowBookForm.title }}</el-descriptions-item>
        <el-descriptions-item label="馆藏总量">{{ borrowBookForm.totalCopies }}</el-descriptions-item>
        <el-descriptions-item label="可借册数">{{ borrowBookForm.availableCopies }}</el-descriptions-item>
        <el-descriptions-item label="馆藏编号">{{ borrowBookForm.barcode }}</el-descriptions-item>
        <el-descriptions-item label="书籍副本编号">{{ borrowBookForm.copyId }}</el-descriptions-item>
        <el-descriptions-item label="存放位置">{{ borrowBookForm.location }}</el-descriptions-item>
        <el-descriptions-item label="定价">{{ borrowBookForm.price }}</el-descriptions-item>
      </el-descriptions>
      <div v-else style="text-align: center; padding: 20px;">
        <el-icon style="font-size: 40px; color: #e6a23c; margin-bottom: 10px;">
          <Warning />
        </el-icon>
        <p>正在获取书籍副本信息...</p>
      </div>
      <template #footer>
        <span class="dislog-footer">
          <el-button @click="borrowDialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="borrowLoading" @click="confirmBorrow">确认借阅</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Warning } from '@element-plus/icons-vue'
import { searchBook } from '@/api/modules/books'
import { getBookCopyById } from '@/api/modules/bookCopy'
import { applyBorrow } from '@/api/modules/borrowRecordRequest'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const route = useRouter()

// 搜索相关数据
const searchType = ref('1') // 默认按书名搜索
const searchText = ref('')
const isPrecise = ref(false)
const hasSearched = ref(false)

// 书籍列表和分页
const bookList = ref<any[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(12)

// 对话框相关
const detailDialogVisible = ref(false)
const borrowDialogVisible = ref(false)
const borrowLoading = ref(false)
const currentBook = ref<any>(null)
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

// 计算搜索框placeholder
const selectName = computed(() => {
  const map: { [key: string]: string } = {
    '1': '请输入书名',
    '2': '请输入ISBN',
    '3': '请输入作者',
    '4': '请输入出版社',
    '5': '请输入书籍ID'
  }
  return map[searchType.value] || '请输入搜索内容'
})

// 初始化时检查路由参数
onMounted(() => {
  // 这里可以从路由参数中获取初始搜索条件
  const route = useRouter()
  // 可以根据需要从路由参数中读取搜索条件
})

// 搜索方法
const handleSearch = () => {
  if (!searchText.value.trim()) {
    ElMessage.warning('请输入搜索内容')
    return
  }

  hasSearched.value = true
  currentPage.value = 1
  performSearch()
}

// 执行搜索
const performSearch = async () => {
  try {
    const searchForm = {
      searchContent: searchText.value,
      searchType: selectName.value.split('请输入')[1], // 转换为后端需要的格式
      searchPrecise: isPrecise.value ? 0 : 1,
      publisherStartTime: '',
      publisherEndTime: ''
    }

    const paginationForm = {
      currentPage: currentPage.value,
      pageSize: pageSize.value
    }

    const res = await searchBook(searchForm, paginationForm)
    
    if (res.code === 0) {
      bookList.value = res.data || []
      total.value = res.paginationVO?.total || 0
      
      if (bookList.value.length === 0) {
        ElMessage.info('未找到相关书籍')
      }
    } else {
      ElMessage.error(res.msg || '搜索失败')
      bookList.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('搜索出错:', error)
    ElMessage.error('搜索失败，请稍后重试')
  }
}

// 清空搜索
const clearSearch = () => {
  searchText.value = ''
  isPrecise.value = false
  hasSearched.value = false
  bookList.value = []
  total.value = 0
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  if (hasSearched.value) {
    performSearch()
  }
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  if (hasSearched.value) {
    performSearch()
  }
}

// 获取书籍封面
const getBookCover = (coverImage: string) => {
  if (coverImage) {
    return `/src/assets/imgs/books/${coverImage}`
  }
  return `/src/assets/imgs/books/common/暂无图片.png`
}

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return '未知'
  return dayjs(dateString).format('YYYY-MM-DD')
}

// 截断文本
const truncateText = (text: string, maxLength: number) => {
  if (!text) return '暂无简介'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// 显示书籍详情
const showBookDetail = (book: any) => {
  currentBook.value = book
  detailDialogVisible.value = true
}

// 处理借阅
const handleBorrow = async (book: any) => {
  try {
    currentBook.value = book
    const res = await getBookCopyById({ id: book.bookId })
    
    if (res.code === 0) {
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
      borrowDialogVisible.value = true
    } else {
      ElMessage.error(res.msg || '获取书籍副本信息失败')
    }
  } catch (error) {
    console.error('获取书籍副本出错:', error)
    ElMessage.error('当前书籍暂不可借')
  }
}

// 确认借阅
const confirmBorrow = async () => {
  const userStr = Cookies.get("user")
  const adminStr = Cookies.get("admin")
  const user = userStr ? JSON.parse(userStr) : null
  const admin = adminStr ? JSON.parse(adminStr) : null

  if (!user && !admin) {
    ElMessage.warning("请先登录")
    route.push('/login')
    return
  }

  try {
    borrowLoading.value = true
    const currentUser = user || admin
    const id = { id: borrowBookForm.value.bookId }
    
    const res = await applyBorrow(currentUser, id)
    
    if (res.code === 0) {
      ElMessage.success('借阅申请成功，请及时前往馆内领取核销')
      borrowDialogVisible.value = false
      // 刷新当前书籍的可借数量
      if (currentBook.value) {
        currentBook.value.availableCopies -= 1
      }
    } else {
      ElMessage.error(res.msg || '借阅失败')
    }
  } catch (error) {
    console.error('借阅出错:', error)
    ElMessage.error('借阅失败，请稍后重试')
  } finally {
    borrowLoading.value = false
  }
}
</script>

<style scoped>
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.search-header {
  margin-bottom: 40px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.book-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .15);
}

.book-cover {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}

.book-cover img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.book-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
  line-height: 1.4;
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.book-author,
.book-publisher,
.book-isbn,
.book-date {
  color: #666;
  margin: 5px 0;
  font-size: 14px;
}

.book-summary {
  color: #999;
  margin: 10px 0;
  font-size: 13px;
  line-height: 1.5;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.book-status {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  padding: 8px 0;
  border-top: 1px solid #eee;
}

.status-label {
  font-size: 14px;
  color: #666;
}

.status-label.available {
  color: #67c23a;
}

.book-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.no-results,
.search-prompt {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-detail {
  line-height: 1.6;
}

.book-detail p {
  margin: 5px 0;
  color: #666;
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .search-header {
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
  
  .search-container {
    padding: 20px 15px;
  }
}
</style>