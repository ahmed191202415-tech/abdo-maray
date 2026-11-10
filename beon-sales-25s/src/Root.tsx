import { loadFont } from "@remotion/fonts";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Folder,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ASSETS } from "./config";
import { World } from "./World";
import { Problem } from "./scenes/Problem";
import { Gather } from "./scenes/Gather";
import { Followup } from "./scenes/Followup";
import { Mobile } from "./scenes/Mobile";
import { Closing } from "./scenes/Closing";
import { ease } from "./scenes/Type";
loadFont({
  family: "Cairo",
  url: staticFile("fonts/Cairo.ttf"),
  weight: "200 1000",
  display: "block",
});
const Occlusion = () => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        width: 2600,
        height: 1600,
        left: -340,
        top: -260,
        borderRadius: 160,
        background: "#0F578D",
        rotate: "-12deg",
        translate: interpolate(
          f,
          [0, 12, 24],
          ["-3000px 0px", "0px 0px", "3000px 0px"],
          ease,
        ),
      }}
    />
  );
};
type Props = { music: boolean; voiceover: string };
export const BeOnSales25 = ({ music = true, voiceover = "" }: Props) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const dark = frame < 150 || (frame >= 390 && frame < 570);
  return (
    <AbsoluteFill style={{ fontFamily: "Cairo", background: "#F4F8FA" }}>
      <World />
      <Problem
        name="01 — الفرصة وصلت"
        durationInFrames={5 * fps}
        premountFor={fps}
      />
      <Gather
        name="02 — تجميع المحادثات"
        from={5 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Followup
        name="03 — متابعة أوضح"
        from={9 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Mobile
        name="04 — شغلك معاك"
        from={13 * fps}
        durationInFrames={6 * fps}
        premountFor={fps}
      />
      <Closing
        name="05 — ابدأ تجربتك المجانية"
        from={19 * fps}
        durationInFrames={6 * fps}
        premountFor={fps}
      />
      <Sequence
        name="Blue card occlusion — gather"
        from={5 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <Occlusion />
      </Sequence>
      <Sequence
        name="Blue card occlusion — mobile"
        from={13 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <Occlusion />
      </Sequence>
      <Sequence
        name="Blue card occlusion — closing"
        from={19 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <Occlusion />
      </Sequence>
      <div style={{ position: "absolute", left: 90, top: 55 }}>
        {ASSETS.logo ? (
          <Img
            src={staticFile(ASSETS.logo)}
            style={{
              width: 152,
              height: 90,
              objectFit: "contain",
              background: "white",
              padding: 5,
              borderRadius: 8,
            }}
          />
        ) : (
          <span
            dir="ltr"
            style={{
              fontSize: 27,
              fontWeight: 650,
              color: dark ? "white" : "#0F578D",
            }}
          >
            beon.chat
          </span>
        )}
      </div>
      {music ? (
        <Audio
          src={staticFile("audio/beon-sales-bed.wav")}
          volume={voiceover ? 0.2 : 0.35}
          premountFor={fps}
        />
      ) : null}
      {voiceover ? (
        <Audio src={staticFile(voiceover)} volume={1} premountFor={fps} />
      ) : null}
    </AbsoluteFill>
  );
};
export const RemotionRoot = () => (
  <>
    <Composition
      id="BeOn-Sales-25s"
      component={BeOnSales25}
      durationInFrames={750}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ music: true, voiceover: "" }}
    />
    <Composition
      id="World-3D"
      component={World}
      durationInFrames={750}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ offset: 0 }}
    />
    <Folder name="Scenes">
      <Composition
        id="Scene-01-Problem"
        component={Problem}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-02-Gather"
        component={Gather}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-03-Followup"
        component={Followup}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-04-Mobile"
        component={Mobile}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-05-Closing"
        component={Closing}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  </>
);
