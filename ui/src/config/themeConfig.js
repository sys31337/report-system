const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const getThemeConfig = async () => {
  return {
    accentColor: "#FF6B6B",
    accentRgb: hexToRgb("#FF6B6B"),
    darkMode: false,
    categories: [
      "Bug Report",
      "Player Report",
      "Feature Request",
      "Support",
      "Other"
    ]
  }
}

export { getThemeConfig, hexToRgb }