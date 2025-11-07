## Prompts 页面交互特征

- **状态切换标签**：Active、Suggested、Inactive 三个标签控制展示列表并同步统计数量。
- **批量操作模式**：`Select` 按钮开启多选；支持全选、批量移动、批量删除，操作通过 Dropdown 菜单触发。
- **筛选菜单**：Filter 菜单含标签、意图、Mentions 子菜单，支持多选与清空，统计激活筛选数量。
- **数据表交互**：
  - 常规模式下点击行触发 `router.push('/analytics/prompts/{id}')` 进入详情。
  - 多选模式下点击行切换选中状态；首列复选框支持快速勾选。
  - Tags 单元格点击打开管理标签 Dialog，可动态增删标签，初始状态显示该区域可编辑。
  - Actions 菜单支持单条移动和删除（阻止事件冒泡）。
- **按钮组**：`+` 按钮预留创建入口，prompt创建是弹窗，信息包括prompt，tag 以及 location， location默认是onboarding 填写的国家；Guidelines 按钮跳转到 `/guidelines`。

## Prompts 页面跳转逻辑

- 表格行（非多选模式）点击 → `analytics/prompts/{promptId}`。
- Guidelines 按钮 → `/guidelines`。

