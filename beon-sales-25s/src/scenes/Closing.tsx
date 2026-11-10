import React from "react";
import {
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ASSETS } from "../config";
import { ease, Type } from "./Type";
const ClosingInner = ({ style }: { style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  return (
    <Interactive.Div style={{ position: "absolute", inset: 0, ...style }}>
      {f < 60 ? (
        <Type top={300} size={76} eyebrow="كل خطوة… أوضح">
          خلّي كل فرصة
          <br />
          بيع قدامك.
        </Type>
      ) : null}
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 90,
          top: 190,
          width: 760,
          height: 780,
          opacity: interpolate(f, [60, 78], [0, 1], ease),
          translate: interpolate(f, [60, 90], ["0px 24px", "0px 0px"], ease),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -20,
            background: "linear-gradient(90deg,#F4F8FA00,#F4F8FAE8 20%)",
            zIndex: -1,
          }}
        />
        <div
          style={{
            fontFamily: "Cairo",
            fontSize: 89,
            fontWeight: 800,
            lineHeight: 1.48,
            color: "#0F578D",
          }}
        >
          ابدأ تجربتك
          <br />
          <span style={{ color: "#10994D" }}>المجانية</span>
        </div>
        {ASSETS.logo ? (
          <Img
            src={staticFile(ASSETS.logo)}
            style={{
              width: 240,
              height: 145,
              objectFit: "contain",
              background: "white",
              marginTop: 12,
            }}
          />
        ) : (
          <div style={{ height: 115 }} />
        )}
        <div
          dir="ltr"
          style={{
            display: "flex",
            gap: 25,
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <Img
            src={staticFile("brand/app-store.svg")}
            style={{ width: 275, height: 94, objectFit: "contain" }}
          />
          <Img
            src={staticFile("brand/google-play.svg")}
            style={{ width: 290, height: 94, objectFit: "contain" }}
          />
        </div>
        <div
          dir="ltr"
          style={{
            fontFamily: "Cairo",
            color: "#0F578D",
            fontSize: 43,
            fontWeight: 650,
            marginTop: 32,
            textAlign: "right",
          }}
        >
          beon.chat
        </div>
      </div>
    </Interactive.Div>
  );
};
export const Closing = Interactive.withSchema({
  Component: ClosingInner,
  componentName: "<Closing>",
  schema: {},
  wrapInSequence: true,
});
