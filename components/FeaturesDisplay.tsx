import { useEffect, useMemo, useState } from 'react';
import { Feature } from '../models/Features';
import { Filters } from '../models/Filters';
import debounce from 'lodash.debounce';
import { Category } from '../models/Category';
import { Box, Flex, LoadingOverlay, Select, TextInput } from '@mantine/core';
import Show from './Show/Show';
import Pagination from './Pagination/Pagination';
import FeaturesCards from './FeaturesCards/FeaturesCards';
import { useDebouncedCallback, useDebouncedState } from '@mantine/hooks';

const FeaturesDisplay = (props: {
  features: Feature[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lastPage: number;
  featureCount: number;
  categories: Category[];
  categoryMap: Map<number, string>;
}) => {
  const DEBOUNCE_TIME_MS = 500;
  const categoryData = props.categories.map((item) => ({
    value: item.sid.id.toString(),
    label: item.name,
  }));

  const handleSearch = useDebouncedCallback(async (query: string) => {
    props.setFilters({
      ...props.filters,
      s: query,
      page: 1,
      count: 0,
    });
  }, DEBOUNCE_TIME_MS);

  const filterCategory = (category: string) => {
    props.setFilters({
      ...props.filters,
      category: category,
      page: 1,
      count: 0,
    });
  };

  return (
    <>
      <Flex justify={'space-evenly'} align={'center'} style={{ width: '100%' }}>
        <Select
          label={'Category'}
          data={categoryData}
          onChange={(value) => filterCategory(value!)}
          placeholder="Select Category"
        />
        <TextInput
          label={'Search'}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />
      </Flex>
      <Show when={props.features.length !== 0}>
        <Pagination
          filters={props.filters}
          featureCount={props.featureCount}
          lastPage={props.lastPage}
          setFilters={props.setFilters}
        ></Pagination>
        <FeaturesCards features={props.features} categoryMap={props.categoryMap} />
        <Pagination
          filters={props.filters}
          featureCount={props.featureCount}
          lastPage={props.lastPage}
          setFilters={props.setFilters}
        ></Pagination>
      </Show>
      <Show when={props.features.length === 0}>
        <h1>Your search returned no results</h1>
      </Show>
    </>
  );
};

export default FeaturesDisplay;
