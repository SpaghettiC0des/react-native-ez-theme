// @flow
import * as React from "react";
import getSelectedTheme from "../utils/getSelectedTheme";

function Factory<T>(
  themeConfig: T
): {
  EzThemeProvider: React.ComponentType<React.ProviderProps<T>>,
  EzThemeConsumer: React.ComponentType<React.ConsumerProps<*>>,
  withTheme: ({ staticItems?: Object }) => React.Node => React.Node
} {
  const { Provider, Consumer } = React.createContext<T>(themeConfig);

  const ThemeProvider = ({
    name,
    children
  }: {
    name: string,
    children: any
  }) => {
    const selectedTheme = getSelectedTheme(name, themeConfig);

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
