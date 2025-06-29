import { capitalizeFirstLetter } from "@/utils/stringFormatting"

test("Given empty string to capitalize, return empty string", () => {
    expect(capitalizeFirstLetter("")).toBe("")
})

test("Given a single word in a string, capitalize the first letter", () => {
    expect(capitalizeFirstLetter("test")).toBe("Test")
})

test("Given multiple words in a string, capitalize the first letter ONLY in the first word", () => {
    expect(capitalizeFirstLetter("test1 test2 test3")).toBe("Test1 test2 test3")
})