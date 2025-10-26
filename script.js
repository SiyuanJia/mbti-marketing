import { renderResults } from './gemini-service.js';
import { initFormHandler } from './form-handler.js';  // 正式模式：使用 302.ai API
//import { enableTestMode } from './form-handler.js';     // 测试模式：使用模拟数据

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  const path = window.location.pathname;
  const isResults = path.includes('results.html');
  const isIndex = path.includes('index.html') || path === '/' || path.endsWith('/');
  
  if (isIndex && !isResults) {
    initFormHandler();  // 正式模式：需要配置 302.ai API Key
    // enableTestMode();      // 测试模式：无需 API Key，使用模拟数据
  }
  
  if (isResults) {
    const data = sessionStorage.getItem('marketingResult');
    const brand = sessionStorage.getItem('productBrand');
    const features = sessionStorage.getItem('productFeatures');
    
    console.log('');
    console.log('=== 您输入的产品信息 ===');
    console.log('品牌:', brand || '未记录');
    console.log('特点:', features || '未记录');
    console.log('====================');
    console.log('');
    
    if (data) {
      try {
        const jsonData = JSON.parse(data);
        console.log('加载数据:', jsonData);
        renderResults(jsonData);
      } catch (error) {
        console.error('解析失败:', error);
        alert('加载失败，请重新生成');
        window.location.href = './index.html';
      }
    } else {
      console.log('无结果数据');
      alert('请先填写产品信息生成文案');
      window.location.href = './index.html';
    }
  }
});
