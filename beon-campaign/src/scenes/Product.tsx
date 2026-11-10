import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Bubble, ease, Headline, Stage, Touch } from "../components/Stage";
import { Laptop } from "../components/Devices";

type Props = {
  mode: "gather" | "ownership" | "message" | "anywhere";
  style?: React.CSSProperties;
};
const ProductInner = ({ mode, style }: Props) => {
  const frame = useCurrentFrame();
  const focus =
    mode === "gather"
      ? "chat"
      : frame < 48
        ? "chat"
        : frame < 95
          ? "customer"
          : mode === "message"
            ? "followup"
            : "owner";
  const labels =
    mode === "message"
      ? ["محادثات", "بيانات", "متابعة"]
      : ["المحادثة", "بيانات العميل", "المسؤول"];
  return (
    <Stage
      number={mode === "message" ? "02" : mode === "anywhere" ? "03" : "01"}
      style={style}
    >
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 110,
          top: 175,
          fontSize: 62,
          fontWeight: 750,
          opacity: interpolate(frame, [0, 16], [0, 1], ease),
        }}
      >
        {mode === "gather"
          ? "الإجابة قدامك"
          : mode === "ownership"
            ? "محادثة واضحة. مسؤول محدد."
            : mode === "message"
              ? "نظّم الخطوة الجاية"
              : "اعرف العميل وصل لفين"}
      </div>
      <Laptop
        focus={focus}
        style={{
          left: 90,
          top: 350,
          scale: 1.02,
          transformOrigin: "top left",
          transform: `perspective(2200px) rotateY(${interpolate(frame, [0, 35], [mode === "gather" ? 14 : 3, 0], ease)}deg)`,
          translate: interpolate(frame, [0, 35], ["0px 30px", "0px 0px"], ease),
        }}
      />
      {mode === "gather" ? (
        <>
          <Headline
            top={410}
            width={610}
            sub="محادثات عملائك وبياناتهم… في صورة أوضح."
          >
            خلّيها
            <br />
            <span style={{ color: "#10994D" }}>واضحة.</span>
          </Headline>
          <Bubble
            style={{
              position: "absolute",
              left: interpolate(frame, [0, 50], [190, 680], ease),
              top: interpolate(frame, [0, 50], [580, 510], ease),
              scale: interpolate(frame, [0, 50], [1, 0.5], ease),
              opacity: interpolate(frame, [25, 55], [1, 0], ease),
            }}
          >
            مين متابع؟
          </Bubble>
          <Bubble
            style={{
              position: "absolute",
              left: interpolate(frame, [5, 55], [700, 650], ease),
              top: interpolate(frame, [5, 55], [310, 530], ease),
              scale: interpolate(frame, [5, 55], [1, 0.5], ease),
              opacity: interpolate(frame, [30, 60], [1, 0], ease),
            }}
          >
            ممكن تفاصيل؟
          </Bubble>
        </>
      ) : (
        <div
          dir="rtl"
          style={{
            position: "absolute",
            right: 110,
            top: 390,
            width: 590,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {labels.map((label, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                color:
                  (i === 0 && frame < 48) ||
                  (i === 1 && frame >= 48 && frame < 95) ||
                  (i === 2 && frame >= 95)
                    ? "#10994D"
                    : "#9CB2BF",
                opacity: interpolate(
                  frame,
                  [i * 38, i * 38 + 16],
                  [0.3, 1],
                  ease,
                ),
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 20,
                  background:
                    (i === 0 && frame < 48) ||
                    (i === 1 && frame >= 48 && frame < 95) ||
                    (i === 2 && frame >= 95)
                      ? "#E3F3EA"
                      : "#EDF3F6",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 25,
                }}
              >
                0{i + 1}
              </div>
              <span style={{ fontSize: 45, fontWeight: 650 }}>{label}</span>
            </div>
          ))}
          <div
            style={{
              height: 2,
              width: 450,
              background: "#DCE9EF",
              marginTop: 20,
            }}
          />
          <div style={{ fontSize: 26, color: "#66899D", lineHeight: 1.8 }}>
            كل خطوة… أوضح لفريقك.
          </div>
        </div>
      )}
      <Touch at={42} x={260} y={520} />
    </Stage>
  );
};
export const Product = Interactive.withSchema({
  Component: ProductInner,
  componentName: "<Product>",
  wrapInSequence: true,
  schema: {
    mode: {
      type: "enum",
      default: "ownership",
      description: "المشهد",
      variants: { gather: {}, ownership: {}, message: {}, anywhere: {} },
    },
  },
});
