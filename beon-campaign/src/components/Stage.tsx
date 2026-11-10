import React from "react";
import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { assets, brand } from "../brand";

export const ease = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.22, 1, 0.36, 1),
} as const;

export const BrandMark = ({ large = false }: { large?: boolean }) =>
  assets.logo ? (
    <CanvasImage
      src={staticFile(assets.logo)}
      style={{
        width: large ? 280 : 146,
        height: large ? 130 : 64,
        objectFit: "contain",
        background: "white",
      }}
    />
  ) : (
    <div
      dir="ltr"
      style={{
        fontFamily: "Cairo",
        fontSize: large ? 42 : 26,
        fontWeight: 650,
        color: brand.blue,
        letterSpacing: 1,
      }}
    >
      beon.chat
    </div>
  );

export const Stage = ({
  children,
  number = "01",
  style,
}: {
  children: React.ReactNode;
  number?: string;
  style?: React.CSSProperties;
}) => (
  <AbsoluteFill
    style={{
      background: "#F8FBFC",
      fontFamily: "Cairo",
      color: brand.blue,
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        width: 1100,
        height: 1100,
        left: -390,
        top: -520,
        borderRadius: "50%",
        border: "110px solid #E7F1F6",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 1200,
        height: 600,
        left: 280,
        top: 650,
        borderRadius: "50%",
        background: "radial-gradient(ellipse,#D5E7ED99,transparent 67%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 60,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      <BrandMark />
      <div style={{ width: 1, height: 25, background: "#CCDCE4" }} />
      <span style={{ fontSize: 20, color: "#52758A" }}>
        تواصل أوضح. متابعة أسهل.
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        right: 100,
        top: 66,
        fontSize: 18,
        color: "#7894A3",
        fontFamily: "Arial",
        letterSpacing: 3,
      }}
    >
      {number} / BEON
    </div>
    {children}
  </AbsoluteFill>
);

export const Headline = ({
  children,
  sub,
  top = 245,
  right = 108,
  width = 760,
}: {
  children: React.ReactNode;
  sub?: string;
  top?: number;
  right?: number;
  width?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Arabic headline"
      dir="rtl"
      style={{
        position: "absolute",
        right,
        top,
        width,
        textAlign: "right",
        opacity: interpolate(frame, [0, 16], [0, 1], ease),
        translate: interpolate(frame, [0, 24], ["0px 36px", "0px 0px"], ease),
      }}
    >
      <div
        style={{
          fontSize: 86,
          fontWeight: 750,
          lineHeight: 1.45,
          letterSpacing: -2,
        }}
      >
        {children}
      </div>
      {sub ? (
        <div
          style={{
            fontSize: 35,
            lineHeight: 1.8,
            fontWeight: 500,
            color: "#4A7187",
            marginTop: 24,
          }}
        >
          {sub}
        </div>
      ) : null}
    </Interactive.Div>
  );
};

export const Bubble = ({
  children,
  style,
  green = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  green?: boolean;
}) => (
  <div
    dir="rtl"
    style={{
      background: green ? brand.green : "white",
      color: green ? "white" : brand.blue,
      padding: "22px 36px",
      borderRadius: "28px 28px 6px 28px",
      fontSize: 35,
      fontWeight: 650,
      boxShadow: "0 20px 55px #0F578D16",
      border: green ? "none" : "1px solid #DFEAF0",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Touch = ({
  at = 20,
  x = 170,
  y = 360,
}: {
  at?: number;
  x?: number;
  y?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 58,
        height: 58,
        borderRadius: "50%",
        border: "3px solid #10994D",
        background: "#10994D22",
        opacity: interpolate(frame, [at, at + 5, at + 17], [0, 0.8, 0], ease),
        scale: interpolate(frame, [at, at + 17], [0.6, 1.7], ease),
      }}
    />
  );
};

// A generic speech-bubble curve, independent from the protected BeOn artwork.
export const CurveWipe = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: -200,
        background: brand.blue,
        borderRadius: "48% 48% 8% 48%",
        translate: interpolate(
          frame,
          [0, 11, 24],
          ["-2500px 0px", "0px 0px", "2500px 0px"],
          ease,
        ),
      }}
    />
  );
};
