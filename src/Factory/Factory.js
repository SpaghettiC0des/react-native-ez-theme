// @flow
import * as React from "react";

function Factory<T>(
  themeConfig: T
): {
  EzThemeProvider: React.ComponentType<React.ProviderProps<T>>,
  EzThemeConsumer: React.ComponentType<React.ConsumerProps<*>>
} {
  const { Provider, Consumer } = React.createContext<T>(themeConfig);

  const ThemeProvider = ({
    value,
    children
  }: {
    value: string,
    children: any
  }) => {
    const themeName = value.split(".");

    const selectedTheme =
      themeName.length === 1
        ? themeConfig[themeName[0]].LIGHT
        : themeConfig[themeName[0]][themeName[1]];

    return <Provider value={selectedTheme}>{children}</Provider>;
  };

  return {
    EzThemeProvider: ThemeProvider,
    EzThemeConsumer: Consumer
  };
}

export default Factory;