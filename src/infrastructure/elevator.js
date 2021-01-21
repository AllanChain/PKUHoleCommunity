const DUMP_VER='dump_v1';

function dump() {
    return JSON.stringify({
        _dump_ver: DUMP_VER,
        token: localStorage['TOKEN']||null,
        hole_config: localStorage['hole_config']||null,
    });
}
function load(s) {
    console.log('elevator: loading',s);
    let obj=JSON.parse(s);
    if(obj._dump_ver!==DUMP_VER) {
        console.error('elevator: loading version mismatch, current',DUMP_VER,'param',obj._dump_ver);
        return;
    }
    if(localStorage['TOKEN']===undefined && obj.token) {
        console.log('replace token');
        localStorage['TOKEN']=obj.token;
    }
    if(localStorage['hole_config']===undefined && obj.hole_config) {
        console.log('replace hole config');
        localStorage['hole_config']=obj.hole_config;
    }
}

export function elevate() {
    // load
    // '?foo=fo&bar=ba' -> [["foo","fo"],["bar","ba"]]
    let params=window.location.search.substr(1).split('&').map((kv)=>kv.split('='));
    params.forEach((kv)=>{
        if(kv.length===2 && kv[0]==='_elevator_data') {
            load(decodeURIComponent(kv[1]));
            let url=new URL(window.location.href);
            url.search='';
            window.history.replaceState('','',url.href);
        }
    });

    // dump
    if(window.location.protocol==='http:' && window.location.hostname==='pkuhelper.pku.edu.cn') {
        let url=new URL(window.location.href);
        url.protocol='https:';
        url.search='?_elevator_data='+encodeURIComponent(dump());
        window.location.replace(url.href);
    }
}