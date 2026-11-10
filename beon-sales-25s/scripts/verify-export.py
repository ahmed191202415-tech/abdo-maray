import hashlib,json,subprocess
from pathlib import Path
root=Path(__file__).resolve().parent.parent
p=root/'exports/BeOn_Sales_25s.mp4'
d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
v=next(s for s in d['streams'] if s['codec_type']=='video');a=next(s for s in d['streams'] if s['codec_type']=='audio')
assert v['codec_name']=='h264' and v['pix_fmt'] in ['yuv420p','yuvj420p']
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',750)
assert abs(float(v['duration'])-25)<.001 and abs(float(d['format']['duration'])-25)<.001
assert a['codec_name']=='aac' and a['channels']==2 and abs(float(a['duration'])-25)<.05
subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(p),'-f','null','-'],check=True)
report={'file':p.name,'width':v['width'],'height':v['height'],'fps':30,'frames':750,'durationSeconds':25,'videoCodec':v['codec_name'],'pixelFormat':v['pix_fmt'],'audioCodec':a['codec_name'],'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'decodeErrors':0,'voiceoverProduced':False,'productScreens':'temporary-illustrative','originalLogoIncluded':False,'real3D':True}
(root/'exports/verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
