import getSelectedTheme from "./getSelectedTheme";

describe("getSelectedTheme", () => {
  it("should accept 2 parameters", () => {
    expect(getSelectedTheme.length).toBe(2);
  });

  it("should return the selected theme config", () => {
    const themeConfig = {
      default: {
        schemes: {
          one: {
            bgColor: "gray"
          },
          two: {
            bgColor: "red"
          }
        }
      },
      custom: {
        light: {
          bgColor: "#fff"
        }
      }
    };

    expect(getSelectedTheme("default.schemes.one", themeConfig).bgColor).toBe(
      "gray"
    );

    expect(getSelectedTheme("default.schemes.two", themeConfig).bgColor).toBe(
      "red"
    );

    expect(getSelectedTheme("custom.light", themeConfig).bgColor).toBe("#fff");
  });

  it("should throw an error if no theme name is provided", () => {
    expect(() =>
      getSelectedTheme("", { default: { light: { textColor: "white" } } })
    ).toThrowError("dotSeparatedName required!");
  });
});
