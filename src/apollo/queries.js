import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches {
    epoches {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
  }
`
