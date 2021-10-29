const SPEEDS = [30, 25, 20, 15, 13, 10, 8, 6, 5, 4, 3.2, 2.5, 2, 1.6, 1.3, 1, 0.8, 0.6, 0.5, 0.4, 0.3333333333333333, 0.25, 0.2, 0.16666666666666666, 0.125, 0.1, 0.07692307692307693, 0.06666666666666667, 0.05, 0.04, 0.03333333333333333, 0.025, 0.02, 0.016666666666666666, 0.0125, 0.01, 0.008, 0.00625, 0.005, 0.004, 0.003125, 0.0025, 0.002, 0.0015625, 0.00125, 0.001, 0.0008, 0.000625, 0.0005, 0.0004, 0.0003125, 0.00025, 0.0002, 0.00015625, 0.000125]
const SPEED_STRING = ["30", "25", "20", "15", "13", "10", "8", "6", "5", "4", "3.2", "2.5", "2", "1.6", "1.3", "1", "0.8", "0.6", "0.5", "0.4", "1/3", "1/4", "1/5", "1/6", "1/8", "1/10", "1/13", "1/15", "1/20", "1/25", "1/30", "1/40", "1/50", "1/60", "1/80", "1/100", "1/125", "1/160", "1/200", "1/250", "1/320", "1/400", "1/500", "1/640", "1/800", "1/1000", "1/1250", "1/1600", "1/2000", "1/2500", "1/3200", "1/4000", "1/5000", "1/6400", "1/8000"]

export const getShutterSpeed = (apex: number | undefined) => {
  if (apex === undefined) return;
  let speedIndex = 0;
  let minAbs = 1000000
  const exposureTime = 2 ** (-apex);
  SPEEDS.forEach((v, i) => {
    const adsValue = Math.abs(v - exposureTime);
    if (adsValue < minAbs) {
      speedIndex = i;
      minAbs = adsValue;
    }
  });

  return SPEED_STRING[speedIndex];
}