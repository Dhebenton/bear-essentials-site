const HEIGHT = 22;
const SLANT = 14;
const RADIUS = 999;
const OVERLAP = 7;

function Segment({ fillPct, type, isLast }) {
  let segmentClip;
  let fillClip;
  let borderRadius = "0";

  if (type === "left") {
    segmentClip = `polygon(0 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`;
    fillClip = segmentClip;
    borderRadius = `${RADIUS}px 0 0 ${RADIUS}px`;
  }

  if (type === "middle") {
    segmentClip = `polygon(${SLANT}px 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`;
    fillClip = `polygon(0 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`;
  }

  if (type === "right") {
    segmentClip = `polygon(${SLANT}px 0, 100% 0, 100% 100%, 0 100%)`;
    fillClip = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
    borderRadius = `0 ${RADIUS}px ${RADIUS}px 0`;
  }

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        height: HEIGHT,
        background: "#718776",
        clipPath: segmentClip,
        borderRadius,
        overflow: "hidden",
        marginRight: isLast ? 0 : -OVERLAP,
      }}
    >
      <div
        className="tra"
        style={{
          height: "100%",
          width: `${Math.max(0, Math.min(1, fillPct)) * 100}%`,
          background: "#264A31",
          clipPath: fillClip,
        }}
      />
    </div>
  );
}

export default function RewardMeter({
  orderValue = 60.5,
  tiers = [
    { label: "Free Shipping", threshold: 35 },
    { label: "5% Off", threshold: 50 },
    { label: "10% Off", threshold: 75 },
  ],
}) {
  let tierClass = "";

  if (orderValue >= tiers[0].threshold) tierClass = "tierone";
  if (orderValue >= tiers[1]?.threshold) tierClass = "tiertwo";
  if (orderValue >= tiers[2]?.threshold) tierClass = "tierthree";

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ display: "flex", height: HEIGHT }}>
        {tiers.map((tier, i) => {
          const prev = tiers[i - 1]?.threshold ?? 0;
          const range = tier.threshold - prev;
          const fillPct = (orderValue - prev) / range;

          return (
            <Segment
              key={tier.label}
              fillPct={fillPct}
              type={
                i === 0
                  ? "left"
                  : i === tiers.length - 1
                  ? "right"
                  : "middle"
              }
              isLast={i === tiers.length - 1}
            />
          );
        })}
      </div>

      <div
        className={`reward-meter ${tierClass}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tiers.length}, 1fr)`,
          textAlign: "center",
        }}
      >
        {tiers.map((t) => (
          <div
            className="reward-meter-label-ammount tra gant"
            key={t.threshold}
          >
            £{t.threshold}
          </div>
        ))}
        {tiers.map((t) => (
          <div className="reward-meter-label tra" key={t.label}>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}
