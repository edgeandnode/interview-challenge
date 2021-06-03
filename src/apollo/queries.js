import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches($orderBy: String, $orderDirection: String) {
    epoches(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
  }
`
