## Citations 页面交互特征

- **视图切换**：顶部按钮在 Domain、URL 视角间切换，控制主表格展示形态。
- **Mentions 筛选**：Dropdown 支持勾选多品牌过滤引用记录；`Clear` 按钮可清空筛选。
- **Domain 视图表格**：
  - 行点击触发 `router.push('/analytics/citations/domain/{domain}')` 进入域名详情。
  - 行内 ExternalLink 按钮阻止冒泡并新开实际站点。
  - 展示平均引用、Usage 百分比与品牌徽标。
- **URL 视图表格**：展示页面标题、引用情况与品牌徽标；数据静态不可点击。
- **Guidelines 快捷入口**：顶部按钮指向 `/guidelines`。

## Citations 页面跳转逻辑

- Domain 行点击 → `analytics/citations/domain/{domain}`。
- 行内外链按钮 → `https://{domain}`（新窗口）。
- Guidelines 按钮 → `/guidelines`。

