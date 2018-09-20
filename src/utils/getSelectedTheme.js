function getSelectedTheme(dotSeparatedName, themeConfig) {
  if (!dotSeparatedName) {
    throw new Error("dotSeparatedName required!");
  }
  const splittedName = dotSeparatedName.split(".");

  return splittedName.reduce((config, name) => config[name], themeConfig);
}

export default getSelectedTheme;
