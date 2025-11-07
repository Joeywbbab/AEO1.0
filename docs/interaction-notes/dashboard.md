## Dashboard 页面交互特征

- **筛选条**：提供时间范围、模型、标签三组下拉选择器，以及刷新按钮，用于筛选卡片和图表数据。
- **指标卡片**：四个核心指标卡片配合 Tooltip 展示指标解释；Trending 图标标识趋势。
- **可视化区块**：折线图展示品牌与竞争对手的可视化趋势；行业排名表格用于静态对比。
- **最近对话表格**：行点击事件 `router.push('/analytics/chats/{id}')` 跳转到聊天详情；品牌提及以logo呈现。
- **Top Sources 表格**：静态列表展示来源排名，点击具体的domain（行事件）可以跳转到对应的网页。
- **Guidelines 快捷入口**：页面顶部按钮指向 `/guidelines`。

## Dashboard 页面跳转逻辑

- 最近对话行点击 → `analytics/chats/{chatId}`。
- Guidelines 按钮 → `/guidelines`。

