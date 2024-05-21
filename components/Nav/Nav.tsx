import { Flex, Paper } from '@mantine/core';

const NavBar = () => {
  return (
    <Paper shadow="xs" mb={'lg'} style={{ width: '100%' }}>
      <Flex style={{ width: '100%' }} justify={'center'} align={'center'}>
        <h1>Biological Features</h1>
      </Flex>
    </Paper>
  );
};
export default NavBar;
