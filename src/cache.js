const HOLE_CACHE_DB_NAME = 'hole_cache_db';
const CACHE_DB_VER = 1;
const MAINTENANCE_STEP = 150;
const MAINTENANCE_COUNT = 1000;

const ENC_KEY = 42;

class Cache {
  constructor() {
    this.db = null;
    this.added_items_since_maintenance = 0;
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
    const open_req = indexedDB.open(HOLE_CACHE_DB_NAME, CACHE_DB_VER);
    open_req.onerror = console.error.bind(console);
    open_req.onupgradeneeded = (event) => {
      console.log('comment cache db upgrade');
      const db = event.target.result;
      const store = db.createObjectStore('comment', {
        keyPath: 'pid',
      });
      store.createIndex('last_access', 'last_access', { unique: false });
    };
    open_req.onsuccess = (event) => {
      console.log('comment cache db loaded');
      this.db = event.target.result;
      setTimeout(this.maintenance.bind(this), 1);
    };
  }

  // use window.hole_cache.encrypt() only after cache is loaded!
  encrypt(pid, data) {
    const s = JSON.stringify(data);
    let o = '';
    for (let i = 0, key = (ENC_KEY ^ pid) % 128; i < s.length; i++) {
      const c = s.charCodeAt(i);
      const new_key = (key ^ (c / 2)) % 128;
      o += String.fromCharCode(key ^ s.charCodeAt(i));
      key = new_key;
    }
    return o;
  }

  // use window.hole_cache.decrypt() only after cache is loaded!
  decrypt(pid, s) {
    let o = '';
    if (typeof s !== typeof 'str') return null;

    for (let i = 0, key = (ENC_KEY ^ pid) % 128; i < s.length; i++) {
      const c = key ^ s.charCodeAt(i);
      o += String.fromCharCode(c);
      key = (key ^ (c / 2)) % 128;
    }

    try {
      return JSON.parse(o);
    } catch (e) {
      console.error('decrypt failed');
      console.trace(e);
      return null;
    }
  }

  get(pid, target_version) {
    pid = parseInt(pid);
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve(null);
      let get_req, store;
      try {
        const tx = this.db.transaction(['comment'], 'readwrite');
        store = tx.objectStore('comment');
        get_req = store.get(pid);
      } catch (e) {
        // ios sometimes fail at here, just ignore it
        console.exception(e);
        resolve(null);
      }
      get_req.onsuccess = () => {
        const res = get_req.result;
        if (!res || !res.data_str) {
          //console.log('comment cache miss '+pid);
          resolve(null);
        } else if (target_version === res.version) {
          // hit
          console.log('comment cache hit', pid);
          res.last_access = +new Date();
          store.put(res);
          const data = this.decrypt(pid, res.data_str);
          resolve(data); // obj or null
        } else {
          // expired
          console.log(
            'comment cache expired',
            pid,
            ': ver',
            res.version,
            'target',
            target_version,
          );
          store.delete(pid);
          resolve(null);
        }
      };
      get_req.onerror = (e) => {
        console.warn('comment cache indexeddb open failed');
        console.error(e);
        resolve(null);
      };
    });
  }

  put(pid, target_version, data) {
    pid = parseInt(pid);
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve();
      try {
        const tx = this.db.transaction(['comment'], 'readwrite');
        const store = tx.objectStore('comment');
        store.put({
          pid: pid,
          version: target_version,
          data_str: this.encrypt(pid, data),
          last_access: +new Date(),
        });
        console.log('comment cache put', pid); // ! REMOVED in official
        if (++this.added_items_since_maintenance === MAINTENANCE_STEP)
          setTimeout(this.maintenance.bind(this), 1);
      } catch (e) {
        console.exception(e);
        return resolve();
      }
    });
  }

  delete(pid) {
    pid = parseInt(pid);
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve();
      let req;
      try {
        const tx = this.db.transaction(['comment'], 'readwrite');
        const store = tx.objectStore('comment');
        req = store.delete(pid);
      } catch (e) {
        console.exception(e);
        return resolve();
      }
      console.log('comment cache delete', pid); // ! REMOVED in official
      req.onerror = () => {
        console.warn('comment cache delete failed ', pid);
        return resolve();
      };
      req.onsuccess = () => resolve();
    });
  }

  maintenance() {
    if (!this.db) return;
    const tx = this.db.transaction(['comment'], 'readwrite');
    const store = tx.objectStore('comment');
    const count_req = store.count();
    count_req.onsuccess = () => {
      let count = count_req.result;
      if (count > MAINTENANCE_COUNT) {
        console.log('comment cache db maintenance', count);
        store.index('last_access').openKeyCursor().onsuccess = (e) => {
          const cur = e.target.result;
          if (cur) {
            //console.log('maintenance: delete',cur);
            store.delete(cur.primaryKey);
            if (--count > MAINTENANCE_COUNT) cur.continue();
          }
        };
      } else {
        console.log('comment cache db no need to maintenance', count);
      }
      this.added_items_since_maintenance = 0;
    };
    count_req.onerror = console.error.bind(console);
  }

  clear() {
    if (!this.db) return;
    try {
      indexedDB.deleteDatabase(HOLE_CACHE_DB_NAME);
      console.log('delete comment cache db');
    } catch (e) {
      console.exception(e);
    }
  }
}

export function cache() {
  if (!window.hole_cache) window.hole_cache = new Cache();
  return window.hole_cache;
}
