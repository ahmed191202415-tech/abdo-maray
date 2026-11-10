import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { ease, Headline, Stage, Touch } from "../components/Stage";
import { Laptop, Phone } from "../components/Devices";

type Props = {
  kind: "ownership" | "message" | "anywhere";
  closeup?: boolean;
  style?: React.CSSProperties;
};
const MobileInner = ({ kind, closeup = false, style }: Props) => {
  const frame = useCurrentFrame();
  return (
    <Stage
      number={kind === "ownership" ? "01" : kind === "message" ? "02" : "03"}
      style={style}
    >
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 650,
          width: 1000,
          height: 180,
          borderRadius: "50%",
          background: "#D9EBF1",
          transform: "perspective(1000px) rotateX(65deg)",
        }}
      />
      {!closeup ? (
        <Laptop
          style={{
            left: 90,
            top: 375,
            scale: 0.78,
            transformOrigin: "top left",
            transform: "perspective(2000px) rotateY(5deg)",
            opacity: interpolate(frame, [10, 35], [0, 1], ease),
          }}
        />
      ) : null}
      <Phone
        focus={frame < 43 ? "customer" : "chat"}
        style={{
          left: closeup ? 390 : 690,
          top: 230,
          scale: closeup ? 1.02 : 0.98,
          rotate: interpolate(frame, [0, 30], ["-8deg", "0deg"], ease),
          translate: interpolate(
            frame,
            [0, 30],
            ["-150px 40px", "0px 0px"],
            ease,
          ),
        }}
      />
      <Touch at={38} x={closeup ? 520 : 820} y={487} />
      <Headline
        top={330}
        width={720}
        sub={
          closeup
            ? "افتح BeOn."
            : kind === "message"
              ? "من الموبايل أو المتصفح."
              : "تطبيق الموبايل والمتصفح."
        }
      >
        {closeup ? (
          <>
            شغلك
            <br />
            <span style={{ color: "#10994D" }}>معاك.</span>
          </>
        ) : kind === "ownership" ? (
          <>
            على الموبايل
            <br />
            والمتصفح
          </>
        ) : kind === "message" ? (
          <>
            تابع من
            <br />
            <span style={{ color: "#10994D" }}>أي مكان.</span>
          </>
        ) : (
          <>
            موبايل
            <br />
            أو متصفح
          </>
        )}
      </Headline>
    </Stage>
  );
};
export const Mobile = Interactive.withSchema({
  Component: MobileInner,
  componentName: "<Mobile>",
  wrapInSequence: true,
  schema: {
    kind: {
      type: "enum",
      default: "ownership",
      description: "القصة",
      variants: { ownership: {}, message: {}, anywhere: {} },
    },
    closeup: { type: "boolean", default: false, description: "لقطة قريبة" },
  },
});
