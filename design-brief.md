# 个人网站设计文档（Claude Code 使用）

> **最后更新：2026-03-04**
> 给未来 Claude Code 使用。包含当前网站完整状态、设计系统、内容数据、和待办事项。
> 在修改网站前，请务必先读完这份文档。

---

## 一、网站基本信息

| 项目 | 内容 |
|---|---|
| 线上地址 | `https://yinghai-yu.vercel.app` |
| 本地路径 | `portfolio/`（Next.js 项目根目录） |
| 框架 | Next.js 14+ App Router |
| 样式 | TailwindCSS（自定义色系，见下） |
| 动画 | Framer Motion |
| 地图 | react-simple-maps（世界地图 SVG） |
| 部署 | Vercel（CLI 直接 `npx vercel --prod --yes`） |
| Vercel 项目ID | `prj_8p5Cug5AuDNyNDjuWtLMTfmEr2JX` |

---

## 二、设计系统

### 颜色（tailwind.config.ts 已配置）

```
navy:          #0a192f   ← 页面背景
navy-light:    #112240   ← 卡片背景
navy-lighter:  #233554   ← 边框、分割线
slate:         #8892b0   ← 正文颜色
slate-light:   #a8b2d8
slate-lighter: #ccd6f6   ← 次标题
slate-white:   #e6f1ff   ← 主标题
accent:        #64ffda   ← 强调色（绿色）
```

### 字体

- 正文：`Inter`（Google Fonts）
- 代码/mono：`SF Mono → Fira Code → Fira Mono → Roboto Mono → monospace`

### 设计原则

- Minimalist dark theme，大量留白
- Subtle micro-interactions（hover 有轻微 border/bg 变化，无大动画）
- No flashy animations，no modal windows，no cursor effects
- 纯暗色主题，不要亮色版本
- 卡片统一用 `bg-navy-light/40 border border-navy-lighter/40 rounded` 样式

---

## 三、页面结构（多页路由，非单页）

```
/           → Hero 页（首页，Lichtenberg 背景动画）
/about      → About + Education + Certifications
/experience → Experience（tab 切换）
/projects   → Projects（卡片 grid）
/timeline   → Journey（世界地图 + 自动播放时间线）
/contact    → Contact
```

### 导航栏顺序与编号

```
01. About    → /about
02. Experience → /experience
03. Projects → /projects
04. Journey  → /timeline
05. Contact  → /contact
```

导航社交图标（右侧）：GitHub / LinkedIn / Google Scholar / LeetCode / Email

---

## 四、文件结构（关键文件）

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← 全局 metadata（OG/favicon/SEO），导航+页脚
│   │   ├── page.tsx            ← / 首页
│   │   ├── about/page.tsx      ← /about 页（About + Education + Certifications）
│   │   ├── experience/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── timeline/page.tsx   ← /timeline（JourneyMap 组件）
│   │   ├── contact/page.tsx
│   │   └── opengraph-image.tsx ← OG 图片自动生成（Next.js 原生）
│   └── components/
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Education.tsx       ← 三段学历时间线 + 论文/Thesis + Scholar/LeetCode 链接
│       ├── Certifications.tsx  ← 8 张证书卡片（Logo + 名称 + 发行方）
│       ├── Experience.tsx      ← 6 个 tab（Bubbles → Shandong RA）
│       ├── Projects.tsx        ← 卡片 grid（6 个项目）
│       ├── JourneyMap.tsx      ← 世界地图 + 自动播放时间轴（14 节点）
│       ├── Timeline.tsx        ← 旧版垂直时间线（已弃用，保留备用）
│       ├── Contact.tsx
│       ├── Footer.tsx
│       └── animations/
│           ├── LichtenbergAnimation.tsx
│           ├── EulerCircleAnimation.tsx
│           ├── RiemannZetaAnimation.tsx
│           └── EulerIdentityAnimation.tsx
├── public/
│   ├── favicon.svg             ← <YY/> 样式 SVG favicon
│   ├── Yinghai_Yu_Resume.pdf   ← 最新简历（Hero 页 Resume 下载按钮指向此）
│   ├── avatars/                ← 头像素材（pixel-art 风格，6张）
│   │   ├── handsome-guy.jpeg   ← ✅ 当前 About 页使用的头像
│   │   ├── niko-1.jpeg
│   │   ├── niko-4.jpeg
│   │   ├── niko-8.jpeg
│   │   ├── niko5.jpeg
│   │   └── nk-3.jpeg
│   └── certs/
│       └── aws-solutions-architect-associate.pdf ← 官方证书原件（PDF 下载按钮指向此）
└── design-brief.md             ← 本文档
```

---

## 五、内容数据

### 工作经历（Experience.tsx，6 tabs，顺序从新到旧）

1. **Bubbles and Books** · Data Engineer · Oct 2023 – Present · San Mateo, CA
2. **GrubMarket Inc.** · Data Engineer · Jun 2022 – Oct 2023 · San Francisco, CA
3. **Weris Inc.** · Data Engineer · Nov 2019 – Jun 2022 · Sterling, VA
4. **Tencent** · Data Science Intern · Jun 2019 – Aug 2019 · Shenzhen, China
5. **Global AI** · Quantitative Strategist · Aug 2018 – Dec 2018 · Remote
   - GitHub: https://github.com/iyutpo/Greenhouse
6. **Shandong Univ. of Tech.** · Research Assistant · Jan 2017 – Jul 2017 · Zibo, China
   - Publication: https://www.sciencedirect.com/science/article/abs/pii/S0197397517301790

### 教育背景（Education.tsx，时间线卡片）

- **Georgia Institute of Technology** · M.S. Computer Science · GPA 3.8 · 2021–2025
- **Pennsylvania State University** · M.S. Civil & Environmental Engineering · GPA 3.63 · 2017–2019
- **Shandong University of Technology** · B.S. Civil & Environmental Engineering · GPA 3.53 · 2013–2017

学术链接：
- Google Scholar: https://scholar.google.com/citations?hl=en&user=k8x7nqwAAAAJ
- LeetCode: https://leetcode.com/u/quabouquet/
- Publication: https://www.sciencedirect.com/science/article/abs/pii/S0197397517301790

### 证书（Certifications.tsx，2列卡片）

| 平台 | 证书名 | 链接 | 状态 |
|---|---|---|---|
| Amazon Web Services | AWS Certified Solutions Architect · Associate | Credly badge | ✅ 已确认 |
| HackerRank | SQL (Advanced) | [↗](https://www.hackerrank.com/certificates/8738c2b13dd8) | ✅ 已确认 |
| HackerRank | SQL (Intermediate) | [↗](https://www.hackerrank.com/certificates/879a6dd93626) | ✅ 已确认 |
| HackerRank | SQL (Basic) | [↗](https://www.hackerrank.com/certificates/ff56bdd3d486) | ✅ 已确认 |
| Udemy | Master of Apache Spark | [↗](https://www.udemy.com/certificate/UC-1dad8ed3-c378-43c8-bf59-d2a65e685e8f/) | ✅ 已确认 |
| Coursera | Practical Time Series Analysis · May 2019 | [↗](https://www.coursera.org/account/accomplishments/verify/WAN4VECSVLQJ) | ✅ 已确认 |
| Coursera | Neural Networks and Deep Learning · May 2019 | [↗](https://www.coursera.org/account/accomplishments/verify/JJ88J7C9HGTE) | ✅ 已确认 |
| Coursera | Convolutional Neural Networks in TensorFlow · May 2019 | [↗](https://www.coursera.org/account/accomplishments/verify/E8ZHP8XYH5E5) | ✅ 已确认 |

### 项目展示（Projects.tsx，3列卡片 grid）

1. Financial Anomaly Detection System（GrubMarket，$2M+ 风险识别）
2. Real-time Streaming Data Pipeline（PySpark，trillion-row 级别）
3. RAG Customer Service Chatbot（LangChain + GPT-4，-40% 客服负载）
4. LLM Product Description Generator（Llama 2 + SageMaker）
5. COVID-19 Prediction Model (MLOps)（TensorFlow + Azure DevOps）
6. E-commerce ETL Migration（Shopify → 自建平台，零数据丢失）

> **注意**：量化交易系统是私人项目，不放在网站上。

### Journey 地图（JourneyMap.tsx，13 个时间节点）

| 年份 | 类型 | 事件 | 坐标 |
|---|---|---|---|
| 2013 | education | 入学 Shandong Univ. | [118.05, 36.8] |
| 2017 Jan | research | Research Assistant | [118.05, 36.8] |
| 2017 Jul | research | 发表 Transport Policy | [118.05, 36.8] |
| 2017 Sep | education | 毕业 B.S. / 入学 Penn State | [-77.86, 40.8] |
| 2018 Aug | work | Global AI | [-77.86, 40.8] |
| 2019 May | research | M.S. Thesis Defense（Penn State） | [-77.86, 40.8] |
| 2019 May | education | 毕业 M.S. Penn State | [-77.86, 40.8] |
| 2019 Jun | work | Tencent 实习 | [114.06, 22.54] |
| 2019 Nov | work | Weris Inc. | [-77.42, 38.99] |
| 2020 | certification | AWS 认证 | [-77.42, 38.99] |
| 2021 Jan | education | 入学 Georgia Tech (远程) | [-84.39, 33.75] |
| 2022 Jun | work | GrubMarket | [-122.42, 37.77] |
| 2023 Oct | work | Bubbles and Books | [-122.33, 37.56] |
| 2025 | education | 毕业 M.S. CS Georgia Tech | [-84.39, 33.75] |

地图使用 `react-simple-maps`，GeoJSON 数据从 CDN 加载：
`https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`

---

## 六、联系方式与社交链接

```
GitHub:         https://github.com/y1141335509
LinkedIn:       https://www.linkedin.com/in/yinghai-yu/
Google Scholar: https://scholar.google.com/citations?hl=en&user=k8x7nqwAAAAJ
LeetCode:       https://leetcode.com/u/quabouquet/
Email:          yinghaiyu67@gmail.com
```

导航栏里显示：GitHub + LinkedIn + Google Scholar + LeetCode + Email（共5个图标）

---

## 七、个人背景（About 页内容）

**统计数据（About 页右侧卡片）**：6+ Years Experience / 3 Companies / $9M+ Business Impact / 3 Degrees

**自我介绍段落要点**：
- 6+ 年 Data Engineer，专注可扩展 pipeline、实时 streaming、ML 数据系统
- 跨行业背景：农产品供应链（GrubMarket）、电商（Bubbles & Books）、政府承包（Weris）
- 三个学位：Georgia Tech M.S. CS / Penn State M.S. CEE / Shandong B.S. CEE
- 个人爱好（要体现个人风格）：红警2策略分析 / 历史因果逻辑 / 个人量化交易系统（私人）

> **注意**：量化交易只在 About 页面以模糊方式提及，不展示项目详情，不公开策略。

---

## 八、SEO 与 meta

- Favicon：`/public/favicon.svg`（`<YY/>` 样式，深色背景 + accent 绿色）
- OG Image：`src/app/opengraph-image.tsx`（Next.js 原生生成，1200×630，暗色主题）
- 全局 metadata 在 `src/app/layout.tsx`
- 各子页面有独立 title（如 `About | Yinghai Yu`）

---

## 九、不要做的事情

- 不要纯黑背景（用 `#0a192f`，有层次感）
- 不要大型 hero 背景图 / 全屏视频
- 不要复杂 cursor 特效 / 大量模态窗口
- 不要亮色主题
- 不要 flashy 动画（保持 subtle，参考 brittanychiang.com 力度）
- 不要展示量化交易系统
- 不要添加更多社交媒体（只保留上述5个链接）

---

## 十、待办事项（TODO）

- [ ] **简历更新**：需要更新时，替换 `public/Yinghai_Yu_Resume.pdf`（当前版本：v2026-02-27，文件 177K，与 `resumes/data-engineer/v2026-02-27/Yinghai_Yu_DE_III_20260227.pdf` 一致）

### 内容改进

- [ ] **Projects 页加 GitHub 链接**：`Projects.tsx` 中 6 个项目卡片目前缺少外链。Financial Anomaly Detection / RAG Chatbot / COVID-19 Model 等若有公开 repo 或 demo，直接补充 `githubHref` / `demoHref` 字段即可，组件已支持扩展。
- [ ] **Testimonials（可选）**：如果 LinkedIn 上有 written recommendation，可在 About 页或 Contact 页加一个引用块，对招聘方 social proof 效果较强。

### 技术改进

- [ ] **SEO meta description**：各子页面（about / experience / projects / timeline / contact）目前只有 `title`，缺少 `description` meta tag。在每个 `page.tsx` 的 `metadata` 对象里加一行 `description: '...'` 即可，有助于 Google 收录和搜索结果摘要。
- [ ] **OG image 加头像**：`src/app/opengraph-image.tsx` 目前生成纯文字暗色 OG 图。可把 `handsome-guy.jpeg` 嵌入进去（Next.js ImageResponse 支持 `<img>` 标签），在 LinkedIn / Twitter 分享时显示人像。
- [ ] **Vercel Analytics**：在 `src/app/layout.tsx` 里加 `<Analytics />` 组件（`@vercel/analytics/react`，免费）即可统计页面 PV 和停留时长，一行代码。
- [ ] **ReactFlow Controls 缩放按钮失效**：`PipelineGraph.tsx` 里 `<Controls showZoom showFitView />` 已渲染，但点击 +/- 按钮目前没有缩放效果。已用 `useNodesState` / `useEdgesState` 修复了拖拽问题，缩放按钮疑似受 CSS override（`width/height: 22px`）或 `preventScrolling={false}` 影响。待排查：检查 `.react-flow__controls-button` pointer-events、尝试移除自定义尺寸、或改用 `useReactFlow().zoomIn()` 自行绑定按钮。

---

## 十一、背景动画说明

每个页面使用不同的背景数学动画（subtle，不抢眼）：

| 页面 | 动画 | 组件 |
|---|---|---|
| / (Home) | Lichtenberg 闪电分形 | `LichtenbergAnimation` |
| /about | Lichtenberg（不同起点） | `LichtenbergAnimation` |
| /experience | Euler 圆形轨迹 | `EulerCircleAnimation` |
| /projects | Euler 圆形轨迹（同 Experience） | `EulerCircleAnimation` |
| /timeline | Euler 圆形轨迹（同 Experience） | `EulerCircleAnimation` |
| /contact | Euler Identity 动画 | `EulerIdentityAnimation` |

---

*创建：2026-02-28 · 最后更新：2026-03-04*
*用途：给 Claude Code 提供个人网站完整上下文，读此文档即可无缝继续开发*
