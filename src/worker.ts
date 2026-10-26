interface Env {ASSETS:{fetch:(request:Request)=>Promise<Response>}}
const errors=new Set(['/404','/404/','/404.html']);
async function notFound(request:Request,env:Env){
 const url=new URL(request.url);let path='/404';let response:Response|undefined;
 for(let i=0;i<3;i++){response=await env.ASSETS.fetch(new Request(new URL(path,url.origin)));if(![301,302,307,308].includes(response.status))break;const next=new URL(response.headers.get('location')||path,url.origin);if(next.origin!==url.origin||!errors.has(next.pathname))break;path=next.pathname+next.search;}
 const headers=new Headers(response?.headers);for(const key of ['location','content-length','content-encoding'])headers.delete(key);headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store');headers.set('x-robots-tag','noindex');
 const body=response&&!([301,302,307,308].includes(response.status))?await response.text():'';
 return new Response(request.method==='HEAD'?null:body||'<!doctype html><title>404</title><h1>الصفحة غير موجودة</h1><a href="/">حديقة الملك فهد المركزية</a>',{status:404,headers});
}
export default {async fetch(request:Request,env:Env){const url=new URL(request.url);if(url.hostname==='www.madinahcentralpark.com'||(url.hostname==='madinahcentralpark.com'&&url.protocol==='http:')){url.protocol='https:';url.hostname='madinahcentralpark.com';return new Response(null,{status:308,headers:{location:url.href}});}let response=errors.has(url.pathname)?await notFound(request,env):await env.ASSETS.fetch(request);if(response.status===404&&!errors.has(url.pathname))response=await notFound(request,env);return request.method==='HEAD'?new Response(null,{status:response.status,headers:response.headers}):response;}};
