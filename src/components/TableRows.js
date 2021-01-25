import { Box, Grid } from 'theme-ui'
import TableColumn from './TableColumn'

const TableRows = ({ epoches }) => {
  const columns = ['id', 'startBlock', 'endBlock', 'queryFeeRebates', 'totalRewards']

  return epoches.map((epoch, index) => (
    <Grid gap={2} columns={[2, null, 5]}>
      {Object.keys(epoch).map((key, index) => (
        <Box key={index}>
          <Box>{columns.includes(key) && <TableColumn epoch={epoch} value={key} />}</Box>
        </Box>
      ))}
    </Grid>
  ))
}

export default TableRows
