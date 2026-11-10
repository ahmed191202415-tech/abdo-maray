import { loadFont } from "@remotion/fonts";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Folder,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Opening } from "./scenes/Opening";
import { MessagePath } from "./scenes/MessagePath";
import { Product } from "./scenes/Product";
import { Mobile } from "./scenes/Mobile";
import { EndCard } from "./scenes/EndCard";
import { CurveWipe } from "./components/Stage";

loadFont({
  family: "Cairo",
  url: staticFile("fonts/Cairo.ttf"),
  weight: "200 1000",
  display: "block",
});
type AudioProps = { voiceover: string; music: boolean };
const Soundtrack = ({ voiceover, music }: AudioProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {music ? (
        <Audio
          src={staticFile("audio/beon-original-bed.wav")}
          volume={voiceover ? 0.18 : 0.34}
          premountFor={fps}
        />
      ) : null}
      {voiceover ? (
        <Audio src={staticFile(voiceover)} volume={1} premountFor={fps} />
      ) : null}
    </>
  );
};
export const Ownership = ({ voiceover = "", music = true }: AudioProps) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Opening
        name="01 — مين تابع العميل؟"
        kind="ownership"
        durationInFrames={3 * fps}
        premountFor={fps}
      />
      <Product
        name="02 — من التشتت للوضوح"
        mode="gather"
        from={3 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Product
        name="03 — محادثة، بيانات، مسؤول"
        mode="ownership"
        from={7 * fps}
        durationInFrames={5 * fps}
        premountFor={fps}
      />
      <Mobile
        name="04 — الموبايل والمتصفح"
        kind="ownership"
        from={12 * fps}
        durationInFrames={5 * fps}
        premountFor={fps}
      />
      <Sequence
        name="Speech curve — browser"
        from={3 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <CurveWipe />
      </Sequence>
      <Sequence
        name="Speech curve — mobile"
        from={12 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <CurveWipe />
      </Sequence>
      <EndCard
        name="05 — قفلة ثابتة"
        from={16.2 * fps}
        durationInFrames={3.8 * fps}
        premountFor={fps}
      />
      <Soundtrack voiceover={voiceover} music={music} />
    </AbsoluteFill>
  );
};
export const AfterMessage = ({ voiceover = "", music = true }: AudioProps) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Opening
        name="01 — وبعد الرسالة؟"
        kind="message"
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <MessagePath
        name="02 — رد، متابعة، ثم؟"
        from={4 * fps}
        durationInFrames={3 * fps}
        premountFor={fps}
      />
      <Product
        name="03 — رحلة المتابعة"
        mode="message"
        from={7 * fps}
        durationInFrames={6 * fps}
        premountFor={fps}
      />
      <Mobile
        name="04 — تابع من أي مكان"
        kind="message"
        from={13 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Sequence
        name="Speech curve — inbox"
        from={7 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <CurveWipe />
      </Sequence>
      <Sequence
        name="Speech curve — mobile"
        from={13 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <CurveWipe />
      </Sequence>
      <EndCard
        name="05 — قفلة ثابتة"
        from={16.2 * fps}
        durationInFrames={3.8 * fps}
        premountFor={fps}
      />
      <Soundtrack voiceover={voiceover} music={music} />
    </AbsoluteFill>
  );
};
export const Anywhere = ({ voiceover = "", music = true }: AudioProps) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Opening
        name="01 — بعيد عن المكتب؟"
        kind="anywhere"
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Mobile
        name="02 — افتح BeOn"
        kind="anywhere"
        closeup
        from={4 * fps}
        durationInFrames={2 * fps}
        premountFor={fps}
      />
      <Product
        name="03 — آخر خطوة"
        mode="anywhere"
        from={6 * fps}
        durationInFrames={6 * fps}
        premountFor={fps}
      />
      <Mobile
        name="04 — موبايل أو متصفح"
        kind="anywhere"
        from={12 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Sequence
        name="Speech curve — browser"
        from={6 * fps - 12}
        durationInFrames={24}
        premountFor={fps}
      >
        <CurveWipe />
      </Sequence>
      <EndCard
        name="05 — المتاجر والدعوة"
        from={16 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      />
      <Soundtrack voiceover={voiceover} music={music} />
    </AbsoluteFill>
  );
};
export const RemotionRoot = () => (
  <>
    <Composition
      id="BeOn-Ownership-20s"
      component={Ownership}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ voiceover: "", music: true }}
    />
    <Composition
      id="BeOn-AfterMessage-20s"
      component={AfterMessage}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ voiceover: "", music: true }}
    />
    <Composition
      id="BeOn-Anywhere-20s"
      component={Anywhere}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ voiceover: "", music: true }}
    />
    <Folder name="Scenes">
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ kind: "ownership" }}
      />
      <Composition
        id="MessagePath"
        component={MessagePath}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Product"
        component={Product}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ mode: "ownership" }}
      />
      <Composition
        id="Mobile"
        component={Mobile}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ kind: "ownership", closeup: false }}
      />
      <Composition
        id="EndCard"
        component={EndCard}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  </>
);
