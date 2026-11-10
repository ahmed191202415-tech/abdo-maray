import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Bubble, ease, Headline, Stage } from "../components/Stage";

const MessagePathInner = ({ style }: { style?: React.CSSProperties }) => {
  const frame = useCurrentFrame();
  return (
    <Stage number="02" style={style}>
      <Headline top={215} width={1600}>
        الخطوة الجاية إيه؟
      </Headline>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M 1530 560 C 1400 560 1400 790 1130 790 S 750 560 390 660"
          fill="none"
          stroke="#D4E5EE"
          strokeWidth="10"
        />
        <path
          d="M 1530 560 C 1400 560 1400 790 1130 790 S 750 560 390 660"
          fill="none"
          stroke="#10994D"
          strokeWidth="10"
          strokeDasharray="1400"
          strokeDashoffset={interpolate(frame, [0, 75], [1400, 0], ease)}
        />
      </svg>
      <Bubble
        green
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 75], [1260, 260], ease),
          top: interpolate(frame, [0, 32, 75], [490, 720, 585], ease),
          width: 360,
          fontSize: 42,
        }}
      >
        ممكن تفاصيل؟
      </Bubble>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 660,
          top: 460,
          fontSize: 52,
          fontWeight: 700,
          opacity: interpolate(frame, [15, 28], [0, 1], ease),
        }}
      >
        رد
      </div>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 1060,
          top: 790,
          fontSize: 52,
          fontWeight: 700,
          opacity: interpolate(frame, [35, 48], [0, 1], ease),
        }}
      >
        متابعة
      </div>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 470,
          fontSize: 100,
          color: "#10994D",
          fontWeight: 700,
          opacity: interpolate(frame, [55, 68], [0, 1], ease),
        }}
      >
        ؟
      </div>
    </Stage>
  );
};
export const MessagePath = Interactive.withSchema({
  Component: MessagePathInner,
  componentName: "<MessagePath>",
  wrapInSequence: true,
  schema: {},
});
