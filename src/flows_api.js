import {get_json, API_VERSION_PARAM} from './infrastructure/functions';
import {PKUHELPER_ROOT} from './infrastructure/const';
import {API_BASE} from './Common';
import {cache} from './cache';

export {PKUHELPER_ROOT, API_VERSION_PARAM};

export function token_param(token) {
  return API_VERSION_PARAM() + (token ? ('&user_token=' + token) : '');
}

export {get_json};

const SEARCH_PAGESIZE = 50;

const handle_response = async (response, notify = false) => {
  let json = await get_json(response);
  if(json.code !== 0) {
    if(json.msg) {
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

export const API = {
  load_replies: async (pid, token, color_picker, cache_version) => {
    pid = parseInt(pid);
    let response = await fetch(
      API_BASE + '/api.php?action=getcomment' +
      '&pid=' + pid + token_param(token)
    );
    let json = await handle_response(response);

    cache().delete(pid).then(() => {
      cache().put(pid, cache_version, json);
    });

    json.data = parse_replies(json.data, color_picker);
    return json;
  },

  load_replies_with_cache: async (pid, token, color_picker, cache_version) => {
    pid = parseInt(pid);
    let json = await cache().get(pid, cache_version);
    if(json) {
      json.data = parse_replies(json.data, color_picker);
      return { data: json, cached: true };
    } else {
      json = await API.load_replies(pid, token, color_picker, cache_version);
      return { data: json, cached: !json };
    }
  },

  set_attention: async (pid, attention, token) => {
    let data = new URLSearchParams();
    data.append('user_token', token);
    data.append('pid', pid);
    data.append('switch', attention ? '1' : '0');
    let response = await fetch(
      API_BASE + '/api.php?action=attention' + token_param(token), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
    cache().delete(pid); // Magic operation...
    return handle_response(response, true);
  },

  report: async (pid, reason, token) => {
    let data = new URLSearchParams();
    data.append('user_token', token);
    data.append('pid', pid);
    data.append('reason', reason);
    let response = await fetch(
      API_BASE + '/api.php?action=report' + token_param(token), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
    return handle_response(response, true);
  },

  get_list: async (page, token) => {
    let response = await fetch(
      API_BASE + '/api.php?action=getlist' +
      '&p=' + page + token_param(token)
    );
    return handle_response(response);
  },

  get_search: async (page, keyword, token) => {
    let response = await fetch(
      API_BASE + '/api.php?action=search' +
      '&pagesize=' + SEARCH_PAGESIZE +
      '&page=' + page +
      '&keywords=' + encodeURIComponent(keyword) +
      token_param(token)
    );
    return handle_response(response);
  },

  get_single: async (pid, token) => {
    let response = await fetch(
      API_BASE + '/api.php?action=getone' +
      '&pid=' + pid + token_param(token)
    );
    return handle_response(response);
  },

  get_attention: async (token) => {
    let response = await fetch(
      API_BASE + '/api.php?action=getattention' +
      token_param(token)
    );
    return handle_response(response);
  },
};
