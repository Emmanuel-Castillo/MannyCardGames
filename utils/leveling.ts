// ./utils/leveling.ts
// Utility file for user level game logic

// Returns exp needed for the given level (linear scaling)
// Meaning as each level progresses, you need an extra 100 exp to level up
function getExpForLevel(level: number): number {
  return 100 * level;
}

// Calculate progress to next level
// currExp will range from 0 to getExpForLevel(level + 1) - 1
export function getProgress(currExp: number, level: number) {
  const nextLevelExp = getExpForLevel(level + 1);

  return Math.min(Math.max(currExp / nextLevelExp, 0), 1);
}
