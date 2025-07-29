import { capitalize, chunk, unique, kebabCase, sum } from '@pnpm-monorepo/utils';

// Example usage of utility functions
const names = ['john doe', 'jane smith', 'bob johnson', 'alice brown'];
const duplicateNumbers = [1, 2, 2, 3, 4, 4, 5];

console.log('=== Web App Demo ===');

console.log('Sum', sum(1, 10));

// Capitalize names
console.log('\nCapitalized names:');
names.forEach((name) => {
  console.log(`${name} -> ${capitalize(name)}`);
});

// Convert to kebab case
console.log('\nKebab case names:');
names.forEach((name) => {
  console.log(`${name} -> ${kebabCase(name)}`);
});

// Chunk array
console.log('\nChunked names (size 2):');
const chunkedNames = chunk(names, 2);
chunkedNames.forEach((chunk, index) => {
  console.log(`Chunk ${index + 1}:`, chunk);
});

// Remove duplicates
console.log('\nUnique numbers:');
console.log('Original:', duplicateNumbers);
console.log('Unique:', unique(duplicateNumbers));

console.log('\n=== Demo Complete 123 ===');
