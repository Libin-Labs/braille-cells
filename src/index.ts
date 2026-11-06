function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export function maskToCell(mask: number): string {
  integer(mask, 0, 255);
  return String.fromCharCode(0x2800 + mask);
}
export function cellToMask(cell: string): number {
  strictText(cell, 1);
  if (cell.length !== 1) throw new RangeError('One Braille cell required');
  return integer(cell.charCodeAt(0) - 0x2800, 0, 255);
}
export function dotsToCell(dots: readonly number[]): string {
  if (!Array.isArray(dots) || dots.length > 8) throw new RangeError('Dot count');
  let mask = 0;
  for (const dot of dots) {
    integer(dot, 1, 8);
    const bit = 1 << (dot - 1);
    if (mask & bit) throw new RangeError('Duplicate dot');
    mask |= bit;
  }
  return maskToCell(mask);
}
export function cellToDots(cell: string): number[] {
  const mask = cellToMask(cell),
    out: number[] = [];
  for (let i = 0; i < 8; i++) if (mask & (1 << i)) out.push(i + 1);
  return out;
}
export function mirrorCell(cell: string): string {
  const map = [4, 5, 6, 1, 2, 3, 8, 7];
  return dotsToCell(cellToDots(cell).map((d) => map[d - 1]!));
}
