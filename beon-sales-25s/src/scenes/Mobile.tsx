import React from "react";
import { Interactive, useCurrentFrame } from "remotion";
import { Type } from "./Type";
const MobileInner = ({ style }: { style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  return (
    <Interactive.Div style={{ position: "absolute", inset: 0, ...style }}>
      <Type dark eyebrow="شغلك معاك" top={290} size={74} width={650}>
        {f < 95 ? (
          <>
            على الموبايل
            <br />
            والمتصفح
          </>
        ) : (
          <>
            تابع من
            <br />
            أي مكان.
          </>
        )}
      </Type>
    </Interactive.Div>
  );
};
export const Mobile = Interactive.withSchema({
  Component: MobileInner,
  componentName: "<Mobile>",
  schema: {},
  wrapInSequence: true,
});
