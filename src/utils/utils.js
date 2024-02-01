// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
export const getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  }
}

export const distance = (x1, y1, x2, y2) => {
  const a = x1 - x2
  const b = y1 - y2

  return Math.hypot(a, b);
}
