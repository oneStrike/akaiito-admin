<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">ES Upload 组件测试</h1>
    
    <div class="space-y-6">
      <!-- 基础上传测试 -->
      <div class="border rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">基础上传（双向绑定）</h2>
        <EsUpload 
          v-model="uploadedUrls"
          :max-count="5"
          :batch-upload="false"
          @change="handleChange"
        />
        <div class="mt-4">
          <h3 class="font-medium">已上传的文件地址：</h3>
          <pre class="bg-gray-100 p-2 rounded mt-2">{{ JSON.stringify(uploadedUrls, null, 2) }}</pre>
        </div>
      </div>

      <!-- 批量上传测试 -->
      <div class="border rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">批量上传测试</h2>
        <EsUpload 
          v-model="batchUploadedUrls"
          :max-count="10"
          :batch-upload="true"
          :batch-size="3"
          :batch-interval="2000"
          @batch-start="handleBatchStart"
          @batch-progress="handleBatchProgress"
          @batch-complete="handleBatchComplete"
          @change="handleBatchChange"
        />
        <div class="mt-4">
          <h3 class="font-medium">批量上传状态：</h3>
          <div class="bg-gray-100 p-2 rounded mt-2">
            <p>总数：{{ batchStatus.total }}</p>
            <p>已上传：{{ batchStatus.uploaded }}</p>
            <p>失败：{{ batchStatus.failed }}</p>
            <p>进度：{{ batchStatus.progress }}%</p>
            <p>上传中：{{ batchStatus.uploading ? '是' : '否' }}</p>
          </div>
          <h3 class="font-medium mt-4">已上传的文件地址：</h3>
          <pre class="bg-gray-100 p-2 rounded mt-2">{{ JSON.stringify(batchUploadedUrls, null, 2) }}</pre>
        </div>
      </div>

      <!-- 手动上传测试 -->
      <div class="border rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">手动上传测试</h2>
        <EsUpload 
          ref="manualUploadRef"
          v-model="manualUploadedUrls"
          :max-count="5"
          :auto-upload="false"
          @change="handleManualChange"
        />
        <div class="mt-4 space-x-2">
          <button 
            @click="triggerManualUpload"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            手动上传
          </button>
          <button 
            @click="clearPendingFiles"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            清空队列
          </button>
        </div>
        <div class="mt-4">
          <h3 class="font-medium">待上传文件数：{{ pendingCount }}</h3>
          <h3 class="font-medium mt-2">已上传的文件地址：</h3>
          <pre class="bg-gray-100 p-2 rounded mt-2">{{ JSON.stringify(manualUploadedUrls, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue';
import type { BatchUploadStatus } from '#/components/es-upload/types';
import EsUpload from '#/components/es-upload/es-upload.vue';

// 基础上传
const uploadedUrls = ref<string[]>([]);

// 批量上传
const batchUploadedUrls = ref<string[]>([]);
const batchStatus = ref<BatchUploadStatus>({
  total: 0,
  uploaded: 0,
  failed: 0,
  uploading: false,
  progress: 0,
});

// 手动上传
const manualUploadedUrls = ref<string[]>([]);
const manualUploadRef = ref();
const pendingCount = ref(0);

// 事件处理
function handleChange(fileList: UploadFile[]) {
  console.log('基础上传文件变化：', fileList);
}

function handleBatchChange(fileList: UploadFile[]) {
  console.log('批量上传文件变化：', fileList);
}

function handleManualChange(fileList: UploadFile[]) {
  console.log('手动上传文件变化：', fileList);
  if (manualUploadRef.value) {
    pendingCount.value = manualUploadRef.value.getPendingFiles().length;
  }
}

function handleBatchStart(status: BatchUploadStatus) {
  console.log('批量上传开始：', status);
  batchStatus.value = { ...status };
}

function handleBatchProgress(status: BatchUploadStatus) {
  console.log('批量上传进度：', status);
  batchStatus.value = { ...status };
}

function handleBatchComplete(status: BatchUploadStatus) {
  console.log('批量上传完成：', status);
  batchStatus.value = { ...status };
}

// 手动上传操作
function triggerManualUpload() {
  if (manualUploadRef.value) {
    manualUploadRef.value.batchUpload().then(() => {
      pendingCount.value = 0;
    });
  }
}

function clearPendingFiles() {
  if (manualUploadRef.value) {
    manualUploadRef.value.clearPending();
    pendingCount.value = 0;
  }
}

// 监听双向绑定的变化
watch(uploadedUrls, (newUrls) => {
  console.log('基础上传 URLs 变化：', newUrls);
});

watch(batchUploadedUrls, (newUrls) => {
  console.log('批量上传 URLs 变化：', newUrls);
});

watch(manualUploadedUrls, (newUrls) => {
  console.log('手动上传 URLs 变化：', newUrls);
});
</script>