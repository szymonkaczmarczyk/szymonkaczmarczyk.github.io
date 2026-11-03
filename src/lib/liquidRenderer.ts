export const maxDrops = 8;

export type LiquidFrame = {
  pill: [number, number, number, number];
  angle: number;
  lime: Float32Array;
  sky: Float32Array;
  stretch: number;
  blend: number;
};

export type LiquidRenderer = {
  resize: (width: number, height: number, ratio: number) => void;
  draw: (frame: LiquidFrame) => void;
  dispose: () => void;
};

const vertexSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentSource = `
precision highp float;
uniform vec2 uSize;
uniform float uRatio;
uniform vec4 uPill;
uniform float uAngle;
uniform vec3 uLime[${maxDrops}];
uniform vec3 uSky[${maxDrops}];
uniform float uStretch;
uniform float uBlend;
uniform vec3 uLimeColor;
uniform vec3 uSkyColor;

float smoothUnion(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

float drop(vec2 point, vec3 body) {
  vec2 offset = point - body.xy;
  offset.y /= 1.0 + abs(uStretch);
  return length(offset) - body.z;
}

float pill(vec2 point) {
  vec2 local = point - uPill.xy;
  float c = cos(uAngle);
  float s = sin(uAngle);
  local = vec2(c * local.x + s * local.y, -s * local.x + c * local.y);
  float radius = uPill.w;
  vec2 edge = abs(local) - uPill.zw + radius;
  return length(max(edge, 0.0)) + min(max(edge.x, edge.y), 0.0) - radius;
}

void main() {
  vec2 point = vec2(gl_FragCoord.x, uSize.y * uRatio - gl_FragCoord.y) / uRatio;
  float lime = uPill.z > 0.0 ? pill(point) : 1e4;
  for (int index = 0; index < ${maxDrops}; index++) {
    if (uLime[index].z > 0.5) lime = smoothUnion(lime, drop(point, uLime[index]), uBlend);
  }
  float sky = 1e4;
  for (int index = 0; index < ${maxDrops}; index++) {
    if (uSky[index].z > 0.5) sky = smoothUnion(sky, drop(point, uSky[index]), uBlend);
  }
  float limeAlpha = clamp(0.5 - lime * uRatio, 0.0, 1.0);
  float skyAlpha = clamp(0.5 - sky * uRatio, 0.0, 1.0) * (1.0 - limeAlpha);
  gl_FragColor = vec4(uLimeColor * limeAlpha + uSkyColor * skyAlpha, limeAlpha + skyAlpha);
}`;

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
};

const readColor = (variable: string, fallback: [number, number, number]) => {
  const probe = document.createElement('span');
  probe.style.color = `var(${variable})`;
  document.body.append(probe);
  const match = getComputedStyle(probe).color.match(/[\d.]+/g);
  probe.remove();
  return match && match.length >= 3 ? match.slice(0, 3).map((channel) => Number(channel) / 255) : fallback;
};

export function createLiquidRenderer(canvas: HTMLCanvasElement): LiquidRenderer | null {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertexShader || !fragmentShader || !program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const locations = {
    size: uniform('uSize'),
    ratio: uniform('uRatio'),
    pill: uniform('uPill'),
    angle: uniform('uAngle'),
    lime: uniform('uLime'),
    sky: uniform('uSky'),
    stretch: uniform('uStretch'),
    blend: uniform('uBlend'),
  };
  gl.uniform3fv(uniform('uLimeColor'), readColor('--color-lime', [0.878, 0.953, 0.329]));
  gl.uniform3fv(uniform('uSkyColor'), readColor('--color-sky', [0, 0.6, 1]));
  gl.clearColor(0, 0, 0, 0);

  return {
    resize(width, height, ratio) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(locations.size, width, height);
      gl.uniform1f(locations.ratio, ratio);
    },
    draw(frame) {
      gl.uniform4f(locations.pill, ...frame.pill);
      gl.uniform1f(locations.angle, frame.angle);
      gl.uniform3fv(locations.lime, frame.lime);
      gl.uniform3fv(locations.sky, frame.sky);
      gl.uniform1f(locations.stretch, frame.stretch);
      gl.uniform1f(locations.blend, frame.blend);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
