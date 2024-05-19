'use client';
import { useEffect, useState } from 'react';
import data from '../../FeaturesEndpointResponse.json';
import { Feature } from '../../models/Features';
import FeaturesDisplay from '../FeaturesDisplay/FeaturesDisplay';
import { Category } from '../../models/Category';
import { quickSort } from '@/util/Quicksort';
import Show from '../Show/Show';
import { LoadingOverlay } from '@mantine/core';

const Features = () => {
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Map<number, string>>(new Map());
  const perPage = 20;

  useEffect(() => {
    const categoryData = data.data.featureCategories;
    const featuresData = quickSort(data.data.features);
    setAllFeatures(featuresData);
    setCategories(categoryData);
    categoryData.map((category) =>
      setCategoryMap((map) => new Map(map.set(category.sid.id, category.name)))
    );
  }, []);

  return (
    <>
      <Show when={!allFeatures.length}>
        <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      </Show>
      <Show when={!!allFeatures.length}>
        <FeaturesDisplay
          perPage={perPage}
          allFeatures={allFeatures}
          categories={categories}
          categoryMap={categoryMap}
        />
      </Show>
    </>
  );
};

export default Features;
