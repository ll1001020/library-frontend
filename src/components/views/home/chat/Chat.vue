<template>
  <div class="chat-bot-wrapper">
    <!-- 悬浮按钮 -->
    <div 
      class="chat-bot-button"
      :class="{ 'button-loading': isBotTyping }"
      @click="toggleChat"
    >
      <div class="bot-avatar">
        <span v-if="isBotTyping" class="loading-dots">···</span>
        <span v-else>AI</span>
      </div>
    </div>

    <!-- 聊天窗口 -->
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <div class="header-left">
          <div class="header-avatar">AI</div>
          <div class="header-info">
            <h3>AI 助手</h3>
            <p v-if="isBotTyping">正在输入...</p>
            <p v-else>在线</p>
          </div>
        </div>
        <button class="close-btn" @click="toggleChat">×</button>
      </div>

      <div class="chat-body" ref="chatBody">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.type]">
          <div class="message-content">
            <template v-if="message.type === 'bot'">
              <div class="message-avatar">AI</div>
              <div class="message-bubble">
                <div v-if="message.isTyping" class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div v-else class="message-text" v-html="message.text"></div>
              </div>
            </template>
            <template v-else>
              <div class="message-bubble">
                <div class="message-text">{{ message.text }}</div>
              </div>
              <div class="message-avatar user">我</div>
            </template>
          </div>
          <div class="message-time">{{ getMessageTime() }}</div>
        </div>

        <div v-if="isLoading" class="message bot">
          <div class="message-content">
            <div class="message-avatar">AI</div>
            <div class="message-bubble">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="message-time">{{ getMessageTime() }}</div>
        </div>
      </div>

      <div class="chat-input">
        <div class="input-wrapper">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="输入您的问题..."
            @keyup.enter="sendMessage"
            :disabled="isLoading"
          />
          <button 
            class="send-btn"
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isLoading"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" stroke-width="2"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <p class="input-hint">按下 Enter 发送消息</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

interface Message {
  type: 'user' | 'bot'
  text: string
  isTyping?: boolean
  time?: string
}

// 状态管理
const isChatOpen = ref(false)
const isBotTyping = ref(false)
const isLoading = ref(false)
const inputMessage = ref('')
const messages = ref<Message[]>([])
const chatBody = ref<HTMLElement>()

// 获取当前时间
const getCurrentTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

const getMessageTime = () => getCurrentTime()

// 初始欢迎消息
onMounted(() => {
  setTimeout(() => {
    addBotMessage('你好！我是AI助手，有什么可以帮您的吗？')
  }, 1000)
})

// 打字机效果
const typeWriterEffect = async (text: string, messageIndex: number) => {
  isBotTyping.value = true
  const message = messages.value[messageIndex]
  message.isTyping = true
  message.text = ''
  message.time = getCurrentTime()
  
  let i = 0
  const speed = 15 // 打字速度（毫秒），比之前快一点
  
  const typeNextChar = () => {
    if (i < text.length) {
      message.text += text.charAt(i)
      i++
      scrollToBottom()
      setTimeout(typeNextChar, speed)
    } else {
      message.isTyping = false
      isBotTyping.value = false
    }
  }
  
  typeNextChar()
}

// 添加AI消息
const addBotMessage = (text: string) => {
  messages.value.push({
    type: 'bot',
    text: '',
    isTyping: true,
    time: getCurrentTime()
  })
  
  // 模拟网络延迟后开始打字效果
  setTimeout(() => {
    const messageIndex = messages.value.length - 1
    typeWriterEffect(text, messageIndex)
  }, 300)
}

// 发送消息
const sendMessage = async () => {
  const text = inputMessage.value.trim()
  if (!text || isLoading.value) return
  
  // 添加用户消息
  messages.value.push({
    type: 'user',
    text,
    time: getCurrentTime()
  })
  
  // 清空输入框
  inputMessage.value = ''
  
  // 滚动到底部
  scrollToBottom()
  
  // 显示加载状态
  isLoading.value = true
  
  try {
    // 这里调用你的后端API
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        model:"qwen2.5:7b-instruct",
        prompt: text,
        stream:false
      })
    })
    const data = await response.json()
    
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 智能回复示例（根据用户输入提供不同回复）
    let responseText = ''
    const lowerText = text.toLowerCase()
    
    // if (lowerText.includes('你好') || lowerText.includes('hi') || lowerText.includes('hello')) {
    //   responseText = '你好！很高兴为您服务！有什么我可以帮助您的吗？'
    // } else if (lowerText.includes('帮助') || lowerText.includes('help')) {
    //   responseText = '我可以帮您解答问题、提供建议、协助处理各种任务。请告诉我您需要什么帮助？'
    // } else if (lowerText.includes('时间')) {
    //   const now = new Date()
    //   responseText = `现在是 ${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}时${now.getMinutes()}分`
    // } else if (lowerText.includes('天气')) {
    //   responseText = '要获取实时天气信息，请告诉我您所在的城市。例如："北京的天气怎么样？"'
    // } else if (lowerText.includes('？') || lowerText.includes('?')) {
    //   responseText = `关于"${text}"的问题，这是一个很好的提问。基于我的分析，我建议您考虑以下几点：\n\n1. 首先明确问题的核心要素\n2. 收集相关信息和数据\n3. 分析可能的影响因素\n4. 制定解决方案或行动计划\n\n您是否需要更具体的建议？`
    // } else {
    //   responseText = `我理解了您的意思："${text}"。\n\n让我为您分析一下：\n1. 这个问题涉及到多个方面\n2. 我们可以从不同角度探讨\n3. 建议结合实际情况进行考虑\n\n您希望我在哪个方面提供更详细的解释呢？`
    // }
    
    // 添加AI回复
    addBotMessage(data.response || '无返回内容')
    
  } catch (error) {
    console.error('API调用失败:', error)
    addBotMessage('抱歉，处理您的请求时出现了问题。请稍后再试。')
  } finally {
    isLoading.value = false
  }
}

// 切换聊天窗口
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped>
.chat-bot-wrapper {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 悬浮按钮样式 - 主色调 #3699aa */
.chat-bot-button {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3699aa 0%, #2a7a8a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(54, 153, 170, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.chat-bot-button:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 30px rgba(54, 153, 170, 0.6);
}

.chat-bot-button:active {
  transform: scale(0.95);
}

.chat-bot-button.button-loading {
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% {
    box-shadow: 0 0 0 0 rgba(54, 153, 170, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(54, 153, 170, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(54, 153, 170, 0);
  }
}

.bot-avatar {
  font-size: 18px;
  font-weight: 700;
  color: white;
  animation: float 3s ease-in-out infinite;
  letter-spacing: 1px;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-5px) rotate(-3deg);
  }
  66% {
    transform: translateY(2px) rotate(3deg);
  }
}

.loading-dots {
  font-size: 32px;
  color: white;
  animation: blink 1.4s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

/* 聊天窗口样式 */
.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 520px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(54, 153, 170, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(54, 153, 170, 0.1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.chat-header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #3699aa 0%, #2a7a8a 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.chat-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-avatar {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.header-info p {
  margin: 4px 0 0;
  font-size: 12px;
  opacity: 0.9;
  font-weight: 400;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(180deg, #f9fdfe 0%, #f0f9fb 100%);
}

.message {
  margin-bottom: 20px;
  position: relative;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.message.user .message-content {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3699aa 0%, #2a7a8a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(54, 153, 170, 0.2);
}

.message-avatar.user {
  background: linear-gradient(135deg, #44ccaa 0%, #3699aa 100%);
}

.message-bubble {
  max-width: 75%;
  padding: 14px 18px;
  border-radius: 18px;
  position: relative;
  background: white;
  box-shadow: 0 3px 15px rgba(54, 153, 170, 0.1);
  border: 1px solid rgba(54, 153, 170, 0.08);
}

.message.bot .message-bubble {
  border-top-left-radius: 6px;
  background: linear-gradient(135deg, #ffffff 0%, #f5fdfe 100%);
}

.message.user .message-bubble {
  background: linear-gradient(135deg, #3699aa 0%, #44ccaa 100%);
  color: white;
  border-top-right-radius: 6px;
  box-shadow: 0 3px 15px rgba(54, 153, 170, 0.2);
}

.message-text {
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
}

.message-time {
  font-size: 11px;
  color: #88b8c2;
  margin-top: 6px;
  text-align: center;
  font-weight: 400;
}

.message.bot .message-time {
  padding-left: 48px;
}

.message.user .message-time {
  padding-right: 48px;
  text-align: right;
}

/* 打字指示器 - 使用主色调 */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #3699aa;
  border-radius: 50%;
  animation: typing-blue 1.4s infinite;
  box-shadow: 0 0 8px rgba(54, 153, 170, 0.3);
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-blue {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.3;
    background: #3699aa;
  }
  50% {
    transform: translateY(-6px);
    opacity: 1;
    background: #44ccaa;
  }
}

/* 输入框样式 */
.chat-input {
  padding: 20px;
  background: white;
  border-top: 1px solid rgba(54, 153, 170, 0.1);
  position: relative;
}

.chat-input::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(54, 153, 170, 0.1), transparent);
}

.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.input-wrapper input {
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #e6f4f7;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
  background: #f9fdfe;
  color: #2a5c66;
  font-family: inherit;
}

.input-wrapper input:focus {
  border-color: #3699aa;
  background: white;
  box-shadow: 0 0 0 4px rgba(54, 153, 170, 0.1);
}

.input-wrapper input::placeholder {
  color: #88b8c2;
}

.input-wrapper input:disabled {
  background: #f0f9fb;
  cursor: not-allowed;
}

.send-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3699aa 0%, #2a7a8a 100%);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(54, 153, 170, 0.3);
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05) rotate(10deg);
  box-shadow: 0 6px 16px rgba(54, 153, 170, 0.4);
  background: linear-gradient(135deg, #44ccaa 0%, #3699aa 100%);
}

.send-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.send-btn svg {
  transition: transform 0.3s;
}

.send-btn:hover:not(:disabled) svg {
  transform: translateX(2px) translateY(-2px);
}

.input-hint {
  font-size: 11px;
  color: #88b8c2;
  text-align: center;
  margin-top: 12px;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* 滚动条样式 - 使用主色调 */
.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: rgba(54, 153, 170, 0.05);
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3699aa, #2a7a8a);
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #44ccaa, #3699aa);
}

/* 响应式调整 */
@media (max-width: 480px) {
  .chat-bot-wrapper {
    right: 20px;
    bottom: 20px;
  }
  
  .chat-window {
    width: calc(100vw - 40px);
    right: -20px;
    bottom: 70px;
    height: 70vh;
    max-height: 600px;
  }
}

/* 消息气泡的微妙动画 */
@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message {
  animation: messageAppear 0.3s ease-out;
}

/* 气泡箭头效果 */
.message.bot .message-bubble::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 12px;
  width: 12px;
  height: 12px;
  background: #f5fdfe;
  transform: rotate(45deg);
  border-left: 1px solid rgba(54, 153, 170, 0.08);
  border-bottom: 1px solid rgba(54, 153, 170, 0.08);
}

.message.user .message-bubble::before {
  content: '';
  position: absolute;
  right: -6px;
  top: 12px;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #3699aa 0%, #44ccaa 100%);
  transform: rotate(45deg);
}
</style>