import * as React from "react";
import { Text, View } from "react-native";
import renderer from "react-test-renderer";
import Factory from "./Factory";

describe("Factory", () => {
  it("should accept 1 parameter", () => {
    expect(Factory.length).toEqual(1);
  });

  it("should return an object containing EzThemeProvider, EzThemeConsumer and withTheme", () => {
    const theme = Factory({});

    expect(Object.keys(theme).indexOf("EzThemeProvider") > -1).toBe(true);
    expect(Object.keys(theme).indexOf("EzThemeConsumer") > -1).toBe(true);
    expect(Object.keys(theme).indexOf("withTheme") > -1).toBe(true);
  });

  it("should provide theme config on the child function of EzThemeProvider", () => {
    const themeConfig = {
      DEFAULT: {
        LIGHT: {
          bgColor: "#eee"
        },
        DARK: {
          bgColor: "#333"
        }
      },
      CUSTOM: {
        LIGHT: {
          bgColor: "#fff"
        },
        DARK: {
          bgColor: "#ff0000"
        }
      }
    };
    const { EzThemeConsumer, EzThemeProvider } = Factory(themeConfig);
    const defaultTheme = renderer
      .create(
        <EzThemeProvider name="DEFAULT.LIGHT">
          <EzThemeConsumer>
            {theme => <View style={{ backgroundColor: theme.bgColor }} />}
          </EzThemeConsumer>
        </EzThemeProvider>
      )
      .toJSON();
    expect(defaultTheme).toMatchSnapshot();

    const customTheme = renderer.create(
      <EzThemeProvider name="CUSTOM.DARK">
        <EzThemeConsumer>
          {theme => <View style={{ backgroundColor: theme.bgColor }} />}
        </EzThemeConsumer>
      </EzThemeProvider>
    );

    expect(customTheme).toMatchSnapshot();
  });
});
