import { dotsToCell, cellToMask } from '@lp-labs/braille-cells';
if (cellToMask(dotsToCell([1, 4, 7])) !== 73) throw new Error('Cell');
// @ts-expect-error invalid argument must be rejected by declarations
dotsToCell('73');
