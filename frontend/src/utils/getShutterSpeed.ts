export const getShutterSpeed = (apex: number | undefined) => {
  if (!apex) return '';
  const exposureTime = 2 ** (-apex);
  return exposureTime;
}