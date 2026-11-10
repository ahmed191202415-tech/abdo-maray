import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const options = {
  browserExecutable: process.env.CHROME_PATH || "/usr/bin/chromium",
  chromiumOptions: { gl: "swangle" },
};
const compositions = await getCompositions(serveUrl, options);
const composition = compositions.find((c) => c.id === "BeOn-Sales-25s");
if (composition.durationInFrames !== 750 || composition.fps !== 30)
  throw Error("Invalid duration");
await mkdir("review", { recursive: true });
for (const [name, frame] of [
  ["01-problem", 105],
  ["02-gather", 225],
  ["03-followup", 355],
  ["04-mobile", 480],
  ["05-closing", 710],
]) {
  await renderStill({
    ...options,
    serveUrl,
    composition,
    frame,
    output: `review/${name}.png`,
    imageFormat: "png",
    timeoutInMilliseconds: 90000,
  });
  console.log(name, frame);
}
for (const frame of [660, 749])
  await renderStill({
    ...options,
    serveUrl,
    composition,
    frame,
    output: `review/check-${frame}.png`,
    imageFormat: "png",
    timeoutInMilliseconds: 90000,
  });
await writeFile(
  "review/verification.json",
  JSON.stringify(
    {
      id: composition.id,
      durationInFrames: 750,
      fps: 30,
      seconds: 25,
      width: 1920,
      height: 1080,
      real3D: true,
      voiceover: false,
      assetsPending: [
        "original-logo-file",
        "original-product-screenshot-files",
        "conversation-and-followup-recording",
      ],
    },
    null,
    2,
  ),
);
