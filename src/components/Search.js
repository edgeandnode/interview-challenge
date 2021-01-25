import { Flex, Heading, Image, Input } from 'theme-ui'

const Search = ({ query, setQuery, refetch }) => {
  const search = (e) => {
    if (e.target.value.length > 0) {
      setQuery({...query, where: {startBlock: parseInt(e.target.value, 10)}});
    } else {
      setQuery({...query, where: null});    
    }
    
  }
  return (
    <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
      <Heading
        sx={{
          padding: '10px',
          margin: '0 0 0 45px',
        }}
      >
        Indexers
      </Heading>
      <Image src="images/search.svg"></Image>
      <Input
        defaultValue={(query.where !== null && query.where.startBlock !== '') ? query.where.startBlock : ''}
        sx={{
          border: 'none',
          height: '50%',
          width: '50%',
        }}
        autoFocus={query.where !== null}
        onChange={(e) => search(e)}
      />
    </Flex>
  )
}

export default Search
