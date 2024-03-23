import { useRef, useEffect, useState } from "react";
import Menu from "./Menu";
import { Ball, initialBalls } from "../constants/initialBalls";

const BilliardGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedBallIndex, setSelectedBallIndex] = useState<number | null>(null);

  //menu-states
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    const decayCoefficient = 0.98;

    setBalls(initialBalls);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      initialBalls.forEach((ball, index) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        ball.x += ball.dx;
        ball.y += ball.dy;

        ball.dx *= decayCoefficient;
        ball.dy *= decayCoefficient;

        if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
          ball.dx *= -1;
        }
        if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
          ball.dy *= -1;
        }

        for (let i = index + 1; i < initialBalls.length; i++) {
          const otherBall = initialBalls[i];
          const distanceX = otherBall.x - ball.x;
          const distanceY = otherBall.y - ball.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const minDistance = ball.radius + otherBall.radius;

          if (distance < minDistance) {
            const angle = Math.atan2(distanceY, distanceX);
            const targetX = ball.x + Math.cos(angle) * minDistance;
            const targetY = ball.y + Math.sin(angle) * minDistance;
            const ax = (targetX - otherBall.x) * 0.05;
            const ay = (targetY - otherBall.y) * 0.05;

            ball.dx -= ax;
            ball.dy -= ay;
            otherBall.dx += ax;
            otherBall.dy += ay;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const clickedBallIndex = balls.findIndex(
        (ball) => Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2) <= ball.radius
      );
      setSelectedBallIndex(clickedBallIndex !== -1 ? clickedBallIndex : null);
    }
  };

  console.log({
    selectedBallIndex,
  });

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDragging(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dx = (event.clientX - dragStart.x) / 10;
    const dy = (event.clientY - dragStart.y) / 10;

    if (dy === 0 && dy === 0) {
      setShowMenu(true);
    } else if (showMenu) {
      setShowMenu(false);
    }

    selectedBallIndex !== null &&
      setBalls((prevBalls) => {
        const updatedBalls = [...prevBalls];
        updatedBalls[selectedBallIndex].dx = dx;
        updatedBalls[selectedBallIndex].dy = dy;
        return updatedBalls;
      });
  };

  const handleMouseMove = () => {
    if (!isDragging) return;
  };

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      {showMenu && selectedBallIndex !== null && (
        <Menu
          x={balls[selectedBallIndex].x}
          y={balls[selectedBallIndex].y}
          color={balls[selectedBallIndex].color}
          id={balls[selectedBallIndex].id}
          balls={balls}
          setBalls={setBalls}
        />
      )}
    </div>
  );
};
export default BilliardGame;
