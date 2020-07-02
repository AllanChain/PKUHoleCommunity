import React, { PureComponent } from 'react';

import './Config.css';

const BUILTIN_IMGS = {
  'static/bg/gbp.jpg': '寻觅繁星（默认）',
  'static/bg/eriri.jpg': '平成著名画师',
  'static/bg/yurucamp.jpg': '露营天下第一',
  'static/bg/minecraft.jpg': '麦恩·库拉夫特',
  'static/bg/sif.jpg': '梦开始的地方',
};

const DEFAULT_CONFIG = {
  background_img: 'static/bg/gbp.jpg',
  background_color: '#113366',
  pressure: false,
  easter_egg: true,
  color_scheme: 'default',
  block_words: [],
  alias: {},
};

export function load_config() {
  let config = Object.assign({}, DEFAULT_CONFIG);
  let loaded_config;
  try {
    loaded_config = JSON.parse(localStorage['hole_config'] || '{}');
  } catch (e) {
    alert('设置加载失败，将重置为默认设置！\n' + e);
    delete localStorage['hole_config'];
    loaded_config = {};
  }

  // unrecognized configs are removed
  Object.keys(loaded_config).forEach((key) => {
    if (config[key] !== undefined) config[key] = loaded_config[key];
  });

  console.log('config loaded', config);
  window.config = config;
}
export function save_config() {
  localStorage['hole_config'] = JSON.stringify(window.config);
  load_config();
}

export function bgimg_style(img, color) {
  if (img === undefined) img = window.config.background_img;
  if (color === undefined) color = window.config.background_color;
  return {
    background: 'transparent center center',
    backgroundImage: img === null ? 'unset' : 'url("' + encodeURI(img) + '")',
    backgroundColor: color,
    backgroundSize: 'cover',
  };
}

class ConfigBackground extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      img: window.config.background_img,
      color: window.config.background_color,
    };
  }

  save_changes() {
    this.props.callback({
      background_img: this.state.img,
      background_color: this.state.color,
    });
  }

  on_select(e) {
    let value = e.target.value;
    this.setState(
      {
        img: value === '##other' ? '' : value === '##color' ? null : value,
      },
      this.save_changes.bind(this),
    );
  }
  on_change_img(e) {
    this.setState(
      {
        img: e.target.value,
      },
      this.save_changes.bind(this),
    );
  }
  on_change_color(e) {
    this.setState(
      {
        color: e.target.value,
      },
      this.save_changes.bind(this),
    );
  }

  render() {
    let img_select =
      this.state.img === null
        ? '##color'
        : Object.keys(BUILTIN_IMGS).indexOf(this.state.img) === -1
        ? '##other'
        : this.state.img;
    return (
      <div>
        <p>
          <b>背景图片：</b>
          <select
            className="config-select"
            value={img_select}
            onChange={this.on_select.bind(this)}
          >
            {Object.keys(BUILTIN_IMGS).map((key) => (
              <option key={key} value={key}>
                {BUILTIN_IMGS[key]}
              </option>
            ))}
            <option value="##other">输入图片网址……</option>
            <option value="##color">纯色背景……</option>
          </select>
          &nbsp;
          <small>#background_img</small>&nbsp;
          {img_select === '##other' && (
            <input
              type="url"
              placeholder="图片网址"
              value={this.state.img}
              onChange={this.on_change_img.bind(this)}
            />
          )}
          {img_select === '##color' && (
            <input
              type="color"
              value={this.state.color}
              onChange={this.on_change_color.bind(this)}
            />
          )}
        </p>
        <div
          className="bg-preview"
          style={bgimg_style(this.state.img, this.state.color)}
        />
      </div>
    );
  }
}

class ConfigColorScheme extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color_scheme: window.config.color_scheme,
    };
  }

  save_changes() {
    this.props.callback({
      color_scheme: this.state.color_scheme,
    });
  }

  on_select(e) {
    let value = e.target.value;
    this.setState(
      {
        color_scheme: value,
      },
      this.save_changes.bind(this),
    );
  }

  render() {
    return (
      <div>
        <p>
          <b>夜间模式：</b>
          <select
            className="config-select"
            value={this.state.color_scheme}
            onChange={this.on_select.bind(this)}
          >
            <option value="default">跟随系统</option>
            <option value="light">始终浅色模式</option>
            <option value="dark">始终深色模式</option>
          </select>
          &nbsp;<small>#color_scheme</small>
        </p>
        <p className="config-description">
          选择浅色或深色模式，深色模式下将会调暗图片亮度
        </p>
      </div>
    );
  }
}

class ConfigTextArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [props.id]: this.props.display(window.config[props.id]),
    };
  }

  /* save_changes() {
    this.props.callback({
      [this.props.id]: this.props.sift(this.state[this.props.id]),
    });
  } */

  on_blur(e) {
    let value = e.target.value;
    let parsed = this.props.parse(value);
    this.setState(
      {
        [this.props.id]: value,
      },
      () => {
        this.props.callback({
          [this.props.id]: parsed,
        });
      },
    );
  }

  on_change(e) {
    let value = e.target.value;
    this.setState((state) => {
      return { [this.props.id]: value };
    });
  }

  render() {
    return (
      <div>
        <label>
          <p>
            <b>{this.props.name}</b>&nbsp;<small>#{this.props.id}</small>
          </p>
          <p className="config-description">{this.props.description}</p>
          <textarea
            name={'config-' + this.props.id}
            id={`config-textarea-${this.props.id}`}
            className="config-textarea"
            value={this.state[this.props.id]}
            onChange={this.on_change.bind(this)}
            onBlur={this.on_blur.bind(this)}
          />
        </label>
      </div>
    );
  }
}

/* class ConfigBlockWords extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      block_words: window.config.block_words,
    };
  }

  save_changes() {
    this.props.callback({
      block_words: this.state.block_words.filter((v) => v),
    });
  }

  on_change(e) {
    // Filter out those blank lines
    let value = e.target.value.split('\n');
    this.setState(
      {
        block_words: value,
      },
      this.save_changes.bind(this),
    );
  }

  render() {
    return (
      <div>
        <p>
          {' '}
          <b>设置屏蔽词 </b>
        </p>
        <p>
          <textarea
            className="block-words"
            value={this.state.block_words.join('\n')}
            onChange={this.on_change.bind(this)}
          />
        </p>
      </div>
    );
  }
} */

class ConfigSwitch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      switch: window.config[this.props.id],
    };
  }

  on_change(e) {
    let val = e.target.checked;
    this.setState(
      {
        switch: val,
      },
      () => {
        this.props.callback({
          [this.props.id]: val,
        });
      },
    );
  }

  render() {
    return (
      <div>
        <p>
          <label>
            <input
              name={'config-' + this.props.id}
              type="checkbox"
              checked={this.state.switch}
              onChange={this.on_change.bind(this)}
            />
            &nbsp;<b>{this.props.name}</b>
            &nbsp;<small>#{this.props.id}</small>
          </label>
        </p>
        <p className="config-description">{this.props.description}</p>
      </div>
    );
  }
}

export class ConfigUI extends PureComponent {
  constructor(props) {
    super(props);
    this.save_changes_bound = this.save_changes.bind(this);
  }

  save_changes(chg) {
    console.log(chg);
    Object.keys(chg).forEach((key) => {
      window.config[key] = chg[key];
    });
    save_config();
  }

  reset_settings() {
    if (window.confirm('重置所有设置？')) {
      window.config = {};
      save_config();
      window.location.reload();
    }
  }

  render() {
    return (
      <div>
        <div className="box config-ui-header">
          <p>
            这些功能仍在测试，可能不稳定（
            <a onClick={this.reset_settings.bind(this)}>全部重置</a>）
          </p>
          <p>
            <b>
              修改设置后{' '}
              <a
                onClick={() => {
                  window.location.reload();
                }}
              >
                刷新页面
              </a>{' '}
              方可生效
            </b>
          </p>
        </div>
        <div className="box">
          <ConfigBackground
            id="background"
            callback={this.save_changes_bound}
          />
          <hr />
          <ConfigColorScheme
            id="color-scheme"
            callback={this.save_changes_bound}
          />
          <hr />
          {/* <ConfigBlockWords
            id="block-words"
            callback={this.save_changes_bound}
          /> */}
          <ConfigTextArea
            id="block_words"
            callback={this.save_changes_bound}
            name="设置屏蔽词"
            description={'包含屏蔽词的树洞会被折叠，每行写一个屏蔽词'}
            display={(array) => array.join('\n')}
            parse={(string) => string.split('\n').filter((v) => v)}
          />
          <hr />
          <ConfigTextArea
            id="alias"
            callback={this.save_changes_bound}
            name="设置别名"
            description={`可用 #别名 代替 #PID（树洞号）进行查询，每行由树洞号、半角空格、别名顺序连接，如“472865 网页版发布”，别名中不可包含空格`}
            display={(map) =>
              Object.entries(map)
                .map((pair) => pair[1] + ' ' + pair[0])
                .reduce(
                  (accumulator, currentValue) =>
                    !!accumulator
                      ? currentValue + '\n' + accumulator
                      : currentValue,
                  '',
                )
            }
            parse={(string) => {
              let map = {};
              string
                .split('\n')
                .filter((value) => value)
                .forEach((line) => {
                  let pair = line.split(' ');
                  if (pair.length === 2 && !isNaN(Number(pair[0]))) {
                    map[pair[1]] = Number(pair[0]);
                  }
                });
              return map;
            }}
          />
          <hr />
          <ConfigSwitch
            callback={this.save_changes_bound}
            id="pressure"
            name="快速返回"
            description="短暂按住 Esc 键或重压屏幕（3D Touch）可以快速返回或者刷新树洞"
          />
          <hr />
          <ConfigSwitch
            callback={this.save_changes_bound}
            id="easter_egg"
            name="允许彩蛋"
            description="在某些情况下显示彩蛋"
          />
          <hr />
          <p>
            新功能建议或问题反馈请在&nbsp;
            <a
              href="https://github.com/AllanChain/PKUHoleCommunity/issues"
              target="_blank"
            >
              GitHub <span className="icon icon-github" />
            </a>
            &nbsp;提出。
          </p>
        </div>
      </div>
    );
  }
}
