import React from "react";
const TestPage = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#111" }}>
      <iframe
        src="/women-in-sneakers.html"
        title="Women In Sneakers Template"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div>
  );
};

export default TestPage;
history.scrollRestoration = "manual";
