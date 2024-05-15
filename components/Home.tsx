'use client';
import { useEffect, useState } from 'react';
import data from '../FeaturesEndpointResponse.json';
import { Feature } from '../models/Features';
import FeaturesDisplay from './FeaturesDisplay';
import { Filters } from '../models/Filters';
import { Category } from '../models/Category';
import { quickSort } from '@/util/Quicksort';
import Show from './Show/Show';
import { LoadingOverlay } from '@mantine/core';

const Home = () => {
  const categoryData = data.data.featureCategories;
  const featuresData = quickSort(data.data.features);
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [featureCount, setFeatureCount] = useState<number>(0);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [map, setMap] = useState<Map<string, Feature[]>>(new Map());
  const [categoryMap, setCategoryMap] = useState<Map<number, string>>(new Map());
  const [filters, setFilters] = useState<Filters>({
    s: '',
    page: 1,
    count: 0,
    category: '0',
  });
  const [lastPage, setLastPage] = useState(0);
  const perPage = 20;

  useEffect(() => {
    setLastPage(Math.floor(featuresData / perPage));
    setAllFeatures(featuresData);
    setFilteredFeatures(featuresData.slice(0, perPage));
    setCategories(categoryData);
    categoryData.map((category) =>
      setCategoryMap((map) => new Map(map.set(category.sid.id, category.name)))
    );
  }, []);

  const getLastPage= (features: Feature[]) => {
    return Math.ceil(features.length / perPage);
  }

  const filterFeatures = (features: Feature[]) => {
    if (filters.category !== '0' && filters.category !== null) {
      if (map.has(filters.category + filters.s)) {
        features = map.get(filters.category + filters.s)!;
      } else {
        features = features.filter((f) => f.categorySid.id === parseInt(filters.category));
        setMap((map) => new Map(map.set(filters.category + filters.s, features)));
      }
    }
    if (filters.s !== '') {
      features = features.filter(
        (f) =>
          f.displayName.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
          f.epKeywords.find(
            (keyword) => keyword.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
          )
      );
    }
    return features;
  }

  

  useEffect(() => {
    if(!!allFeatures){
      const features = filterFeatures(allFeatures)
      setFilteredFeatures(features.slice(filters.count, filters.page * perPage));
      if (filterFeatures.length === 0) setLastPage(1);
      else setLastPage(getLastPage(features));
      setFeatureCount(features.length);
    }
  }, [filters, allFeatures]);

  return (
    <>
    <Show when={!allFeatures.length}>
      <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    </Show>
    <FeaturesDisplay
      features={filteredFeatures}
      filters={filters}
      featureCount={featureCount}
      setFilters={setFilters}
      lastPage={lastPage}
      categories={categories}
      categoryMap={categoryMap}
    />
    </>
    
  );
};

export default Home;
