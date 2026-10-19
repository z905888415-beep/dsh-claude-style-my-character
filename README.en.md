<div align="center">

# DSH Claude Style · My Character Fork

**An unofficial derivative of [Nwflower/dsh-claude-style](https://github.com/Nwflower/dsh-claude-style), adding a custom character with eight animated states while retaining the Claude interface.**

Original author: [Nwflower](https://github.com/Nwflower) · Upstream base: [93490c7 (0.16.3)](https://github.com/Nwflower/dsh-claude-style/commit/93490c73f21e18041790cc572db31603fecc3ad7) · [This fork](https://github.com/z905888415-beep/dsh-claude-style-my-character)

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.en.md) [![简体中文](https://img.shields.io/badge/lang-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-red.svg)](README.md)

[![Fork](https://img.shields.io/badge/edition-unofficial%20fork-D97757?style=flat)](docs/FORK_CHANGES.md)
[![Code license](https://img.shields.io/badge/code-MIT-2EA44F?style=flat)](LICENSE)

</div>

## What this fork changes

- **Adds a My Character mascot option**: choose the interface brand and mascot independently, including **Claude interface + My Character**. The original Clawd and Deepy options remain available.
- **Eight transparent animation loops**: idle, thinking, working, conducting subagents, waiting for input, failed, finished and asleep, with **602 frames** in total; defaults are **20 fps and a 96 px display canvas**. Eight base animations map onto the plugin's 18 character states.
- **Connects the character to settings and interactions**: show it on the home page or on both home and conversations; context compaction, concurrent work, clicks and waking also use the custom character.
- **Adds a local character-pack build path**: transparent PNG sprite sheets and a manifest describe frame counts, dimensions and timing. The build checks dimensions and transparency, and the binary asset route serves the PNG bytes unchanged.
- **Installs as a prebuilt plugin**: paste the installation address below into DeepSeek Harness's **Plugins → Add plugin** screen. A fresh installation defaults to **Claude + My Character**, shown on **home and conversations**.

The fork maintainer supplied the character reference artwork and Grok-generated videos. Local processing removes the green background, aligns the character, extracts frames and prepares loops. A few loop seams retain slight ghosting. See [Fork changes](docs/FORK_CHANGES.md) for the implementation scope, state mapping and verification coverage.

**This is an unofficial derivative. Upstream code, characters and third-party assets retain their original credits and terms; the added character assets do not automatically receive the code's MIT license.** See [LICENSE](LICENSE) and [third-party notices](THIRD_PARTY_NOTICES.md).

## My Character: eight animated states

<table>
  <tr>
    <td align="center" width="25%"><img src="./docs/custom-character/idle.gif" width="120" alt="My Character: idle" /><br />Idle</td>
    <td align="center" width="25%"><img src="./docs/custom-character/thinking.gif" width="120" alt="My Character: thinking" /><br />Thinking</td>
    <td align="center" width="25%"><img src="./docs/custom-character/typing.gif" width="120" alt="My Character: working" /><br />Working</td>
    <td align="center" width="25%"><img src="./docs/custom-character/conducting.gif" width="120" alt="My Character: conducting subagents" /><br />Conducting subagents</td>
  </tr>
  <tr>
    <td align="center" width="25%"><img src="./docs/custom-character/notification.gif" width="120" alt="My Character: waiting for input" /><br />Waiting for input</td>
    <td align="center" width="25%"><img src="./docs/custom-character/error.gif" width="120" alt="My Character: failed" /><br />Failed</td>
    <td align="center" width="25%"><img src="./docs/custom-character/happy.gif" width="120" alt="My Character: finished" /><br />Finished</td>
    <td align="center" width="25%"><img src="./docs/custom-character/sleeping.gif" width="120" alt="My Character: asleep" /><br />Asleep</td>
  </tr>
</table>

| Base animation | File | Frames | Loop duration at 20 fps |
| --- | --- | ---: | ---: |
| Idle | `idle.png` | 96 | 4.80 s |
| Thinking | `thinking.png` | 36 | 1.80 s |
| Working / answering / calling tools | `typing.png` | 101 | 5.05 s |
| Conducting subagents | `conducting.png` | 78 | 3.90 s |
| Waiting for input | `notification.png` | 65 | 3.25 s |
| Failed | `error.png` | 81 | 4.05 s |
| Finished | `happy.png` | 111 | 5.55 s |
| Asleep | `sleeping.png` | 34 | 1.70 s |

GIFs are documentation previews; the plugin uses transparent PNG sprite sheets at runtime.

## Install this fork

### Recommended: add it in the interface

1. Open DeepSeek Harness and go to **Plugins → Add plugin**.
2. Paste this full address and install:

   ```text
   github:z905888415-beep/dsh-claude-style-my-character#dist
   ```

3. After installation, click **Enable now** and restart DeepSeek Harness when prompted.
4. A fresh installation defaults to **Claude + My Character**, with the character on **home and conversations**. Existing theme configurations retain saved preferences: open the plugin's **Appearance** settings and select **Claude**, **My Character** and the desired placement.

The `dist` branch ships the built plugin and all eight character animations. Users do not need to clone the repository, run `npm ci` / `npm run build`, or approve a source `prepare` build script. This fork has not been published to npm; installing the npm package `dsh-claude-style` installs the upstream edition.

To pin a release, replace `#dist` with `#v0.16.3-my-character.2`. See [Releases](https://github.com/z905888415-beep/dsh-claude-style-my-character/releases) for release notes and package downloads.

This fork retains the upstream package name and plugin identifier `dsh-claude-style`. It replaces the same plugin entry and cannot be installed as a second independent theme alongside upstream. Installation does not delete user conversations.

### Optional: install from the command line

For **Desktop**, use the `dsh` shipped with the desktop installation; the ordinary npm CLI may not manage Desktop. Launch Desktop at least once to initialize its profile, then fully exit the app, including its background tray process, before running:

```bash
dsh plugin --profile desktop add github:z905888415-beep/dsh-claude-style-my-character#dist
```

For the **web app**, run:

```bash
dsh plugin --profile web add github:z905888415-beep/dsh-claude-style-my-character#dist
```

Reopen the corresponding app, enable the plugin and restart when prompted. Installation through the GUI does not require exiting Desktop first. See the [official DeepSeek Harness plugin publishing guide](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md) for configuration layers and GitHub package installation.

<details>
<summary>For developers: build and install from source</summary>

Requires Node.js, npm and a compatible DeepSeek Harness installation.

```bash
git clone https://github.com/z905888415-beep/dsh-claude-style-my-character.git
cd dsh-claude-style-my-character
npm ci
npm run build
dsh plugin --profile web add .
```

This example targets the web profile. For Desktop, use its bundled `dsh`, replace `web` with `desktop` and fully exit the app first as described above. Enable the plugin and restart the host after installation.

The character pack lives in [`packages/assets/src/mascot/custom/`](packages/assets/src/mascot/custom/): eight transparent PNG sheets and [`manifest.json`](packages/assets/src/mascot/custom/manifest.json). Source frames are 256 × 256 px, with eight frames per row, a default interval of 50 ms and a 96 × 96 px display canvas. Rebuild and restart the host after replacing the assets.

</details>

### Publish a new version as maintainer

Update the version, commit the source, then open this repository's **Actions → Publish My Character → Run workflow** to publish manually. Each release needs an unused version number. The workflow builds and updates `dist`, creates a fixed version tag and a GitHub Release, and does not publish to npm. Pushing source changes alone does not update the `dist` installation.

## Inherited upstream features

The following interface screenshots and Deepy GIFs are retained from the upstream documentation to illustrate inherited features. The custom character previews are above. The settings page switches between the two palettes; light and dark follow the system.

### Claude

<table>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-home-light.png" alt="Claude brand, Studio home — light" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-home-dark.png" alt="Claude brand, Studio home — dark" /></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-conversation-light.png" alt="Claude brand, Markdown conversation — light" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/claude-conversation-dark.png" alt="Claude brand, Markdown conversation — dark" /></td>
  </tr>
</table>

> Studio home above, Markdown conversation below; light on the left, dark on the right. Ivory canvas `#FCFCFB`, warm black `#141413`, ember orange `#D97757` for every action, and Claude Code's pixel crab on the composer.

### DeepSeek

<table>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-home-light.png" alt="DeepSeek brand, Studio home — light" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-home-dark.png" alt="DeepSeek brand, Studio home — dark" /></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-conversation-light.png" alt="DeepSeek brand, Markdown conversation — light" /></td>
    <td align="center" width="50%"><img src="./docs/screenshots/deepseek-conversation-dark.png" alt="DeepSeek brand, Markdown conversation — dark" /></td>
  </tr>
</table>

> Sky-blue canvas `#F7FAFF`, blue-black `#13161D`, DeepSeek blue `#4D6BFE`; Deepy the pixel whale stands on the composer, in eight states:

<table>
  <tr>
    <td align="center" width="25%"><img src="./docs/gifs/idle.gif" width="120" alt="Idle" /><br />Idle</td>
    <td align="center" width="25%"><img src="./docs/gifs/thinking.gif" width="120" alt="Thinking" /><br />Thinking</td>
    <td align="center" width="25%"><img src="./docs/gifs/typing.gif" width="120" alt="Answering and calling tools" /><br />Answering and calling tools</td>
    <td align="center" width="25%"><img src="./docs/gifs/conducting.gif" width="120" alt="Conducting subagents" /><br />Conducting subagents</td>
  </tr>
  <tr>
    <td align="center" width="25%"><img src="./docs/gifs/notification.gif" width="120" alt="Waiting on you" /><br />Waiting on you</td>
    <td align="center" width="25%"><img src="./docs/gifs/error.gif" width="120" alt="Failed" /><br />Failed</td>
    <td align="center" width="25%"><img src="./docs/gifs/happy.gif" width="120" alt="Finished" /><br />Finished</td>
    <td align="center" width="25%"><img src="./docs/gifs/sleeping.gif" width="120" alt="Asleep" /><br />Asleep</td>
  </tr>
</table>

> The workspaces, sessions, usage figures and nickname in the screenshots are sample data.

## Fonts

> **The Anthropic fonts do not ship with the npm package; the copies in this repository are for download and study only.**

| Font | Used for | File |
|---|---|---|
| Anthropic Sans Web Text | Interface / UI | [`packages/assets/src/fonts/anthropic/AnthropicSansWebText.ttf`](https://github.com/Nwflower/dsh-claude-style/raw/master/packages/assets/src/fonts/anthropic/AnthropicSansWebText.ttf) |
| Anthropic Serif Web Text | Conversation body / Markdown | [`packages/assets/src/fonts/anthropic/AnthropicSerifWebText.ttf`](https://github.com/Nwflower/dsh-claude-style/raw/master/packages/assets/src/fonts/anthropic/AnthropicSerifWebText.ttf) |
| Anthropic Mono Web | Code / inline code | [`packages/assets/src/fonts/anthropic/AnthropicMonoWeb.ttf`](https://github.com/Nwflower/dsh-claude-style/raw/master/packages/assets/src/fonts/anthropic/AnthropicMonoWeb.ttf) |

To enable them, install the `.ttf` files on your system (double-click and choose "Install" on Windows, import with Font Book on macOS), or copy them into `$DSH_HOME/dsh-claude-style/fonts/`.

## Documentation

| Document | Contents |
| --- | --- |
| [Fork changes](docs/FORK_CHANGES.md) | Upstream attribution, changes, character state mapping and verification coverage |
| [Third-party notices](THIRD_PARTY_NOTICES.md) | Sources and license boundaries for code, characters and fonts |
| [Design tokens](docs/STYLE.md) | The palette, typography, shape, motion and layer rules (in English) |
| [Architecture decisions](docs/adr/README.md) | One page per direction: background, decision, consequences, revisiting conditions (in Chinese) |
| [Changelog](CHANGELOG.md) | Version history |
| [Contributing](CONTRIBUTING.md) | Building from `packages/client/src/`, commit conventions, and the screenshot and regression tooling |

## Acknowledgements

- This fork builds on [dsh-claude-style](https://github.com/Nwflower/dsh-claude-style) by [Nwflower](https://github.com/Nwflower), retaining its Claude / DeepSeek interfaces, settings, character scheduling and development tools. The original attribution and MIT license are preserved.
- The fork maintainer supplied the added character reference artwork and Grok videos. Transparent sprite sheets and loop processing are part of this fork; asset terms are documented separately.
- The conversation navigator's opening list, keyboard jumps and landing line follow SherUnlocked-4869's [dsh-plugin-msg-nav](https://github.com/SherUnlocked-4869/dsh-plugin-msg-nav) (MIT).
- The animation frames of Deepy the pixel whale come from the Deepy whale theme pack drawn by calmly-eating-bugs ([@wp3171216237](https://github.com/wp3171216237)), and ship with the plugin by the author's permission; GIFs of all 20 animations are in [docs/gifs/](docs/gifs/).
- The enhanced animations in the chat area are modified from [dsh-chat-ux](https://github.com/alm-allen/dsh-chat-ux) (MIT).
- The pixel crab (Clawd) is a character of Anthropic: its laptop animation is taken from Claude Code, the animations of its other states are drawn by the upstream project after that character, and its frames are not covered by the MIT license (see [LICENSE](LICENSE)). This plugin is an unofficial fan work, not affiliated with or endorsed by Anthropic.

## Related projects

> Running several themes at once? Try [dsh-skin-manager](https://github.com/xiaoyangcheng84-svg/dsh-skin-manager) — it switches between all installed themes from a single settings page.

> Want to import your Claude Code / Codex session history into DSH and keep the conversation going? Try the upstream author's other plugin, [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import).

## Upstream Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Nwflower/dsh-claude-style&type=Date)](https://star-history.com/#Nwflower/dsh-claude-style&Date)
