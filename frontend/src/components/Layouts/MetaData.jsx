import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'

const MetaData = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  )
}

export default MetaData