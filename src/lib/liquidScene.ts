import { createLiquidRenderer, maxDrops } from './liquidRenderer';

type LiquidParts = {
  stage: HTMLElement;
  layer: HTMLElement;
  canvas: HTMLCanvasElement;
  track: HTMLElement;
};

type Anchor = { x: number; y: number; radius: number; amplitude: number; speed: number; phase: number };
type Body = { x: number; y: number; radius: number };
type Bud = Body & { vx: number; vy: number; age: number; life: number; size: number; alive: boolean };

const skyAnchors: Anchor[] = [
  { x: 0.88, y: 0.4, radius: 0.055, amplitude: 0.03, speed: 0.6, phase: 0 },
  { x: 0.99, y: 0.58, radius: 0.045, amplitude: 0.04, speed: 0.8, phase: 1.3 },
  { x: 0.78, y: 0.32, radius: 0.028, amplitude: 0.05, speed: 1.1, phase: 2.1 },
  { x: 1, y: 0.26, radius: 0.04, amplitude: 0.025, speed: 0.5, phase: 3.4 },
];
const narrowAnchors: Anchor[] = [
  { x: 0.84, y: 0.5, radius: 0.042, amplitude: 0.018, speed: 0.6, phase: 0 },
  { x: 0.98, y: 0.72, radius: 0.034, amplitude: 0.022, speed: 0.8, phase: 1.3 },
  { x: 0.7, y: 0.34, radius: 0.02, amplitude: 0.03, speed: 1.1, phase: 2.1 },
  { x: 1, y: 0.28, radius: 0.03, amplitude: 0.016, speed: 0.5, phase: 3.4 },
];
const narrowWidth = 768;
const budCount = 6;
const pillAngle = (-2 * Math.PI) / 180;
const wordsSpeed = 0.045;

const easeFactor = (base: number, delta: number) => 1 - Math.pow(1 - base, delta / 16.7);

export function startLiquidScene({ stage, layer, canvas, track }: LiquidParts) {
  const pill = stage.querySelector<HTMLElement>('[data-liquid-pill]');
  const avoid = [...stage.querySelectorAll<HTMLElement>('[data-liquid-avoid]')];
  const renderer = createLiquidRenderer(canvas);
  const size = { width: 0, height: 0, unit: 0, sequence: 0, stageTop: 0 };
  const pointer = { x: 0, y: 0, active: false, until: 0 };
  const cursor: Body = { x: 0, y: 0, radius: 0 };
  const drops: Body[] = skyAnchors.map(() => ({ x: 0, y: 0, radius: 0 }));
  const buds: Bud[] = Array.from({ length: budCount }, (_, index) => ({ x: 0, y: 0, radius: 0, vx: 0, vy: 0, age: -index * 0.9 - 0.4, life: 6, size: 0, alive: false }));
  const lime = new Float32Array(maxDrops * 3);
  const sky = new Float32Array(maxDrops * 3);
  let wordsOffset = 0;
  let stretch = 0;
  let lastScroll = window.scrollY;
  let previous = 0;
  let frameId = 0;
  let visible = true;
  let placed = false;

  const measure = () => {
    size.width = layer.clientWidth;
    size.height = layer.clientHeight;
    size.unit = Math.max(size.width, 640);
    size.sequence = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    size.stageTop = -layer.offsetTop;
    renderer?.resize(size.width, size.height, Math.min(window.devicePixelRatio || 1, size.width < narrowWidth ? 1.5 : 2));
  };

  const readPill = () => {
    if (!pill) return null;
    const layerBox = layer.getBoundingClientRect();
    const box = pill.getBoundingClientRect();
    return { x: box.left + box.width / 2 - layerBox.left, y: box.top + box.height / 2 - layerBox.top, halfWidth: pill.offsetWidth / 2, halfHeight: pill.offsetHeight / 2 };
  };

  const readAvoid = () => {
    const layerBox = layer.getBoundingClientRect();
    return avoid.map((element) => {
      const box = element.getBoundingClientRect();
      return { left: box.left - layerBox.left, right: box.right - layerBox.left, top: box.top - layerBox.top, bottom: box.bottom - layerBox.top };
    });
  };

  const spawnBud = (bud: Bud, shape: NonNullable<ReturnType<typeof readPill>>) => {
    const reach = shape.halfWidth - shape.halfHeight * 0.9;
    bud.size = size.unit * (0.012 + Math.random() * 0.014);
    bud.x = shape.x + Math.cos(pillAngle) * reach;
    bud.y = shape.y + Math.sin(pillAngle) * reach + (Math.random() - 0.5) * shape.halfHeight * 0.7;
    bud.vx = size.unit * (0.06 + Math.random() * 0.06);
    bud.vy = size.unit * (Math.random() - 0.6) * 0.035;
    bud.age = 0;
    bud.life = 5 + Math.random() * 3;
    bud.alive = true;
  };

  const step = (time: number) => {
    const delta = Math.min(time - (previous || time), 50);
    previous = time;
    const seconds = delta / 1000;
    const scrollDelta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    stretch += (Math.max(-0.5, Math.min(0.5, scrollDelta / 50)) - stretch) * easeFactor(0.15, delta);

    if (size.sequence > 0) {
      wordsOffset = (wordsOffset + delta * wordsSpeed + Math.abs(scrollDelta) * 0.35) % size.sequence;
      track.style.transform = `translate3d(${-wordsOffset}px, 0, 0)`;
    }
    if (!renderer) return;

    const shape = readPill();
    const keepOuts = readAvoid();
    const { width, height, unit } = size;

    const touchActive = pointer.active && time < pointer.until;
    const idle = shape
      ? { x: shape.x + shape.halfWidth + unit * (0.05 + Math.sin(time / 1400) * 0.04), y: shape.y + Math.cos(time / 1700) * unit * 0.025 }
      : { x: width * 0.7, y: height * 0.3 };
    const target = touchActive ? pointer : idle;
    const follow = placed ? easeFactor(touchActive ? 0.18 : 0.05, delta) : 1;
    cursor.x += (target.x - cursor.x) * follow;
    cursor.y += (target.y - cursor.y) * follow;
    cursor.radius = unit * 0.024;

    const narrow = width < narrowWidth;
    const anchors = narrow ? narrowAnchors : skyAnchors;
    const zoneTop = narrow ? size.stageTop : 0;
    const zoneHeight = narrow ? Math.min(height, ...keepOuts.map((keepOut) => keepOut.top)) - zoneTop : height;
    const drift = easeFactor(0.07, delta);
    drops.forEach((drop, index) => {
      const anchor = anchors[index];
      let x = anchor.x * width + Math.sin((time / 1000) * anchor.speed + anchor.phase) * anchor.amplitude * unit;
      let y = zoneTop + anchor.y * zoneHeight + Math.cos((time / 1000) * anchor.speed * 0.8 + anchor.phase) * anchor.amplitude * unit;
      const dx = cursor.x - x;
      const dy = cursor.y - y;
      const distance = Math.hypot(dx, dy);
      const reach = unit * 0.2;
      if (distance < reach) {
        const pull = Math.pow(1 - distance / reach, 2) * 0.5;
        x += dx * pull;
        y += dy * pull;
      }
      drop.radius = anchor.radius * unit;
      keepOuts.forEach((keepOut) => {
        const margin = drop.radius + 16;
        if (x > keepOut.left - margin && x < keepOut.right + margin && y > keepOut.top - margin && y < keepOut.bottom + margin) {
          const exits = [x - (keepOut.left - margin), keepOut.right + margin - x, y - (keepOut.top - margin), keepOut.bottom + margin - y];
          const nearest = exits.indexOf(Math.min(...exits));
          if (nearest === 0) x = keepOut.left - margin;
          if (nearest === 1) x = keepOut.right + margin;
          if (nearest === 2) y = keepOut.top - margin;
          if (nearest === 3) y = keepOut.bottom + margin;
        }
      });
      if (!placed) {
        drop.x = x;
        drop.y = y;
      }
      drop.x += (x - drop.x) * drift;
      drop.y += (y - drop.y) * drift;
    });

    buds.forEach((bud) => {
      bud.age += seconds;
      if (bud.age < 0 || !shape) {
        bud.radius = 0;
        return;
      }
      if (!bud.alive || bud.age > bud.life) spawnBud(bud, shape);
      const grow = Math.min(bud.age / 0.9, 1);
      const fade = Math.max(0, 1 - Math.max(0, bud.age - bud.life + 1.5) / 1.5);
      const drag = Math.pow(0.985, delta / 16.7);
      bud.vx *= drag;
      bud.vy = bud.vy * drag - unit * 0.004 * seconds;
      bud.x += bud.vx * seconds;
      bud.y += bud.vy * seconds;
      bud.radius = bud.size * (0.35 + grow * 0.65) * fade;
    });

    lime.fill(0);
    sky.fill(0);
    [cursor, ...buds].slice(0, maxDrops).forEach((body, index) => lime.set([body.x, body.y, body.radius], index * 3));
    drops.forEach((body, index) => sky.set([body.x, body.y, body.radius], index * 3));
    renderer.draw({
      pill: shape ? [shape.x, shape.y, shape.halfWidth, shape.halfHeight] : [0, 0, 0, 0],
      angle: pillAngle,
      lime,
      sky,
      stretch,
      blend: unit * 0.03,
    });
    if (!placed) {
      placed = true;
      stage.dataset.liquid = 'on';
    }
  };

  const loop = (time: number) => {
    step(time);
    frameId = requestAnimationFrame(loop);
  };
  const start = () => {
    if (frameId || !visible || document.hidden) return;
    previous = 0;
    lastScroll = window.scrollY;
    frameId = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const box = layer.getBoundingClientRect();
    pointer.x = event.clientX - box.left;
    pointer.y = event.clientY - box.top;
    pointer.active = true;
    pointer.until = Infinity;
  };
  const onPointerDown = (event: PointerEvent) => {
    const box = layer.getBoundingClientRect();
    pointer.x = event.clientX - box.left;
    pointer.y = event.clientY - box.top;
    pointer.active = true;
    pointer.until = event.pointerType === 'mouse' ? Infinity : performance.now() + 1600;
  };
  const onPointerLeave = () => {
    pointer.active = false;
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(layer);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  intersectionObserver.observe(stage);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  document.fonts?.ready.then(measure);
  measure();
  start();

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerdown', onPointerDown);
    stage.removeEventListener('pointerleave', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    delete stage.dataset.liquid;
    track.style.transform = '';
    renderer?.dispose();
  };
}
