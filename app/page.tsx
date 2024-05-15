import { Flex } from '@mantine/core';
import Nav from '@/components/Nav/Nav';
import Home from '@/components/Home';

export default function HomePage() {
  return (
    <Flex justify={'center'} wrap={'wrap'}>
      <Nav />
      <Home />
    </Flex>
  );
}
