import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import C4 from './sound_ド4.mp3';
import B3f from './sound_シ♭3.mp3';
import A3 from './sound_ラ3.mp3';
import G3 from './sound_ソ3.mp3';
import F3 from './sound_ファ3.mp3';
import E3f from './sound_ミ♭3.mp3';
import D3 from './sound_レ3.mp3';
import C3 from './sound_ド3.mp3';
import B2f from './sound_シ♭2.mp3';
import A2 from './sound_ラ2.mp3';
import G2 from './sound_ソ2.mp3';
import F2 from './sound_ファ2.mp3';
import E2f from './sound_ミ♭2.mp3';
import D2 from './sound_レ2.mp3';
import C2 from './sound_ド2.mp3';
import B1f from './sound_シ♭1.mp3';
import A1 from './sound_ラ1.mp3';
import G1 from './sound_ソ1.mp3';

const MAX_R = 300;
const MIN_R = 50;

const Circle = () => {
  const [angle, setAngle] = useState(0);
  const delays = [...Array(18).keys()].map((_, i) => 22 / (i + 5)).reverse();
  const [playC4] = useSound(C4, { volume: 0.2 });
  const [playB3f] = useSound(B3f, { volume: 0.2 });
  const [playA3] = useSound(A3, { volume: 0.2 });
  const [playG3] = useSound(G3, { volume: 0.2 });
  const [playF3] = useSound(F3, { volume: 0.2 });
  const [playE3f] = useSound(E3f, { volume: 0.2 });
  const [playD3] = useSound(D3, { volume: 0.2 });
  const [playC3] = useSound(C3, { volume: 0.2 });
  const [playB2f] = useSound(B2f, { volume: 0.2 });
  const [playA2] = useSound(A2, { volume: 0.2 });
  const [playG2] = useSound(G2, { volume: 0.2 });
  const [playF2] = useSound(F2, { volume: 0.2 });
  const [playE2f] = useSound(E2f, { volume: 0.2 });
  const [playD2] = useSound(D2, { volume: 0.2 });
  const [playC2] = useSound(C2, { volume: 0.2 });
  const [playB1f] = useSound(B1f, { volume: 0.2 });
  const [playA1] = useSound(A1, { volume: 0.2 });
  const [playG1] = useSound(G1, { volume: 0.2 });

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(angle + 1);
    }, 4);
    return () => clearInterval(id);
  }, [angle]);

  const circlePositions = getCirclePositions(angle, delays, getRadiuses(18));
  const linePositions = getLinePositions(circlePositions);

  if (angle / delays[0] % 360 === 0) playC4();
  if (angle / delays[1] % 360 < 1) playB3f();
  if (angle / delays[2] % 360 < 1) playA3();
  if (angle / delays[3] % 360 < 1) playG3();
  if (angle / delays[4] % 360 < 1) playF3();
  if (angle / delays[5] % 360 < 1) playE3f();
  if (angle / delays[6] % 360 < 1) playD3();
  if (angle / delays[7] % 360 < 1) playC3();
  if (angle / delays[8] % 360 < 1) playB2f();
  if (angle / delays[9] % 360 < 1) playA2();
  if (angle / delays[10] % 360 < 1) playG2();
  if (angle / delays[11] % 360 < 1) playF2();
  if (angle / delays[12] % 360 < 1) playE2f();
  if (angle / delays[13] % 360 < 1) playD2();
  if (angle / delays[14] % 360 < 1) playC2();
  if (angle / delays[15] % 360 < 1) playB1f();
  if (angle / delays[16] % 360 < 1) playA1();
  if (angle / delays[17] % 360 < 1) playG1();

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={MAX_R * 2 + 20} height={MAX_R * 2 + 20} viewBox={`-10 -10 ${MAX_R * 2 + 20} ${MAX_R * 2 + 20}`}>
        <circle r={MAX_R} cx={MAX_R} cy={MAX_R} fill='transparent' stroke='black' />
        <circle r={MIN_R} cx={MAX_R} cy={MAX_R} fill='transparent' stroke='gray' />
        <line x1={MAX_R} y1='0' x2={MAX_R} y2={MAX_R - MIN_R} stroke='gray' />

        {circlePositions.map((point, i) => <circle key={'circle' + i} r='5' cx={point.x} cy={point.y} fill='red' />)}
        {linePositions.map((point, i) => <line key={'line' + i} x1={point.first.x} y1={point.first.y} x2={point.last.x} y2={point.last.y} stroke='black'></line>)}
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

const getCirclePositions = (angle: number, delays: number[], radians: number[]): CirclePosition[] => {
  return radians.map((radius, i) => getPosition(angle / delays[i], radius));
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

const getLinePositions = (circlePositions: CirclePosition[]): LinePosition[] => {
  return circlePositions.reduce((acc, cur, i) => {
    if (i === 0) return [];
    acc.push({
      first: circlePositions[i - 1],
      last: cur
    });
    return acc;
  }, [] as LinePosition[]);
}

export default Circle;


type CirclePosition = {
  x: number,
  y: number
}
type LinePosition = {
  first: CirclePosition,
  last: CirclePosition
}