import { Feature } from '@/models/Features';
import { Flex, Paper } from '@mantine/core';

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
              <Flex justify={'center'} wrap={'wrap'}>
                {Features.epKeywords.map((keywords, index) => {
                  if (index === 0) {
                    return <span key={index}>Keywords: &nbsp;</span>;
                  }
                  if (index === Features.epKeywords.length - 1) {
                    return <span key={index}>{keywords} </span>;
                  }
                  return <span key={index}>{keywords},&nbsp; </span>;
                })}
              </Flex>
            </Paper>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default FeaturesCards;
