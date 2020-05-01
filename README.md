# PKU Hole Community

这是一个目测永远也不会合并的分支，故不使用 GitHub 的 Fork（不止因为官方版至今未合并过一个 PR，还因为我会大改，如果有时间）

原版的网页版树洞仅有一人维护，代码也不美观，还有一堆 Warning，实用的新功能更新堪忧。

我想是不是发起一个社区版会好一些呢？既然不是官方版就可以随心所欲添加想要的功能了。

目前实现。往后再做其他实现。

计划功能列表（如果有时间）：
- [x] 简单的屏蔽词功能
- [x] ESLint 代码格式化（怎么忍受 4 空格缩进、一行巨长、不打空格！）
- [x] 收藏洞新回复提醒（简单实现，仅在 cache 更新时显示圆点，更好的实现需要改缓存及相关机制）
- [x] 树洞引用返回后记住原先状态
- [ ] 在收藏列表里置顶某洞（比如热榜）
- [ ] 消除半百个 `then`，走出 callback hell
- [ ] 搜索最近浏览的树洞，含评论（现有的 cache 貌似不存储树洞原文）

但是要“招揽用户”，才有动力

而且本人是 vue 起家，对 react 的冗余实在不敢恭维。希望有能力的同学一起打造社区版网页树洞。

---

**注：** 根据《PKU Helper网络服务“P大树洞”管理规范》：

> 不得使用非官方的客户端、脚本等访问方式，未经PKU Helper团队明确许可，访问PKU Helper的相关服务、下载PKU Helper服务提供的相关内容；使用非官方途径访问PKU Helper服务等用户经查实且对PKU Helper造成不利影响时，PKU Helper团队有权封禁账号相关使用权限，并追究法律责任。

和网页版树洞许可：

> 根据 GPL，你有权自行实现你的想法。

所以这个版本属于“自行实现你的想法”，基于 GPLv3 在 GitHub 开源。而不恰当使用此版本或利用此版本的漏洞对 PKU Helper 造成的不利影响由用户负责。作为社区版本，社区凭良心（no warranty）维护版本的安全，同时也欢迎同学实现你的想法。

以下为原 README

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
