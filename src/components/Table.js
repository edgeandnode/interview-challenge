import { Box } from 'theme-ui';
import Search from './Search';
import TableHead from './TableHead';
import TableRows from './TableRows';

const Table = ({data, query, setQuery, refetch}) => {
  return (
    <Box>
      <Search query={query} setQuery={setQuery} refetch={refetch} />
      <TableHead query={query} setQuery={setQuery} refetch={refetch} />
      <TableRows epoches={data.epoches} />
    </Box>  
  )
}

export default Table;