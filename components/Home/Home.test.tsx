import { render, screen } from '@testing-library/react';
import Home from '@/components/Home/Home';
import { MantineProvider } from '@mantine/core';


describe(('Home Component'), () =>{
  test('it renders features display component inputs', () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );
    expect(screen.getByRole('textbox', { name: 'Category'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search'})).toBeInTheDocument();
  });
})

