from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import html
root=Path(__file__).resolve().parent.parent
review=root/'review'
rows=[('BeOn-Ownership-20s','مين تابع العميل؟','من تشتّت المسؤولية إلى متابعة أوضح.'),('BeOn-AfterMessage-20s','الرسالة بداية','نفس الرسالة، وخطوة جاية أوضح.'),('BeOn-Anywhere-20s','بعيد عن المكتب؟','المنتج متاح على الموبايل والمتصفح.')]
cards=''
for cid,title,desc in rows:
 images=''.join(f'<a href="{cid}-{tag}.png" target="_blank"><img src="{cid}-{tag}.png" alt="{title} — {label}"><span>{label}</span></a>' for tag,label in [('opening','البداية · ٢ ثانية'),('product','المنتج · ٩٫٣ ثانية'),('closing','القفلة · ١٨٫٣ ثانية')])
 cards+=f'<section><div class="row"><div><h2>{title}</h2><p>{desc}</p></div><a class="button" href="http://localhost:3000/{cid}" target="_blank">افتح المعاينة ↗</a></div><div class="frames">{images}</div><code dir="ltr">{cid} · 1920×1080 · 30fps · 600 frames</code></section>'
page='''<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BeOn — مراجعة الحملة</title><style>
*{box-sizing:border-box}body{margin:0;background:#f4f8fa;color:#143d58;font-family:Tahoma,Arial,sans-serif;line-height:1.8}main{max-width:1460px;margin:auto;padding:54px 34px}header{margin-bottom:38px}h1{font-size:44px;margin:12px 0}h2{font-size:26px;margin:0}p{margin:4px 0 14px;color:#57788b}.eyebrow{color:#10994d;font-weight:bold;letter-spacing:1px}.note{background:white;border-right:4px solid #10994d;padding:20px 26px;border-radius:12px;max-width:1040px}.button{display:inline-block;text-decoration:none;background:#0f578d;color:white;padding:12px 22px;border-radius:10px;white-space:nowrap}section{background:white;border:1px solid #dce8ee;padding:28px;border-radius:20px;margin-top:24px}.row{display:flex;justify-content:space-between;gap:20px;align-items:center}.frames{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:22px 0}.frames a{color:#0f578d;text-decoration:none}.frames img{width:100%;border-radius:9px;border:1px solid #e2edf2;display:block}.frames span{display:block;margin:8px 3px;font-size:14px}code{color:#6a8899;font-size:13px;display:block;text-align:left}.download{margin-top:24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}footer{margin-top:32px;color:#66899d;font-size:14px}@media(max-width:760px){main{padding:28px 16px}h1{font-size:32px}.row{align-items:start;flex-direction:column}.frames{grid-template-columns:1fr}section{padding:18px}}
</style><main><header><div class="eyebrow" dir="ltr" style="text-align:right">BEON / CAMPAIGN REVIEW</div><h1>٣ قصص. متابعة أوضح.</h1><p>ثلاثة إعلانات مستقلة، ٢٠ ثانية لكل إعلان. المشروع قابل للتعديل في Remotion Studio.</p><div class="note"><strong>نسخة مراجعة، قبل اعتماد الأصول النهائية</strong><p>الواجهات تصورات مؤقتة ببيانات تجريبية. اللوجو الأصلي والمراجع الثلاثة غير متاحة ضمن الملفات. لا يوجد تعليق صوتي مصري في هذه النسخة؛ الموسيقى والمؤثرات الأصلية موجودة فعلًا.</p><p>استُخدمت أجهزة بعمق ومؤشرات لمس بدلًا من يد غير واقعية. لم يُنفّذ حفظ موعد متابعة أو أي إجراء غير مثبت داخل التطبيق. جميع التفاصيل وخطوات استبدال الأصول في README.txt داخل الحزمة.</p></div><div class="download"><a class="button" href="beon-project.zip" download>تنزيل المشروع واللقطات ZIP</a><a href="README.txt">ملاحظات الأصول والتشغيل</a><a href="verification.json">فحص المدة والمقاس</a></div></header>'''+cards+'''<footer>٩ لقطات مختارة · RTL وخط Cairo محلي · قفلة ثابتة في آخر ٣ ثوانٍ · بدون تصدير MP4 أو نشر خارجي.<br>تتضمن الحزمة النصوص الصوتية الحرفية ومسارات جاهزة لإضافة التسجيلات المعتمدة.</footer></main></html>'''
(review/'index.html').write_text(page)
(review/'README.txt').write_text((root/'README.txt').read_text())
with ZipFile(review/'beon-project.zip','w',ZIP_DEFLATED) as z:
 for folder in ['src','public','scripts','review']:
  for p in sorted((root/folder).rglob('*')):
   if p.is_file() and p.suffix!='.zip' and p.name!='ownership-opening.png':z.write(p,Path('beon-campaign')/p.relative_to(root))
 for name in ['package.json','package-lock.json','tsconfig.json','remotion.config.ts','eslint.config.mjs','.prettierrc','.gitignore','README.md','README.txt','AUDIO-LICENSE.txt']:
  z.write(root/name,Path('beon-campaign')/name)
print(review/'beon-project.zip')
