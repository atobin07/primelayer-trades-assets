const fs=require('fs'),path=require('path');
const puppeteer=require('puppeteer-core');
const root=__dirname,out=process.env.OUT||path.join(root,'..','posts'),tmp=path.join(root,'.tmp');
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(tmp,{recursive:true});
const nm='file://'+path.join(root,'node_modules');
const fonts=[200,300,400,500].map(w=>`@font-face{font-family:Sora;font-weight:${w};src:url(${nm}/@fontsource/sora/files/sora-latin-${w}-normal.woff2) format("woff2")}`).join('')+[400,500].map(w=>`@font-face{font-family:"Geist Mono";font-weight:${w};src:url(${nm}/@fontsource/geist-mono/files/geist-mono-latin-${w}-normal.woff2) format("woff2")}`).join('');
function logo(m,k,z){const c=k==='I'?'#F3EFE7':'#FF8200';return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width:${z}px;height:${z}px;flex-shrink:0"><g fill="${c}" fill-opacity="0.45"><rect x="17" y="52" width="2" height="42" rx="1"/><rect x="13" y="60" width="10" height="26" rx="2"/><rect x="34" y="36" width="2" height="48" rx="1"/><rect x="30" y="44" width="10" height="30" rx="2"/></g><rect x="51" y="6" width="2" height="88" rx="1" fill="${c}"/><rect x="47" y="16" width="10" height="66" rx="2" fill="${c}"/><path d="M62 16 H74 A16.5 16.5 0 0 1 74 49 H62 V42.5 H74 A10 10 0 0 0 74 22.5 H62 Z" fill="#F3EFE7"/></svg>`}
function get(o,p){return p.split('.').reduce((a,k)=>a==null?a:a[k],o)}
function fill(s,scope){return s.replace(/\{\{\s*([\w.]+)\s*\}\}/g,(m,p)=>{const v=get(scope,p);return v==null?'':String(v)})}
function build(src){
  let body=src.split('</helmet>')[1].split('</x-dc>')[0];
  const sm=src.match(/<script type="text\/x-dc"[^>]*data-props='([^']*)'>([\s\S]*?)<\/script>/);
  const props=JSON.parse(sm[1]).$preview;
  const vals=new Function('class DCLogic{};'+sm[2]+';return new Component().renderVals()')();
  body=body.replace(/<sc-for list="\{\{\s*([\w.]+)\s*\}\}" as="(\w+)"[^>]*>([\s\S]*?)<\/sc-for>/g,(m,l,a,inner)=>(get(vals,l)||[]).map(it=>fill(inner,Object.assign({},vals,{[a]:it}))).join(''));
  body=fill(body,vals).replace(/%%LOGO([OI])(\d+)%%/g,logo);
  return {html:`<!doctype html><meta charset="utf-8"><style>${fonts}body{margin:0}</style>${body}`,w:props.width,h:props.height};
}
function findChrome(){
  if(process.env.LOCAL_CHROME)return process.env.LOCAL_CHROME;
  const base='/opt/pw-browsers';
  for(const d of fs.existsSync(base)?fs.readdirSync(base):[]){const p=path.join(base,d,'chrome-linux','chrome');if(d.startsWith('chromium')&&fs.existsSync(p))return p}
  throw new Error('No Chromium found. Set LOCAL_CHROME to a Chrome or Chromium binary.');
}
// Usage: node render.js pages/2026-10-19-mon-x.dc.html [more files]
// Writes ../posts/<name>.png for each file. Size comes from $preview in the file.
(async()=>{
  const files=process.argv.slice(2);
  if(!files.length){console.error('Pass one or more .dc.html files');process.exit(1)}
  const browser=await puppeteer.launch({executablePath:findChrome(),args:['--no-sandbox','--allow-file-access-from-files']});
  for(const f of files){
    const name=path.basename(f).replace('.dc.html','');const {html,w,h}=build(fs.readFileSync(f,'utf8'));
    const p=path.join(tmp,name+'.html');fs.writeFileSync(p,html);
    const page=await browser.newPage();await page.setViewport({width:w,height:h});
    await page.goto('file://'+p,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);await new Promise(r=>setTimeout(r,300));
    const over=await page.evaluate(()=>{const b=document.body.firstElementChild;return {sw:b.scrollWidth,sh:b.scrollHeight,cw:b.clientWidth,ch:b.clientHeight}});
    if(over.sw>over.cw||over.sh>over.ch)console.warn('OVERFLOW',name,JSON.stringify(over));
    await page.screenshot({path:path.join(out,name+'.png'),clip:{x:0,y:0,width:w,height:h}});await page.close();console.log('rendered',name,w,h);
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
