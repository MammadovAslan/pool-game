import React, { useEffect, useState } from "react";
import { Ball } from "../constants/initialBalls";

type MenuProps = {
  x: number;
  y: number;
  color: string;
  id: number;
  balls: Ball[];
  setBalls: React.Dispatch<React.SetStateAction<Ball[]>>;
};

const Menu: React.FC<MenuProps> = ({ x, y, color, id, balls, setBalls }) => {
  const style: React.CSSProperties = {
    left: x + "px",
    top: y + "px",
  };

  const [colorValue, setColorValue] = useState("");

  const handleColorChange = (newColor: string) => {
    setColorValue(newColor);
    const currentBall = balls.filter((b) => b.id === id)[0];
    currentBall.color = newColor;
    const updatedBalls = balls.map((b) => {
      if (b.id === id) return currentBall;
      return b;
    });
    setBalls(updatedBalls);
  };

  useEffect(() => {
    setColorValue(color);
  }, [color]);

  return (
    <div className="menu" style={style}>
      <div className="menu__content">
        <input
          type="color"
          name="color_pick"
          value={colorValue}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Menu;
