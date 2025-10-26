# MTell - MBTI 营销文案创作站

<div align="center">

**🧠 用心理学重新定义营销文案创作**

基于 Gemini 2.5 Pro 和 MBTI 人格理论的智能营销文案生成工具

[在线体验](#快速开始) · [查看案例](./case1.html) · [部署指南](./CLOUD_FUNCTION_GUIDE.md)

</div>

---

## 🎯 项目简介

**MTell** 是一个将心理学 MBTI 人格理论创新性地应用到营销领域的 AI 文案生成工具。它不是简单地生成文案，而是**为产品注入不同人格特质**，创作出能与目标用户深度共鸣、精准设计用户感受的营销内容。

### 💡 核心理念

> "好的文案不是说什么，而是让用户感受到什么"

- **不说"音质好"**，说"犹如置身音乐会现场"
- **不说"重量轻"**，说"一杯水可感知的重量"
- **不说"容量大"**，说"把1000首歌装到口袋里"

MTell 将这套顶级文案创作心法与 MBTI 人格理论结合，为每个场景和受众匹配最合适的"人格面具"，创作出极具感染力的营销文案。

---

## ✨ 创意亮点

### 🎭 人格化营销方法论

将 **16 种 MBTI 人格** 映射到营销场景，形成系统化的文案创作策略库：

| 人格类型 | 核心特质 | 适用场景 | 示例受众 |
|---------|---------|---------|---------|
| **INTJ（建筑师）** | 战略远见 & 权威构建 | 投资分析/品牌白皮书 | C级高管、理性决策者 |
| **INFJ（提倡者）** | 价值驱动 & 灵魂共鸣 | 品牌宣言/深度故事 | 追求价值认同的女性 |
| **INFP（调停者）** | 真实个性 & 情感连接 | 创始人故事/社交日常 | 文艺青年/小众圈层 |
| **ENTJ（指挥官）** | 魄力领导 & 果敢决策 | 高端商务/职场精英 | 企业高管/领导者 |
| **ENFP（竞选者）** | 引爆热情 & 探索可能 | 社交挑战/互动营销 | 追求新潮的年轻人 |
| **ISFP（探险家）** | 美学体验 & 感官叙事 | 视觉内容/图文种草 | 设计师/文艺青年 |
| **ESTP（企业家）** | 即时行动 & 利益驱动 | 直播带货/销售谈判 | 追求"赢"的行动派 |
| **ESFP（表演家）** | 引爆全场 & 快乐分享 | 快闪活动/娱乐内容 | 爱社交的年轻人群 |
| ... | ... | ... | ... |

*详细策略表见 [prompt.md](./prompt.md)*

### 🎨 感受设计导向

每份文案都经过精心设计，确保：
- ✅ **有画面感** - 用视觉化语言描绘场景
- ✅ **简单直接** - 避免空洞的形容词堆砌
- ✅ **直指利益** - 明确告诉用户"能得到什么"
- ✅ **人格差异** - 不同 MBTI 类型的文案有明显风格差异

### 🎮 游戏化等待体验

将 AI 生成过程转化为趣味互动：
- 16 张 MBTI 人格卡片随机收集动画
- 动态的创作阶段提示（"🧠 分析产品人格特质..." "✨ INFP 灵感涌现中..."）
- 卡片翻转动画 + 闪光粒子特效
- 让 60 秒的等待变成期待

---

## 🏗️ 技术亮点

### 架构设计

```
┌─────────────┐      ┌──────────────────┐      ┌────────────┐      ┌─────────────┐
│  用户浏览器  │ ───▶ │  阿里云函数代理   │ ───▶ │  302.ai API │ ───▶ │  Gemini 2.5 │
│  (前端)     │      │  (API Key 安全)  │      │            │      │     Pro     │
└─────────────┘      └──────────────────┘      └────────────┘      └─────────────┘
```

**核心优势：**
- ✅ **API Key 零暴露** - 密钥安全保存在云端环境变量
- ✅ **统一管理** - 便于监控 API 调用和设置访问控制
- ✅ **成本可控** - 易于实施速率限制和配额管理
- ✅ **无需后端** - 纯前端项目即可实现完整功能

### 提示词工程

精心设计的三层提示词架构（见 [prompt.md](./prompt.md)）：

1. **角色设定层** - 定义 AI 为"融合心理学、社会学的世界级营销专家"
2. **方法论层** - 植入"顶级文案创作心法"，强调用户感受设计
3. **工具箱层** - 12 种 MBTI 人格的详细营销策略表
4. **任务层** - 严格的 JSON 格式要求和 Markdown 规范

**输出质量保障：**
- 📊 结构化 JSON 输出，确保数据可用性
- 📝 Markdown 格式支持，实现富文本渲染
- 🎯 场景-受众-人格三要素匹配，确保文案精准度
- 🔄 3-5 个方案组合，提供多样化选择

### 自研 Markdown 引擎

完整实现了 Markdown 到 HTML 的转换（`gemini-service.js`）：

```javascript
// 支持的语法
- **加粗** / __加粗__
- *斜体* / _斜体_
- #### 标题
- > 引用块
- 无序列表 (-)
- 有序列表 (1.)
- [链接](url)
- `代码`
- Emoji ✨
```

**实现亮点：**
- 段落自动识别和包裹
- 嵌套列表支持
- 引用块样式定制
- 保留 Emoji 原生显示

### 模块化架构

```
mbti-ads/
├── script.js           # 核心路由 - 页面初始化和导航
├── form-handler.js     # 表单逻辑 - 数据收集、验证、加载动画
├── gemini-service.js   # AI 服务 - API 调用、Markdown 渲染
├── style.css           # 样式系统 - 动画、主题、组件样式
└── prompt.md           # 提示词 - MBTI 策略库和方法论
```

**设计原则：**
- 单一职责：每个模块专注一个功能领域
- 清晰接口：通过 ES6 模块导入导出
- 易于维护：代码注释完善，逻辑清晰
- 可扩展性：易于添加新功能和调整

### 测试模式

支持**离线演示模式**（`enableTestMode()`），无需配置 API：
- 使用预设的高质量示例数据
- 保留完整的 UI 交互体验
- 适用于原型展示和 UI 测试
- 3 秒快速加载，无需等待 API 响应

---

## 🎨 设计亮点

### 治愈系视觉语言

**四色渐变系统** - 传达温暖、创意、信任感：

```css
:root {
  --color-pink: #fcd1d1;          /* 温柔粉 */
  --color-off-white: #ece2e1;     /* 雅致米 */
  --color-gray-blue: #d3e0dc;     /* 宁静灰蓝 */
  --color-light-teal: #aee1e1;    /* 清新青 */
  --color-teal: #97cfcf;          /* 主色调 */
}
```

**背景渐变：**
```css
background: linear-gradient(135deg, 
  #fcd1d1 0%,      /* 左上粉色 */
  #ece2e1 25%,     /* 过渡米色 */
  #aee1e1 50%,     /* 中间青色 */
  #97cfcf 100%     /* 右下青绿 */
);
```

### 立体浮动气泡

**8 个独立动画气泡**，营造梦幻 3D 氛围：

```css
/* 气泡结构 */
.bubble {
  background: radial-gradient(...);  /* 径向渐变基础 */
  box-shadow: 
    inset 0 0 15px rgba(255, 255, 255, 0.4),  /* 内高光 */
    inset -5px -5px 10px rgba(0, 0, 0, 0.05), /* 内阴影 */
    0 8px 20px rgba(0, 0, 0, 0.1);            /* 外投影 */
}

/* 高光伪元素 */
.bubble::before {
  /* 左上大高光 - 模拟光源照射 */
  top: 15%; left: 20%;
  width: 35%; height: 35%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
}

.bubble::after {
  /* 右下小高光 - 增加立体层次 */
  bottom: 10%; right: 15%;
  width: 20%; height: 20%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent);
}
```

**动画设计：**
- 4 种浮动轨迹（上下、斜向、曲线）
- 7-10.5 秒的循环周期（交错设计）
- 透明度变化（0.4-0.8）增加呼吸感
- 缩放变化（1.0-1.15）模拟远近透视

### 背景纹理层

**双层纹理系统** - 增加细腻质感：

```css
/* 第一层：光晕装饰 */
body::before {
  background-image: 
    radial-gradient(circle at 12% 18%, rgba(252, 209, 209, 0.3) ...),
    radial-gradient(circle at 88% 12%, rgba(174, 225, 225, 0.25) ...),
    /* 6 个径向渐变光点 */
}

/* 第二层：点状 + 波浪纹理 */
body::after {
  opacity: 0.25;
  background-image: 
    radial-gradient(circle, rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px),
    repeating-linear-gradient(135deg, ...);
  background-size: 25px 25px, 120px 120px;
}
```

### 卡片设计系统

**三色卡片 × 两种纹理 = 6 种组合**：

```css
/* 三种配色 */
.bg-card-1 { background-color: #fde5e5; }  /* 粉色系 */
.bg-card-2 { background-color: #e4f2f2; }  /* 青色系 */
.bg-card-3 { background-color: #d7efef; }  /* 深青系 */

/* 两种纹理 */
.dot-pattern {
  background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 1rem 1rem;
}

.grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 1.5rem 1.5rem;
}
```

**装饰元素：**
- `card-decoration-1` - 圆形 blur 装饰
- `card-decoration-2` - 方形旋转 blur
- `card-decoration-3` - 空心圆环
- 循环应用，确保视觉多样性

### 字体系统

**三级字体层级** - 层次分明的视觉节奏：

| 用途 | 字体 | 风格 | 应用 |
|-----|------|------|------|
| 品牌 Logo | **Pacifico** | 手写草书体 | MTell 品牌标识 |
| 标题 | **Poppins** | 现代几何无衬线 | 页面主标题、方案标题 |
| 正文 | **Nunito** | 圆润无衬线 | 正文内容、说明文字 |
| 中文补充 | **Noto Sans SC** | 思源黑体 | 中文回退字体 |

**可读性优化：**
```css
body {
  font-family: 'Nunito', 'Manrope', 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;  /* 抗锯齿 */
}

.marketing-content {
  line-height: 1.75;  /* 舒适的行高 */
  font-size: 0.875rem;  /* 14px 保证密度 */
}
```

### 交互动画

**悬停提升效果** - 提供即时反馈：

```css
.note-card {
  transition: all 0.3s ease-in-out;
}

.note-card:hover {
  transform: translateY(-5px);  /* 向上浮起 5px */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.07);  /* 增强阴影 */
}
```

**加载动画细节：**
- 卡片翻转：`rotateY(0deg → 180deg → 360deg)`
- 缩放强调：`scale(1 → 1.2 → 1.05)`
- 收集标记：绿色对勾 + 弹性出现动画
- 闪光粒子：6 个方向放射状飞出

### 响应式设计

**移动优先** - 完美适配 320px - 2560px：

```css
/* 基础：移动端 */
.loading-modal { padding: 28px 24px; }
.loading-title { font-size: 18px; }

/* 平板及以上：md (768px+) */
@media (min-width: 768px) {
  .loading-modal { padding: 32px 36px; }
  .loading-title { font-size: 20px; }
}

/* 桌面：lg (1024px+) */
.grid { grid-template-columns: repeat(3, 1fr); }
```

---

## 📁 项目结构

```
mbti-ads/
├── index.html                  # 🏠 首页 - 产品信息输入表单
├── results.html                # 📊 结果页 - 动态渲染文案卡片
├── case1.html                  # 📖 案例1 - CPB钻光乳液
├── case2.html                  # 📖 案例2 - 《小自然》绘本
├── case3.html                  # 📖 案例3 - 江小白
├── style.css                   # 🎨 全局样式 - 气泡、卡片、Markdown
├── script.js                   # ⚙️ 核心路由 - 页面初始化
├── form-handler.js             # 📝 表单处理 - 数据收集、加载动画
├── gemini-service.js           # 🤖 AI 服务 - API 调用、渲染
├── prompt.md                   # 💬 提示词模板 - MBTI 策略库
├── api-config.js               # 🔑 API 配置 - 云函数地址
├── api-config.example.js       # 📋 配置示例
├── function_index.py           # ☁️ 阿里云函数代码
├── function_index_fixed.py     # ☁️ 云函数修复版
├── img1.png                    # 🖼️ 案例图片1
├── img2.png                    # 🖼️ 案例图片2
├── img3.png                    # 🖼️ 案例图片3
├── README.md                   # 📘 项目文档（本文件）
├── CLOUD_FUNCTION_GUIDE.md     # 📗 云函数部署指南
├── QUICK_START.md              # 📙 快速开始指南
├── PRODUCTION_SECURITY.md      # 📕 生产环境安全配置
├── CORS_FIX_GUIDE.md           # 📓 CORS 问题解决指南
├── TEST_CHECKLIST.md           # ✅ 测试检查清单
└── 302AI_SETUP.md              # 🔧 302.ai 配置说明
```

---

## 🚀 快速开始

### 方式一：在线使用（推荐）

本项目已配置好阿里云函数代理，**无需配置 API Key**，可直接使用：

1. 启动本地服务器：
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server -p 8000
   
   # VS Code Live Server 插件
   ```

2. 访问 `http://localhost:8000`

3. 填写产品信息，点击"创作文案"

4. 等待 60 秒左右，查看 3-5 个人格化营销方案

### 方式二：测试模式（离线演示）

无需网络，即可查看完整界面效果：

编辑 `script.js` 切换到测试模式：

```javascript
// 第 2-3 行
import { initFormHandler } from './form-handler.js';     // 注释掉
import { enableTestMode } from './form-handler.js';      // 取消注释

// 第 13-14 行
initFormHandler();   // 注释掉
enableTestMode();    // 取消注释
```

测试模式将使用预设的高质量示例数据（森空香薰案例）。

### 方式三：自定义部署

如需部署自己的云函数：

1. 获取 302.ai API Key（支持 Gemini 模型）
2. 参考 [CLOUD_FUNCTION_GUIDE.md](./CLOUD_FUNCTION_GUIDE.md) 部署阿里云函数
3. 更新 `api-config.js` 中的 `endpoint`

---

## 📊 数据格式

### 输入格式

```javascript
{
  productBrand: "森空，一个主打自然主义的香薰品牌",
  productFeatures: "采用天然植物精油，手工制作"
}
```

### 输出格式（JSON）

```json
{
  "title": "为「森空香薰」注入灵魂的文案诗篇",
  "solutions": [
    {
      "solutionTitle": "梦境调停者",
      "mbtiType": "INFP",
      "mbtiName": "调停者",
      "targetScenario": "小红书种草",
      "targetAudience": "追求精神放松的文艺青年",
      "coreTraits": "理想主义与诗意想象",
      "content": "在月光织成的薄纱下，点燃一小簇「林深见鹿」。\n\n雪松的静谧与佛手柑的微光交织..."
    }
    // ... 2-4 个更多方案
  ]
}
```

### Markdown 支持

`content` 字段支持完整的 Markdown 语法：

| 语法 | 示例 | 渲染效果 |
|------|------|---------|
| 加粗 | `**文字**` | **文字** |
| 斜体 | `*文字*` | *文字* |
| 标题 | `#### 标题` | <h4>标题</h4> |
| 引用 | `> 引用` | <blockquote>引用</blockquote> |
| 无序列表 | `- 项目` | • 项目 |
| 有序列表 | `1. 项目` | 1. 项目 |
| Emoji | `✨` | ✨ |

---

## 🎯 使用场景

### 适用营销场景

| 场景类型 | 示例 | MBTI 推荐 |
|---------|------|-----------|
| 📱 **社交媒体** | 小红书种草、Instagram 图文 | ISFP、INFP、ENFP |
| 🎬 **视频脚本** | Vlog、品牌宣传片 | INFJ、ENFP、ESFP |
| 💼 **销售培训** | 对客话术、销售策略 | ESTP、ENTJ、ESTJ |
| 🎤 **演讲开场** | 活动主持、产品发布会 | ENFJ、ENTJ、ENFP |
| 📝 **广告文案** | Slogan、广告台词 | INTJ、INFJ、ENTP |
| 🏢 **品牌故事** | 创始人故事、品牌宣言 | INFJ、INFP、INTJ |

### 适用行业

- 🛍️ **消费品牌** - 美妆、香薰、服饰、食品饮料
- 💻 **科技产品** - SaaS、App、智能硬件
- 🏋️ **健康运动** - 健身、瑜伽、营养品、运动装备
- 🎨 **文创艺术** - 设计、手工、艺术品、文创产品
- 🏠 **家居生活** - 家具、家电、生活用品、家居装饰
- 📚 **教育培训** - 在线课程、知识付费、培训机构
- 🌿 **环保可持续** - 有机产品、环保品牌、可持续时尚

---

## 🔧 技术栈

### 前端技术

| 技术 | 用途 | 说明 |
|-----|------|------|
| **Tailwind CSS** | UI 框架 | CDN 引入，快速构建响应式界面 |
| **ES6 Modules** | 模块化 | 原生 JS 模块，清晰的代码组织 |
| **sessionStorage** | 状态管理 | 页面间数据传递 |
| **Fetch API** | 网络请求 | 调用云函数 API |

### AI 模型

- **Google Gemini 2.5 Pro**
  - 上下文窗口：2M tokens
  - 输出长度：8192 tokens
  - 温度参数：0.8（平衡创意与稳定性）

### 字体与图标

- **Google Fonts**
  - Pacifico（品牌字体）
  - Poppins（标题字体）
  - Nunito（正文字体）
- **Material Symbols** - 界面图标
- **Lucide Icons** - 矢量图标

### 云服务

- **阿里云函数计算** - API 代理和密钥管理
- **302.ai API** - Gemini 模型访问

---

## ⚙️ API 配置

### Gemini 生成参数

```javascript
{
  model: 'gemini-2.5-pro',
  temperature: 0.8,      // 创意度 (0-1)，0.8 平衡创意与稳定
  max_tokens: 8192,      // 最大输出长度
  top_p: 0.95           // 核采样（云函数默认）
}
```

### 调整建议

| 需求 | 参数调整 | 效果 |
|-----|---------|------|
| 更有创意 | `temperature: 0.95-1.0` | 更大胆、更跳跃的表达 |
| 更稳定 | `temperature: 0.7-0.8` | 更保守、更可预测的输出 |
| 更长文案 | `max_tokens: 16384` | 支持更详细的内容 |
| 更精简 | `max_tokens: 4096` | 更简洁的文案 |

---

## 🐛 常见问题

<details>
<summary><strong>❓ 文案生成失败 / API 错误</strong></summary>

**可能原因：**
- API Key 未配置或无效
- 网络连接问题
- API 配额已用完
- 云函数服务异常

**解决方案：**
1. 检查 `api-config.js` 中的 `endpoint` 是否正确
2. 确认网络可访问阿里云函数
3. 查看浏览器控制台（F12）的错误信息
4. 尝试切换到测试模式验证前端功能
5. 检查云函数日志（阿里云控制台）

</details>

<details>
<summary><strong>❓ Markdown 格式未正确渲染</strong></summary>

**可能原因：**
- AI 返回的内容未按规范使用 Markdown 语法
- 特殊字符转义问题

**解决方案：**
1. 检查 `prompt.md` 中的 Markdown 格式要求是否清晰
2. 查看浏览器控制台，确认原始内容格式
3. 调整 `gemini-service.js` 中的 `markdownToHtml()` 函数
4. 提高 AI 温度参数，有时过低会导致格式不规范

</details>

<details>
<summary><strong>❓ CORS 跨域错误</strong></summary>

**原因：**
直接打开 HTML 文件（`file://` 协议）会导致 ES6 模块加载失败

**解决方案：**
必须使用本地服务器运行项目：
```bash
python -m http.server 8000
# 或
npx http-server -p 8000
```

详见：[CORS_FIX_GUIDE.md](./CORS_FIX_GUIDE.md)

</details>

<details>
<summary><strong>❓ 加载动画卡住 / 超时</strong></summary>

**可能原因：**
- API 响应慢（首次冷启动可能需要 60-90 秒）
- 网络不稳定

**解决方案：**
1. 耐心等待，首次调用云函数需要初始化时间
2. 刷新页面重试
3. 检查网络连接
4. 如果多次失败，切换到测试模式验证前端功能

</details>

<details>
<summary><strong>❓ 案例图片不显示</strong></summary>

**原因：**
图片路径错误或文件缺失

**解决方案：**
1. 确认 `img1.png`、`img2.png`、`img3.png` 在项目根目录
2. 检查图片文件名大小写（macOS 不区分，Linux 区分）
3. 查看浏览器控制台的 404 错误

</details>

---

## 📈 性能优化

### 已实施优化

- ✅ **按需加载** - 使用 ES6 模块，仅加载所需代码
- ✅ **CDN 加速** - Tailwind CSS、字体、图标通过 CDN 引入
- ✅ **缓存策略** - 静态资源添加版本号（`?v=3`）
- ✅ **CSS 动画** - 使用 GPU 加速的 transform 和 opacity
- ✅ **图片优化** - 本地图片加载，避免外部请求

### 可选优化

- 🔲 **图片压缩** - 使用 WebP 格式减少文件大小
- 🔲 **懒加载** - 案例图片按需加载
- 🔲 **Service Worker** - 离线缓存静态资源
- 🔲 **代码压缩** - 生产环境使用压缩版 JS/CSS

---

## 🔐 安全性

### 安全设计

- ✅ **API Key 隔离** - 密钥存储在云端，前端零暴露
- ✅ **云函数代理** - 统一入口，便于监控和访问控制
- ✅ **HTTPS 加密** - 云函数使用 HTTPS 通信
- ✅ **无敏感数据** - 用户输入仅为产品信息，不涉及隐私

### 生产环境建议

参考 [PRODUCTION_SECURITY.md](./PRODUCTION_SECURITY.md)：

1. **速率限制** - 云函数添加请求频率限制
2. **IP 白名单** - 限制可访问的 IP 范围
3. **用量监控** - 设置 API 配额告警
4. **日志审计** - 记录所有 API 调用
5. **CORS 配置** - 仅允许特定域名访问

---

## 📚 相关文档

| 文档 | 内容 | 适用场景 |
|-----|------|---------|
| [QUICK_START.md](./QUICK_START.md) | 5 分钟快速上手指南 | 新用户快速体验 |
| [CLOUD_FUNCTION_GUIDE.md](./CLOUD_FUNCTION_GUIDE.md) | 阿里云函数部署详解 | 自定义部署 |
| [PRODUCTION_SECURITY.md](./PRODUCTION_SECURITY.md) | 生产环境安全配置 | 正式上线前必读 |
| [CORS_FIX_GUIDE.md](./CORS_FIX_GUIDE.md) | 跨域问题解决方案 | 遇到 CORS 错误时 |
| [TEST_CHECKLIST.md](./TEST_CHECKLIST.md) | 功能测试检查清单 | 测试和验收 |
| [302AI_SETUP.md](./302AI_SETUP.md) | 302.ai 配置说明 | 使用 302.ai API |
| [CHANGELOG_CLOUD_FUNCTION.md](./CHANGELOG_CLOUD_FUNCTION.md) | 云函数更新日志 | 追踪功能变更 |

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 贡献类型

- 🐛 **Bug 修复** - 修复功能问题
- ✨ **新功能** - 添加新特性
- 📝 **文档改进** - 完善文档说明
- 🎨 **UI 优化** - 改进界面和交互
- ⚡ **性能优化** - 提升运行效率
- 🧪 **测试** - 增加测试覆盖

### 提交规范

```
类型(范围): 简短描述

详细说明（可选）

关闭的 Issue（可选）
```

**类型：**
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式调整
- `refactor` - 代码重构
- `perf` - 性能优化
- `test` - 测试相关

**示例：**
```
feat(ui): 添加深色模式支持

- 新增主题切换按钮
- 实现深色配色方案
- 保存用户主题偏好

Closes #42
```

---

## 📄 许可证

**MIT License**

Copyright (c) 2025 MTell

详见 [LICENSE](./LICENSE) 文件。

---

## 🙏 致谢

### 技术支持

- [Google Gemini AI](https://ai.google.dev/) - 强大的 AI 模型
- [302.ai](https://302.ai/) - API 服务提供商
- [阿里云函数计算](https://www.aliyun.com/product/fc) - 云函数服务
- [Tailwind CSS](https://tailwindcss.com/) - UI 框架

### 设计灵感

- [Dribbble](https://dribbble.com/) - 设计参考
- [Behance](https://www.behance.net/) - 创意灵感

### 开源社区

感谢所有开源项目和贡献者，让这个项目成为可能。

---

## 📧 联系方式

- 📮 **问题反馈** - [GitHub Issues](https://github.com/your-repo/issues)
- 💬 **功能建议** - [GitHub Discussions](https://github.com/your-repo/discussions)
- 📧 **邮件联系** - [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

**⚡️ Powered by [Google Gemini AI](https://ai.google.dev/)**

**🧠 Built with ❤️ and MBTI Psychology**

Made with 💡 Creativity · 🎨 Design · ⚙️ Engineering

</div>
