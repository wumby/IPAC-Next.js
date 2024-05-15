import { Feature } from '@/models/Features';
import { Flex, Paper } from '@mantine/core';
import Show from './Show';

const FeaturesCards = (props: { features: Feature[]; categoryMap: Map<number, string> }) => {
  return (
    <Flex justify={'center'} align={'center'} style={{ width: '100%' }} wrap={'wrap'}>
      {props.features.map((Features) => {
        return (
          <Flex
            style={{ minWidth: '50%' }}
            justify={'center'}
            align={'center'}
            m={'sm'}
            key={Features.sid.id}
          >
            <Paper withBorder p={'xs'} style={{ width: '100%' }}>
              <Flex justify={'center'} wrap={'wrap'}>
                <strong>{Features.displayName}</strong>
              </Flex>
              <Flex justify={'center'}>
                <span> Category: &nbsp;</span>
                <span>{props.categoryMap.get(Features.categorySid.id)}</span>
              </Flex>
              <Show when={!!Features.epKeywords.length}>
                <Flex justify={'center'} wrap={'wrap'}>
                  <span>Keywords: {Features.epKeywords.join(', ')}</span>
                </Flex>
              </Show>
            </Paper>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default FeaturesCards;
