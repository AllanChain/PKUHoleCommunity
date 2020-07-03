import React, { PureComponent } from 'react';
import { AppSwitcher } from './infrastructure/widgets';
import { InfoSidebar, PostForm } from './UserAction';
import { TokenCtx } from './UserAction';

import './Title.css';

const flag_re = /^\/\/setflag ([a-zA-Z0-9_]+)=(.*)$/;

const APP_SWITCHER_ROUTER = {
  树洞: 'https://pkuhelper.pku.edu.cn/hole',
  教室: 'https://pkuhelper.pku.edu.cn/spare_classroom/',
  课表: 'https://pkuhelper.pku.edu.cn/syllabus/',
  客户端: 'https://pkuhelper.pku.edu.cn/',
  成绩: 'https://pkuhelper.pku.edu.cn/my_score',
  不咕: 'https://pkuhelper.pku.edu.cn/ddl',
  课程测评: 'https://courses.pinzhixiaoyuan.com/',
  测评: 'https://courses.pinzhixiaoyuan.com/',
};

class ControlBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search_text: '',
    };
    this.set_mode = props.set_mode;

    this.on_change_bound = this.on_change.bind(this);
    this.on_keypress_bound = this.on_keypress.bind(this);
    this.do_refresh_bound = this.do_refresh.bind(this);
    this.do_attention_bound = this.do_attention.bind(this);
  }

  componentDidMount() {
    if (window.location.hash) {
      let text = decodeURIComponent(window.location.hash).substr(1);
      if (text.lastIndexOf('?') !== -1)
        text = text.substr(0, text.lastIndexOf('?')); // fuck wechat '#param?nsukey=...'
      this.setState(
        {
          search_text: text,
        },
        () => {
          this.on_keypress({ key: 'Enter' });
        },
      );
    }
  }

  on_change(event) {
    this.setState({
      search_text: event.target.value,
    });
  }

  on_keypress(event) {
    if (event.key === 'Enter') {
      let flag_res = flag_re.exec(this.state.search_text);
      if (flag_res) {
        if (flag_res[2]) {
          localStorage[flag_res[1]] = flag_res[2];
          alert(
            'Set Flag ' +
              flag_res[1] +
              '=' +
              flag_res[2] +
              '\nYou may need to refresh this webpage.',
          );
        } else {
          delete localStorage[flag_res[1]];
          alert(
            'Clear Flag ' +
              flag_res[1] +
              '\nYou may need to refresh this webpage.',
          );
        }
        return;
      }

      const mode = this.state.search_text.startsWith('#')
        ? 'single'
        : this.props.mode !== 'attention'
        ? 'search'
        : 'attention';
      this.set_mode(mode, this.state.search_text || '');
    }
  }

  do_refresh() {
    window.scrollTo(0, 0);
    this.setState({
      search_text: '',
    });
    this.set_mode('list', null);
  }

  do_attention() {
    window.scrollTo(0, 0);
    this.setState({
      search_text: '',
    });
    this.set_mode('attention', null);
  }

  render() {
    return (
      <TokenCtx.Consumer>
        {({ value: token }) => (
          <div className="control-bar">
            <a
              className="no-underline control-btn"
              onClick={this.do_refresh_bound}
            >
              <span className="icon icon-refresh" />
              <span className="control-btn-label">最新</span>
            </a>
            {!!token && (
              <a
                className="no-underline control-btn"
                onClick={this.do_attention_bound}
              >
                <span className="icon icon-attention" />
                <span className="control-btn-label">关注</span>
              </a>
            )}
            <input
              className="control-search"
              value={this.state.search_text}
              placeholder={`${
                this.props.mode === 'attention' ? '在关注中' : ''
              }搜索 或 #PID`}
              onChange={this.on_change_bound}
              onKeyPress={this.on_keypress_bound}
            />
            <a
              className="no-underline control-btn"
              onClick={() => {
                this.props.show_sidebar(
                  'P大树洞 (社区版)',
                  <InfoSidebar show_sidebar={this.props.show_sidebar} />,
                );
              }}
            >
              <span className={'icon icon-' + (token ? 'about' : 'login')} />
              <span className="control-btn-label">
                {token ? '账户' : '登录'}
              </span>
            </a>
            {!!token && (
              <a
                className="no-underline control-btn"
                onClick={() => {
                  this.props.show_sidebar(
                    '发表树洞',
                    <PostForm
                      token={token}
                      on_complete={() => {
                        this.props.show_sidebar(null, null);
                        this.do_refresh();
                      }}
                    />,
                  );
                }}
              >
                <span className="icon icon-plus" />
                <span className="control-btn-label">发表</span>
              </a>
            )}
          </div>
        )}
      </TokenCtx.Consumer>
    );
  }
}

class AppSwitcherHusk extends PureComponent {
  render() {
    return (
      <div id="app-switcher-shell">
        <AppSwitcher appid="hole" />
      </div>
    );
  }

  componentDidMount() {
    const appSwitcher = document.getElementById('app-switcher-shell')
      .firstChild;
    const appList = appSwitcher.querySelectorAll('a');
    appList.forEach((el) => {
      if (el.text in APP_SWITCHER_ROUTER)
        el.href = APP_SWITCHER_ROUTER[el.text];
      else if (el.text !== '更多▾') {
        el.href = 'https://pkuhelper.pku.edu.cn' + el.pathname;
        el.style = 'filter: grayscale(100%); opacity: 0.25';
        el.title = '可能失效的按钮';
      }

      if (el.text === '树洞') el.title = '官方版树洞';
    });
  }
}

export function Title(props) {
  return (
    <div className="title-bar">
      {/* <AppSwitcher appid="hole" /> */}
      <AppSwitcherHusk />
      <div className="aux-margin">
        <div className="title">
          <p className="centered-line">
            <span
              onClick={() =>
                props.show_sidebar(
                  'P大树洞',
                  <InfoSidebar show_sidebar={props.show_sidebar} />,
                )
              }
            >
              P大树洞
              <small>
                {' '}
                (社区版
                {!!process.env.REACT_APP_VERSION.includes('beta') && (
                  <sup>β</sup>
                )}
                {!!process.env.REACT_APP_VERSION.includes('alpha') && (
                  <sup>α</sup>
                )}
                )
              </small>
            </span>
          </p>
        </div>
        <ControlBar
          show_sidebar={props.show_sidebar}
          set_mode={props.set_mode}
          mode={props.mode}
        />
      </div>
    </div>
  );
}
