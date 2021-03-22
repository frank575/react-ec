module.exports = {
	roots: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	// setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
}
