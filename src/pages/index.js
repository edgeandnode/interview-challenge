/** @jsxImportSource theme-ui */

import { Box, jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../apollo/client'
import Layout from '../components/Layout'

import { SearchIcon } from '../icons/Search.js'

const Index = () => {
  return (
    <Box>
      <Box
        sx={{
          py: '5rem',
          px: '2rem',
          border: '1px solid red',
        }}
      >
        <div
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
            />
          </div>
        </div>
        <Layout>Put some stuff in here</Layout>
      </Box>
    </Box>
  )
}

export default withApollo(Index, { ssr: false })
