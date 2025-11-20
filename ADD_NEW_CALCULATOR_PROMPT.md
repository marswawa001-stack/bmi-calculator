# 添加新计算器提示词模板

当你需要添加新计算器时，请复制以下提示词并填写相关信息：

---

## 提示词模板

请帮我添加一个新的计算器到项目中。计算器信息如下：

**计算器基本信息：**
- 计算器名称：[例如：Percentage Calculator]
- URL 路径：[例如：percentage-calculator]
- 所属分类：[例如：math / statistics / health / finance 等]
- 图标 emoji：[例如：📊]
- 简短描述：[例如：Calculate percentages, percentage change, and percentage difference]
- 是否为热门计算器：[是/否]

**需要执行的任务：**

1. 在 `app/utils/categoryData.js` 中，找到对应分类（[分类名称]）的 calculators 数组，添加新计算器条目：
   ```javascript
   {
     id: '[url-路径]',
     name: '[计算器名称]',
     description: '[描述]',
     icon: '[emoji图标]',
     path: '/[url-路径]',
     popular: [true/false]
   }
   ```

2. 创建计算器页面文件夹和相关文件：
   - `app/[url-路径]/page.js` - 主要页面组件
   - `app/[url-路径]/[计算器名称]Content.js` - 计算器内容组件（客户端组件）
   - `app/[url-路径]/metadata.js` - SEO 元数据（如果需要独立的 metadata）

3. 确保新计算器：
   - 在首页（`app/page.js`）的分类列表中自动显示
   - 在分类详情页（`app/[id]/page.js` 和 `app/categories/[id]/page.js`）中自动显示
   - 具有正确的 SEO 信息（title, description, keywords）

请按照项目现有的代码结构和风格完成上述任务。

---

## 使用说明

1. 复制上面的提示词模板
2. 填写方括号 [ ] 中的信息
3. 将完整的提示词发送给 AI
4. AI 会自动：
   - 更新 categoryData.js
   - 创建必要的页面文件
   - 确保计算器在首页和分类页正确显示

## 示例

以下是一个完整的示例提示词：

```
请帮我添加一个新的计算器到项目中。计算器信息如下：

**计算器基本信息：**
- 计算器名称：Percentage Calculator
- URL 路径：percentage-calculator
- 所属分类：math
- 图标 emoji：💯
- 简短描述：Calculate percentages, percentage change, and percentage difference easily
- 是否为热门计算器：是

**需要执行的任务：**

1. 在 `app/utils/categoryData.js` 中，找到对应分类（math）的 calculators 数组，添加新计算器条目：
   ```javascript
   {
     id: 'percentage-calculator',
     name: 'Percentage Calculator',
     description: 'Calculate percentages, percentage change, and percentage difference easily',
     icon: '💯',
     path: '/percentage-calculator',
     popular: true
   }
   ```

2. 创建计算器页面文件夹和相关文件：
   - `app/percentage-calculator/page.js` - 主要页面组件
   - `app/percentage-calculator/PercentageCalculatorContent.js` - 计算器内容组件（客户端组件）
   - `app/percentage-calculator/metadata.js` - SEO 元数据（如果需要独立的 metadata）

3. 确保新计算器：
   - 在首页（`app/page.js`）的分类列表中自动显示
   - 在分类详情页（`app/[id]/page.js` 和 `app/categories/[id]/page.js`）中自动显示
   - 具有正确的 SEO 信息（title, description, keywords）

请按照项目现有的代码结构和风格完成上述任务。
```

## 注意事项

1. **URL 路径格式**：使用小写字母和连字符（kebab-case），例如：`p-value-calculator`
2. **分类名称**：必须是 categoryData.js 中已存在的分类之一
3. **图标选择**：使用单个 emoji 表情符号
4. **描述文本**：简洁明了，一句话说明计算器的功能
5. **Popular 标记**：仅对最常用的计算器设置为 true

## 项目中的分类列表

当前可用的分类（在 categoryData.js 中）：
- health - 健康
- finance - 财务
- math - 数学
- conversion - 单位转换
- everyday - 日常生活
- sports - 体育
- physics - 物理
- chemistry - 化学
- biology - 生物
- construction - 建筑
- ecology - 生态
- statistics - 统计
- geometry - 几何
- other - 其他

## 文件位置参考

- 分类数据：`app/utils/categoryData.js`
- 首页：`app/page.js`
- 分类页（动态路由）：`app/[id]/page.js`
- 分类页（categories路由）：`app/categories/[id]/page.js`
- 新计算器：`app/[calculator-name]/`

---

**保存此文件以便将来参考！**
