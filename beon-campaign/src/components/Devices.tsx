import React from "react";
import { Interface } from "./Interface";

type Props = {
  style?: React.CSSProperties;
  focus?: "chat" | "customer" | "owner" | "followup";
  reveal?: boolean;
};
export const Laptop = ({ style, focus, reveal }: Props) => (
  <div
    style={{
      position: "absolute",
      width: 1000,
      height: 650,
      transformStyle: "preserve-3d",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 50,
        top: 0,
        width: 900,
        height: 562,
        padding: "23px 17px 20px",
        borderRadius: "28px 28px 14px 14px",
        background:
          "linear-gradient(120deg,#A8BBC6,#344650 12%,#091820 25%,#192D37 90%,#879CA9)",
        boxShadow: "0 35px 75px #163B5433, inset 0 0 0 2px #B9C9D1",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: 9,
          background: "#627681",
          left: "50%",
          top: 9,
        }}
      />
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          borderRadius: 7,
          background: "white",
        }}
      >
        <Interface focus={focus} reveal={reveal} />
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 4,
        width: 992,
        height: 72,
        background: "linear-gradient(#CED9DF,#F8FAFB 36%,#95A9B5)",
        clipPath: "polygon(5% 0,95% 0,100% 77%,99% 93%,1% 93%,0 77%)",
        borderRadius: "0 0 30px 30px",
        boxShadow: "0 26px 26px #183D5626",
      }}
    >
      <div
        style={{
          width: 200,
          height: 11,
          background: "#879EA9",
          borderRadius: "0 0 16px 16px",
          margin: "0 auto",
        }}
      />
      <div
        style={{
          width: 650,
          height: 21,
          margin: "8px auto",
          background:
            "repeating-linear-gradient(90deg,transparent 0 21px,#7893A033 22px 24px)",
          opacity: 0.6,
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        top: 638,
        height: 28,
        background: "#284D6524",
        filter: "blur(19px)",
        borderRadius: "50%",
      }}
    />
  </div>
);

export const Phone = ({ style, focus, reveal }: Props) => (
  <div
    style={{
      position: "absolute",
      width: 330,
      height: 670,
      background:
        "linear-gradient(110deg,#C6D2D9,#253C49 14%,#0C1C25 84%,#8FA5B1)",
      padding: 11,
      borderRadius: 52,
      boxShadow: "17px 30px 55px #173E5630,inset 0 0 0 2px #C3D1D8",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: -3,
        top: 150,
        width: 4,
        height: 65,
        borderRadius: 3,
        background: "#5A7483",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: -3,
        top: 174,
        width: 4,
        height: 80,
        borderRadius: 3,
        background: "#5A7483",
      }}
    />
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 41,
        overflow: "hidden",
        background: "white",
      }}
    >
      <Interface mobile focus={focus} reveal={reveal} />
    </div>
    <div
      style={{
        position: "absolute",
        top: 18,
        left: 118,
        width: 94,
        height: 21,
        borderRadius: 20,
        background: "#0A1720",
      }}
    />
  </div>
);

export const Office = () => (
  <>
    <div
      style={{
        position: "absolute",
        left: 115,
        top: 610,
        width: 1150,
        height: 335,
        borderRadius: 50,
        background: "linear-gradient(160deg,#EFF4F6,#D2E1E8)",
        transform: "perspective(1600px) rotateX(57deg) rotateZ(-8deg)",
        boxShadow: "0 60px 80px #1B567C19",
        border: "2px solid white",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 115,
        top: 620,
        width: 210,
        height: 270,
        borderRadius: 18,
        background: "linear-gradient(120deg,white,#DFE9EE)",
        transform: "perspective(1500px) rotateX(57deg) rotateZ(-8deg)",
        boxShadow: "0 20px 30px #17476620",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 14,
          top: 20,
          width: 5,
          height: 200,
          background: "#10994D",
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        left: 155,
        top: 570,
        width: 104,
        height: 104,
        borderRadius: "50%",
        background: "linear-gradient(110deg,#FFFFFF,#CCDFE9)",
        boxShadow: "12px 20px 24px #19466620",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: "50%",
          background: "#E4EDF2",
          boxShadow: "inset 0 5px 9px #29516E25",
        }}
      />
    </div>
  </>
);
