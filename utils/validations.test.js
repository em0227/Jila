const {
  validateEmail,
  validateDate,
  validateStatus,
} = require("./validations");

describe("validateEmail", () => {
  test("return true if email is in valid format", () => {
    expect(validateEmail("test@test.com")).toBe(true);
  });

  test("return false if email does have @", () => {
    expect(validateEmail("test/")).toBe(false);
  });

  test("return false if email does have . after @", () => {
    expect(validateEmail("test.co@")).toBe(false);
  });
});

describe("validateDate", () => {
  test("return true if date is later than yesterday", () => {
    expect(validateDate(new Date())).toBe(true);
  });

  test("return false if date is not valid or earlier", () => {
    expect(validateDate("1")).toBe(false);
  });
});

describe("validateStatus", () => {
  test("return true if stauts is in the valid category", () => {
    expect(validateStatus("New")).toBe(true);
  });

  test("return false if status is NOT in the valid category", () => {
    expect(validateStatus("Old")).toBe(false);
  });
});
