import { render, screen } from '@testing-library/react';
import Home from '@/components/Features/Features';
import { MantineProvider } from '@mantine/core';
import { Feature } from '@/models/Features';
import { useState } from 'react';
import { Filters } from '@/models/Filters';
import { Category } from '@/models/Category';
import Features from '@/components/Features/Features';
import userEvent from '@testing-library/user-event';
window.scrollTo = jest.fn();

describe('Home Component', () => {

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

  test('it filters the features properly', async() => {
    const FeaturesWrapper = () => {
        const filteredFeatures: Feature[] = [
            {
              sid: { id: 1 },
              displayName: `test one`,
              epKeywords: ['keywords'],
              categorySid: { id: 1 },
            },
            {
                sid: { id: 2 },
                displayName: `test two`,
                epKeywords: ['keywords'],
                categorySid: { id: 2 },
              },
              {
                sid: { id: 1 },
                displayName: `test three`,
                epKeywords: ['keywords'],
                categorySid: { id: 3 },
              },
          ];
        const [filters, setFilters] = useState<Filters>({ s: '', page: 1, count: 0, category: '0' });  
        const categories: Category[] = [{sid: {id:1}, name: "category 1"}!, {sid: {id:2}, name: "category 2"},  {sid: {id:3}, name: "category 3"}];
        const categoryMap = new Map<number, string>([[1, "category 1"], [2, "category 2"], [3, "category 3"]]);
      return <> <Features
    /></>;
    };


    render(
        <MantineProvider>
            <FeaturesWrapper></FeaturesWrapper>
        </MantineProvider>
    );
    const input = await screen.findByRole("textbox", { name: 'Search' });
     await userEvent.type(input, "one");
    

    expect(screen.getByText("test one")).toBeInTheDocument();
    expect(screen.queryByText("test two")).toBeNull();
    expect(screen.queryByText("test three")).toBeNull();

});
});
