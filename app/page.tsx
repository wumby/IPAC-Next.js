import { Flex } from '@mantine/core';
import Nav from '@/components/Nav/Nav';
import FeaturesPage from '@/app/Features';

export default function HomePage() {
  return (
    <Flex justify={'center'} wrap={'wrap'}>
      <Nav />
      <FeaturesPage />
    </Flex>
  );
}
