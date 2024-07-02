module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
  };
  