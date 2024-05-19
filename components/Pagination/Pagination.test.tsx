import { Filters } from '@/models/Filters';
import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Pagination Component', () => {
  test('it goes to last page when last page clicked', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 1, count: 40, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={3} featureCount={50} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'last page' }));
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('it goes to last page when last page clicked and theres an even amount of features', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 1, count: 40, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={3} featureCount={40} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'last page' }));
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('it goes to next page when next button clicked', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 1, count: 0, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={3} featureCount={50} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'next page' }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('it goes to previous page when previous button clicked', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 3, count: 40, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={3} featureCount={50} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'previous page' }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('it goes to first page when first button clicked', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 3, count: 40, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={3} featureCount={50} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'first page' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('it disables all buttons when there is one page of features', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 1, count: 0, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={1} featureCount={1} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    expect(screen.getByRole('button', { name: 'previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'first page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'next page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'last page' })).toBeDisabled();
  });

  test('it disables only back buttons when on first page', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 1, count: 0, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={2} featureCount={24} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    expect(screen.getByRole('button', { name: 'previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'first page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'next page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'last page' })).toBeEnabled();
  });

  test('it disables only next buttons when on last page', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 2, count: 20, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={1} featureCount={24} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    expect(screen.getByRole('button', { name: 'previous page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'first page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'next page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'last page' })).toBeDisabled();
  });

  test('it enables all buttons when on middle page', async () => {
    const PaginationWrapper = () => {
      const [filters, setFilters] = useState<Filters>({ s: '', page: 2, count: 20, category: '0' });
      return (
        <>
          <Pagination filters={filters} lastPage={4} featureCount={80} setFilters={setFilters} />
        </>
      );
    };
    render(
      <MantineProvider>
        <PaginationWrapper />
      </MantineProvider>
    );

    expect(screen.getByRole('button', { name: 'previous page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'first page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'next page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'last page' })).toBeEnabled();
  });
});
