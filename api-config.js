// API 配置文件
// 使用阿里云函数作为代理，API Key 安全保存在云端环境变量中

export const GEMINI_CONFIG = {
  // API Key 已安全保存在阿里云函数的环境变量中，前端无需配置
  model: 'gemini-2.5-pro',
  endpoint: 'https://mbti-marketing-fxveumuwhj.cn-hongkong.fcapp.run',  // 阿里云函数地址
  
  // 生成参数
  temperature: 0.8,
  max_tokens: 8192,
};

// 注意：
// 1. 本项目使用阿里云函数作为 API 代理，API Key 不暴露在前端
// 2. 云函数地址：https://mbti-marketing-fxveumuwhj.cn-hongkong.fcapp.run
// 3. 如需修改云函数配置，请在阿里云函数计算控制台操作
