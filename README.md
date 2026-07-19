# 佣书 · Chronicle

明末清初互动叙事网页游戏。以屈大均北方游历为线索，以小见大，最终指向广州庚寅之劫的多重真相。

> 历史不会说话。

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 18 或更高版本

### 安装与运行

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)

### 构建部署

```bash
npm run build
npm start
```

可一键部署到 [Vercel](https://vercel.com)。

## 项目结构

```
src/
├── app/              # 页面路由（首页、游戏、史料、设置）
├── components/       # UI 组件
├── lib/              # 存档与剧情读取
├── story/            # 剧情 JSON（只改这里写剧情）
└── types/            # TypeScript 类型
```

## 写剧情

编辑 `src/story/chapter01.json`：

```json
{
  "id": "beat-01",
  "speaker": "旁白",
  "text": "雨已经下了三天。"
}
```

选择分支：

```json
{
  "id": "beat-07",
  "type": "choice",
  "text": "你准备——",
  "choices": [
    {
      "id": "choice-paper",
      "text": "继续寻找同样纸张",
      "effects": { "paper": 1 },
      "goto": "beat-08a"
    }
  ]
}
```

## 设计原则

详见 [PROJECT.md](./PROJECT.md)。

## 技术栈

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS
- localStorage 存档（无后端）

## License

MIT
