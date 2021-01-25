import { gql } from 'apollo-boost'

const EPOCHES_QUERY = gql`
	query epoches($first: Int, $orderBy: Epoch_orderBy, $orderDirection: OrderDirection, $where: Epoch_filter) {
		epoches(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
			id
			startBlock
			endBlock
			queryFeeRebates
			totalRewards	
		}
	}
`
export default EPOCHES_QUERY;