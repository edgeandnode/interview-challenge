import { Flex, Button } from 'theme-ui';

const LoadMore = ({query, setQuery, refetch}) => {
  
  const loadMore = () => {
    console.log('Loading More....');
    setQuery({...query, first: query.first + 3})
  }

  return (
    <Flex>
      <Button onClick={() => loadMore()}
        sx={{
          border: '1px solid rgb(111, 76, 255)',
          padding: '15px 25px',
          color: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '4px',
          background: 'rgba(111, 76, 255, 0.1)',
          fontFamily: 'EuclidCircular, Arial',
          fontWeight: 600,
          fontSize: '0.875rem',
          lineHeight: '1rem',
          letterSpacing: '0.4px',
          transition: 'all 0.3s ease 0s',
          pointerEvents: 'all',
          opacity: 1,
          width: '100%',
          maxWidth: '180px',
          boxShadow: 'none',
          marginTop: '40px',
        }}
      >
        Load More
      </Button>
    </Flex>
  );
}

export default LoadMore;