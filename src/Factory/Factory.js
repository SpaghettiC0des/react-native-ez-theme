// @flow
import * as React from "react";
import getSelectedTheme from "../utils/getSelectedTheme";

function Factory(themeConfig) {
  const { Provider, Consumer } = React.createContext(themeConfig);

  const ThemeProvider = ({ name, children }) => {
    const selectedTheme = getSelectedTheme(name, themeConfig);

    return <Provider value={selectedTheme}>{children}</Provider>;
  };

  const withTheme = (staticItems = {}) => Component => {
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
