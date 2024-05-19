import { Flex } from '@mantine/core';
import Nav from '@/components/Nav/Nav';
import Home from '@/components/Features/Features';
import Features from '@/components/Features/Features';

export default function HomePage() {
  return (
    <Flex justify={'center'} wrap={'wrap'}>
      <Nav />
      <Features />
    </Flex>
  );
}
