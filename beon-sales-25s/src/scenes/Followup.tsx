import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { ease } from "./Type";
const Info = ({
  label,
  value,
  active,
  style,
}: {
  label: string;
  value: string;
  active: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    dir="rtl"
    style={{
      width: 380,
      padding: "25px 30px",
      background: "#FFFFFF",
      borderRadius: 22,
      border: active ? "3px solid #10994D" : "1px solid #D6E6ED",
      boxShadow: "0 20px 50px #0F578D20",
      fontFamily: "Cairo",
      ...style,
    }}
  >
    <div style={{ fontSize: 40, color: "#0F578D" }}>{label}</div>
    <div
      style={{ fontSize: 35, fontWeight: 700, color: "#0F578D", marginTop: 8 }}
    >
      {value}
    </div>
  </div>
);
const FollowupInner = ({ style }: { style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  return (
    <Interactive.Div style={{ position: "absolute", inset: 0, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg,#F1F7FBF0,transparent 70%)",
          opacity: 0.9,
        }}
      />
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 105,
          top: 180,
          fontSize: 72,
          fontWeight: 750,
          fontFamily: "Cairo",
          color: "#0F578D",
        }}
      >
        {f < 55 ? "مسؤول محدد" : "موعد متابعة واضح"}
      </div>
      <Info
        label="بيانات العميل"
        value="عميل تجريبي"
        active={f < 32}
        style={{
          position: "absolute",
          left: 300,
          top: 700,
          opacity: interpolate(f, [0, 16], [0, 1], ease),
          translate: interpolate(f, [0, 20], ["0px 45px", "0px 0px"], ease),
        }}
      />
      <Info
        label="المسؤول"
        value="عضو الفريق ١"
        active={f >= 32 && f < 70}
        style={{
          position: "absolute",
          left: 740,
          top: 700,
          opacity: interpolate(f, [25, 42], [0, 1], ease),
          translate: interpolate(f, [25, 45], ["0px 45px", "0px 0px"], ease),
        }}
      />
      <Info
        label="موعد المتابعة"
        value="غدًا · ١٠ صباحًا"
        active={f >= 70}
        style={{
          position: "absolute",
          left: 1180,
          top: 700,
          opacity: interpolate(f, [60, 78], [0, 1], ease),
          translate: interpolate(f, [60, 80], ["0px 45px", "0px 0px"], ease),
        }}
      />
    </Interactive.Div>
  );
};
export const Followup = Interactive.withSchema({
  Component: FollowupInner,
  componentName: "<Followup>",
  schema: {},
  wrapInSequence: true,
});
