import React from 'react';
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const MockImage = ({ src, alt }) => React.createElement('img', { src, alt, });

jest.mock('next/image', () => MockImage);

const noop = () => undefined;

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
