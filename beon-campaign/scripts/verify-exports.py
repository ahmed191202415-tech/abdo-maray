import json,subprocess,hashlib
from pathlib import Path
root=Path(__file__).resolve().parent.parent
report=[]
for name in ['BeOn_Ownership_20s','BeOn_AfterMessage_20s','BeOn_Anywhere_20s']:
 p=root/'exports'/(name+'.mp4')
 d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 v=next(s for s in d['streams'] if s['codec_type']=='video');a=next(s for s in d['streams'] if s['codec_type']=='audio')
 assert v['codec_name']=='h264' and v['pix_fmt'] in ('yuv420p','yuvj420p')
 assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',600)
 assert abs(float(v['duration'])-20)<0.001 and abs(float(d['format']['duration'])-20)<0.001
 assert a['codec_name']=='aac' and a['channels']==2 and abs(float(a['duration'])-20)<0.05
 subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(p),'-f','null','-'],check=True)
 report.append({'file':p.name,'videoCodec':v['codec_name'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'frames':int(v['nb_frames']),'duration':float(d['format']['duration']),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'decodeErrors':0,'voiceover':False,'interface':'illustrative-review-assets'})
 print(p.name,'600 frames / 20s / decode OK',flush=True)
(root/'exports/verification.json').write_text(json.dumps(report,indent=2))
