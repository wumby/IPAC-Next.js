import { render, screen } from '@testing-library/react';
import Show from '@/components/Show/Show';
import { MantineProvider } from '@mantine/core';

test('it renders its children when props are true', () => {
  render(
    <MantineProvider>
      <Show when={true}>
        <h1>Show</h1>
      </Show>
    </MantineProvider>
  );

  expect(screen.getByText('Show')).toBeInTheDocument();
});

test('it doesnt render its children when props are false', () => {
  render(
    <MantineProvider>
      <Show when={false}>
        <h1>Show</h1>
      </Show>
    </MantineProvider>
  );

  expect(screen.queryByText('Show')).toBeNull();
});
