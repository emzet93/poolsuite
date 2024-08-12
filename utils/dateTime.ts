export const formatDuration = (_seconds: number) => {
  const seconds = Math.abs(_seconds);
  const longerThenOneHour = Math.floor(seconds / 3600) > 0;
  const longerThen10minutes = Math.floor(seconds / 3600 / 6) > 0;
  const startingIndex = longerThenOneHour ? 11 : longerThen10minutes ? 14 : 15;
  return new Date(seconds * 1000).toISOString().slice(startingIndex, 19);
};
