(()=>{var e={};e.id=653,e.ids=[653],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},62700:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>f,routeModule:()=>m,serverHooks:()=>h,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>g});var n={};r.r(n),r.d(n,{POST:()=>d});var o=r(96559),s=r(48088),a=r(37719),i=r(32190);let c={type:"json_schema",json_schema:{type:"object",additionalProperties:!1,properties:{subject:{type:"string"},action:{type:"string"},pose:{type:"string"},camera:{type:"string"},background:{type:"string"},mood:{type:"string"},props:{type:"array",items:{type:"string"}},composition:{type:"string"},output_intent:{type:"string",enum:["cover","illustration","portrait","full-body","action-scene","dialogue-scene","environment"]},scene_prompt:{type:"string"},must_have:{type:"array",items:{type:"string"}}},required:["subject","action","pose","camera","background","mood","props","composition","output_intent","scene_prompt","must_have"]}};function p(e){return e?.errors?.[0]?.message||e?.result?.error||""}async function u(e,t,r){let n=t&&["cover","illustration","portrait","full-body","action-scene","dialogue-scene","environment"].includes(t)?t:"illustration";r&&(r.name,r.canonSummary,r.appearanceNotes,r.mustPreserve,r.avoidDrift&&r.avoidDrift,r.colorMode&&"unspecified"!==r.colorMode&&r.colorMode,r.primaryImageUrl&&r.primaryImageUrl);let o=`
You are a scene analyzer for manga image generation.

Extract structured scene information from the user prompt.

Fields:
- subject
- action
- pose
- camera
- background
- mood
- props
- composition
- output_intent

Rules:
- Do NOT describe art style.
- Do NOT invent extra characters.
- Preserve the original scene intent.
- Write everything in English.
- output_intent must follow the requested intent when provided.
- scene_prompt must be a clean scene description suitable for image generation.
- must_have must list critical visual elements that must remain in the scene.

${r?"- subject MUST be the character from the canon - do not replace with a generic character":""}

INTENT GUIDANCE:
- cover = poster-like key visual, strong focal point, striking composition
- illustration = general polished standalone image
- portrait = face / upper body priority
- full-body = full character body clearly framed
- action-scene = dynamic motion and readable action
- dialogue-scene = calmer staging, expression and interaction priority
- environment = place / atmosphere priority

Requested output_intent: ${n}

${r?"\nIMPORTANT: The scene MUST feature the provided character with their canonical identity.":""}

Return STRICT JSON only.
`.trim(),s=await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`,{method:"POST",headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({prompt:`${o}

USER PROMPT:
${e.trim()}`,response_format:c,max_tokens:700,temperature:.12})}),a=await s.json();return{res:s,data:a}}async function l(e,t,r){let n=null,o=500;for(let s=0;s<3;s++){let{res:s,data:a}=await u(e,t,r);if(n=a,o=s.status,s.ok||!p(a).toLowerCase().includes("transport error"))return{res:s,data:a};await new Promise(e=>setTimeout(e,1200))}return{res:{ok:!1,status:o},data:n}}async function d(e){try{let{prompt:t,output_intent:r,character_canon:n}=await e.json();if(!t||"string"!=typeof t||!t.trim())return i.NextResponse.json({error:"Prompt kh\xf4ng hợp lệ."},{status:400});let{res:o,data:s}=await l(t,r,n);if(!o.ok)return console.error("analyze-scene error:",s),i.NextResponse.json({error:p(s)||"Analyze scene failed."},{status:"number"==typeof o.status?o.status:500});let a=s?.result?.response||s?.response||null;if(!a||"object"!=typeof a||!a.scene_prompt)return console.error("Invalid scene output:",s),i.NextResponse.json({error:"Scene analyzer kh\xf4ng trả về dữ liệu hợp lệ."},{status:500});return i.NextResponse.json({ok:!0,scene:a,character_canon:n})}catch(e){return console.error("analyze-scene route error:",e?.message||e),i.NextResponse.json({error:"Analyze scene route failed."},{status:500})}}let m=new o.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/analyze-scene/route",pathname:"/api/analyze-scene",filename:"route",bundlePath:"app/api/analyze-scene/route"},resolvedPagePath:"C:\\Users\\ADMIN\\Documents\\inkverse_backup\\src\\app\\api\\analyze-scene\\route.ts",nextConfigOutput:"",userland:n}),{workAsyncStorage:y,workUnitAsyncStorage:g,serverHooks:h}=m;function f(){return(0,a.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:g})}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[243,580],()=>r(62700));module.exports=n})();