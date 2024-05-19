'use client';
import { Feature } from '../../models/Features';
import { Filters } from '../../models/Filters';
import { Category } from '../../models/Category';
import { Flex, LoadingOverlay, Select, TextInput } from '@mantine/core';
import Show from '../Show/Show';
import Pagination from '../Pagination/Pagination';
import FeaturesCards from '../FeaturesCards/FeaturesCards';
import { useDebouncedCallback, useWindowScroll } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { features } from 'process';

const FeaturesDisplay = (props: {
  features: Feature[];
  categories: Category[];
  categoryMap: Map<number, string>;
}) => {
  const DEBOUNCE_TIME_MS = 500;
  const [, scrollTo] = useWindowScroll();
  const [lastPage, setLastPage] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    s: '',
    page: 1,
    count: 0,
    category: '0',
  });
  const [featureMap, setFeatureMap] = useState<Map<string, Feature[]>>(new Map());
  const [featureCount, setFeatureCount] = useState<number>(0);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>(props.features);
  const categoryData = props.categories.map((item) => ({
    value: item.sid.id.toString(),
    label: item.name,
  }));
  const perPage=20;

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setFilters({
      ...filters,
      s: query,
      page: 1,
      count: 0,
    });
  }, DEBOUNCE_TIME_MS);

  const filterCategory = (category: string) => {
    setFilters({
      ...filters,
      category: category,
      page: 1,
      count: 0,
    });
  };

  const getLastPage = (features: Feature[]) => {
    return Math.ceil(features.length / perPage);
  };

  const filterFeatures = (features: Feature[]) => {
    if (filters.category !== '0' && filters.category !== null) {
      if (featureMap.has(filters.category + filters.s)) {
        features = featureMap.get(filters.category + filters.s)!;
      } else {
        features = features.filter((f) => f.categorySid.id === parseInt(filters.category));
        setFeatureMap((map) => new Map(map.set(filters.category + filters.s, features)));
      }
    }
    if (!!filters.s.length) {
      features = features.filter(
        (f) =>
          f.displayName.toLowerCase().includes(filters.s.toLowerCase()) ||
          f.epKeywords.find((keyword) => keyword.toLowerCase().includes(filters.s.toLowerCase()))
      );
    }
    return features;
  };

  useEffect( () => {
    if (!!props.features) {
      const features = filterFeatures(props.features);
      setFeatureCount(features.length);
      setFilteredFeatures(features.slice(filters.count, filters.page * perPage));
      if (features.length === 0) setLastPage(1);
      else setLastPage(getLastPage(features));
      scrollTo({ y: 0 });
    }
  }, [filters, props.features]);

  useEffect(() => {
    console.log(lastPage)
  }, [lastPage]);

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
      <Show when={filteredFeatures.length !== 0}>
        <Pagination
          filters={filters}
          featureCount={featureCount}
          lastPage={lastPage}
          setFilters={setFilters}
        ></Pagination>
        <FeaturesCards features={filteredFeatures} categoryMap={props.categoryMap} />
        <Pagination
          filters={filters}
          featureCount={featureCount}
          lastPage={lastPage}
          setFilters={setFilters}
        ></Pagination>
      </Show>
      <Show when={filteredFeatures.length === 0}>
        <h1>Your search returned no results</h1>
      </Show>
    </>
  );
};

export default FeaturesDisplay;
