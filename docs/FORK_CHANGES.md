# 二改说明 / Fork changes

[中文介绍](../README.md) · [English introduction](../README.en.md)

## 来源与二改范围

本仓库是 [Nwflower](https://github.com/Nwflower) 的 [dsh-claude-style](https://github.com/Nwflower/dsh-claude-style) 的非官方二次修改版本，基于上游 [93490c73f21e18041790cc572db31603fecc3ad7](https://github.com/Nwflower/dsh-claude-style/commit/93490c73f21e18041790cc572db31603fecc3ad7)（源版本 0.16.3）。

上游提供 Claude / DeepSeek 主题、原有角色、界面设置、状态调度、资源构建与验证工具。本二改增加「我的角色」模式及其素材处理、角色包构建和接入，并在 README 的核心位置明确区分本次改动与上游功能展示。上游原作者署名、许可和第三方鸣谢继续保留。

| 本二改内容 | 实际变化 |
| --- | --- |
| 独立角色选项 | 在外观设置中选择「我的角色」，可搭配 Claude 或 DeepSeek 品牌；原有 Clawd、Deepy 继续可选。 |
| 透明动画包 | 八张 PNG 精灵图，共 602 帧；256 × 256 px 源帧、每行八格、50 ms 帧间隔、96 × 96 px 显示画布。 |
| 状态接入 | 八组基础动画映射至 18 种角色状态，覆盖工作、等待、完成、点击、唤醒与并行工作。 |
| 构建与资源通道 | 读取 PNG 与清单，检查尺寸和透明背景，生成角色包；二进制 PNG 按原始字节提供，文本资源保留原有 Brotli 路径。 |
| 文档预览 | 新增本角色八状态 GIF；上游主题截图及 Deepy GIF 在 README 中明确标为继承的功能展示。 |
| 预构建安装与首次默认值 | 通过 GitHub `dist` 分支安装，无需用户自行构建；首次安装使用 Claude、我的角色、首页与对话。已有配置保留用户偏好，需在外观中手动选择角色。 |

角色包见 [`packages/assets/src/mascot/custom/`](../packages/assets/src/mascot/custom/)，状态映射见 [`custom-sheets.ts`](../packages/client/src/features/mascot/custom-sheets.ts)。GIF 用于文档展示，运行时使用 PNG 精灵图。

## 八组动画与 18 种状态

| 基础动画 | 帧数 | 时长（20 fps） | 使用该动画的状态标识 |
| --- | ---: | ---: | --- |
| 空闲 `idle` | 96 | 4.80 秒 | `idle`、`idle-look`、`idle-spout`、`waking` |
| 思考 `thinking` | 36 | 1.80 秒 | `thinking`、`compacting` |
| 工作 `typing` | 101 | 5.05 秒 | `typing`、`building` |
| 指挥子代理 `conducting` | 78 | 3.90 秒 | `conducting`、`music` |
| 等待操作 `notification` | 65 | 3.25 秒 | `notification`、`drag` |
| 失败 `error` | 81 | 4.05 秒 | `error` |
| 完成 `happy` | 111 | 5.55 秒 | `happy`、`poke-left`、`poke-right`、`tickle` |
| 睡眠 `sleeping` | 34 | 1.70 秒 | `sleeping` |

默认以每秒 20 帧播放；实际状态的停留时间和交互切换由插件调度决定。静止帧与各动画帧数记录在 [`manifest.json`](../packages/assets/src/mascot/custom/manifest.json) 中。少数循环接缝有轻微叠影，素材仍可继续优化。

## 验证范围

角色接入已通过 `npm run verify -- --feature mascot`，覆盖静态检查、构建、44 个测试文件中的 289 项单元测试和 7 个浏览器场景。另在真实 DeepSeek Harness 测试宿主中选择自有角色，检查到 96 × 96 px 显示画布，页面没有报错。

验证关注角色切换、关闭后清理、帧偏移与显示尺寸，以及 PNG 资源在接受或不接受 Brotli 时保持与源文件逐字节一致。该记录说明角色功能的验证范围；每次提交的持续集成结果以本仓库的 [Actions](https://github.com/z905888415-beep/dsh-claude-style-my-character/actions) 为准。

## 安装与素材来源

推荐在 DeepSeek Harness 的「插件 → 添加插件」中安装 `github:z905888415-beep/dsh-claude-style-my-character#dist`，安装后点击「立即启用」并按提示重启。固定版本使用 `#v0.16.3-my-character.2`，安装包与记录见 [Releases](https://github.com/z905888415-beep/dsh-claude-style-my-character/releases)。详细的桌面 / 网页 CLI 以及开发者源码安装步骤见 [README](../README.md#安装本二改版)。

`dist` 提供构建产物，用户无需 clone、安装开发依赖、构建或批准 `prepare` 脚本。本二改尚未发布 npm 包；npm 上的同名上游发行版不会自动包含本次角色修改。本二改沿用包名及插件标识 `dsh-claude-style`，替换同一个插件入口，不提供两套并行主题，也不会删除用户会话。首次安装采用自有角色默认值；已有主题配置的用户需在「外观」中手动选择「Claude＋我的角色」及出现位置。

维护者通过 **Actions → Publish My Character → Run workflow** 手动发布未使用过的版本号，生成 `dist` 分支、固定版本标签和 GitHub Release，不发布到 npm。普通源码推送不会自动更新安装分支。

角色参考图由本二改仓库维护者提供，八段动作视频由维护者使用 Grok 生成，再经本地绿幕抠像、位置统一、抽帧与循环整理，导出透明 PNG 精灵图。该来源说明不构成对角色素材授予 MIT 许可；角色形象、生成素材及其后续使用的权利单独保留，复用应先取得相应授权。

上游代码按 [LICENSE](../LICENSE) 继续保留 MIT 许可。Anthropic 字体、Clawd、Deepy 及其他第三方素材分别遵循其原有权利与许可边界，详见 [第三方声明](../THIRD_PARTY_NOTICES.md)。本二改与上游作者、Anthropic、DeepSeek 或 xAI 均无官方关联或背书。

---

## Upstream attribution and fork scope

This repository is an unofficial derivative of [dsh-claude-style](https://github.com/Nwflower/dsh-claude-style) by [Nwflower](https://github.com/Nwflower). Its upstream base is [93490c73f21e18041790cc572db31603fecc3ad7](https://github.com/Nwflower/dsh-claude-style/commit/93490c73f21e18041790cc572db31603fecc3ad7), source version 0.16.3.

The Claude / DeepSeek themes, existing mascots, interface settings, state scheduler, asset build and verification tools come from upstream. This fork adds My Character, its processed assets, character-pack build path and integration, with the changes placed prominently in both READMEs. Original authorship, license notices and third-party acknowledgements are preserved.

| Fork contribution | Behavior |
| --- | --- |
| Independent mascot option | Select My Character in Appearance settings alongside either the Claude or DeepSeek brand; Clawd and Deepy remain selectable. |
| Transparent animation pack | Eight PNG sprite sheets with 602 frames; 256 × 256 px source frames, eight columns, 50 ms frame intervals and a 96 × 96 px display canvas. |
| State integration | Eight base animations map to 18 character states, covering work, waiting, completion, clicks, waking and concurrent work. |
| Build and asset route | Read PNGs and a manifest, validate dimensions and transparency, then build the pack. Binary PNGs retain their original bytes; text assets retain the existing Brotli route. |
| Documentation previews | Add eight GIF previews for this character and identify the retained upstream theme screenshots and Deepy GIFs as inherited features. |
| Prebuilt installation and fresh defaults | Install from the GitHub `dist` branch without building locally. Fresh installations use Claude, My Character, and home plus conversations. Existing configurations keep user preferences and may require selecting the character in Appearance. |

See the [character pack](../packages/assets/src/mascot/custom/) and [`custom-sheets.ts`](../packages/client/src/features/mascot/custom-sheets.ts). GIFs are documentation previews; the running plugin uses PNG sprite sheets.

## Eight animations and 18 states

| Base animation | Frames | Duration at 20 fps | State identifiers using it |
| --- | ---: | ---: | --- |
| Idle `idle` | 96 | 4.80 s | `idle`, `idle-look`, `idle-spout`, `waking` |
| Thinking `thinking` | 36 | 1.80 s | `thinking`, `compacting` |
| Working `typing` | 101 | 5.05 s | `typing`, `building` |
| Conducting subagents `conducting` | 78 | 3.90 s | `conducting`, `music` |
| Waiting for input `notification` | 65 | 3.25 s | `notification`, `drag` |
| Failed `error` | 81 | 4.05 s | `error` |
| Finished `happy` | 111 | 5.55 s | `happy`, `poke-left`, `poke-right`, `tickle` |
| Asleep `sleeping` | 34 | 1.70 s | `sleeping` |

The default playback rate is 20 fps; the scheduler determines how long a state stays active and when interactions change it. Still frames and frame counts are recorded in [`manifest.json`](../packages/assets/src/mascot/custom/manifest.json). A few loop seams retain slight ghosting and may benefit from further asset refinement.

## Verification coverage

The character integration passed `npm run verify -- --feature mascot`, including static checks, the build, 289 unit tests across 44 test files and seven browser cases. Selecting the custom character in a real DeepSeek Harness test host also confirmed a 96 × 96 px display canvas with no page errors.

Checks cover mascot switching, removal when disabled, frame offsets and display dimensions, plus PNG responses matching source bytes with and without Brotli negotiation. This records the character feature's verification scope; consult this repository's [Actions](https://github.com/z905888415-beep/dsh-claude-style-my-character/actions) for each commit's CI result.

## Installation and asset provenance

In DeepSeek Harness, go to **Plugins → Add plugin** and install `github:z905888415-beep/dsh-claude-style-my-character#dist`, then click **Enable now** and restart when prompted. Pin a version with `#v0.16.3-my-character.2`; packages and release notes are on [Releases](https://github.com/z905888415-beep/dsh-claude-style-my-character/releases). See the [README installation steps](../README.en.md#install-this-fork) for Desktop / web CLI commands and optional source installation.

The `dist` branch provides built artifacts, so users do not need to clone, install development dependencies, build, or approve a `prepare` script. This fork has not been published to npm; the upstream npm package does not automatically include these changes. The fork retains the `dsh-claude-style` package name and plugin identifier, replacing the same plugin entry rather than adding a second independent theme. Installation does not delete user conversations. Fresh installations use the custom defaults; existing theme configurations require selecting Claude, My Character and placement in Appearance when desired.

Maintainers manually run **Actions → Publish My Character → Run workflow** with an unused version number to produce the `dist` branch, a fixed version tag and a GitHub Release. It does not publish to npm, and ordinary source pushes do not update the installation branch.

The fork maintainer supplied the character reference artwork and generated the eight source videos using Grok. Local processing removes the green background, aligns the character, extracts frames and prepares loops, producing transparent PNG sprite sheets. This provenance statement does not grant the character assets an MIT license. Rights to the character, generated assets and their subsequent use remain separately reserved; obtain the applicable permission before reuse.

Upstream code retains the MIT terms in [LICENSE](../LICENSE). Anthropic fonts, Clawd, Deepy and other third-party assets retain their respective rights and terms; see [third-party notices](../THIRD_PARTY_NOTICES.md). This fork has no official affiliation with or endorsement from the upstream author, Anthropic, DeepSeek or xAI.
