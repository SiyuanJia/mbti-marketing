// Gemini API 服务
import { GEMINI_CONFIG } from './api-config.js';

// 读取提示词模板
async function loadPromptTemplate() {
  const response = await fetch('prompt.md');
  const template = await response.text();
  return template;
}

// 生成营销文案
export async function generateMarketingContent(productInfo) {
  try {
    // 加载提示词模板
    const promptTemplate = await loadPromptTemplate();
    
    // 替换产品信息
    const prompt = promptTemplate.replace('{PRODUCT_INFO}', productInfo);
    
    // 构建请求体（302.ai 使用 OpenAI 兼容格式）
    const requestBody = {
      model: GEMINI_CONFIG.model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: GEMINI_CONFIG.temperature,
      max_tokens: GEMINI_CONFIG.max_tokens,
      top_p: GEMINI_CONFIG.top_p
    };
    
    // 调用阿里云函数（云函数会转发请求到 302.ai API）
    const response = await fetch(GEMINI_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 不需要 Authorization 头，API Key 已在云函数的环境变量中
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    
    // 提取生成的文本（OpenAI 格式）
    const generatedText = data.choices[0].message.content;
    
    // 清理 JSON 响应（移除可能的 markdown 代码块标记）
    let cleanedText = generatedText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.substring(3);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    cleanedText = cleanedText.trim();
    
    // 解析 JSON
    const jsonData = JSON.parse(cleanedText);
    
    return {
      success: true,
      data: jsonData
    };
    
  } catch (error) {
    console.error('生成文案失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Markdown 转 HTML 的简单实现
export function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  let html = markdown;
  
  // 处理换行（两个换行符转换为段落）
  html = html.split('\n\n').map(para => {
    if (para.trim() === '') return '';
    
    // 检查是否是列表项
    if (para.trim().startsWith('-') || para.trim().startsWith('*') || /^\d+\./.test(para.trim())) {
      return para;
    }
    // 检查是否是引用
    if (para.trim().startsWith('>')) {
      return para;
    }
    // 检查是否是标题
    if (para.trim().startsWith('#')) {
      return para;
    }
    
    return `<p>${para}</p>`;
  }).join('\n');
  
  // 处理标题
  html = html.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  
  // 处理引用块
  html = html.replace(/^> (.*?)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // 处理加粗
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // 处理斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // 处理无序列表
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>\n?)+/gs, match => `<ul>${match}</ul>`);
  
  // 处理有序列表
  html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
  // 只转换不在 <ul> 中的 <li>
  html = html.replace(/(?<!<\/ul>\n)(<li>.*?<\/li>\n?)+(?!<ul>)/gs, match => {
    if (!match.includes('<ul>')) {
      return `<ol>${match}</ol>`;
    }
    return match;
  });
  
  // 处理代码
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // 处理链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 处理单个换行（在 p 标签内）
  html = html.replace(/<p>(.*?)<\/p>/gs, (match, content) => {
    const lines = content.split('\n').filter(line => line.trim());
    return `<p>${lines.join('<br>')}</p>`;
  });
  
  return html;
}

// 生成卡片 HTML
export function generateCardHtml(solution, index) {
  const bgClass = `bg-card-${(index % 3) + 1}`;
  const patternClass = index % 2 === 0 ? 'dot-pattern' : 'grid-pattern';
  const borderColor = index % 3 === 0 ? '#fcd1d1' : index % 3 === 1 ? '#aee1e1' : '#97cfcf';
  
  // 构建场景或客群描述
  let description = '针对';
  if (solution.targetScenario && solution.targetAudience) {
    description += `<span class="font-semibold">${solution.targetAudience}</span>在<span class="font-semibold">${solution.targetScenario}</span>场景`;
  } else if (solution.targetScenario) {
    description += `<span class="font-semibold">${solution.targetScenario}</span>场景`;
  } else if (solution.targetAudience) {
    description += `<span class="font-semibold">${solution.targetAudience}</span>客群`;
  }
  
  description += `，为产品注入<span class="font-semibold">${solution.mbtiType}（${solution.mbtiName}）</span>人格，该人格的核心特质是<span class="font-semibold">${solution.coreTraits}</span>，为您生成的营销文案是：`;
  
  // 转换 Markdown 为 HTML
  const contentHtml = markdownToHtml(solution.content);
  
  // 根据索引添加不同的装饰
  const decorations = index % 3 === 0 
    ? '<div class="card-decoration-1"></div>'
    : index % 3 === 1
    ? '<div class="card-decoration-2"></div><div class="card-decoration-3"></div>'
    : '';
  
  return `
    <div class="note-card ${bgClass} ${patternClass} relative overflow-hidden">
      ${decorations}
      <div class="relative z-10 p-6 sm:p-8">
        <h3 class="text-xl font-bold text-gray-800 mb-3">${solution.solutionTitle}</h3>
        <p class="text-sm text-gray-600 mb-6 border-l-2 pl-3" style="border-color: ${borderColor}">
          ${description}
        </p>
        <div class="marketing-content text-gray-700">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;
}

// 渲染结果页面
export function renderResults(data) {
  console.log('开始渲染结果，数据:', data);
  
  // 更新页面标题
  const pageTitle = document.querySelector('h2');
  console.log('页面标题元素:', pageTitle);
  if (pageTitle) {
    pageTitle.textContent = data.title;
    console.log('标题已更新为:', data.title);
  }
  
  // 生成卡片 HTML
  const cardsContainer = document.querySelector('.grid');
  console.log('卡片容器元素:', cardsContainer);
  if (cardsContainer) {
    const cardsHtml = data.solutions.map((solution, index) => 
      generateCardHtml(solution, index)
    ).join('\n');
    
    console.log('生成的卡片HTML长度:', cardsHtml.length);
    cardsContainer.innerHTML = cardsHtml;
    console.log('卡片渲染完成');
  } else {
    console.error('找不到卡片容器 (.grid)');
  }
}

