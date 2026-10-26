export const POINT={latitude:24.4200407,longitude:39.6061752};
const codes=new Set([0,1,2,3,45,48,51,53,55,56,57,61,63,65,66,67,71,73,75,77,80,81,82,85,86,95,96,99]);
const number=(v:unknown,min:number,max:number)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
const date=(s:string)=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
export function validateWeather(p:any,now=Date.now()){
 try{
  if(p?.timezone!=='Asia/Riyadh'||p.utc_offset_seconds!==10800)return null;
  const c=p.current,d=p.daily,local=new Date(now+10800000).toISOString().slice(0,10);
  if(!c||!d||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(c.time))return null;
  const currentTime=Date.parse(c.time+'+03:00');
  if(!Number.isFinite(currentTime)||now-currentTime>10800000||currentTime-now>900000||c.time.slice(0,10)!==local)return null;
  for(const[k,min,max]of [['temperature_2m',-60,65],['apparent_temperature',-80,80],['relative_humidity_2m',0,100],['wind_speed_10m',0,500]]as const)if(!number(c[k],min,max))return null;
  if(!codes.has(c.weather_code)||!Array.isArray(d.time)||d.time.length!==7||d.time[0]!==local)return null;
  for(let i=0;i<7;i++){
   if(typeof d.time[i]!=='string'||!date(d.time[i])||Date.parse(d.time[i]+'T00:00:00Z')!==Date.parse(local+'T00:00:00Z')+i*86400000||!codes.has(d.weather_code?.[i]))return null;
   for(const[k,min,max]of [['temperature_2m_max',-60,65],['temperature_2m_min',-60,65],['uv_index_max',0,30],['wind_speed_10m_max',0,500]]as const)if(!Array.isArray(d[k])||d[k].length!==7||!number(d[k][i],min,max))return null;
   if(d.temperature_2m_max[i]<d.temperature_2m_min[i]||!Array.isArray(d.precipitation_probability_max)||d.precipitation_probability_max.length!==7)return null;
   const rain=d.precipitation_probability_max[i];if(rain!==null&&!number(rain,0,100))return null;
  }
  return p;
 }catch{return null;}
}
export async function loadWeather(fetcher:typeof fetch=fetch,now=Date.now(),deadline=4500){
 const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
 const params=new URLSearchParams({latitude:String(POINT.latitude),longitude:String(POINT.longitude),current:'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max',timezone:'Asia/Riyadh',forecast_days:'7',wind_speed_unit:'kmh'});
 try{
  const task=(async()=>{const response=await fetcher('https://api.open-meteo.com/v1/forecast?'+params,{signal:controller.signal});if(!response.ok)return null;return validateWeather(await response.json(),now);})();
  return await Promise.race([task,new Promise<null>(resolve=>{timer=setTimeout(()=>{controller.abort();resolve(null);},deadline);})]);
 }catch{return null;}finally{if(timer)clearTimeout(timer);controller.abort();}
}
