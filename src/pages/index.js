/** @jsxImportSource theme-ui */

import { Box, Button, jsx } from 'theme-ui'
import { useState, useMemo, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../apollo/client'
import Layout from '../components/Layout'

import { SearchIcon } from '../icons/search.js'
import { DirectionUp } from '../icons/direction-up'
import { DirectionDown } from '../icons/direction-down'
import { EPOCHES_QUERY } from '../apollo/queries'

const Index = () => {
  return (
    <Box>
      <Box
        sx={{
          py: '5rem',
          px: '2rem',
        }}
      >
        <Layout>
          <Table />
        </Layout>
      </Box>
    </Box>
  )
}

function SearchBar({ value, setValue }) {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '2rem',
      }}
    >
      {/* TODO: Check if there is a better semantic element */}
      <div
        sx={{
          height: '100%',
          width: '1px',
          bg: 'white',
          mx: '1rem',
        }}
      />
      <SearchIcon />
      <input
        aria-label="filter epoches"
        sx={{
          bg: 'transparent',
          border: 'none',
          color: 'white',
          ':focus': {
            outline: 'none',
          },
        }}
        type="text"
        placeholder="Search"
        value={value}
        onChange={setValue}
      />
    </div>
  )
}

function Table() {
  const [{ orderBy, orderDirection }, setOrder] = useState({
    orderBy: 'startBlock',
    orderDirection: 'asc',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [limit, setLimit] = useState(3) // TODO: convert this to part of the GraphQL query
  const { loading, error, data, fetchMore } = useQuery(EPOCHES_QUERY, {
    variables: {
      orderBy,
      orderDirection,
    },
  })

  function handleSetOrder(orderBy) {
    setOrder((prev) => {
      // clicking the same order by flips the direction,
      // no order by is always asc first
      if (prev.orderBy === orderBy) {
        const orderDirection = prev.orderDirection === 'asc' ? 'desc' : 'asc'
        return { orderBy, orderDirection }
      } else {
        return { orderBy, orderDirection: 'asc' }
      }
    })
  }

  // TODO: make better error handling, unfortunately not in the design though
  if (error) return <p>There was an error!</p>

  // this is not at all optimized, mostly because this likely needs to be done through GraphQL, and possibly with debouncing.
  // even with doing it in line, there are certainly ways to improve this
  const epochs = loading
    ? []
    : data.epoches.filter(({ id, startBlock, endBlock }) => {
        return (
          String(id).includes(searchTerm) ||
          String(startBlock).includes(searchTerm) ||
          String(endBlock).includes(searchTerm)
        )
      })

  return (
    <>
      <header
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1
          sx={{
            m: 0,
          }}
        >
          Epochs
        </h1>
        <SearchBar
          value={searchTerm}
          setValue={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </header>
      <section
        sx={{
          mt: '2rem',
          display: 'grid',
          minWidth: '700px',
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}
      >
        <TableHeaderButton
          onClick={() => handleSetOrder('id')}
          selected={orderBy === 'id'}
          orderDirection={orderDirection}
        >
          Epoch
        </TableHeaderButton>
        <TableHeaderButton
          onClick={() => handleSetOrder('startBlock')}
          selected={orderBy === 'startBlock'}
          orderDirection={orderDirection}
        >
          Start Block
        </TableHeaderButton>
        <TableHeaderButton
          onClick={() => handleSetOrder('endBlock')}
          selected={orderBy === 'endBlock'}
          orderDirection={orderDirection}
        >
          End Block
        </TableHeaderButton>
        <TableHeaderButton
          onClick={() => handleSetOrder('queryFeeRebates')}
          selected={orderBy === 'queryFeeRebates'}
          orderDirection={orderDirection}
        >
          Query Fees
        </TableHeaderButton>
        <TableHeaderButton
          selected={orderBy === 'totalRewards'}
          selected={orderBy === 'totalRewards'}
          orderDirection={orderDirection}
        >
          Total Rewards
        </TableHeaderButton>

        {epochs
          .slice(0, limit)
          .map(({ id, startBlock, endBlock, queryFeeRebates, totalRewards }) => (
            <Fragment key={id}>
              <TableCell selected={orderBy === 'id'}>{id}</TableCell>
              <TableCell selected={orderBy === 'startBlock'}>#{startBlock}</TableCell>
              <TableCell selected={orderBy === 'endBlock'}>#{endBlock}</TableCell>
              <GRTCell selected={orderBy === 'queryFeeRebates'}>
                {formatNumber(queryFeeRebates)}
              </GRTCell>
              <GRTCell selected={orderBy === 'totalRewards'}>
                {formatNumber(totalRewards)}
              </GRTCell>
            </Fragment>
          ))}
      </section>

      <Count>
        {Math.min(limit, epochs.length)} / {epochs.length}
      </Count>
      <div
        sx={{
          display: 'flex',
          justifyItems: 'center',
          mt: '2rem',
        }}
      >
        {limit < epochs.length ? (
          <LoadMoreButton
            onClick={() => setLimit((prev) => Math.min(prev + 3, epochs.length))}
          >
            Load More
          </LoadMoreButton>
        ) : null}
      </div>
    </>
  )
}

function TableHeaderButton({ onClick, selected, orderDirection, children }) {
  let focusState = 'hover'

  return (
    <button
      onClick={onClick}
      sx={{
        bg: 'transparent',
        color: 'white', // TODO: figure out how to use theme colors
        border: 'none',
        fontFamily: 'heading',
        textTransform: 'uppercase',
        textAlign: 'left',
        pl: '1rem',
        py: '1rem',
        '--border-opacity': selected ? '1' : '0.2',
        ':hover': {
          '--border-opacity': '0.5',
        },
        ':focus': {
          '--border-opacity': '1',
        },
        borderBottom: '2px solid rgba(255, 255, 255, var(--border-opacity))',
      }}
    >
      {children}
      {selected ? <Direction orderDirection={orderDirection} /> : null}
    </button>
  )
}

function Direction({ orderDirection }) {
  return (
    <span
      sx={{
        ml: '0.5rem',
      }}
    >
      {orderDirection === 'asc' ? <DirectionUp /> : <DirectionDown />}
    </span>
  )
}

function TableRow({ id, startBlock, endBlock, queryFeeRebates, totalRewards }) {
  return (
    <>
      <span>{id}</span>
    </>
  )
}

function TableCell({ selected, children }) {
  return (
    <span
      sx={{
        color: selected ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)', // TODO: figure out how to use theme colors
        border: 'none',
        fontFamily: 'body',
        textAlign: 'left',
        pl: '1rem',
        py: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {children}
    </span>
  )
}

function GRTCell({ selected, children }) {
  return (
    <span
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: selected ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)', // TODO: figure out how to use theme colors
        border: 'none',
        fontFamily: 'heading',
        textTransform: 'uppercase',
        textAlign: 'left',
        pl: '1rem',
        py: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {children}
      <span
        sx={{
          fontSize: '0.5rem',
          pl: '0.5rem',
        }}
      >
        GRT
      </span>
    </span>
  )
}

function LoadMoreButton({ onClick, children }) {
  return (
    <button
      sx={{
        mx: 'auto',
        bg: 'transparent',
        color: 'white', // TODO: figure out how to use theme colors
        border: 'none',
        fontFamily: 'heading',
        textAlign: 'left',
        p: '1rem',
        border: '1px solid rgba(100,93,153,1)',
        borderRadius: '8px',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Count({ children }) {
  return (
    <span
      sx={{
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        color: 'GrayText',
        border: 'none',
        fontFamily: 'heading',
        textAlign: 'left',
        pl: '1rem',
        py: '1rem',
      }}
    >
      {children}
    </span>
  )
}

function formatNumber(number) {
  const n = Number(number)
  return n === 0 ? 0 : Math.round((n / 10) ^ 18)
}

export default withApollo(Index, { ssr: false })
