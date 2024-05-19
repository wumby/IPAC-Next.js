import featuresData from '@/FeaturesEndpointResponse.json'
import FeaturesDisplay from '@/components/FeaturesDisplay/FeaturesDisplay';
import { quickSort } from '@/util/Quicksort';
const FeaturesPage = () => {
    const features = quickSort(featuresData.data.features);
    const categories = featuresData.data.featureCategories;
    const categoryMap: Map<number,string> = new Map();
    categories.map(category =>categoryMap.set(category.sid.id, category.name));
  return (
    <>
       <FeaturesDisplay features={features} categories={categories} categoryMap={categoryMap}/>
    </>
  );
};

export default FeaturesPage;
