import { CanvasImage, staticFile } from "remotion";
import { assets, brand } from "../brand";

type Props = {
  mobile?: boolean;
  focus?: "chat" | "customer" | "owner" | "followup";
  reveal?: boolean;
};
export const Interface = ({
  mobile = false,
  focus = "chat",
  reveal = true,
}: Props) => {
  const image = mobile ? assets.mobile : assets.browser;
  if (image)
    return (
      <CanvasImage
        src={staticFile(image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "white",
        }}
      />
    );
  const active = (key: string) =>
    focus === key
      ? { outline: "3px solid #10994D", boxShadow: "0 0 0 7px #10994D0C" }
      : {};
  const chat = (
    <div
      dir="rtl"
      style={{
        padding: mobile ? "28px 18px" : "26px 24px",
        flex: 1,
        minWidth: 0,
        background: "#F6FAFC",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div
        style={{
          fontSize: mobile ? 22 : 23,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 14,
            background: "#DCECF4",
            display: "grid",
            placeItems: "center",
          }}
        >
          ع
        </div>
        عميل تجريبي
        <span style={{ fontSize: 13, marginRight: "auto", color: "#718A98" }}>
          محادثة
        </span>
      </div>
      <div
        style={{
          borderRadius: 16,
          background: "white",
          padding: "20px 18px",
          fontSize: mobile ? 23 : 25,
          lineHeight: 1.7,
          ...active("chat"),
        }}
      >
        ممكن تفاصيل؟
        <div style={{ fontSize: 12, color: "#8094A0", marginTop: 6 }}>
          ١٠:٣٠ ص
        </div>
      </div>
      {reveal ? (
        <div
          style={{
            borderRadius: 16,
            background: "#E7F4ED",
            padding: "18px 18px",
            fontSize: mobile ? 20 : 22,
            lineHeight: 1.8,
            marginRight: 30,
            color: "#26734C",
          }}
        >
          أهلًا بيك، نقدر نساعدك.
          <div style={{ fontSize: 12, color: "#60987B", marginTop: 4 }}>
            فريق المتابعة
          </div>
        </div>
      ) : null}
      <div
        style={{
          marginTop: "auto",
          background: "white",
          borderRadius: 13,
          border: "1px solid #DFEAF0",
          height: 47,
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          fontSize: 15,
          color: "#8CA1AE",
        }}
      >
        المحادثة
      </div>
    </div>
  );
  if (mobile)
    return (
      <div
        style={{
          height: "100%",
          background: "white",
          color: brand.ink,
          fontFamily: "Cairo",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          dir="ltr"
          style={{
            height: 38,
            padding: "4px 22px",
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>9:41</span>
          <span>▮▮▮ ▰</span>
        </div>
        <div
          dir="rtl"
          style={{
            padding: "14px 20px",
            fontSize: 24,
            color: brand.blue,
            borderBottom: "1px solid #E1EDF2",
            fontWeight: 700,
          }}
        >
          المحادثات <span style={{ float: "left" }}>‹</span>
        </div>
        {chat}
        <div style={{ height: 24, display: "grid", placeItems: "center" }}>
          <div
            style={{
              width: 100,
              height: 4,
              background: "#182C38",
              borderRadius: 10,
            }}
          />
        </div>
      </div>
    );
  return (
    <div
      dir="rtl"
      style={{
        height: "100%",
        background: "white",
        color: brand.ink,
        fontFamily: "Cairo",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        dir="ltr"
        style={{
          height: 36,
          background: "#ECF2F5",
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "0 16px",
        }}
      >
        <i
          style={{
            width: 7,
            height: 7,
            borderRadius: 10,
            background: "#AABCC6",
          }}
        />
        <i
          style={{
            width: 7,
            height: 7,
            borderRadius: 10,
            background: "#AABCC6",
          }}
        />
        <i
          style={{
            width: 7,
            height: 7,
            borderRadius: 10,
            background: "#AABCC6",
          }}
        />
        <span
          style={{
            margin: "0 auto",
            padding: "3px 120px",
            background: "white",
            borderRadius: 5,
            fontSize: 11,
            color: "#7692A3",
          }}
        >
          beon.chat
        </span>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div
          style={{
            width: 68,
            background: brand.blue,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 0",
            gap: 30,
            color: "white",
            fontSize: 22,
          }}
        >
          <span>▣</span>
          <span
            style={{
              background: "#FFFFFF22",
              borderRadius: 10,
              padding: "4px 9px",
            }}
          >
            ☷
          </span>
          <span>♧</span>
          <span>◷</span>
        </div>
        <div
          style={{ width: 190, borderLeft: "1px solid #E2ECF1", padding: 18 }}
        >
          <div style={{ fontSize: 23, fontWeight: 700, marginBottom: 24 }}>
            المحادثات
          </div>
          <div style={{ fontSize: 14, color: "#88A0AE", marginBottom: 22 }}>
            بحث في المحادثات
          </div>
          <div
            style={{
              background: "#EAF3F8",
              borderRadius: 12,
              padding: 15,
              borderRight: "3px solid #10994D",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>عميل تجريبي</div>
            <div style={{ fontSize: 14, color: "#688697", marginTop: 8 }}>
              ممكن تفاصيل؟
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ marginTop: 28, padding: "0 10px" }}>
              <div
                style={{
                  width: 90,
                  height: 8,
                  borderRadius: 5,
                  background: "#E3ECF1",
                }}
              />
              <div
                style={{
                  width: 125,
                  height: 6,
                  borderRadius: 5,
                  background: "#F0F4F7",
                  marginTop: 10,
                }}
              />
            </div>
          ))}
        </div>
        {chat}
        <div
          style={{
            width: 224,
            borderRight: "1px solid #E2ECF1",
            padding: "25px 19px",
            background: "white",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 750, marginBottom: 30 }}>
            ملف العميل
          </div>
          <div
            style={{
              borderRadius: 12,
              padding: 13,
              marginBottom: 22,
              ...active("customer"),
            }}
          >
            <div style={{ fontSize: 14, color: "#7D96A4" }}>بيانات العميل</div>
            <div style={{ fontSize: 20, fontWeight: 650, marginTop: 9 }}>
              عميل تجريبي
            </div>
            <div style={{ fontSize: 14, color: "#5E8195", marginTop: 9 }}>
              استفسار عن الخدمة
            </div>
          </div>
          <div
            style={{
              borderRadius: 12,
              padding: 13,
              marginBottom: 22,
              ...active("owner"),
            }}
          >
            <div style={{ fontSize: 14, color: "#7D96A4" }}>
              المسؤول عن المتابعة
            </div>
            <div style={{ fontSize: 19, fontWeight: 650, marginTop: 12 }}>
              عضو الفريق ١
            </div>
            <div style={{ fontSize: 13, color: brand.green, marginTop: 6 }}>
              مسؤول محدد
            </div>
          </div>
          {focus === "followup" ? (
            <div
              style={{ padding: 13, borderRadius: 12, ...active("followup") }}
            >
              <div style={{ fontSize: 16, color: "#698A9D" }}>المتابعة</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 10 }}>
                الخطوة الجاية
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
