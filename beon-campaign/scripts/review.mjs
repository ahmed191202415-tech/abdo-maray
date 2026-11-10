import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  outDir: path.resolve("../review-bundle"),
});
const options = {
  browserExecutable: "/usr/bin/chromium",
  chromiumOptions: { gl: "angle" },
};
const compositions = await getCompositions(serveUrl, options);
await mkdir("review", { recursive: true });
const ids = [
  "BeOn-Ownership-20s",
  "BeOn-AfterMessage-20s",
  "BeOn-Anywhere-20s",
];
const report = [];
for (const id of ids) {
  const composition = compositions.find((c) => c.id === id);
  if (
    !composition ||
    composition.width !== 1920 ||
    composition.height !== 1080 ||
    composition.fps !== 30 ||
    composition.durationInFrames !== 600
  )
    throw Error("Invalid metadata " + id);
  for (const [tag, frame] of [
    ["opening", 60],
    ["product", 280],
    ["closing", 550],
  ]) {
    await renderStill({
      ...options,
      serveUrl,
      composition,
      frame,
      output: `review/${id}-${tag}.png`,
      imageFormat: "png",
    });
    console.log(id, tag, frame);
  }
  for (const frame of [510, 599])
    await renderStill({
      ...options,
      serveUrl,
      composition,
      frame,
      output: `../inspection/${id}-${frame}.png`,
      imageFormat: "png",
    });
  report.push({
    id,
    width: composition.width,
    height: composition.height,
    fps: composition.fps,
    durationInFrames: composition.durationInFrames,
    seconds: 20,
    voiceover: false,
  });
}
await writeFile("review/verification.json", JSON.stringify(report, null, 2));
