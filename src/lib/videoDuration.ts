import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const movieHeaderType = Buffer.from('mvhd');

const readMovieSeconds = (file: Buffer) => {
  const typeOffset = file.indexOf(movieHeaderType);
  if (typeOffset < 0) return undefined;
  const version = file.readUInt8(typeOffset + 4);
  if (version === 1) {
    const timescale = file.readUInt32BE(typeOffset + 24);
    const duration = Number(file.readBigUInt64BE(typeOffset + 28));
    return duration / timescale;
  }
  const timescale = file.readUInt32BE(typeOffset + 16);
  const duration = file.readUInt32BE(typeOffset + 20);
  return duration / timescale;
};

export const videoSeconds = (slug: string) => {
  try {
    const file = readFileSync(join(process.cwd(), 'public', 'video', `${slug}-poziom.mp4`));
    const seconds = readMovieSeconds(file);
    return seconds === undefined ? undefined : Math.round(seconds);
  } catch {
    return undefined;
  }
};

export const formatClock = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};
