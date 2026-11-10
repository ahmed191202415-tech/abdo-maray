import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
export const ease = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.2, 1, 0.3, 1),
} as const;
export const Type = ({
  children,
  eyebrow,
  dark = false,
  top = 280,
  size = 88,
  width = 770,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  dark?: boolean;
  top?: number;
  size?: number;
  width?: number;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <Interactive.Div
      name="Arabic headline"
      dir="rtl"
      style={{
        position: "absolute",
        right: 100,
        top,
        width,
        color: dark ? "white" : "#0F578D",
        fontFamily: "Cairo",
        textAlign: "right",
        opacity: interpolate(
          frame,
          [0, 15, durationInFrames - 12, durationInFrames],
          [0, 1, 1, 0],
          ease,
        ),
        translate: interpolate(frame, [0, 25], ["0px 35px", "0px 0px"], ease),
      }}
    >
      {eyebrow ? (
        <div
          style={{
            color: dark ? "#72D79D" : "#10994D",
            fontSize: 27,
            fontWeight: 600,
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          fontSize: size,
          fontWeight: 750,
          lineHeight: 1.45,
          letterSpacing: -1.6,
        }}
      >
        {children}
      </div>
    </Interactive.Div>
  );
};
