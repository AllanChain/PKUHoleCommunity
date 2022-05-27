<p align="center"><img src="https://pkuhelper.pku.edu.cn/hole/static/favicon/256.png" /></p>
<h1 align="center">PKU Hole Community</h1>
<p align="center">P 大树洞网页版社区分支</p>
<p align="center"><sup>（简称“树洞社区版”）</sup></p>
<p align="center">
  <a href="https://pkuholece.gitee.io/stable/">
    <img alt="GitHub tag (latest SemVer release)" src="https://img.shields.io/github/v/tag/AllanChain/PKUHoleCommunity?sort=semver&label=release">
  </a>
  <a href="https://pkuholece.gitee.io/beta/">
    <img alt="GitHub tag (latest SemVer pre-release)" src="https://img.shields.io/github/v/tag/AllanChain/PKUHoleCommunity?sort=semver&include_prereleases&label=pre%20release">
  </a>
  <a href="https://github.com/AllanChain/PKUHoleCommunity/blob/master/LICENSE.txt">
    <img alt="GitHub license" src="https://img.shields.io/github/license/AllanChain/PKUHoleCommunity">
  </a>
  <a href="https://github.com/AllanChain/PKUHoleCommunity/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/AllanChain/PKUHoleCommunity">
  </a>
</p>

[树洞网页版](https://github.com/pkuhelper-web/webhole)无疑取得了巨大的成功，占有较大的“市场份额”

贵校有很多动手能力强的同学，也有很多同学有着对网页版树洞的独特想法。这些想法有的是合理的、巧妙的，有的是脑洞太大不切实际的；有的完全可以在客户端完成，有的则需要联系后端。

然而官方并没有很好的处理同学们自己动手和表达想法的渠道。而且有很多呼声较高的功能迟迟不添加（毕竟一个人的精力有限）

P 大树洞网页版社区分支（以下简称“社区版”）的定位是提供一个交流的平台，提供大家动手实现的方案，让大家自己动手实现对树洞网页版的想法。社区版并非试图取代官方版本，更多的是牺牲一部分稳定性来换取好用的功能。如果大家喜欢，乐于贡献代码或想法，社区版会继续维护下去。

## 计划功能列表

见 [project](https://github.com/AllanChain/PKUHoleCommunity/projects/1)

## 更新功能列表

（此列表跟进 beta 版）

### 主要功能

- 屏蔽词
- 在关注列表中搜索
- 别名，适用于给神洞等一个名字
- 关注列表按最新回复排序
- 可设置默认隐藏图片

### 次要功能

- 从一个洞内通过链接访问另一个洞，返回后记住原状态（即保留刷到的位置以及是否是倒序）
- 关注列表中缓存更新了的洞会有黄点提示（通常情况下是有新的回复）
- 侧边栏模式下禁止主时间线的滚动
- 以文本形式复制树洞时遵从逆序和仅看

### 界面/行为改变

- 顶栏中的应用链接（成绩、不咕）目前可以正常访问，但访问时会回到官方版
- 和 App 客户端一样受到验证限制，但提供不稳定的自动验证选项
- 将 CNZZ 统计替换为简单且隐私友好型的 [Microanalytics](https://microanalytics.io/pkuholece.gitee.io)，所有人均可查看

### 项目管理

- 使用主流的代码风格
- 配置 GitHub Actions, 利用版本号控制发布

### 其他

- 社区版提供 Beta 测试版本，登录状态与稳定版同步，但是会不稳定，试验性的新功能会优先推送到 [Beta 版](https://pkuholece.gitee.io/beta/)。

## Contributing

有更多的同学喜欢，才有动力继续开发。而且现有的社区版开发者并非 React 土著，十分欢迎有 React 经验的同学共同开发。

社区版欢迎大家提出功能建议，或者参与到社区版的维护和更新中。相比于建议，社区版会优先考虑 PR。提出问题请到 [GitHub Issue](https://github.com/AllanChain/PKUHoleCommunity/issues)，树洞内讨论建议包含“树洞社区版”关键词。希望有能力的同学一起打造树洞社区版。

更多事项见 [CONTRIBUTING.md](CONTRIBUTING.md)

## Note

使用社区版同样应当遵守树洞规范。

这个版本属于“自行实现你的想法”，基于 GPLv3 在 GitHub 开源。而不恰当使用此版本或利用此版本的漏洞对 PKU Helper 造成的不利影响由用户负责。作为社区版本，社区（no warranty）维护版本的安全，同时也欢迎同学实现你的想法。

附 PKU Helper 官方的意思：

> 根据GPL，你有权fork【网页版树洞前端】的代码并进行相应的修改。请注意，你的修改版本必须依然基于GPL授权，并依据此公开源码。
>
> 根据树洞规范5.3规定，非官方客户端在PKU Helper团队认定造成不利影响，例如非法攻击服务器、盗取用户个人信息时，我们有权对其进行封禁。

以下为原 README（注：这与访问原树洞网页版的 GitHub 链接不同，因为在[某事件](https://pkuhelper-web.github.io/announce_v3.html)之后，xmcp 做了一些不同寻常的操作）

---

PKU Helper 网页版 P大树洞：[pkuhelper.pku.edu.cn/hole](https://pkuhelper.pku.edu.cn/hole/)

## 浏览器兼容

下表为当前 PKU Helper 网页版的浏览器兼容目标：

| 平台     | Desktop |                            |         | Windows  |      | macOS  | iOS    |                     | Android |                         |
| -------- | ------- | -------------------------- | ------- | -------- | ---- | ------ | ------ | ------------------- | ------- | ----------------------- |
| 浏览器   | Chrome  | Chromium<br />(国产浏览器) | Firefox | EdgeHTML | IE   | Safari | Safari | 微信<br />(WebView) | Chrome  | Chromium<br />(WebView) |
| 优先兼容 | 76+     | 无                         | 最新版  | 无       | 无   | 无     | 12+    | 无                  | 最新版  | 无                      |
| 兼容     | 56+     | 最新版                     | 56+     | 最新版   | 无   | 10+    | 10+    | 最新版              | 56+     | 最新版                  |
| 不兼容   | 其他    | 其他                       | 其他    | 其他     | 全部 | 其他   | 其他   | 其他                | 其他    | 其他                    |


**优先兼容** 指不应有 bug 和性能问题，可以 Polyfill 的功能尽可能提供，若发现问题会立刻修复。

**兼容** 指不应有恶性 bug 和严重性能问题，若发现问题会在近期修复。

**不兼容** 指在此种浏览器上访问本网站是未定义行为，问题反馈一般会被忽略。

`num+` 指符合版本号 `num` 的最新版本及后续所有版本。`最新版` 以 stable 分支为准。

## 问题反馈

对 PKU Helper 网页版的 bug 反馈请在相应仓库提交 Issue。

欢迎提出功能和 UI 建议，但可能不会被采纳。根据 GPL，你有权自行实现你的想法。

不方便在 GitHub 上说明的问题可以邮件 xmcp at pku dot edu dot cn。邮件内容可能会被公开。

对 PKU Helper 后端服务、客户端、账号、树洞内容的反馈请联系相应人员，或邮件 helper at pku dot edu dot cn。

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.zh-cn.html) for more details.
