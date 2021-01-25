import { Box, Container, Spinner } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import EPOCHES_QUERY from '../apollo/queries'
import { withApollo } from '../apollo/client'
import Table from '../components/Table'
import LoadMore from '../components/LoadMore'

const Index = () => {
  const [query, setQuery] = useState({
    first: 3,
    orderBy: 'startBlock',
    orderDirection: 'asc',
    where: null,
	});
	console.log(setQuery);

  const { loading, error, data, refetch } = useQuery(EPOCHES_QUERY, {
    variables: query,
  })

  if (error) return `Error! ${error.message}`

  return (
    <Box>
      <Box
        sx={{
          pt: '48px',
          m: '0 auto',
          textAlign: 'center',
        }}
      >
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
							backgroundImage: 'url("images/Background@2x.jpg")',
							height: '100%',
							position: 'absolute',
							top: '0',
							width: '100%',
							paddingTop: '100px'
            }}
          >
            <Table data={data} query={query} setQuery={setQuery} refetch={refetch}/>
						<LoadMore query={query} setQuery={setQuery} refetch={refetch}/>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default withApollo(Index, { ssr: false })
