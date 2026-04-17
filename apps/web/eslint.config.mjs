import createConfig from "@workspace/eslint-config";

export default createConfig({
  type: "app",
  react: true,
}, {
  rules: {
    "react-refresh/only-export-components": ["off"],
    "react/no-context-provider": ["off"],
    "react/no-use-context": ["off"],
  },
});
