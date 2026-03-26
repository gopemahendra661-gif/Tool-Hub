import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaProps {
  data: any;
}

export const Schema: React.FC<SchemaProps> = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};
