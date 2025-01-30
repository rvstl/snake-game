import { useEffect, useState } from "react";

export type TDirection = "top" | "right" | "bottom" | "left";

export const useKeyPress = (): TDirection | null => {
  const [keyCode, setKeyCode] = useState<TDirection | null>("bottom");
  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      console.log("keyPressed", e.keyCode);
      if (e.keyCode === 37) {
        setKeyCode("left");
      } else if (e.keyCode === 38) {
        setKeyCode("top");
      } else if (e.keyCode === 39) {
        setKeyCode("right");
      } else if (e.keyCode === 40) {
        setKeyCode("bottom");
      }
    };
    window.addEventListener("keydown", onKeyPress);

    return () => window.removeEventListener("keydown", onKeyPress);
  }, []);

  return keyCode;
};
