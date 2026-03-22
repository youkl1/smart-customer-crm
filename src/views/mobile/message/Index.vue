<template>
  <div class="message-index">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="消息通知"
    />
    
    <!-- 消息类型切换 -->
    <van-tabs v-model="activeTab">
      <van-tab title="系统消息">
        <!-- 系统消息列表 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多数据了"
          @load="loadData"
        >
          <div
            v-for="message in systemMessages"
            :key="message.id"
            class="message-item"
          >
            <div class="message-content">
              <div class="message-title">{{ message.title }}</div>
              <div class="message-body">{{ message.content }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
            <div v-if="!message.read" class="message-badge"></div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="审批消息">
        <!-- 审批消息列表 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多数据了"
          @load="loadData"
        >
          <div
            v-for="message in approvalMessages"
            :key="message.id"
            class="message-item"
          >
            <div class="message-content">
              <div class="message-title">{{ message.title }}</div>
              <div class="message-body">{{ message.content }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
            <div v-if="!message.read" class="message-badge"></div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 当前激活的标签
const activeTab = ref(0)

// 加载状态
const loading = ref(false)
const finished = ref(false)

// 系统消息列表
const systemMessages = ref([
  {
    id: 1,
    title: '系统更新通知',
    content: '智客通CRM系统已于2024年1月1日进行了版本更新，新增了客户公海池功能。',
    time: '2024-01-01 09:00',
    read: false
  },
  {
    id: 2,
    title: '新功能上线',
    content: '商机管理模块新增了销售漏斗分析功能，您可以在报表看板中查看。',
    time: '2023-12-25 10:30',
    read: true
  },
  {
    id: 3,
    title: '系统维护通知',
    content: '系统将于2023-12-20 23:00-24:00进行例行维护，期间可能会出现短暂服务中断。',
    time: '2023-12-19 16:00',
    read: true
  }
])

// 审批消息列表
const approvalMessages = ref([
  {
    id: 1,
    title: '合同审批通知',
    content: '您有一份来自ABC科技有限公司的合同需要审批。',
    time: '2024-01-10 14:00',
    read: false
  },
  {
    id: 2,
    title: '商机审批通知',
    content: '您有一份金额为50000元的商机需要审批。',
    time: '2024-01-09 11:00',
    read: true
  },
  {
    id: 3,
    title: '请假审批通知',
    content: '张三提交了2024年1月15日的请假申请，需要您审批。',
    time: '2024-01-08 09:30',
    read: true
  }
])

// 加载数据
const loadData = () => {
  // 模拟加载数据
  setTimeout(() => {
    // 模拟没有更多数据
    finished.value = true
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.message-index {
  padding-bottom: 20px;
}

.message-item {
  display: flex;
  padding: 15px;
  background-color: #fff;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.message-content {
  flex: 1;
}

.message-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.message-body {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.4;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 8px;
  height: 8px;
  background-color: #ff4d4f;
  border-radius: 50%;
}
</style>