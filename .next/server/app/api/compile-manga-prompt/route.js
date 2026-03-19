(()=>{var e={};e.id=7409,e.ids=[7409],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},31175:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>_,routeModule:()=>f,serverHooks:()=>v,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>h});var o={};r.r(o),r.d(o,{POST:()=>g});var n=r(96559),i=r(48088),a=r(37719),s=r(32190);let p={type:"json_schema",json_schema:{type:"object",additionalProperties:!1,properties:{scene_prompt:{type:"string"},style_prompt:{type:"string"},final_prompt:{type:"string"},negative_prompt:{type:"string"},variation_base_prompt:{type:"string"},polish_prompt:{type:"string"},hand_fix_prompt:{type:"string"},grip_fix_prompt:{type:"string"}},required:["scene_prompt","style_prompt","final_prompt","negative_prompt","variation_base_prompt","polish_prompt","hand_fix_prompt","grip_fix_prompt"]}};function c(e){return e?.errors?.[0]?.message||e?.result?.error||""}function l(e){return"cover"===e||"illustration"===e||"portrait"===e||"full-body"===e||"action-scene"===e||"dialogue-scene"===e||"environment"===e?e:null}function m(e){if("string"==typeof e)return e;try{return JSON.stringify(e??"")}catch{return""}}async function u(e,t,r,o){let n=l(e?.output_intent)||l(r)||"illustration",i="cover"===n?"poster-like focal point, striking composition, strong visual hierarchy, premium cover-art feel":"portrait"===n?"face and upper-body priority, expressive facial focus, reduced background competition":"full-body"===n?"full character body clearly framed, readable stance, clean silhouette, visible costume structure":"action-scene"===n?"dynamic motion, readable action flow, clear anatomy, clear limb separation, impactful staging, avoid chaotic framing, avoid style drift":"dialogue-scene"===n?"calmer staging, expression and interaction priority, readable emotional body language":"environment"===n?"environment and atmosphere priority, location readability, strong spatial depth":"balanced standalone illustration, clear focal subject, polished composition",a=function(e,t){let r=`${m(e)}
${m(t)}`.toLowerCase();return r.includes("black and white")||r.includes("black-and-white")||r.includes("monochrome")||r.includes("grayscale")||r.includes("manga ink")||r.includes("inked manga")||r.includes("ink only")||r.includes("trắng đen")}(e,t),{colorDirection:s,negativeColor:c}=a?{colorDirection:"Strict black-and-white manga rendering only. Monochrome ink only, grayscale allowed, no color accents, no painterly color lighting, no colored highlights, no mixed color treatment.",negativeColor:"color, full color, colored lighting, colored highlights, painterly color, watercolor color, vibrant palette, soft color wash, cinematic color grading"}:{colorDirection:"Preserve the intended color treatment from the style. Do not drift into monochrome unless the style clearly asks for it.",negativeColor:""},u=o?`

CHARACTER IDENTITY PRESERVATION (CRITICAL):
A character from Mainga Lab has been selected. You MUST preserve this character's identity in ALL generated prompts.
Character: ${o.name||"Unknown"}
Canon: ${o.canonSummary||""}
Appearance: ${o.appearanceNotes||""}
Must Preserve: ${o.mustPreserve||""}
`+(o.avoidDrift?`Avoid Drift: ${o.avoidDrift}
`:"")+(o.colorMode&&"unspecified"!==o.colorMode?`Color Mode: ${o.colorMode}
`:"")+`
Rules for character preservation:
`+`- In scene_prompt: Describe the character using canonSummary and appearanceNotes. Do NOT describe a generic character.
`+`- In final_prompt: Inject character identity at the start of the prompt. Reference canon traits.
`+`- In all prompts: Never invent different hair color, eye color, outfit, or identity.
`+`- If output_intent is portrait/full-body/action: emphasize the character's distinctive traits.
`:"",d=`
You are a prompt compiler specialized for FLUX.2-dev HQ manga generation.

You receive:
1. scene analysis = what to draw
2. style analysis = how to draw${u?"\n3. character canon = whose identity to preserve":""}

Your job:
- Merge scene and style into prompts for HQ manga generation and HQ regeneration flows.
- Preserve the user's original scene intent.
- Preserve whether the intended rendering is monochrome or full color.
- Respect output_intent exactly.
- Keep the result visually clear, grounded, and easy for the model to follow.
- Return strict JSON only.${u||"\n- Do not invent unrelated characters."}

GENERAL RULES:
- Write everything in English.
- Do not invent unrelated characters, props, or background elements.
- Prefer natural descriptive phrasing over keyword spam.
- Put scene content first, then style rendering, then quality guidance.
- Avoid unnecessary repetition and prompt overload.

OUTPUT INTENT:
Current output_intent = ${n}
Direction = ${i}

COLOR RULES:
- ${s}
- If the style clearly indicates black and white, monochrome, manga ink, ink only, grayscale, or similar, preserve monochrome rendering.
- If the style clearly indicates full color, cinematic color, painted color, vivid palette, soft color grading, or similar, preserve full color rendering.
- Never mix monochrome ink treatment with color rendering.
- Never force black and white unless the style clearly asks for monochrome.

MODERATION SAFETY:
- Preserve scene meaning, but soften wording that may increase output flagging.
- Avoid gore wording.
- Avoid explicit injury wording.

OUTPUT REQUIREMENTS:

scene_prompt:
- Concise scene-only description.
- No rendering style language.

style_prompt:
- Concise style-only description.
- No scene content.
- Must preserve palette/render treatment.
- If monochrome is intended, explicitly keep black-and-white / monochrome ink treatment.

final_prompt:
- One polished FLUX.2-dev prompt for first-pass HQ generation.
- Must read naturally.
- Scene first.
- Style second.
- Quality guidance last.
- Must follow the current output_intent.
- If output_intent is cover, prioritize focal impact and poster composition.
- If portrait, prioritize face and upper body.
- If full-body, clearly frame the full body.
- If action-scene, prioritize readable motion and anatomy without visual chaos.
- If dialogue-scene, prioritize expression and staging.
- If environment, prioritize place and atmosphere.
- Support:
  - readable anatomy
  - correct hand anatomy
  - clear limb separation
  - stable object interaction
  - balanced composition
  - strong silhouette
  - clean lineart
  - sharp focus
- If monochrome is intended, explicitly keep strict black-and-white manga rendering.

negative_prompt:
- Very concise only.
- Focus on common visual failures.
- ${c?`Include these color failures if relevant: ${c}`:"Do not add unrelated palette negatives."}

variation_base_prompt:
- Stable HQ regeneration base prompt.
- Must preserve original scene intent, output_intent, character identity, camera intent, mood, composition direction, and color treatment.

polish_prompt:
- Polish-only refinement prompt.
- Preserve original composition, output_intent, pose, camera angle, character identity, scene layout, and color treatment.

hand_fix_prompt:
- Regenerate-focused correction prompt for bad hand anatomy.
- Preserve original scene intent, output_intent, style, character identity, camera intent, mood, composition direction, and color treatment.

grip_fix_prompt:
- Regenerate-focused correction prompt for bad weapon or object grip.
- Preserve original scene intent, output_intent, style, character identity, camera intent, mood, and composition direction.
`.trim(),g=`
SCENE ANALYSIS:
${JSON.stringify(e,null,2)}

STYLE ANALYSIS:
${JSON.stringify(t,null,2)}

OUTPUT INTENT:
${JSON.stringify(n,null,2)}

MONOCHROME REQUIRED:
${JSON.stringify(a,null,2)}

FORCED COLOR NEGATIVE HINT:
${JSON.stringify(c,null,2)}${o?`

CHARACTER CANON (MUST USE):
${JSON.stringify(o,null,2)}`:""}
`.trim(),f=await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`,{method:"POST",headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({prompt:`${d}

${g}`,response_format:p,max_tokens:1100,temperature:.06})}),y=await f.json();return{res:f,data:y,outputIntent:n,wantsMonochrome:a,negativeColor:c}}async function d(e,t,r,o){let n=null,i=500,a={};for(let s=0;s<3;s++){let{res:s,data:p,outputIntent:l,wantsMonochrome:m,negativeColor:d}=await u(e,t,r,o);if(n=p,i=s.status,a={outputIntent:l,wantsMonochrome:m,negativeColor:d},s.ok||!c(p).toLowerCase().includes("transport error"))return{res:s,data:p,...a};await new Promise(e=>setTimeout(e,1200))}return{res:{ok:!1,status:i},data:n,...a}}async function g(e){try{var t;let{scene:r,style:o,output_intent:n,character_canon:i}=await e.json();if(!r||"object"!=typeof r||!r.scene_prompt)return s.NextResponse.json({error:"Scene data kh\xf4ng hợp lệ."},{status:400});if(!o||"object"!=typeof o||!o.style_prompt)return s.NextResponse.json({error:"Style data kh\xf4ng hợp lệ."},{status:400});let{res:a,data:p,outputIntent:l,wantsMonochrome:m,negativeColor:u}=await d(r,o,n,i);if(!a.ok)return console.error("compile-prompt error:",p),s.NextResponse.json({error:c(p)||"Compile prompt failed."},{status:"number"==typeof a.status?a.status:500});let g=p?.result?.response||p?.response||null;if(!(g&&"object"==typeof g&&"string"==typeof g.scene_prompt&&g.scene_prompt.trim()&&"string"==typeof g.style_prompt&&g.style_prompt.trim()&&"string"==typeof g.final_prompt&&g.final_prompt.trim()&&"string"==typeof g.negative_prompt&&g.negative_prompt.trim()&&"string"==typeof g.variation_base_prompt&&g.variation_base_prompt.trim()&&"string"==typeof g.polish_prompt&&g.polish_prompt.trim()&&"string"==typeof g.hand_fix_prompt&&g.hand_fix_prompt.trim()&&"string"==typeof g.grip_fix_prompt&&g.grip_fix_prompt.trim()))return console.error("Invalid compiler output:",p),s.NextResponse.json({error:"Prompt compiler kh\xf4ng trả về dữ liệu hợp lệ."},{status:500});let f={...g,negative_prompt:(t=g.negative_prompt,[t?.trim(),(u||"")?.trim()].filter(Boolean).join(", ")),output_intent:l,monochrome_locked:m};return s.NextResponse.json({ok:!0,compiled:f})}catch(e){return console.error("compile-manga-prompt route error:",e?.message||e),s.NextResponse.json({error:"Compile prompt route failed."},{status:500})}}let f=new n.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/compile-manga-prompt/route",pathname:"/api/compile-manga-prompt",filename:"route",bundlePath:"app/api/compile-manga-prompt/route"},resolvedPagePath:"C:\\Users\\ADMIN\\Documents\\inkverse_backup\\src\\app\\api\\compile-manga-prompt\\route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:y,workUnitAsyncStorage:h,serverHooks:v}=f;function _(){return(0,a.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:h})}},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[4243,580],()=>r(31175));module.exports=o})();