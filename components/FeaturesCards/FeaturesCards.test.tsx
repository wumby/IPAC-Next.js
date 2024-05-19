import FeaturesCards from '@/components/FeaturesCards/FeaturesCards';
import { Feature } from '@/models/Features';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';

describe('Features Cards Component', () => {
  const featuresKeywords: Feature[] = [
    {
      sid: { id: 1 },
      displayName: `test display name`,
      epKeywords: ['keywords'],
      categorySid: { id: 1 },
    },
  ];
  const featuresNoKeywords: Feature[] = [
    { sid: { id: 2 }, displayName: `test display name`, epKeywords: [], categorySid: { id: 1 } },
  ];
  const categoryMap = new Map<number, string>([[1, 'test category']]);

  test('it renders the display name', () => {
    render(
      <MantineProvider>
        <FeaturesCards features={featuresKeywords} categoryMap={categoryMap}></FeaturesCards>
      </MantineProvider>
    );

    expect(screen.getByText('test display name')).toBeInTheDocument();
  });

  test('it renders the category', () => {
    render(
      <MantineProvider>
        <FeaturesCards features={featuresKeywords} categoryMap={categoryMap}></FeaturesCards>
      </MantineProvider>
    );

    expect(screen.getByText('test category')).toBeInTheDocument();
  });

  test('it renders keywords when we have keywords', () => {
    render(
      <MantineProvider>
        <FeaturesCards features={featuresKeywords} categoryMap={categoryMap}></FeaturesCards>
      </MantineProvider>
    );

    const keywords = screen.queryByText('Keywords:');

    expect(keywords).toBeTruthy();
  });

  test('it doesnt render keywords when we dont have keywords', () => {
    render(
      <MantineProvider>
        <FeaturesCards features={featuresNoKeywords} categoryMap={categoryMap}></FeaturesCards>
      </MantineProvider>
    );

    expect(screen.queryByText('Keywords:')).toBeNull();
  });
});
