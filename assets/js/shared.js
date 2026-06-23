(function () {
  function initTocRail() {
    var postTocInner = document.querySelector('.post-toc-inner');
    var tocRail = document.getElementById('toc-rail');
    var tocLinks = document.querySelectorAll('.toc-a');

    function initDimensions() {
      tocLinks.forEach(function (link) {
        var textInner = link.querySelector('.toc-text-inner');
        if (textInner) {
          var height = link.offsetHeight || 22;
          link.style.setProperty('--expanded-link-height', height + 'px');
        }
      });
    }

    function measureSubListHeights() {
      if (!postTocInner) return;
      postTocInner.classList.add('toc-measuring', 'toc-hover');
      document.querySelectorAll('.toc-sub-list').forEach(function (list) {
        var h = list.scrollHeight;
        if (h > 0) list.style.setProperty('--toc-sub-list-height', (h + 2) + 'px');
      });
      postTocInner.classList.remove('toc-measuring', 'toc-hover');
    }

    window.addEventListener('load', function () {
      initDimensions();
      measureSubListHeights();
    });

    initDimensions();
    measureSubListHeights();

    if (postTocInner) postTocInner.style.opacity = '1';

    if (tocRail && postTocInner) {
      var collapseTimer;
      tocRail.addEventListener('mouseenter', function () {
        clearTimeout(collapseTimer);
        postTocInner.classList.add('toc-hover');
      });
      tocRail.addEventListener('mouseleave', function () {
        collapseTimer = setTimeout(function () {
          postTocInner.classList.remove('toc-hover');
        }, 250);
      });
    }
  }

  window.toggleDarkMode = function () {
    var isDark = document.documentElement.classList.toggle('dark');
    document.querySelectorAll('.dark-toggle-moon').forEach(function (el) { el.classList.toggle('hidden', isDark); });
    document.querySelectorAll('.dark-toggle-sun').forEach(function (el) { el.classList.toggle('hidden', !isDark); });
    document.querySelectorAll('.dark-toggle-btn').forEach(function (el) {
      el.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  };

  function initMobileMenu() {
    var btn = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    var iconOpen = btn.querySelector('.icon-open');
    var iconClose = btn.querySelector('.icon-close');
    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      iconOpen.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);
    }
    btn.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || btn.contains(e.target)) return;
      setOpen(false);
    });
  }

  function initPaletteDownloads() {
    var P = {
      primary:   [{ name:'Red',          r:255, g:51,  b:0   },
                  { name:'Black',        r:0,   g:0,   b:0   },
                  { name:'White',        r:255, g:255, b:255 }],
      secondary: [{ name:'Cyan',         r:0,   g:231, b:231 },
                  { name:'Blue',         r:0,   g:51,  b:255 },
                  { name:'Purple',       r:115, g:0,   b:255 },
                  { name:'Magenta',      r:255, g:0,   b:219 }],
      greys:     [{ name:'Light Grey',   r:238, g:238, b:238 },
                  { name:'Medium Grey',  r:212, g:212, b:212 },
                  { name:'Dark Grey',    r:187, g:187, b:187 }]
    };
    var RAMPS = [
      { name:'Red',      colors:[
        {name:'Red 100',r:255,g:214,b:204},{name:'Red 200',r:255,g:173,b:153},
        {name:'Red 300',r:255,g:112,b:76}, {name:'Red 400',r:255,g:51, b:0  },
        {name:'Red 500',r:204,g:40, b:0  },{name:'Red 600',r:153,g:30, b:0  },
        {name:'Red 700',r:102,g:20, b:0  }]},
      { name:'Cyan',     colors:[
        {name:'Cyan 100',r:204,g:250,b:250},{name:'Cyan 200',r:153,g:245,b:245},
        {name:'Cyan 300',r:76, g:238,b:238},{name:'Cyan 400',r:0,  g:231,b:231},
        {name:'Cyan 500',r:0,  g:184,b:184},{name:'Cyan 600',r:0,  g:138,b:138},
        {name:'Cyan 700',r:0,  g:92, b:92 }]},
      { name:'Blue',     colors:[
        {name:'Blue 100',r:204,g:214,b:255},{name:'Blue 200',r:153,g:173,b:255},
        {name:'Blue 300',r:76, g:112,b:255},{name:'Blue 400',r:0,  g:51, b:255},
        {name:'Blue 500',r:0,  g:40, b:204},{name:'Blue 600',r:0,  g:30, b:153},
        {name:'Blue 700',r:0,  g:20, b:102}]},
      { name:'Purple',   colors:[
        {name:'Purple 100',r:227,g:204,b:255},{name:'Purple 200',r:199,g:153,b:255},
        {name:'Purple 300',r:157,g:76, b:255},{name:'Purple 400',r:115,g:0,  b:255},
        {name:'Purple 500',r:92, g:0,  b:204},{name:'Purple 600',r:69, g:0,  b:153},
        {name:'Purple 700',r:46, g:0,  b:102}]},
      { name:'Magenta',  colors:[
        {name:'Magenta 100',r:255,g:204,b:247},{name:'Magenta 200',r:255,g:153,b:240},
        {name:'Magenta 300',r:255,g:76, b:229},{name:'Magenta 400',r:255,g:0,  b:219},
        {name:'Magenta 500',r:204,g:0,  b:175},{name:'Magenta 600',r:153,g:0,  b:131},
        {name:'Magenta 700',r:102,g:0,  b:87 }]},
      { name:'Grey',     colors:[
        {name:'Grey 100',r:249,g:249,b:249},{name:'Grey 200',r:238,g:238,b:238},
        {name:'Grey 300',r:212,g:212,b:212},{name:'Grey 400',r:187,g:187,b:187},
        {name:'Grey 500',r:117,g:117,b:117},{name:'Grey 600',r:51, g:51, b:51 },
        {name:'Grey 700',r:17, g:17, b:17 }]},
      { name:'Cool Grey',colors:[
        {name:'Cool Grey 100',r:245,g:246,b:250},{name:'Cool Grey 200',r:230,g:232,b:240},
        {name:'Cool Grey 300',r:198,g:202,b:216},{name:'Cool Grey 400',r:168,g:173,b:194},
        {name:'Cool Grey 500',r:105,g:109,b:126},{name:'Cool Grey 600',r:46, g:49, b:61 },
        {name:'Cool Grey 700',r:21, g:22, b:27 }]}
    ];
    var PMS  = { Red:'PMS 172 C', Black:'PMS Black 6 C', Cyan:'PMS 3115 C', Blue:'PMS 2728 C', Purple:'PMS 266 C', Magenta:'PMS Rhodamine Red C', 'Light Grey':'PMS 663 C', 'Medium Grey':'PMS 427 C', 'Dark Grey':'PMS Cool Gray 4 C' };
    var CMYK = { Red:'0 80 98 0', Black:'75 68 67 90', White:'0 0 0 0', Cyan:'70 0 13 0', Blue:'99 76 0 0', Purple:'71 88 0 0', Magenta:'5 92 0 0', 'Light Grey':'5 6 0 0', 'Medium Grey':'14 8 4 0', 'Dark Grey':'24 17 15 0' };

    function hx(n) { return ('0'+n.toString(16).toUpperCase()).slice(-2); }
    function hexStr(c) { return hx(c.r)+hx(c.g)+hx(c.b); }
    function dl(blob, fn) {
      var u = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = u; a.download = fn; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u);
    }

    window.downloadColorASE = function () {
      function u16(n) { return [(n>>8)&255, n&255]; }
      function u32(n) { return [(n>>>24)&255,(n>>16)&255,(n>>8)&255,n&255]; }
      function f32(f) { var b=new ArrayBuffer(4); new DataView(b).setFloat32(0,f,false); return Array.from(new Uint8Array(b)); }
      function uname(s) { var b=[]; for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);b.push((c>>8)&255,c&255);} b.push(0,0); return b; }
      var groups=[{name:'Primary',colors:P.primary},{name:'Secondary',colors:P.secondary},{name:'Greys',colors:P.greys}]
        .concat(RAMPS.map(function(r){return {name:r.name+' Ramp',colors:r.colors};}));
      var blocks=[], out=[65,83,69,70,0,1,0,0];
      groups.forEach(function(g){
        var gn=uname(g.name); blocks.push({t:0xC001,d:u16(gn.length/2).concat(gn)});
        g.colors.forEach(function(c){
          var cn=uname(c.name);
          blocks.push({t:0x0001,d:u16(cn.length/2).concat(cn).concat([82,71,66,32]).concat(f32(c.r/255)).concat(f32(c.g/255)).concat(f32(c.b/255)).concat(u16(0))});
        });
        blocks.push({t:0xC002,d:[]});
      });
      out=out.concat(u32(blocks.length));
      blocks.forEach(function(b){out=out.concat(u16(b.t)).concat(u32(b.d.length)).concat(b.d);});
      dl(new Blob([new Uint8Array(out)],{type:'application/octet-stream'}),'lightmatter-colors.ase');
    };

    window.downloadColorTHMX = function () {
      function enc(s){return typeof TextEncoder!=='undefined'?Array.from(new TextEncoder().encode(s)):s.split('').map(function(c){return c.charCodeAt(0)&255;});}
      function crc32(bytes){
        var t=[],c; for(var n=0;n<256;n++){c=n;for(var k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c;}
        var r=0xFFFFFFFF; for(var i=0;i<bytes.length;i++)r=(r>>>8)^t[(r^bytes[i])&255]; return(r^0xFFFFFFFF)>>>0;
      }
      function u16(n){return[n&255,(n>>8)&255];} function u32(n){return[n&255,(n>>8)&255,(n>>16)&255,(n>>24)&255];}
      var theme='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        +'<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Lightmatter"><a:themeElements>'
        +'<a:clrScheme name="Lightmatter"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>'
        +'<a:dk2><a:srgbClr val="111111"/></a:dk2><a:lt2><a:srgbClr val="EEEEEE"/></a:lt2>'
        +'<a:accent1><a:srgbClr val="FF3300"/></a:accent1><a:accent2><a:srgbClr val="00E7E7"/></a:accent2>'
        +'<a:accent3><a:srgbClr val="0033FF"/></a:accent3><a:accent4><a:srgbClr val="7300FF"/></a:accent4>'
        +'<a:accent5><a:srgbClr val="FF00DB"/></a:accent5><a:accent6><a:srgbClr val="D4D4D4"/></a:accent6>'
        +'<a:hlink><a:srgbClr val="FF3300"/></a:hlink><a:folHlink><a:srgbClr val="BBBBBB"/></a:folHlink></a:clrScheme>'
        +'<a:fontScheme name="Lightmatter"><a:majorFont><a:latin typeface="Inference Sans"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>'
        +'<a:minorFont><a:latin typeface="Object Sans"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>'
        +'<a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'
        +'<a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill>'
        +'<a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst>'
        +'<a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst>'
        +'<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst>'
        +'<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:bgFillStyleLst>'
        +'</a:fmtScheme></a:themeElements></a:theme>';
      var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/></Types>';
      var rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="theme/theme1.xml"/></Relationships>';
      var files=[{name:'[Content_Types].xml',data:enc(ct)},{name:'_rels/.rels',data:enc(rels)},{name:'theme/theme1.xml',data:enc(theme)}];
      var out=[],cds=[],off=0;
      files.forEach(function(f){
        var nb=f.name.split('').map(function(c){return c.charCodeAt(0);}), crc=crc32(f.data), sz=f.data.length;
        var lh=[0x50,0x4B,0x03,0x04].concat(u16(20)).concat(u16(0)).concat(u16(0)).concat(u16(0)).concat(u16(0)).concat(u32(crc)).concat(u32(sz)).concat(u32(sz)).concat(u16(nb.length)).concat(u16(0)).concat(nb);
        cds.push([0x50,0x4B,0x01,0x02].concat(u16(20)).concat(u16(20)).concat(u16(0)).concat(u16(0)).concat(u16(0)).concat(u16(0)).concat(u32(crc)).concat(u32(sz)).concat(u32(sz)).concat(u16(nb.length)).concat(u16(0)).concat(u16(0)).concat(u16(0)).concat(u16(0)).concat(u32(0)).concat(u32(off)).concat(nb));
        off+=lh.length+sz; out=out.concat(lh).concat(f.data);
      });
      var cdStart=out.length; cds.forEach(function(cd){out=out.concat(cd);}); var cdSz=out.length-cdStart;
      out=out.concat([0x50,0x4B,0x05,0x06]).concat(u16(0)).concat(u16(0)).concat(u16(files.length)).concat(u16(files.length)).concat(u32(cdSz)).concat(u32(cdStart)).concat(u16(0));
      dl(new Blob([new Uint8Array(out)],{type:'application/octet-stream'}),'lightmatter-theme.thmx');
    };

    window.downloadColorRef = function () {
      var groups=[{title:'Primary',colors:P.primary},{title:'Secondary',colors:P.secondary},{title:'Greys',colors:P.greys}];
      function isLight(c){return(c.r*299+c.g*587+c.b*114)/1000>186;}
      var body=groups.map(function(g){
        return '<section><h2>'+g.title+'</h2><div class="row">'
          +g.colors.map(function(c){
            var h=hexStr(c), fg=isLight(c)?'#000':'#fff';
            return '<div class="card">'
              +'<div class="chip" style="background:#'+h+';color:'+fg+'"><span>'+c.name+'</span></div>'
              +'<div class="vals">'
              +(PMS[c.name]?'<p class="pms">'+PMS[c.name]+'</p>':'')
              +'<p>#'+h+'</p>'
              +'<p>RGB '+c.r+' '+c.g+' '+c.b+'</p>'
              +(CMYK[c.name]?'<p>CMYK '+CMYK[c.name]+'</p>':'')
              +'</div></div>';
          }).join('')
          +'</div></section>';
      }).join('');
      var rampBody='<section><h2>Tints &amp; Shades</h2>'
        +RAMPS.map(function(ramp){
          return '<div style="margin-bottom:16px">'
            +'<p style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#bbb;margin-bottom:6px">'+ramp.name+'</p>'
            +'<div style="display:flex;gap:4px">'
            +ramp.colors.map(function(c){
              var h=hexStr(c);
              return '<div style="flex:1;min-width:0">'
                +'<div style="height:48px;background:#'+h+';border:1px solid rgba(0,0,0,.06)"></div>'
                +'<p style="font-size:9px;color:#777;margin-top:4px;font-family:monospace">'+h+'</p>'
                +'</div>';
            }).join('')
            +'</div></div>';
        }).join('')
        +'</section>';
      var html='<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Lightmatter — Color Reference</title>'
        +'<style>*{box-sizing:border-box;margin:0;padding:0}'
        +'body{font-family:system-ui,-apple-system,sans-serif;background:#fff;color:#111;padding:48px 56px;max-width:960px;margin:0 auto}'
        +'header{border-bottom:2px solid #000;padding-bottom:14px;margin-bottom:48px}'
        +'header h1{font-size:18px;font-weight:600;letter-spacing:-0.3px}'
        +'section{margin-bottom:40px}'
        +'h2{font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#999;margin-bottom:14px}'
        +'.row{display:flex;flex-wrap:wrap;gap:12px}'
        +'.card{width:160px}'
        +'.chip{height:96px;display:flex;align-items:flex-end;padding:10px 12px;border:1px solid rgba(0,0,0,.06)}'
        +'.chip span{font-size:13px;font-weight:500}'
        +'.vals{padding:10px 0 0;display:flex;flex-direction:column;gap:3px}'
        +'.vals p{font-size:11px;color:#555;line-height:1.5}'
        +'.vals .pms{font-weight:600;color:#111}'
        +'@media print{body{padding:24px 32px}@page{margin:.5in}}'
        +'</style></head><body>'
        +'<header><h1>Lightmatter Color Reference</h1></header>'
        +body+rampBody+'</body></html>';
      dl(new Blob([html],{type:'text/html'}),'lightmatter-color-reference.html');
    };
  }

  initTocRail();
  initMobileMenu();
  initPaletteDownloads();
})();
