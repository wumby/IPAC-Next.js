import { render, screen } from '@testing-library/react';
import Home from '@/components/Features/Features';
import { MantineProvider } from '@mantine/core';

describe('Features Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  test('it renders features display component inputs', () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );
    expect(screen.getByRole('textbox', { name: 'Category' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });
});
