## Competitors 页面交互特征

- **Manage Competitors Dialog**：
  - 弹窗默认展示当前关注的竞品列表，列表项支持删除。
  - 底部 `Add Competitor` 按钮切换到新增表单，填写名称与域名后保存；可通过 `Cancel` 返回列表状态。
  - 新增成功后自动重置表单并关闭弹窗。
- **筛选与图例**：顶部下拉选择器筛选竞争对手与意图类型；右侧显示意图颜色图例。
- **可视化组件**：
  - Scatter Chart 根据筛选结果渲染，使用自定义 Tooltip 展示指标；气泡颜色映射意图。
  - Intent 分布堆叠柱图搭配 Legend 与 Tooltip。
- **Visibility Contributors 表格**：
  - 竞争对手行可展开/折叠，计算平均可见度与排名。
  - 展开后点击具体 Prompt 行触发 `router.push('/analytics/prompts/{id}')`。
- **Recommended Domains 表格**：
  - Intent 徽章按颜色区分。
  - Mentions 列在存在品牌清单时通过 Tooltip 展示品牌列表。

## Competitors 页面跳转逻辑

- Prompt 行点击 → `analytics/prompts/{promptId}`。

