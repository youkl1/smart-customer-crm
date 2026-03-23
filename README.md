# 智客通CRM（SmartCustomer CRM）

## 项目简介

智客通CRM是一款基于Vue 3的企业级客户关系管理系统，提供完整的客户生命周期管理功能，包括客户管理、联系人管理、商机管理、任务管理等核心模块。系统分为移动端和WEB管理后台，满足不同场景的使用需求。

## 技术栈

- **前端框架**：Vue 3 + Composition API
- **移动端UI**：Vant UI
- **WEB端UI**：Element Plus
- **路由管理**：vue-router 4.x
- **状态管理**：Pinia
- **数据可视化**：ECharts 5.x
- **构建工具**：Vite
- **CSS预处理器**：SCSS

## 项目结构

```
smart-customer-crm/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 资源文件
│   │   ├── styles/      # 样式文件
│   │   └── images/      # 图片资源
│   ├── components/      # 通用组件
│   ├── views/           # 页面组件
│   │   ├── entry/       # 入口页面（登录、注册）
│   │   ├── mobile/      # 移动端页面
│   │   └── web/         # WEB管理后台页面
│   ├── router/          # 路由配置
│   ├── stores/          # 状态管理
│   ├── utils/           # 工具函数
│   │   └── request.js   # API请求封装
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── .env.example         # 环境变量示例
├── index.html           # HTML模板
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── README.md            # 项目说明
```

## 功能模块

### 移动端
- **客户管理**：客户列表、客户详情、新增客户、编辑客户、客户公海池
- **联系人管理**：联系人列表、新增联系人、编辑联系人
- **商机管理**：商机列表、商机详情、新增商机、编辑商机、推进阶段
- **任务管理**：任务列表、任务详情、新增任务、编辑任务、完成任务
- **跟进记录**：添加跟进记录
- **个人中心**：个人信息编辑、修改密码
- **顶部导航栏**：返回、保存、新增、编辑按钮功能

### WEB管理后台
- **客户管理**：客户列表、客户详情、客户分析
- **产品管理**：产品列表、产品分类
- **订单管理**：订单列表、订单详情
- **回款管理**：回款计划、回款记录
- **报表中心**：销售漏斗、业绩趋势、客户分析
- **系统设置**：组织架构、角色权限、字典管理、系统日志

## 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

## 环境配置

复制 `.env.example` 文件为 `.env`，并根据实际情况修改配置：

```env
# API基础URL
VITE_API_BASE_URL=http://localhost:3000/api

# 系统标题
VITE_APP_TITLE=智客通CRM

# 版本号
VITE_APP_VERSION=1.0.0
```

## 模拟数据

系统内置了模拟数据，方便开发和测试。在实际部署时，请替换为真实的API接口。

### 登录账号
- **账号**：admin
- **密码**：123456

## 浏览器支持

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80

## 开发规范

1. **代码规范**：使用ESLint进行代码检查，遵循Vue 3最佳实践
2. **命名规范**：使用驼峰命名法，组件名使用PascalCase
3. **样式规范**：使用CSS变量，遵循设计系统规范
4. **提交规范**：使用Conventional Commits规范

## 注意事项

1. 本项目为前端演示版本，实际部署时需要对接后端API
2. 敏感信息（如API密钥）请放在`.env`文件中，不要提交到版本控制
3. 定期更新依赖包，确保安全性

## 许可证

MIT

## 联系方式

如有问题或建议，请联系：
- 邮箱：contact@smartcustomer.com
- 网站：https://www.smartcustomer.com
