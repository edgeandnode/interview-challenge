import { Box, Grid, Image } from 'theme-ui';

const TableHead = ({ query, setQuery, refetch }) => {
  const columns = [
    { id: 'id', value: 'ID' },
    { id: 'startBlock', value: 'START BLOCK' },
    { id: 'endBlock', value: 'END BLOCK' },
    { id: 'queryFeeds', value: 'QUERY FEES' },
    { id: 'totalRewards', value: 'TOTAL REWARDS' },
  ];
  const sort = (column) => {
    if (query.orderBy === column.id) {
      setQuery({...query, orderBy: column.id, orderDirection: query.orderDirection === 'asc' ? 'desc': 'asc'});
    } else {
      setQuery({...query, orderBy: column.id, orderDirection: 'desc' });
    }
  }

  return (
    <Grid gap={2} columns={[2, null, 5]}>
      { columns.map((column) => (
        <Box key={column.id}>
          <Box
            sx={{ 
              cursor: 'pointer'
             }}
            onClick={() => sort(column)}
          >
              {column.value}
              {query.orderBy === column.id && (
                <Image 
                  src={query.orderDirection === 'asc' ? 'images/Direction-Up.svg' : 'images/Direction-Down.svg'}
                  variant={query.orderDirection === 'asc' ? 'up-arrow': 'down-arrow'}
                ></Image>
              )}
          </Box>
        </Box>
      ))}
    </Grid>
  )
}

export default TableHead;