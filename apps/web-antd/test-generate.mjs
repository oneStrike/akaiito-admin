import { generateAPI } from './src/utils/openapi-generator/index.ts';

// 重新生成 API 代码
try {
  console.log('开始重新生成 API 代码...');
  await generateAPI();
  console.log('✅ API 代码重新生成完成！');
} catch (error) {
  console.error('❌ 生成失败:', error);
}