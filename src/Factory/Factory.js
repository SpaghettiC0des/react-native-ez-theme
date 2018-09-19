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
    name,
    children
  }: {
    name: string,
    children: any
  }) => {
    const themeName = name.split(".");

    const selectedTheme =
      themeName.length === 1
        ? themeConfig[themeName[0]]
        : themeConfig[themeName[0]][themeName[1]];

    return <Provider value={selectedTheme}>{children}</Provider>;
  };

  const withTheme = (staticItems: Object = {}): React.Node => Component => {
    const WrappedComponent = props => (
      <Consumer>{theme => <Component {...props} theme={theme} />}</Consumer>
    );

    return Object.assign(WrappedComponent, staticItems);
  };

  return {
    EzThemeProvider: ThemeProvider,
    EzThemeConsumer: Consumer,
    withTheme
  };
}

export default Factory;
