import {bundle} from '@remotion/bundler';
import {getCompositions, renderMedia} from '@remotion/renderer';
import {mkdir,rename} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const out=path.resolve(process.argv[2] || 'exports');
await mkdir(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
const browserExecutable=process.env.CHROME_PATH || '/usr/bin/chromium';
const compositions=await getCompositions(serveUrl,{browserExecutable});
for(const id of ['BeOn-Ownership-20s','BeOn-AfterMessage-20s','BeOn-Anywhere-20s']){
 const composition=compositions.find(c=>c.id===id);
 if(!composition || composition.durationInFrames!==600 || composition.fps!==30 || composition.width!==1920 || composition.height!==1080)throw Error('Unexpected composition settings: '+id);
 let checkpoint=-1;
 const outputLocation=path.join(out,id.replaceAll('-','_')+'.mp4');
 console.log('Rendering',id);
 await renderMedia({serveUrl,composition,codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'192k',browserExecutable,concurrency:4,outputLocation,onProgress:({progress})=>{const v=Math.floor(progress*5);if(v>checkpoint){checkpoint=v;console.log(id,Math.round(progress*100)+'%');}}});
 // AAC encoders can append a partial packet. Normalize its track end to exactly 20s.
 // Video is copied without re-encoding; narration/music speed is unchanged.
 const exact=outputLocation.replace(/\.mp4$/,'.exact.mp4');
 execFileSync('ffmpeg',['-y','-v','error','-i',outputLocation,'-t','20','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-af','atrim=duration=20','-movflags','+faststart',exact]);
 await rename(exact,outputLocation);
 console.log('Exported',outputLocation);
}
