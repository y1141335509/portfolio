# 个人网站设计需求文档
> 给未来 Claude Code 使用。包含风格参考、内容结构、和个人背景。

---

## 一、视觉风格参考

**主要参考网站：** [brittanychiang.com](https://brittanychiang.com)

### 我喜欢的具体特点（从这个网站提取）
- **深色背景**：深海军蓝（约 `#0a192f`），不是纯黑，有层次感
- **强调色**：浅绿/青色（约 `#64ffda`），用于高亮文字和 hover 效果
- **字体**：主要用等宽/sans-serif 字体，代码感但不难读
- **排版**：大量留白，内容密度低，不拥挤
- **细节**：hover 效果 subtle（如 project card 有轻微的背景高亮 + 上移），不是大动画
- **导航**：单页滚动，左侧/顶部固定导航，smooth scroll
- **整体感**：技术感 + 个人感并存，不像企业官网，也不像简历展示板

### 风格关键词
- Minimalist dark theme
- Subtle micro-interactions
- Typography-driven
- No flashy animations
- Clean, confident, not boring

---

## 二、页面结构（建议）

### 单页应用（Single Page App），从上到下：

```
1. Hero / Landing
   - 名字 + 一句话定位
   - 不要全屏大图，简洁文字即可

2. About
   - 2-3 段自我介绍（技术 + 个人）
   - 包含个人兴趣（见下方）

3. Experience（工作经历）
   - 用 tab 切换各公司
   - 参考 brittanychiang.com 的 Experience 区块样式

4. Projects（项目展示）
   - 所有项目平等展示，卡片 grid 即可，不需要 featured/other 分级
   - **不包含量化交易系统**（私人项目，不对外展示）

5. Contact
   - 简单，邮箱 + LinkedIn 链接
   - 不需要表单
```

---

## 三、内容：工作经历与项目

### 工作经历

**Bubbles and Books** *(Oct 2023 – Present, San Mateo, CA)*
Data Engineer
- 从 Shopify 迁移到自建电商平台的端到端 ETL pipeline（零数据丢失）
- Spring Boot + React + Oracle NetSuite ERP 集成，运营效率提升 30%
- LangChain + GPT-4 RAG 客服聊天机器人，减少客服工作量 40%
- Llama 2 fine-tuning + AWS SageMaker 推理端点（自动生成产品描述）
- Kubernetes + Docker 微服务架构，系统稳定性提升 25%

**GrubMarket Inc.** *(Jun 2022 – Oct 2023, San Francisco, CA)*
Data Engineer
- 覆盖 90+ 子公司的 Hive 数据管道（高级 SQL + Python）
- PySpark Structured Streaming 处理万亿行级别实时数据
- Kafka + S3 + Databricks + Airflow 数据集成
- dbt + Databricks ML 工作流（异常检测模型）
- 通过数据解决方案：减少 $2M 潜在财务损失，提升 ERP 毛利润 $4M+，增收 $3M+
- Tableau IPO 审计仪表盘

**Weris Inc.** *(Nov 2019 – Jun 2022, Sterling, VA)*
Data Engineer
- Azure Data Lake Gen2 + Azure DevOps MLOps 管道
- TensorFlow COVID-19 预测模型 + CI/CD 自动部署
- AWS 架构优化，降低云成本 70%+
- S3 → Databricks Parquet 格式数据管道

### 教育背景
- **Georgia Institute of Technology** — M.S. Computer Science (GPA 3.8)，2021–2025
- **Penn State University** — M.S. Civil & Environmental Engineering (GPA 3.63)，2017–2019

---

## 四、内容：个人兴趣（放在 About 区块）

这部分让网站有个人风格，不只是简历：

1. **战略游戏分析** — 长期玩红警2（Red Alert 2），专注研究策略和博弈机制；对封闭系统里的最优解问题有持续兴趣。

2. **历史** — 对特定历史事件的因果逻辑感兴趣，尤其是反直觉的"为什么事情会这样发展"。

3. **量化交易** — 用 AI 辅助构建并运营个人量化交易系统；偏好让自动化系统处理复杂度，自己专注监控和策略方向。

4. **技术探索** — 习惯性追踪新兴技术工具，快速了解其边界和用途。

> **Note for Claude Code**：兴趣描述可以保持简短，2-3 句话足够。不需要列举成 bullet points，可以写成自然段落融入 About section。

---

## 五、技术栈偏好（构建网站本身）

- **框架偏好**：React 或 Next.js（用户熟悉）
- **样式**：TailwindCSS 或 Styled Components，倾向于 Tailwind
- **动画**：Framer Motion（保持 subtle，参考 brittanychiang 的力度）
- **部署**：Vercel 或 GitHub Pages
- **颜色系统**：以 brittanychiang.com 的调色板为起点，可以微调

---

## 六、不要做的事情

- 不要大型 hero 背景图
- 不要全屏视频
- 不要复杂的 cursor 特效
- 不要大量弹出框或模态窗
- 不要亮色主题（这个人偏好暗色）
- 不要过多的社交媒体链接（只需 GitHub + LinkedIn + Email）

---

## 七、联系方式与链接

- GitHub: `https://github.com/y1141335509`
- LinkedIn: `https://www.linkedin.com/in/yinghai-yu/`
- Email: `yinghaiyu67@gmail.com`
- 导航里只需这三个，不要其他社交媒体

---

## 八、About 页面风格

主体技术背景（简洁），结尾加 1-2 句真实个人色彩（如量化交易、红警2策略分析这类）。
不要纯简历风，也不要过度"个性化"。

---

## 九、项目展示策略

不需要特别区分"featured"和"other"。所有项目平等展示，用卡片 grid 呈现即可。
不需要大型 featured project 区块（参考 brittanychiang 那种左右分栏大卡片的可以跳过）。

---

## 十、参考 URL 与具体喜欢的细节

**主要参考：`brittanychiang.com`**

- 深色背景、minimal、subtle hover 效果、横向 tab 切换经历

**次要参考：`antfu.me`（暗色版）**

- 左上角签名的小动画
- 背景里的白色闪电/脉络动画（subtle，不抢眼）
- 导航直观清晰
- 背景里显示年份/时间线

**注意**：`rauno.me` 的设计感好，但 slider 切换过渡会造成不适，不采用这类过渡方式。

---

*创建：2026-02-28*
*用途：给 Claude Code 提供个人网站设计需求上下文*
