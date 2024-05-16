import { Filters } from '@/models/Filters';
import { Button, Flex } from '@mantine/core';
import { FastArrowLeft, FastArrowRight, NavArrowLeft, NavArrowRight } from 'iconoir-react';

const Pagination = (props: {
  filters: Filters;
  lastPage: number;
  setFilters: (filters: Filters) => void;
  featureCount: number;
}) => {

  const next = (filters: Filters) => {
    return {
      ...filters,
      page: filters.page + 1,
      count: filters.count + 20,
    };
  };

  const prev = (filters: Filters) => {
    return {
      ...filters,
      page: filters.page - 1,
      count: filters.count - 20,
    };
  };

  const first = (filters: Filters) => {
    return{
      ...filters,
      page: 1,
      count: 0,
    };
  };

  const last = (filters: Filters,lastPage: number, featureCount:number) => {
    return{
      ...filters,
      page: lastPage,
      count: featureCount - (featureCount % 20 === 0 ? 20 : featureCount % 20),
    };
  };

  return (
    <Flex justify={'center'} align={'center'} style={{ width: '100%' }} m={'sm'}>
      <Button disabled={props.filters.page <= 1} onClick={() => props.setFilters(first(props.filters))} mr={'lg'}>
        <FastArrowLeft></FastArrowLeft>
      </Button>
      <Button disabled={props.filters.page <= 1} onClick={() => props.setFilters(prev(props.filters))} mr={'lg'}>
        <NavArrowLeft></NavArrowLeft>
      </Button>
      <h3>{props.filters.page}</h3>
      <Button disabled={props.filters.page >= props.lastPage} onClick={() => props.setFilters(next(props.filters))} ml={'lg'}>
        <NavArrowRight></NavArrowRight>
      </Button>
      <Button disabled={props.filters.page >= props.lastPage} onClick={() => props.setFilters(last(props.filters,props.lastPage, props.featureCount))} ml={'lg'}>
        <FastArrowRight></FastArrowRight>
      </Button>
    </Flex>
  );
};
export default Pagination;
