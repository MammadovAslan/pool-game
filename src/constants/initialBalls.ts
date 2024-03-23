export type Ball = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
};

export const initialBalls: Ball[] = [
  { id: 1, x: 150, y: 150, dx: 0, dy: 0, radius: 19, color: "#FFFFFF" },
  { id: 2, x: 520, y: 150, dx: 0, dy: 0, radius: 19, color: "#FF0000" },
  { id: 3, x: 550, y: 125, dx: 0, dy: 0, radius: 19, color: "#FFFF00" },
  { id: 4, x: 550, y: 175, dx: 0, dy: 0, radius: 19, color: "#0000FF" },
  { id: 5, x: 585, y: 150, dx: 0, dy: 0, radius: 19, color: "#800080" },
  { id: 6, x: 585, y: 105, dx: 0, dy: 0, radius: 19, color: "#FFA500" },
  { id: 7, x: 585, y: 195, dx: 0, dy: 0, radius: 19, color: "#008000" },
  { id: 8, x: 620, y: 125, dx: 0, dy: 0, radius: 19, color: "#A52A2A" },
  { id: 9, x: 620, y: 170, dx: 0, dy: 0, radius: 19, color: "#FFC0CB" },
  { id: 10, x: 620, y: 215, dx: 0, dy: 0, radius: 19, color: "#00FFFF" },
  { id: 11, x: 620, y: 85, dx: 0, dy: 0, radius: 19, color: "#FF00FF" },
];
