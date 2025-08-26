import React, { useEffect, useRef } from "react";

const Highlighter = ({ children }) => {
  const containerRef = useRef(null);
  const boxesRef = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ w: 0, h: 0 });

  const initContainer = () => {
    const containerElement = containerRef.current;
    containerSize.current.w = containerElement.offsetWidth;
    containerSize.current.h = containerElement.offsetHeight;
  };

  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    const containerElement = containerRef.current;
    const rect = containerElement.getBoundingClientRect();
    const { w, h } = containerSize.current;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const inside = x < w && x > 0 && y < h && y > 0;

    containerElement.style.setProperty("--mouse-x", `${x}px`);
    containerElement.style.setProperty("--mouse-y", `${y}px`);

    // if (inside) {
    //   mouse.current.x = x;
    //   mouse.current.y = y;
    //   boxesRef.current.forEach((box) => {
    //     const boxRect = box.getBoundingClientRect();
    //     const boxX = -(boxRect.left - rect.left) + mouse.current.x;
    //     const boxY = -(boxRect.top - rect.top) + mouse.current.y;

    //     box.style.setProperty("--mouse-x", `${boxX}px`);
    //     box.style.setProperty("--mouse-y", `${boxY}px`);
    //   });
    // }
  };

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", initContainer);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Render your child elements or boxes here */}
      {children}
    </div>
  );
};

export default Highlighter;
