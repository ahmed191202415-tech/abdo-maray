import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { Type, ease } from "./Type";
const GatherInner = ({ style }: { style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  return (
    <Interactive.Div style={{ position: "absolute", inset: 0, ...style }}>
      <Type eyebrow="مع BeOn" top={240} size={78} width={690}>
        محادثاتك
        <br />
        في مكان واحد
      </Type>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          right: 110,
          top: 585,
          width: 620,
          fontFamily: "Cairo",
          color: "#557C92",
          fontSize: 34,
          opacity: interpolate(f, [40, 60], [0, 1], ease),
        }}
      >
        من رسالة متفرقة… لصورة أوضح.
      </div>
    </Interactive.Div>
  );
};
export const Gather = Interactive.withSchema({
  Component: GatherInner,
  componentName: "<Gather>",
  schema: {},
  wrapInSequence: true,
});
