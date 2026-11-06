# @lp-labs/braille-cells

Unicode Braille cell masks, dot lists and horizontal mirroring.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/braille-cells
```

## Working example

```js
import { dotsToCell, cellToMask } from '@lp-labs/braille-cells';
if (cellToMask(dotsToCell([1, 4, 7])) !== 73) throw new Error('Cell');
```

CommonJS: `const api = require('@lp-labs/braille-cells')`.

## Behavior, customization and limits

maskToCell(mask0..255)/cellToMask map Unicode U+2800..U+28FF. dotsToCell takes unique integer dots1..8 (empty permitted); cellToDots returns ascending dot numbers, bit0=dot1 through bit7=dot8. mirrorCell swaps left/right columns:1<->4,2<->5,3<->6,7<->8. No language translation, contractions, tactile rendering or accessibility certification; Unicode source generated at runtime (ASCII code). O(8), strict single-cell strings.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function maskToCell(mask: number): string;
export declare function cellToMask(cell: string): number;
export declare function dotsToCell(dots: readonly number[]): string;
export declare function cellToDots(cell: string): number[];
export declare function mirrorCell(cell: string): string;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
