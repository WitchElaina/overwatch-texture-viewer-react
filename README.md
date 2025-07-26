# Overwatch Texture Viewer

这是一个守望先锋纹理查看器，使用 React + rsbuild + TailwindCSS 构建。

## 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **rsbuild** - 快速的 Web 构建工具
- **TailwindCSS** - 实用程序优先的 CSS 框架

## 功能特性

- 🔍 搜索纹理
- 📊 按版本筛选
- 🏷️ 按状态筛选（新增、移除、更新）
- 📄 分页显示
- 🖼️ 切换图片大小
- 📱 响应式设计
- 🎯 点击复制纹理 ID

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── TextureViewer.tsx
│   ├── FilterControls.tsx
│   ├── TextureGrid.tsx
│   ├── TextureCard.tsx
│   ├── Pagination.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── hooks/              # 自定义 Hooks
│   ├── useTextureData.ts
│   └── useUrlParams.ts
├── types.ts            # TypeScript 类型定义
├── App.tsx            # 主应用组件
├── main.tsx           # 应用入口点
├── index.css          # TailwindCSS 样式
└── index.html         # HTML 模板
```

## 迁移说明

项目已从 AngularJS + Bootstrap 成功迁移到 React + rsbuild + TailwindCSS：

### 主要变更
- 🔄 **AngularJS → React 18**: 现代化的组件架构
- 🛠️ **Webpack → rsbuild**: 更快的构建速度
- 🎨 **Bootstrap → TailwindCSS**: 更灵活的样式系统
- 📝 **JavaScript → TypeScript**: 更好的类型安全

### 保留功能
- ✅ 所有原有功能完整保留
- ✅ URL 参数管理
- ✅ 分页逻辑
- ✅ 搜索和筛选
- ✅ 响应式设计

## 浏览器支持

支持所有现代浏览器，包括：
- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发说明

- 开发服务器默认运行在 `http://localhost:3000`
- 支持热重载
- 包含代理配置以解决 CORS 问题
- 使用 TypeScript 进行类型检查

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目与暴雪娱乐无关。所有商标均为其各自所有者的财产。
© 2025 Blizzard Entertainment, Inc. 