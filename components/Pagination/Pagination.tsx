import { Filters } from '@/models/Filters';
import { Button, Flex } from '@mantine/core';
import { FastArrowLeft, FastArrowRight, NavArrowLeft, NavArrowRight } from 'iconoir-react';

const Pagination = (props: {
  filters: Filters;
  lastPage: number;
  setFilters: (filters: Filters) => void;
  featureCount: number;
  perPage: number;
}) => {
  const next = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page + 1,
      count: props.filters.count + props.perPage,
    });
  };

  const prev = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page - 1,
      count: props.filters.count - props.perPage,
    });
  };
  const first = () => {
    props.setFilters({
      ...props.filters,
      page: 1,
      count: 0,
    });
  };

  const last = () => {
    props.setFilters({
      ...props.filters,
      page: props.lastPage,
      count: props.featureCount - (props.featureCount % props.perPage === 0 ? props.perPage : props.featureCount % props.perPage),
    });
  };

  return (
    <Flex justify={'center'} align={'center'} style={{ width: '100%' }} m={'sm'}>
      <Button aria-label="first page" disabled={props.filters.page <= 1} onClick={first} mr={'lg'}>
        <FastArrowLeft></FastArrowLeft>
      </Button>
      <Button
        aria-label="previous page"
        disabled={props.filters.page <= 1}
        onClick={prev}
        mr={'lg'}
      >
        <NavArrowLeft></NavArrowLeft>
      </Button>
      <h3>{props.filters.page}</h3>
      <Button
        aria-label="next page"
        disabled={props.filters.page >= props.lastPage}
        onClick={next}
        ml={'lg'}
      >
        <NavArrowRight></NavArrowRight>
      </Button>
      <Button
        aria-label="last page"
        disabled={props.filters.page >= props.lastPage}
        onClick={last}
        ml={'lg'}
      >
        <FastArrowRight></FastArrowRight>
      </Button>
    </Flex>
  );
};
export default Pagination;
