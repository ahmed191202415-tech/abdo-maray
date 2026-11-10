import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Bubble, ease, Headline, Stage, Touch } from "../components/Stage";
import { Laptop, Office, Phone } from "../components/Devices";

type Props = {
  kind: "ownership" | "message" | "anywhere";
  style?: React.CSSProperties;
};
const OpeningInner = ({ kind, style }: Props) => {
  const frame = useCurrentFrame();
  return (
    <Stage
      number={kind === "ownership" ? "01" : kind === "message" ? "02" : "03"}
      style={style}
    >
      {kind === "ownership" ? (
        <>
          <Office />
          <Laptop
            reveal={false}
            style={{
              left: 45,
              top: 295,
              scale: 0.78,
              transform: "perspective(2000px) rotateY(13deg) rotateX(6deg)",
              translate: interpolate(
                frame,
                [0, 32],
                ["-80px 70px", "0px 0px"],
                ease,
              ),
            }}
          />
          <Phone
            reveal={false}
            style={{
              left: 740,
              top: 470,
              scale: 0.6,
              rotate: "9deg",
              transformOrigin: "top left",
            }}
          />
          <Headline sub="سؤال صغير… يعطّل فريق كامل.">
            مين تابع
            <br />
            العميل؟
          </Headline>
          <Bubble
            style={{
              position: "absolute",
              left: 145,
              top: 217,
              rotate: "-5deg",
              opacity: interpolate(frame, [8, 20], [0, 1], ease),
            }}
          >
            مع مين؟
          </Bubble>
          <Bubble
            style={{
              position: "absolute",
              left: 640,
              top: 375,
              rotate: "5deg",
              opacity: interpolate(frame, [24, 36], [0, 1], ease),
            }}
          >
            حد كلمه؟
          </Bubble>
        </>
      ) : kind === "message" ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 130,
              top: 415,
              width: 880,
              height: 390,
              borderRadius: "50%",
              border: "70px solid #E1EEF5",
              transform: "perspective(1200px) rotateX(62deg)",
              boxShadow: "0 60px 50px #0F578D10",
            }}
          />
          <Phone
            reveal={false}
            style={{
              left: 385,
              top: 235,
              rotate: interpolate(frame, [0, 35], ["-12deg", "-4deg"], ease),
              translate: interpolate(
                frame,
                [0, 35],
                ["0px 50px", "0px 0px"],
                ease,
              ),
            }}
          />
          <Bubble
            green
            style={{
              position: "absolute",
              left: 584,
              top: 398,
              width: 390,
              opacity: interpolate(frame, [12, 22], [0, 1], ease),
              translate: interpolate(
                frame,
                [12, 30],
                ["0px 40px", "0px 0px"],
                ease,
              ),
            }}
          >
            ممكن تفاصيل؟
          </Bubble>
          <Headline sub="العميل بعتلك… إيه اللي حصل بعدها؟">
            وبعد
            <br />
            الرسالة؟
          </Headline>
        </>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              left: 112,
              top: 300,
              width: 840,
              height: 490,
              borderRadius: 100,
              background: "linear-gradient(145deg,#E5F1F6,#F7FAFC)",
              rotate: "-9deg",
              boxShadow: "30px 40px 50px #1B537415",
            }}
          />
          <Phone
            reveal={false}
            style={{
              left: 390,
              top: 232,
              rotate: interpolate(frame, [0, 40], ["-12deg", "0deg"], ease),
              translate: interpolate(
                frame,
                [0, 40],
                ["-80px 35px", "0px 0px"],
                ease,
              ),
            }}
          />
          <Touch at={36} x={535} y={535} />
          <Bubble
            style={{
              position: "absolute",
              left: 145,
              top: 680,
              opacity: interpolate(frame, [15, 27], [0, 1], ease),
            }}
          >
            العميل ده وصل لفين؟
          </Bubble>
          <Headline sub="ومحتاج تعرف آخر خطوة؟">
            بعيد عن
            <br />
            المكتب؟
          </Headline>
        </>
      )}
    </Stage>
  );
};
export const Opening = Interactive.withSchema({
  Component: OpeningInner,
  componentName: "<Opening>",
  wrapInSequence: true,
  schema: {
    kind: {
      type: "enum",
      default: "ownership",
      description: "قصة البداية",
      variants: { ownership: {}, message: {}, anywhere: {} },
    },
  },
});
