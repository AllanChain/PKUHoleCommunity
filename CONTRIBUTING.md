# 如何贡献

## 背景

现有的社区版开发者并非 React 土著，仅凭网页开发经验与简单的 React 基础做出相关改动，十分欢迎有 React 经验的同学共同开发。

## 贡献内容

社区版欢迎大家提出*功能建议*，或者参与到社区版的*维护和更新*中。相比于建议，社区版会优先考虑 PR。希望有能力的同学一起打造社区版网页树洞。

## 树洞内的讨论

对于不熟悉 GitHub 操作的同学可以在树洞内发起讨论，建议包含关键词“树洞社区版”。开发人员会不定期手动搜索该关键词并参与讨论或转发 Issue。当然也欢迎热心同学帮忙转发到 Issue 区。

## 关于 Issue 和 PR

内容中如果**有截图要打码**

如果你打算自己动手发 PR，可以选择先发 Issue 讨论，说不定能产生更好的想法。同时在 Issue 中也可能会商讨决定 Milestone。如果定为 patch 版本，则建议发 PR 到 master 分支；如果定为 minor 版本则建议发 PR 到 dev 分支。当然如果处于版本过渡时期则灵活处理。

## 关于版本号

尽量遵循 Semver 的规范（虽然比较难做判断）

本项目使用 GitHub Actions 根据标签部署新版本，故版本号不可随意添加，原则上不追加标签。预发布版部署在 `beta.html`，正式版部署在 `index.html`

请务必不要手动更改版本，建议使用 `npm version v1.0.0-alpha.0` 命令来发布版本，这样可以同时更改版本号和打标签。注意配置 Git 自动推标签或者记得每次手动推标签。

## 代码修改注意事项

### 图标

图标的 CSS 和字体文件并不是 `assets`，使用 `CacheFirst` 策略进行 `Runtime Caching`。修改时务必注意修改对应的版本号（query string），以保证 PWA 正常更新。

## Commit Message

在经历历史一度混乱之后（千万不要往前翻 :facepalm: ）决定使用 [Angular Convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)，简要摘抄如下：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Revert

```
revert: header of the reverted commit

This reverts commit <hash>.
```

### Type

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope

现在好像还是比较随意 :joy:

## 关于推广

- 见到同学要求的网页版功能已实现时，予以回复推广
- 新功能开发完成后，以功能发布的形式推广

## 关于跟进官方

到了假期，官方很有可能会发布新功能，跟进较为困难，尤其是在修改了其代码风格的情况下。

而且在官方维护人毕业之前，我相信项目仍然能得到较好的维护。如果官方在假期中维护得很好，社区版也就没有必要存在下去了。
