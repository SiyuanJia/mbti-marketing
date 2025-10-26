// 表单处理和页面跳转逻辑
import { generateMarketingContent } from './gemini-service.js';

// MBTI 类型数据
const MBTI_TYPES = [
  { type: 'INTJ', name: '建筑师' },
  { type: 'INTP', name: '逻辑学家' },
  { type: 'ENTJ', name: '指挥官' },
  { type: 'ENTP', name: '辩论家' },
  { type: 'INFJ', name: '提倡者' },
  { type: 'INFP', name: '调停者' },
  { type: 'ENFJ', name: '主人公' },
  { type: 'ENFP', name: '竞选者' },
  { type: 'ISTJ', name: '物流师' },
  { type: 'ISFJ', name: '守卫者' },
  { type: 'ESTJ', name: '总经理' },
  { type: 'ESFJ', name: '执政官' },
  { type: 'ISTP', name: '鉴赏家' },
  { type: 'ISFP', name: '探险家' },
  { type: 'ESTP', name: '企业家' },
  { type: 'ESFP', name: '表演家' }
];

// 创作阶段提示文案
const LOADING_MESSAGES = [
  '🎨 正在构思创意角度...',
  '🧠 分析产品人格特质...',
  '✨ INFP 灵感涌现中...',
  '🎯 ENTJ 战略规划中...',
  '💫 ENFP 创意爆发中...',
  '🎭 ESFP 活力注入中...',
  '📚 INTJ 深度思考中...',
  '🌟 调校情感共鸣频率...',
  '🎪 组装文案魔法...',
  '🚀 即将完成创作...'
];

// 显示游戏化加载弹窗
function showLoadingModal() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-modal">
      <div class="loading-content">
        <h3 class="loading-title">💫你的专属文案创作中，请等待...</h3>
        <p class="loading-subtitle">收集 16 种 MBTI 人格灵感中...</p>
        
        <div class="mbti-game-container">
          ${MBTI_TYPES.map(mbti => `
            <div class="mbti-card" data-type="${mbti.type}">
              <div class="mbti-card-type">${mbti.type}</div>
              <div class="mbti-card-name">${mbti.name}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="loading-status">准备开始创作...</div>
        <div class="loading-progress">这可能需要 60 秒左右</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // 开始动画效果
  startLoadingAnimation(overlay);
  
  return overlay;
}

// 开始加载动画
function startLoadingAnimation(overlay) {
  const cards = overlay.querySelectorAll('.mbti-card');
  const statusEl = overlay.querySelector('.loading-status');
  const modal = overlay.querySelector('.loading-modal');
  
  let collectedCount = 0;
  let messageIndex = 0;
  
  // 随机收集卡片的动画
  const collectInterval = setInterval(() => {
    if (collectedCount >= cards.length) {
      clearInterval(collectInterval);
      return;
    }
    
    // 找到未收集的卡片
    const uncollectedCards = Array.from(cards).filter(card => !card.classList.contains('collected'));
    if (uncollectedCards.length === 0) {
      clearInterval(collectInterval);
      return;
    }
    
    // 随机选择一张卡片
    const randomCard = uncollectedCards[Math.floor(Math.random() * uncollectedCards.length)];
    randomCard.classList.add('collected');
    collectedCount++;
    
    // 创建闪光效果
    createSparkles(randomCard);
    
  }, 3500); // 约每3.5秒收集一张卡片，16张约56秒
  
  // 更新状态文案
  const messageInterval = setInterval(() => {
    if (messageIndex < LOADING_MESSAGES.length) {
      statusEl.textContent = LOADING_MESSAGES[messageIndex];
      messageIndex++;
    }
  }, 6000); // 每6秒更换一次文案
  
  // 保存定时器引用以便清理
  overlay._intervals = { collectInterval, messageInterval };
}

// 创建闪光特效
function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  const modal = element.closest('.loading-modal');
  
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const angle = (Math.PI * 2 * i) / 6;
    const distance = 30 + Math.random() * 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);
    
    const cardRect = element.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();
    
    sparkle.style.left = `${cardRect.left - modalRect.left + cardRect.width / 2}px`;
    sparkle.style.top = `${cardRect.top - modalRect.top + cardRect.height / 2}px`;
    
    modal.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1500);
  }
}

// 隐藏加载弹窗
function hideLoadingModal(overlay) {
  if (!overlay) return;
  
  // 清理定时器
  if (overlay._intervals) {
    clearInterval(overlay._intervals.collectInterval);
    clearInterval(overlay._intervals.messageInterval);
  }
  
  overlay.style.animation = 'fadeOut 0.3s ease-out';
  setTimeout(() => overlay.remove(), 300);
}

// 初始化表单处理
export function initFormHandler() {
  const form = document.querySelector('form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const productBrand = document.getElementById('product_brand').value.trim();
    const productFeatures = document.getElementById('product_features').value.trim();
    
    if (!productBrand || !productFeatures) {
      alert('请填写完整的产品信息');
      return;
    }
    
    // 构建产品信息
    const productInfo = `产品品牌及品类：${productBrand}\n产品核心特点介绍：${productFeatures}`;
    
    // 显示游戏化加载弹窗
    const loadingOverlay = showLoadingModal();
    
    // 禁用提交按钮
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.classList.add('opacity-70', 'cursor-not-allowed');
    
    try {
      // 调用 API 生成文案
      const result = await generateMarketingContent(productInfo);
      
      if (result.success) {
        // 将结果存储到 sessionStorage
        sessionStorage.setItem('marketingResult', JSON.stringify(result.data));
        sessionStorage.setItem('productBrand', productBrand);
        sessionStorage.setItem('productFeatures', productFeatures);
        
        // 隐藏加载弹窗
        hideLoadingModal(loadingOverlay);
        
        // 短暂延迟后跳转
        setTimeout(() => {
          window.location.href = './results.html';
        }, 300);
      } else {
        throw new Error(result.error || '生成失败');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // 隐藏加载弹窗
      hideLoadingModal(loadingOverlay);
      
      alert(`生成文案时出错：${error.message}\n\n请检查：\n1. API Key 是否正确配置\n2. 网络连接是否正常\n3. API 配额是否充足`);
      
      // 恢复按钮状态
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
    }
  });
}

// 测试模式：使用模拟数据
export function enableTestMode() {
  const form = document.querySelector('form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取用户输入的产品信息
    const productBrand = document.getElementById('product_brand').value.trim();
    const productFeatures = document.getElementById('product_features').value.trim();
    
    console.log('=== 用户输入的产品信息 ===');
    console.log('产品品牌及品类:', productBrand);
    console.log('产品核心特点:', productFeatures);
    console.log('========================');
    console.log('');
    console.log('💡 提示：当前使用测试模式，展示的是预设的模拟数据');
    console.log('💡 如需根据您的产品生成真实文案，请配置 Gemini API Key 并切换到正式模式');
    console.log('');
    
    // 显示游戏化加载弹窗
    const loadingOverlay = showLoadingModal();
    
    // 模拟数据
    const mockData = {
      "title": "为「森空香薰」注入灵魂的文案诗篇",
      "solutions": [
        {
          "solutionTitle": "梦境调停者",
          "mbtiType": "INFP",
          "mbtiName": "调停者",
          "targetScenario": "小红书种草",
          "targetAudience": "文艺青年",
          "coreTraits": "理想主义与诗意想象",
          "content": "在月光织成的薄纱下，点燃一小簇「林深见鹿」。\n\n雪松的静谧与佛手柑的微光交织，不是为了抵达某个远方，而是为了回到内心的原乡。🌲✨\n\n每一次呼吸，都是一场与自我灵魂的温柔对话。在这里，喧嚣褪去，只剩下纯粹的诗意与宁静。\n\n> \"世界匆忙，我自芬芳。\"\n\n森空香薰，献给每一位内心藏着一片森林的梦想家。"
        },
        {
          "solutionTitle": "魄力指挥官",
          "mbtiType": "ENTJ",
          "mbtiName": "指挥官",
          "targetScenario": "广告标语或台词",
          "targetAudience": "职场精英",
          "coreTraits": "果敢、远见与掌控力",
          "content": "**专注，是最高效的武器。**\n\n当挑战兵临城下，你需要的是绝对的清晰与冷静。森空「破晓之光」系列，以锐利的薄荷与沉稳的檀香，为你构建一座心智堡垒。🧠⚡️\n\n它不是放松的慰藉，而是进攻的号角。\n\n- **决策前**：点燃它，清空杂念，直抵核心\n- **工作时**：让香气成为你无形的战甲，提升气场\n- **复盘后**：在沉静中，规划下一个胜利\n\n森空香薰，助你掌控每一寸思想的疆域。"
        },
        {
          "solutionTitle": "闪耀表演家",
          "mbtiType": "ESFP",
          "mbtiName": "表演家",
          "targetScenario": "短视频脚本",
          "targetAudience": "年轻人群",
          "coreTraits": "热情、活力与即时行乐",
          "content": "**Party on! 今晚的气氛组，香气担当已就位！🎉**\n\n谁说香薰只能安静独处？森空「夏夜气泡」系列，就是为狂欢而生！\n\n西柚的酸甜混合着罗勒的挑逗，像一杯注入了快乐分子的鸡尾酒，瞬间点燃全场。每一次朋友的 'Wow, amazing!' 都是对你绝佳品味的最高赞美。\n\n别等了，生活的聚光灯正向你打来。用森空点亮你的主场，让每个瞬间都闪闪发光！✨💃"
        }
      ]
    };
    
    // 模拟3秒的加载时间（测试模式下）
    setTimeout(() => {
      // 存储到 sessionStorage
      sessionStorage.setItem('marketingResult', JSON.stringify(mockData));
      sessionStorage.setItem('productBrand', productBrand);
      sessionStorage.setItem('productFeatures', productFeatures);
      
      // 隐藏加载弹窗
      hideLoadingModal(loadingOverlay);
      
      // 短暂延迟后跳转
      setTimeout(() => {
        window.location.href = './results.html';
      }, 300);
    }, 3000);
  });
}

