import React from 'react'
import RevenueChart from '../component/dashHome/RevenuuesChart'
import Status from '../component/dashHome/Status'

type Props = {}

const DasboardHome = (props: Props) => {
  return (
 <>
    <Status />
    <RevenueChart />
    </>
  )
}

export default DasboardHome