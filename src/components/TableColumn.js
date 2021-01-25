

const TableColumn = ({ epoch, value }) => {
  if (value === 'startBlock' || value === 'endBlock') {
    return (
      `#${epoch[value]}`
    );
  } else if (value === 'queryFeeRebates' || value === 'totalRewards') {
    return (
      `${Math.round(epoch[value] / Math.pow(10, 18))} GRT `
    )
  }
  return `${epoch[value]}`
}

export default TableColumn;