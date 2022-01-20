module.exports = {
  plugins: ["prettier"],
  env: {
    browser: false,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["node_modules/"],
  rules: {
    "prettier/prettier": "error",
  },
};
