"""Original synthesized music and accents; no external samples. CC0."""
import math, wave, array
from pathlib import Path
RATE=44100
out=array.array('h')
chords=[(146.83,220,293.66),(130.81,196,261.63),(164.81,220,329.63),(146.83,220,293.66)]
for i in range(RATE*25):
 t=i/RATE; chord=chords[min(3,int(t/5))];fade=min(1,t/0.4,max(0,(25-t)/1.1));pulse=0.7+0.3*math.sin(2*math.pi*t/2.3)**2
 l=r=0
 for j,f in enumerate(chord):
  a=0.025*pulse;l+=a*math.sin(2*math.pi*f*t+0.2*math.sin(t*0.5+j));r+=a*math.sin(2*math.pi*f*t+0.2*math.sin(t*0.5+j)+0.13)
 beat=t%(60/104)
 if t<22:
  note=chord[int(t/(60/104))%3]*2;pluck=0.055*math.exp(-beat*11)*(math.sin(2*math.pi*note*t)+0.2*math.sin(2*math.pi*note*2*t));l+=pluck;r+=pluck
 for at in [0.5,2.1,5,7.8,9.8,11.5,13,14.3,19,21]:
  dt=t-at
  if 0<dt<0.3:
   v=0.035*min(1,dt/0.015)*math.exp(-dt*17)*math.sin(2*math.pi*(660 if dt<0.1 else 880)*dt);l+=v;r+=v
 out.extend([int(max(-1,min(1,l*fade))*32767),int(max(-1,min(1,r*fade))*32767)])
target=Path(__file__).resolve().parent.parent/'public/audio/beon-sales-bed.wav'
with wave.open(str(target),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(out.tobytes())
print(target)
