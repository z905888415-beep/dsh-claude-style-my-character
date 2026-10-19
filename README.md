<div align="center">

# DSH Claude Style · 我的角色（二改版）

**基于 [Nwflower/dsh-claude-style](https://github.com/Nwflower/dsh-claude-style) 的二次修改版本：保留 Claude 界面，新增自己的八状态动态角色。**

原作者：[Nwflower](https://github.com/Nwflower) · 上游基准：[93490c7（0.16.3）](https://github.com/Nwflower/dsh-claude-style/commit/93490c73f21e18041790cc572db31603fecc3ad7) · [本二改仓库](https://github.com/z905888415-beep/dsh-claude-style-my-character)

[![简体中文](https://img.shields.io/badge/lang-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-red.svg)](README.md) [![English](https://img.shields.io/badge/lang-English-blue.svg)](README.en.md)

[![Fork](https://img.shields.io/badge/edition-unofficial%20fork-D97757?style=flat)](docs/FORK_CHANGES.md)
[![Code license](https://img.shields.io/badge/code-MIT-2EA44F?style=flat)](LICENSE)

</div>

## 本次二改的核心变化

- **新增「我的角色」选项**：界面品牌与吉祥物独立选择，可使用 **Claude 界面＋我的角色**；原有 Clawd、Deepy 选项继续保留。
- **八组透明循环动画**：空闲、思考、工作、指挥子代理、等待操作、失败、完成、睡眠，共 **602 帧**；默认 **20 fps、96 px 显示画布**。八组基础动画映射到插件的 18 种角色状态。
- **完整接入角色设置与交互**：支持首页或首页与对话，压缩上下文、并行工作、点击及唤醒也显示自有角色。
- **新增本地角色包构建**：通过透明 PNG 精灵图与清单描述帧数、尺寸和速度；构建检查图片尺寸及透明背景，PNG 通过二进制资源路由原样提供。
- **直接安装预构建版本**：在 DeepSeek Harness 的「插件 → 添加插件」中粘贴下方安装地址，无需自行构建。首次安装默认使用 **Claude 界面＋我的角色＋首页与对话**。

本二改由仓库维护者提供角色参考图和 Grok 生成的视频，再经本地绿幕抠像、位置统一、抽帧及循环整理制成。少数循环接缝仍有轻微叠影。完整改动、状态映射及验证范围见 [二改说明](docs/FORK_CHANGES.md)。

**本仓库为非官方衍生版本。上游代码、角色和第三方素材保留原署名与许可；新增角色素材不因代码采用 MIT 而自动适用 MIT。** 具体边界见 [LICENSE](LICENSE) 与 [第三方声明](THIRD_PARTY_NOTICES.md)。

## 我的角色：八状态预览

<table>
  <tr>
    <td align="center" width="25%"><img src="./docs/custom-character/idle.gif" width="120" alt="我的角色：空闲" /><br />空闲</td>
    <td align="center" width="25%"><img src="./docs/custom-character/thinking.gif" width="120" alt="我的角色：思考" /><br />思考</td>
    <td align="center" width="25%"><img src="./docs/custom-character/typing.gif" width="120" alt="我的角色：工作" /><br />工作</td>
    <td align="center" width="25%"><img src="./docs/custom-character/conducting.gif" width="120" alt="我的角色：指挥子代理" /><br />指挥子代理</td>
  </tr>
  <tr>
    <td align="center" width="25%"><img src="./docs/custom-character/notification.gif" width="120" alt="我的角色：等待操作" /><br />等待操作</td>
    <td align="center" width="25%"><img src="./docs/custom-character/error.gif" width="120" alt="我的角色：失败" /><br />失败</td>
    <td align="center" width="25%"><img src="./docs/custom-character/happy.gif" width="120" alt="我的角色：完成" /><br />完成</td>
    <td align="center" width="25%"><img src="./docs/custom-character/sleeping.gif" width="120" alt="我的角色：睡眠" /><br />睡眠</td>
  </tr>
</table>

| 基础动画 | 文件 | 帧数 | 单轮时长（20 fps） |
| --- | --- | ---: | ---: |
| 空闲 | `idle.png` | 96 | 4.80 秒 |
| 思考 | `thinking.png` | 36 | 1.80 秒 |
| 工作 / 写回答 / 调用工具 | `typing.png` | 101 | 5.05 秒 |
| 指挥子代理 | `conducting.png` | 78 | 3.90 秒 |
| 等待操作 | `notification.png` | 65 | 3.25 秒 |
| 失败 | `error.png` | 81 | 4.05 秒 |
| 完成 | `happy.png` | 111 | 5.55 秒 |
| 睡眠 | `sleeping.png` | 34 | 1.70 秒 |

GIF 供文档预览；插件运行时使用透明 PNG 精灵图。

## 安装本二改版

### 推荐：在界面中添加插件

若之前以本地源码 `link:` 方式安装，迁移前请先解除插件目录到源码的链接，并保留源码目录。不要直接覆盖本地链接安装：本机验证中，Windows 包管理器在替换目录链接时误处理了链接目标。全新安装和已安装预构建包的用户可按以下步骤操作。

1. 打开 DeepSeek Harness，进入 **插件 → 添加插件**。
2. 粘贴以下完整地址并安装：

   ```text
   github:z905888415-beep/dsh-claude-style-my-character#dist
   ```

3. 安装成功后点击 **立即启用**，按提示重启 DeepSeek Harness。
4. 首次安装默认使用 **Claude 界面＋我的角色**，角色显示于 **首页与对话**。已有主题配置的用户会保留已保存的偏好，请在插件「外观」设置中手动选择品牌 **Claude**、吉祥物 **我的角色** 和角色出现位置。

`dist` 分支包含构建好的插件和八组角色动画，用户无需 clone 仓库、运行 `npm ci` / `npm run build`，也无需批准源码的 `prepare` 构建脚本。本二改尚未发布到 npm；直接安装 npm 上的 `dsh-claude-style` 会得到上游版本。

需要固定版本时，将地址末尾的 `#dist` 换成 `#v0.16.3-my-character.2`。发行记录与安装包见 [Releases](https://github.com/z905888415-beep/dsh-claude-style-my-character/releases)。

本二改沿用上游的包名和插件标识 `dsh-claude-style`，因此替换的是同一个插件入口，不能作为两套独立主题并行安装。此安装过程不会删除用户会话。

### 可选：命令行安装

**桌面版**请使用桌面安装自带的 `dsh` 命令，普通 npm CLI 不一定能管理桌面版。先至少打开过一次桌面版以完成配置初始化，再完全退出应用（包括后台托盘），然后执行：

```bash
dsh plugin --profile desktop add github:z905888415-beep/dsh-claude-style-my-character#dist
```

**网页版**执行：

```bash
dsh plugin --profile web add github:z905888415-beep/dsh-claude-style-my-character#dist
```

安装后重新打开对应版本，在插件中启用并按提示重启。GUI 安装无需事先退出桌面应用。配置分层及 GitHub 包安装原理见 [DeepSeek Harness 官方插件发布文档](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md)。

<details>
<summary>开发者可选：从源码构建安装</summary>

需要 Node.js、npm 和兼容的 DeepSeek Harness。

```bash
git clone https://github.com/z905888415-beep/dsh-claude-style-my-character.git
cd dsh-claude-style-my-character
npm ci
npm run build
dsh plugin --profile web add .
```

上例安装到网页版；桌面版请使用桌面安装自带的 `dsh`，并将 `web` 换成 `desktop`，按上文要求先完全退出应用。安装后启用并重启宿主。

角色包位于 [`packages/assets/src/mascot/custom/`](packages/assets/src/mascot/custom/)：八张透明 PNG 与 [`manifest.json`](packages/assets/src/mascot/custom/manifest.json)。每个源帧为 256 × 256 px，每行八格，默认每帧 50 ms、显示画布 96 × 96 px。替换素材后重新构建并重启宿主。

</details>

### 维护者发布新版

修改版本号并提交源码后，在本仓库 **Actions → Publish My Character → Run workflow** 手动发布。每次发布须使用未发布过的版本号；工作流构建并更新 `dist` 分支，同时生成固定版本标签和 GitHub Release，不发布 npm 包。仅推送源码不会自动更新 `dist` 安装内容。

## 上游功能展示

以下界面截图与 Deepy 动图沿用上游文档，展示继承的主题功能；本二改的角色预览见上方。两套主题在插件设置里切换，亮暗跟随系统。

### Claude

<table>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-home-light.png" alt="Claude 档工作台首页 —— 亮色" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-home-dark.png" alt="Claude 档工作台首页 —— 暗色" /></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-conversation-light.png" alt="Claude 档 Markdown 对话 —— 亮色" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-conversation-dark.png" alt="Claude 档 Markdown 对话 —— 暗色" /></td>
  </tr>
</table>

> 工作台首页（上），对话界面（下）；浅色在左，深色在右。

### DeepSeek

<table>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-home-light.png" alt="DeepSeek 档工作台首页 —— 亮色" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-home-dark.png" alt="DeepSeek 档工作台首页 —— 暗色" /></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-conversation-light.png" alt="DeepSeek 档 Markdown 对话 —— 亮色" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-conversation-dark.png" alt="DeepSeek 档 Markdown 对话 —— 暗色" /></td>
  </tr>
</table>

> 输入框上沿站着宠物小鲸鱼 Deepy，八个状态：

<table>
  <tr>
    <td align="center" width="25%"><img src="./docs/gifs/idle.gif" width="120" alt="空闲" /><br />空闲</td>
    <td align="center" width="25%"><img src="./docs/gifs/thinking.gif" width="120" alt="思考" /><br />思考</td>
    <td align="center" width="25%"><img src="./docs/gifs/typing.gif" width="120" alt="写回答、调用工具" /><br />写回答、调用工具</td>
    <td align="center" width="25%"><img src="./docs/gifs/conducting.gif" width="120" alt="指挥子代理" /><br />指挥子代理</td>
  </tr>
  <tr>
    <td align="center" width="25%"><img src="./docs/gifs/notification.gif" width="120" alt="等你操作" /><br />等你操作</td>
    <td align="center" width="25%"><img src="./docs/gifs/error.gif" width="120" alt="失败" /><br />失败</td>
    <td align="center" width="25%"><img src="./docs/gifs/happy.gif" width="120" alt="完成" /><br />完成</td>
    <td align="center" width="25%"><img src="./docs/gifs/sleeping.gif" width="120" alt="睡着" /><br />睡着</td>
  </tr>
</table>

## 字体

> Anthropic 没有公开发行这三款字体；[仓库里的那一份](https://github.com/Nwflower/dsh-claude-style/tree/master/packages/assets/src/fonts/anthropic)只供下载与研究。

| 字体 | 用途 | 文件 |
|---|---|---|
| Anthropic Sans Web Text | 界面 | [`packages/assets/src/fonts/anthropic/AnthropicSansWebText.ttf`](https://github.com/Nwflower/dsh-claude-style/raw/master/packages/assets/src/fonts/anthropic/AnthropicSansWebText.ttf) |
| Anthropic Serif Web Text | 对话正文 / Markdown | [`packages/assets/src/fonts/anthropic/AnthropicSerifWebText.ttf`](https://github.com/Nwflower/dsh-claude-style/raw/master/packages/assets/src/fonts/anthropic/AnthropicSerifWebText.ttf) |
| Anthropic Mono Web | 代码 / 行内代码 | [`packages/assets/src/fonts/anthropic/AnthropicMonoWeb.ttf`](https://github.com/Nwflower/dsh-claude-style/raw/master/packages/assets/src/fonts/anthropic/AnthropicMonoWeb.ttf) |

启用时二选一：装进系统（Windows 双击 `.ttf` 选「安装」，macOS 用「字体册」导入），或把 `.ttf` 复制到 `$DSH_HOME/dsh-claude-style/fonts/`。

## 文档

| 文档 | 说明 |
| --- | --- |
| [二改说明](docs/FORK_CHANGES.md) | 上游来源、本次差异、角色状态映射与验证范围 |
| [第三方声明](THIRD_PARTY_NOTICES.md) | 代码、角色与字体的来源及许可边界 |
| [设计令牌](docs/STYLE.md) | 配色、字体、形状、动效与层级（英文） |
| [架构决策](docs/adr/README.md) | 每条方向一页：背景、决定、后果与重审条件 |
| [更新日志](CHANGELOG.md) | 版本历史 |
| [贡献指南](CONTRIBUTING.md) | 构建、提交规范与回归工具（英文） |

## 鸣谢

- 本二改基于 [Nwflower](https://github.com/Nwflower) 开发的 [dsh-claude-style](https://github.com/Nwflower/dsh-claude-style)，继承其 Claude / DeepSeek 界面、设置、角色调度与工程工具；上游原署名与 MIT 许可继续保留。
- 新增角色参考图及 Grok 视频由本二改仓库维护者提供，透明帧图与循环整理为本次修改内容，素材许可单独说明。
- 对话导航的展开列表、快捷键跳转与落点横线参考 SherUnlocked-4869 的 [dsh-plugin-msg-nav](https://github.com/SherUnlocked-4869/dsh-plugin-msg-nav)（MIT）。
- Deepy 的动画帧图来自 calmly-eating-bugs（[@wp3171216237](https://github.com/wp3171216237)）绘制的 Deepy 小鲸鱼主题包。
- 聊天区的增强动效改自 [dsh-chat-ux](https://github.com/alm-allen/dsh-chat-ux)（MIT）。
- 像素螃蟹（Clawd）是 Anthropic 的角色形象：掏出电脑敲代码的动画取自 Claude Code，其余状态由上游项目按这一形象绘制，帧图不适用 MIT 许可（见 [LICENSE](LICENSE)）。本插件是非官方爱好者作品，与 Anthropic 没有关联。

## 友链

> 想把 Claude Code / Codex 等外部代理的会话历史导入 DSH 接着聊？推荐上游作者的另一个插件 [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import)。

## 上游 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Nwflower/dsh-claude-style&type=Date)](https://star-history.com/#Nwflower/dsh-claude-style&Date)
