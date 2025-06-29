import { getExpForLevel, getProgress } from "@/utils/leveling"

test("Returning exp needed for level 20 (20 * 100) = 200", () => {
    expect(getExpForLevel(20)).toBe(2000)
})

test("Determine progress to level 2 with curr level & exp at 1 and 100, respectively", () => {
    expect(getProgress(100, 1)).toBe(.5)
})