import React from 'react';

import { render } from '@vtex/test-tools/react';
import '@testing-library/jest-dom';

import ProductFlags from '.';

describe('ProductFlags', () => {
  test('Should correctly render component', () => {
    const { getByTestId } = render(<ProductFlags />);

    expect(getByTestId('product-flags')).toBeInTheDocument();
  });

  test('Should correctly get info products', () => {
    const { getByTestId } = render(<ProductFlags />);

    expect(getByTestId('product-specifications')).toBeInTheDocument();
  });

  test.todo(
    'Should expect correctly rendering when not receive products information',
  );
});
