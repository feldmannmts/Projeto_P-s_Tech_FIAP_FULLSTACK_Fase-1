// jest.config.cjs
module.exports = {
      preset: "ts-jest",
      testEnvironment: "node",
      testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],
      transform: {
            "^.+\\.tsx?$": [
                  "ts-jest",
                  {
                        tsconfig: {
                              module: "commonjs",
                              moduleResolution: "node",
                              esModuleInterop: true,
                        },
                  },
            ],
      },
};