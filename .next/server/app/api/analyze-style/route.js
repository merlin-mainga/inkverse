(()=>{var e={};e.id=722,e.ids=[722],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},8913:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>v,routeModule:()=>y,serverHooks:()=>h,workAsyncStorage:()=>m,workUnitAsyncStorage:()=>g});var s={};r.r(s),r.d(s,{POST:()=>d});var n=r(96559),a=r(48088),o=r(37719),i=r(32190);let l={type:"json_schema",json_schema:{type:"object",additionalProperties:!1,properties:{visual_mode:{type:"string"},lineart:{type:"string"},shading:{type:"string"},palette:{type:"string"},lighting:{type:"string"},texture:{type:"string"},detail:{type:"string"},style_prompt:{type:"string"},avoid:{type:"array",items:{type:"string"}}},required:["visual_mode","lineart","shading","palette","lighting","texture","detail","style_prompt","avoid"]}};function u(e){return e?.errors?.[0]?.message||e?.result?.error||""}async function p(e){let t="string"==typeof e&&e.trim()?e.trim():"anime manga illustration, clean lineart, high detail",r=`
You are a style analyzer for manga image generation.

The user style describes HOW TO DRAW.

Extract only visual rendering attributes:
- visual_mode
- lineart
- shading
- palette
- lighting
- texture
- detail

Rules:
- Do NOT change scene content.
- Do NOT invent characters or objects.
- Focus only on rendering style and visual treatment.
- Write everything in English.
- style_prompt must preserve whether the intended look is monochrome or full color.
- avoid must list unwanted rendering artifacts and visual defects.
- Return STRICT JSON only.
`.trim(),s=await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`,{method:"POST",headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({prompt:`${r}

USER STYLE:
${t}`,response_format:l,max_tokens:600,temperature:.15})}),n=await s.json();return{res:s,data:n}}async function c(e){let t=null,r=500;for(let s=0;s<3;s++){let{res:s,data:n}=await p(e);if(t=n,r=s.status,s.ok||!u(n).toLowerCase().includes("transport error"))return{res:s,data:n};await new Promise(e=>setTimeout(e,1200))}return{res:{ok:!1,status:r},data:t}}async function d(e){try{let{style:t}=await e.json(),{res:r,data:s}=await c(t);if(!r.ok)return console.error("analyze-style error:",s),i.NextResponse.json({error:u(s)||"Analyze style failed."},{status:"number"==typeof r.status?r.status:500});let n=s?.result?.response||s?.response||null;if(!n||"object"!=typeof n||!n.style_prompt)return console.error("Invalid style output:",s),i.NextResponse.json({error:"Style analyzer kh\xf4ng trả về dữ liệu hợp lệ."},{status:500});return i.NextResponse.json({ok:!0,style:n})}catch(e){return console.error("analyze-style route error:",e?.message||e),i.NextResponse.json({error:"Analyze style route failed."},{status:500})}}let y=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/analyze-style/route",pathname:"/api/analyze-style",filename:"route",bundlePath:"app/api/analyze-style/route"},resolvedPagePath:"C:\\Users\\ADMIN\\Documents\\inkverse_backup\\src\\app\\api\\analyze-style\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:m,workUnitAsyncStorage:g,serverHooks:h}=y;function v(){return(0,o.patchFetch)({workAsyncStorage:m,workUnitAsyncStorage:g})}},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[243,580],()=>r(8913));module.exports=s})();