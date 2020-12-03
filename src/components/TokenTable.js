import React, { useState, useEffect, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SprkTable, SprkTextInput } from '@sparkdesignsystem/spark-react';
import debounce from 'lodash/debounce';

const TokenTable = () => {
  const tokenData = useStaticQuery(
    graphql`
      query SassVars {
        allSassVarsJson {
          edges {
            node {
              description
              context {
                name
                value
              }
            }
          }
        }
      }
    `,
  );
  const sassVarData = tokenData.allSassVarsJson.edges.map((item) => ({
    name: item.node.context.name,
    value: item.node.context.value,
    description: item.node.description,
    flattenedData: [
      item.node.context.name,
      item.node.context.value,
      item.node.description,
    ]
      .join(' ')
      .toLowerCase(),
  }));

  const [filteredData, setFilteredData] = useState(sassVarData);
  const [query, setQuery] = useState('');

  // Wait for user to finish typing before filtering.
  const debouncedSetData = useCallback(
    debounce((data) => {
      setFilteredData(data);
    }, 1000),
  );

  useEffect(() => {
    // If no search query, set it to default
    if (query === '') {
      setFilteredData(sassVarData);
      return;
    }

    // Filter through data
    const getFilteredData = sassVarData.filter(({ flattenedData }) => {
      return flattenedData.includes(query.toLowerCase());
    });

    // Set data to display
    debouncedSetData(getFilteredData);
  }, [query]);

  return (
    <>
      <SprkTextInput
        label="Filter Through Token List:"
        name="text-input-label"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {filteredData.length <= 0 ? (
        <p>
          No results for
          <span className="sprk-u-FontStyle--italic">
            &nbsp;&lsquo;{query}&rsquo;
          </span>
          . Try another keyword.
        </p>
      ) : (
        <SprkTable
          additionalTableClasses="
         docs-b-Table--left-align-last
         sprk-b-Table--spacing-medium
         sprk-b-Table--striped-even
         sprk-u-TextAlign--right
       "
          columns={[
            {
              name: 'name',
              header: 'Token Name',
            },
            {
              name: 'value',
              header: 'Default Value',
            },
            {
              name: 'description',
              header: 'Description',
            },
          ]}
          rows={filteredData}
        />
      )}
    </>
  );
};

export default TokenTable;
