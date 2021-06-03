import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches {
    epoches(orderBy: startBlock, orderDirection: asc) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
  }
`
