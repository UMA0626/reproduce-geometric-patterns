import { useState, useEffect } from 'react';

const MAX_R = 300;
const MIN_R = 50;

const Circle = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(angle + 1);
    }, 6);
    return () => clearInterval(id);
  }, [angle]);

  const circlePositions = getCirclePositions(angle, getRadiuses(18));

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={MAX_R * 2 + 20} height={MAX_R * 2 + 20} viewBox={`-10 -10 ${MAX_R * 2 + 20} ${MAX_R * 2 + 20}`}>
        <circle r={MAX_R} cx={MAX_R} cy={MAX_R} fill='transparent' stroke='black' />
        <circle r={MIN_R} cx={MAX_R} cy={MAX_R} fill='transparent' stroke='gray' />
        <line x1={MAX_R} y1='0' x2={MAX_R} y2={MAX_R - MIN_R} stroke='gray' />

        {circlePositions.map((point, i) => <circle key={'circle' + i} r='5' cx={point.x} cy={point.y} fill='red' />)}
      </svg>
    </div>
  );
}

const getRadiuses = (pointNum: number): number[] => {
  if (pointNum === 1) return [MAX_R];
  if (pointNum === 2) return [MAX_R, MIN_R];

  // 点が3つ以上の場合、最も外側の点と最も内側の点を結ぶ線をn - 1等分し、
  // 分割点の数(n - 2)だけMIN_R + distanceすることで、各点の半径を取得
  const middleLineNum = pointNum - 1;
  const distance = (MAX_R - MIN_R) / middleLineNum;
  const middlePointNum = middleLineNum - 1;
  const rates = [...Array(middlePointNum)].map((_, i) => i + 1).reverse();
  const middlePoints = rates.map(rate => MIN_R + distance * rate);
  return [MAX_R, ...middlePoints, MIN_R];
}

const getCirclePositions = (angle: number, radians: number[]): CirclePosition[] => {
  return radians.map(radius => getPosition(angle, radius));
}
const getPosition = (angle: number, radius: number): CirclePosition => {
  const xradian = Math.PI / 180 * angle;
  const yradian = Math.PI / 180 * (angle + 90);
  const xpos = radius - Math.sin(xradian) * radius + (MAX_R - radius);
  const ypos = radius - Math.sin(yradian) * radius + (MAX_R - radius);
  return {
    x: xpos,
    y: ypos
  };
}

export default Circle;


type CirclePosition = {
  x: number,
  y: number
}