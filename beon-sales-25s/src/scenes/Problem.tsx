import React from "react";
import { Interactive, useCurrentFrame } from "remotion";
import { Type } from "./Type";
const ProblemInner = ({ style }: { style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  return (
    <Interactive.Div style={{ position: "absolute", inset: 0, ...style }}>
      <Type dark eyebrow="كل رسالة… فرصة" top={290}>
        {f < 82 ? (
          <>
            العميل
            <br />
            وصل…
          </>
        ) : (
          <>
            مين
            <br />
            هيتابعه؟
          </>
        )}
      </Type>
    </Interactive.Div>
  );
};
export const Problem = Interactive.withSchema({
  Component: ProblemInner,
  componentName: "<Problem>",
  schema: {},
  wrapInSequence: true,
});
