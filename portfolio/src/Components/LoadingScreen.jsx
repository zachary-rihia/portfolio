import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#05050a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "monospace",
        zIndex: 100,
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity 0.6s ease",
      }}
    >
      <div style={{ fontSize: "22px", marginBottom: "20px", letterSpacing: "2px" }}>LOADING</div>

      {/* Simple progress bar */}
      <div
        style={{
          width: "280px",
          height: "6px",
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#F3F673", // matches your star colours
            transition: "width 0.2s ease",
          }}
        />
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", opacity: 0.7 }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;
