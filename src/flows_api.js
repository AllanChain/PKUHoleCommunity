import { get_json, API_VERSION_PARAM } from './infrastructure/functions';
import { PKUHELPER_ROOT } from './infrastructure/const';
import { API_BASE } from './Common';
import { cache } from './cache';

export { PKUHELPER_ROOT, API_VERSION_PARAM };

export function token_param(token) {
  return API_VERSION_PARAM() + (token ? '&user_token=' + token : '');
}

export { get_json };

const SEARCH_PAGESIZE = 50;

const handle_response = async (response, notify = false) => {
  const json = await get_json(response);
  if (json.code !== 0) {
    if (json.msg) {
      if (notify) alert(json.msg);
      else throw new Error(json.msg);
    } else throw new Error(JSON.stringify(json));
  }
  return json;
};

const parse_replies = (replies, color_picker) =>
  replies
    .sort((a, b) => parseInt(a.cid, 10) - parseInt(b.cid, 10))
    .map((info) => {
      info._display_color = color_picker.get(info.name);
      info.variant = {};
      return info;
    });

const iframe_captcha_manager = {
  iframe: null,
  load_iframe() {
    if (this.iframe) return;
    const helperIFrame = document.createElement('iframe');
    helperIFrame.src = 'https://pkuhelper.pku.edu.cn/hole/';
    helperIFrame.style.width = '0';
    helperIFrame.style.height = '0';
    helperIFrame.style.border = 'none';
    helperIFrame.style.position = 'absolute';
    document.body.appendChild(helperIFrame);
    this.iframe = helperIFrame;
  },
  remove_iframe() {
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
    }
  },
};

export const API = {
  max_captcha_retry: 8,
  load_replies: async (pid, token, color_picker, cache_version, retry = 0) => {
    pid = parseInt(pid);
    const response = await fetch(
      API_BASE + '/api.php?action=getcomment&pid=' + pid + token_param(token),
    );
    const json = await handle_response(response);
    // Helper warnings are not cacheable
    if (json.data.length === 1 && json.data[0].text.startsWith('[Helper]')) {
      if (window.config.auto_captcha && retry < API.max_captcha_retry) {
        iframe_captcha_manager.load_iframe();
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
          API.load_replies(pid, token, color_picker, cache_version, retry + 1),
        );
      }
    } else {
      iframe_captcha_manager.remove_iframe();
      cache().put(pid, cache_version, json);
    }
    json.data = parse_replies(json.data, color_picker);
    return json;
  },

  load_replies_with_cache: async (pid, token, color_picker, cache_version) => {
    pid = parseInt(pid);
    let json = await cache().get(pid, cache_version);
    if (json) {
      json.data = parse_replies(json.data, color_picker);
      return { data: json, cached: true };
    } else {
      json = await API.load_replies(pid, token, color_picker, cache_version);
      return { data: json, cached: !json };
    }
  },

  set_attention: async (pid, attention, token) => {
    const data = new URLSearchParams();
    data.append('user_token', token);
    data.append('pid', pid);
    data.append('switch', attention ? '1' : '0');
    const response = await fetch(
      API_BASE + '/api.php?action=attention' + token_param(token),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      },
    );
    // Delete cache to update `attention` on next reload
    cache().delete(pid);
    return handle_response(response, true);
  },

  report: async (pid, reason, token) => {
    const data = new URLSearchParams();
    data.append('user_token', token);
    data.append('pid', pid);
    data.append('reason', reason);
    const response = await fetch(
      API_BASE + '/api.php?action=report' + token_param(token),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      },
    );
    return handle_response(response, true);
  },

  get_list: async (page, token, retry = 0) => {
    const response = await fetch(
      API_BASE + '/api.php?action=getlist' + '&p=' + page + token_param(token),
    );
    const json = await handle_response(response);
    if (window.config.auto_captcha && retry < API.max_captcha_retry) {
      if (json.data.every((info) => info.text.startsWith('为保障树洞'))) {
        iframe_captcha_manager.load_iframe();
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
          API.get_list(page, token),
        );
      } else {
        iframe_captcha_manager.remove_iframe();
        return json;
      }
    } else {
      return json;
    }
  },

  get_search: async (page, keyword, token) => {
    const response = await fetch(
      API_BASE +
        '/api.php?action=search' +
        '&pagesize=' +
        SEARCH_PAGESIZE +
        '&page=' +
        page +
        '&keywords=' +
        encodeURIComponent(keyword) +
        token_param(token),
    );
    return handle_response(response);
  },

  get_single: async (pid, token) => {
    const response = await fetch(
      API_BASE + '/api.php?action=getone' + '&pid=' + pid + token_param(token),
    );
    return handle_response(response);
  },

  get_attention: async (token) => {
    const response = await fetch(
      API_BASE + '/api.php?action=getattention' + token_param(token),
    );
    return handle_response(response);
  },
};
