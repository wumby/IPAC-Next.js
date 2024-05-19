import { Feature } from '@/models/Features';
import FeaturesDisplay from './FeaturesDisplay';
import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Category } from '@/models/Category';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Features Display Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it should filter the features when you type in search bar', async () => {
    const allFeatures: Feature[] = [
      {
        sid: { id: 1 },
        displayName: 'uno',
        epKeywords: ['keywords'],
        categorySid: { id: 1 },
      },
      {
        sid: { id: 2 },
        displayName: 'dos',
        epKeywords: ['keywords'],
        categorySid: { id: 2 },
      },
      {
        sid: { id: 3 },
        displayName: 'tres',
        epKeywords: ['keywords'],
        categorySid: { id: 3 },
      },
    ];
    const categories: Category[] = [
      { sid: { id: 1 }, name: 'one' },
      { sid: { id: 2 }, name: 'two' },
      { sid: { id: 3 }, name: 'three' },
    ];
    const categoryMap = new Map<number, string>([
      [1, 'click'],
      [2, 'category 2'],
      [3, 'category 3'],
    ]);
    render(
      <MantineProvider>
        <FeaturesDisplay features={allFeatures} categories={categories} categoryMap={categoryMap} lastPage={1} perPage={20}/>
      </MantineProvider>
    );
    const textbox = screen.getByRole('textbox', { name: 'Search' });
    await userEvent.type(textbox, 'uno');

    await waitFor(() => {
      expect(screen.getByText('uno')).toBeInTheDocument();
      expect(screen.queryByText('dos')).toBeNull();
      expect(screen.queryByText('tres')).toBeNull();
    });
  });

  test('it should filter the features when you select a category', async () => {
    const allFeatures: Feature[] = [
      {
        sid: { id: 1 },
        displayName: 'uno',
        epKeywords: ['keywords'],
        categorySid: { id: 1 },
      },
      {
        sid: { id: 2 },
        displayName: 'dos',
        epKeywords: ['keywords'],
        categorySid: { id: 2 },
      },
      {
        sid: { id: 3 },
        displayName: 'tres',
        epKeywords: ['keywords'],
        categorySid: { id: 3 },
      },
    ];
    const categories: Category[] = [
      { sid: { id: 1 }, name: 'one' },
      { sid: { id: 2 }, name: 'two' },
      { sid: { id: 3 }, name: 'three' },
    ];
    const categoryMap = new Map<number, string>([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    render(
      <MantineProvider>
        <FeaturesDisplay features={allFeatures} categories={categories} categoryMap={categoryMap} lastPage={1} perPage={20}/>
      </MantineProvider>
    );
    await userEvent.click(screen.getByRole('textbox', { name: 'Category' }));

    // Get option by its label and click it
    await userEvent.click(screen.getByRole('option', { name: 'three' }));

    await waitFor(() => {
      expect(screen.getByText('tres')).toBeInTheDocument();
      expect(screen.queryByText('dos')).toBeNull();
      expect(screen.queryByText('uno')).toBeNull();
    });
  });

  test('it should use the map when returning to old category that has already been queried', async () => {
    const allFeatures: Feature[] = [
      {
        sid: { id: 1 },
        displayName: 'uno',
        epKeywords: ['keywords'],
        categorySid: { id: 1 },
      },
      {
        sid: { id: 2 },
        displayName: 'dos',
        epKeywords: ['keywords'],
        categorySid: { id: 2 },
      },
      {
        sid: { id: 3 },
        displayName: 'tres',
        epKeywords: ['keywords'],
        categorySid: { id: 3 },
      },
    ];
    const categories: Category[] = [
      { sid: { id: 1 }, name: 'one' },
      { sid: { id: 2 }, name: 'two' },
      { sid: { id: 3 }, name: 'three' },
    ];
    const categoryMap = new Map<number, string>([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    render(
      <MantineProvider>
        <FeaturesDisplay features={allFeatures} categories={categories} categoryMap={categoryMap} lastPage={1} perPage={20}/>
      </MantineProvider>
    );

    //click category three
    await userEvent.click(screen.getByRole('textbox', { name: 'Category' }));
    await userEvent.click(screen.getByRole('option', { name: 'three' }));

    //click category three again to erase category filter
    await userEvent.click(screen.getByRole('textbox', { name: 'Category' }));
    await userEvent.click(screen.getByRole('option', { name: 'three' }));

    //click category three again to use map filter
    await userEvent.click(screen.getByRole('textbox', { name: 'Category' }));
    await userEvent.click(screen.getByRole('option', { name: 'three' }));

    await waitFor(() => {
      expect(screen.getByText('tres')).toBeInTheDocument();
      expect(screen.queryByText('dos')).toBeNull();
      expect(screen.queryByText('uno')).toBeNull();
    });
  });

  test('it should set the last page to 1 when no features in the search query', async () => {
    const allFeatures: Feature[] = [
      {
        sid: { id: 1 },
        displayName: 'uno',
        epKeywords: ['keywords'],
        categorySid: { id: 1 },
      },
      {
        sid: { id: 2 },
        displayName: 'dos',
        epKeywords: ['keywords'],
        categorySid: { id: 2 },
      },
      {
        sid: { id: 3 },
        displayName: 'tres',
        epKeywords: ['keywords'],
        categorySid: { id: 3 },
      },
    ];
    const categories: Category[] = [
      { sid: { id: 1 }, name: 'one' },
      { sid: { id: 2 }, name: 'two' },
      { sid: { id: 3 }, name: 'three' },
    ];
    const categoryMap = new Map<number, string>([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    render(
      <MantineProvider>
        <FeaturesDisplay features={allFeatures} categories={categories} categoryMap={categoryMap} lastPage={0} perPage={20}/>
      </MantineProvider>
    );

    const textbox = screen.getByRole('textbox', { name: 'Search' });
    await userEvent.type(textbox, 'you wont find this one');

    await waitFor(() => {
      expect(screen.getByText('Your search returned no results')).toBeInTheDocument();
    });
  });
});
