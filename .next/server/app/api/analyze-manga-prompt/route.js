(()=>{var e={};e.id=4204,e.ids=[4204],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57094:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>y,routeModule:()=>c,serverHooks:()=>d,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{POST:()=>u});var o=t(96559),n=t(48088),a=t(37719),p=t(32190);let i={type:"json_schema",json_schema:{type:"object",additionalProperties:!1,properties:{scene_prompt:{type:"string"},style_prompt:{type:"string"}},required:["scene_prompt","style_prompt"]}};async function u(e){try{let{prompt:r}=await e.json();if(!r||"string"!=typeof r)return p.NextResponse.json({error:"Prompt kh\xf4ng hợp lệ."},{status:400});let t=`
You are a manga scene analyzer.

Your job is to convert a user idea into two prompts:

scene_prompt:
Describe the actual scene clearly.
Include character, pose, action, environment and composition.

style_prompt:
Describe the visual style of the image.
Focus on manga rendering style, ink quality, shading and mood.

Return STRICT JSON only.
`.trim(),s=await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`,{method:"POST",headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({prompt:`${t}

User prompt: ${r}`,response_format:i,max_tokens:400,temperature:.2})}),o=await s.json();if(!s.ok)return console.error("analyze error:",o),p.NextResponse.json({error:o?.errors?.[0]?.message||"Analyze failed."},{status:s.status});let n=o?.result?.response||o?.response||null;if(!n||!n.scene_prompt)return p.NextResponse.json({error:"Invalid analyze output."},{status:500});return p.NextResponse.json({scene:{scene_prompt:n.scene_prompt},style:{style_prompt:n.style_prompt}})}catch(e){return console.error("analyze route error:",e),p.NextResponse.json({error:"Analyze route failed."},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/analyze-manga-prompt/route",pathname:"/api/analyze-manga-prompt",filename:"route",bundlePath:"app/api/analyze-manga-prompt/route"},resolvedPagePath:"C:\\Users\\ADMIN\\Documents\\inkverse_backup\\src\\app\\api\\analyze-manga-prompt\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:m,serverHooks:d}=c;function y(){return(0,a.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:m})}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[4243,580],()=>t(57094));module.exports=s})();