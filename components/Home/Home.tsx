'use client';
import { useEffect, useState } from 'react';
import data from '../../FeaturesEndpointResponse.json';
import { Feature } from '../../models/Features';
import FeaturesDisplay from '../FeaturesDisplay';
import { Filters } from '../../models/Filters';
import { Category } from '../../models/Category';
import { quickSort } from '@/util/Quicksort';
import Show from '../Show/Show';
import { LoadingOverlay } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

const Home = () => {
  const categoryData = data.data.featureCategories;
  const featuresData = quickSort(data.data.features);
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [featureCount, setFeatureCount] = useState<number>(0);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featureMap, setFeatureMap] = useState<Map<string, Feature[]>>(new Map());
  const [categoryMap, setCategoryMap] = useState<Map<number, string>>(new Map());
  const [filters, setFilters] = useState<Filters>({
    s: '',
    page: 1,
    count: 0,
    category: '0',
  });
  const [lastPage, setLastPage] = useState(0);
  const perPage = 20;
  const [, scrollTo] = useWindowScroll();

  useEffect(() => {
    setLastPage(Math.floor(featuresData / perPage));
    setAllFeatures(featuresData);
    setFilteredFeatures(featuresData.slice(0, perPage));
    setCategories(categoryData);
    categoryData.map((category) =>
      setCategoryMap((map) => new Map(map.set(category.sid.id, category.name)))
    );
  }, []);

  const getLastPage = (features: Feature[]) => {
    return Math.ceil(features.length / perPage);
  };

  const filterFeatures = (features: Feature[]) => {
    if (filters.category !== '0' && filters.category !== null) {
      if (featureMap.has(filters.category + filters.s)) {
        features = featureMap.get(filters.category +filters.s)!;
      } else {
        features = features.filter((f) => f.categorySid.id === parseInt(filters.category));
        setFeatureMap((map) => new Map(map.set(filters.category +filters.s, features)));
      }
    }
    if (!!filters.s.length) {
      features = features.filter(
        (f) =>
          f.displayName.toLowerCase().includes(filters.s.toLowerCase()) ||
          f.epKeywords.find(
            (keyword) => keyword.toLowerCase().includes(filters.s.toLowerCase())
          )
      );
    }
    return features;
  };

  useEffect(() => {
    if (!!allFeatures) {
      const features = filterFeatures(allFeatures);
      setFilteredFeatures(features.slice(filters.count, filters.page * perPage));
      if (filterFeatures.length === 0) setLastPage(1);
      else setLastPage(getLastPage(features));
      setFeatureCount(features.length);
      scrollTo({y:0});
    }
  }, [filters, allFeatures]);

  return (
    <>
      <Show when={!allFeatures.length}>
        <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      </Show>
      <Show when={!!allFeatures.length}>
      <FeaturesDisplay
        features={filteredFeatures}
        filters={filters}
        featureCount={featureCount}
        setFilters={setFilters}
        lastPage={lastPage}
        categories={categories}
        categoryMap={categoryMap}
      />
      </Show>
    </>
  );
};

export default Home;
