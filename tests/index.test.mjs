import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('Unicode reference masks', () => {
  assert.equal(api.maskToCell(0).charCodeAt(0), 0x2800);
  assert.equal(api.maskToCell(255).charCodeAt(0), 0x28ff);
});
test('dot bit reference', () => {
  assert.equal(api.cellToMask(api.dotsToCell([1, 4, 7])), 73);
});
test('ascending dot list', () => {
  assert.deepEqual(api.cellToDots(api.maskToCell(128)), [8]);
  assert.deepEqual(api.cellToDots(api.dotsToCell([8, 1])), [1, 8]);
});
test('horizontal mirror', () => {
  assert.deepEqual(api.cellToDots(api.mirrorCell(api.dotsToCell([1, 2, 7]))), [4, 5, 8]);
});
test('strict cell and dots', () => {
  assert.throws(() => api.cellToMask('A'));
  assert.throws(() => api.cellToMask(''));
  assert.throws(() => api.dotsToCell([1, 1]));
  assert.throws(() => api.maskToCell(256));
});
test('all256 masks and mirror involution', () => {
  for (let mask = 0; mask < 256; mask++) {
    const c = api.maskToCell(mask);
    assert.equal(api.cellToMask(c), mask);
    assert.equal(api.mirrorCell(api.mirrorCell(c)), c);
    const dots = api.cellToDots(c);
    assert.equal(
      dots.reduce((n, d) => n + 2 ** (d - 1), 0),
      mask,
    );
  }
});
