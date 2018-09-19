# react-native-ez-theme

A lightweight theme provider for React Native Apps.

# Installation

`npm install --save react-native-ez-theme`

OR

`yarn add react-native-ez-theme`

# Sample usage

Configure the theme provider

```jsx
// appTheme.js
import { createTheme } from "react-native-ez-theme";

const ThemeConfig = {
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
      bgColor: "#fda600"
    },
    JUST_MESSING_AROUND: {
      bgColor: "#ff0000"
    }
  }
};

export default createTheme(ThemeConfig);
```

Add the `EzThemeProvider` in your root component or anywhere you want.

```jsx
//root.js
import { EzThemeProvider } from "./appTheme";
import MyComponent from "./MyComponent";

const Root = () => (
  <EzThemeProvider name="DEFAULT.LIGHT">
    <MyComponent />
  </EzThemeProvider>
);

export default Root;
```

```jsx
//MyComponent.js
import * as React from "react";
import { View } from "react-native";
import { EzThemeConsumer } from "./appTheme";
const MyComponent = () => (
  <EzThemeConsumer>
    {theme => (
      <View
        style={{
          backgroundColor: theme.bgColor
        }}
      />
    )}
  </EzThemeConsumer>
);

export default MyComponent;
```

# API

`createTheme(themeConfig: Object) : {EzThemeProvider, EzThemeConsumer}`

# Todos

- Add flow type
