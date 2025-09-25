

import React from "react";

const WomenInSneakers: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#111" }}>
      <iframe
        src="/women-in-sneakers.html"
        title="Women In Sneakers Template"
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", border: "none" }}
      />
    </div>
  );
};

export default WomenInSneakers;
