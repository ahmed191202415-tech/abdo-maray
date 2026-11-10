import React from "react";
import {
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BrandMark, ease, Stage } from "../components/Stage";
import { Laptop, Phone } from "../components/Devices";

const EndCardInner = ({ style }: { style?: React.CSSProperties }) => {
  const frame = useCurrentFrame();
  // All movement is complete at local frame 24 (before 17s in ads 1/2; before 17s in ad 3).
  return (
    <Stage
      style={{ ...style, opacity: interpolate(frame, [0, 10], [0, 1], ease) }}
      number=""
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 26% 65%,#E1F0F5,#F8FBFC 65%)",
        }}
      />
      <div style={{ position: "absolute", left: 85, top: 80 }}>
        <BrandMark />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          translate: interpolate(
            frame,
            [0, 24],
            ["-50px 30px", "0px 0px"],
            ease,
          ),
        }}
      >
        <Laptop
          style={{
            left: 100,
            top: 390,
            scale: 0.82,
            transformOrigin: "top left",
          }}
        />
        <Phone
          style={{
            left: 770,
            top: 260,
            scale: 0.9,
            transformOrigin: "top left",
          }}
        />
      </div>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 120,
          top: 216,
          width: 650,
          textAlign: "right",
          translate: interpolate(frame, [0, 24], ["0px 24px", "0px 0px"], ease),
        }}
      >
        <BrandMark large />
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 1.6,
            marginTop: 8,
          }}
        >
          جرّب <bdi>BeOn</bdi>
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 550,
            color: "#557C91",
            marginTop: 4,
          }}
        >
          على الموبايل والمتصفح
        </div>
        <div
          dir="ltr"
          style={{
            display: "flex",
            gap: 28,
            marginTop: 45,
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("brand/app-store.svg")}
            style={{ width: 270, height: 90, objectFit: "contain" }}
          />
          <Img
            src={staticFile("brand/google-play.svg")}
            style={{ width: 285, height: 90, objectFit: "contain" }}
          />
        </div>
        <div
          dir="ltr"
          style={{
            fontFamily: "Cairo",
            fontWeight: 700,
            fontSize: 44,
            color: "#10994D",
            marginTop: 36,
            textAlign: "right",
            letterSpacing: 1,
          }}
        >
          beon.chat
        </div>
      </div>
    </Stage>
  );
};
export const EndCard = Interactive.withSchema({
  Component: EndCardInner,
  componentName: "<EndCard>",
  wrapInSequence: true,
  schema: {},
});
