module.exports = {
    rootDir: 'src',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!lbh-frontend|@mtfh)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@components': '<rootDir>/components',
        '@services': '<rootDir>/services',
        '@utilities': '<rootDir>/utils',
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
        '@hackney/mtfh-test-utils',
        './test-utils.tsx',
    ],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: [],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 95,
            functions: 100,
            lines: 100,
        },
    },
};
