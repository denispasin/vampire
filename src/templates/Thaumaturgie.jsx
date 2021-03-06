// @flow

import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { thaumaturgyPathToPath } from '../utils';
import Disciplines from '../styles/Disciplines';
import DisciplineLevel from '../components/DisciplineLevel';
import SectionHeader from '../styles/SectionHeader';

import type { DisciplineType } from '../types/DisciplineTypes';

const Thaumaturgie = ({
  pageContext,
  data,
}: {
  pageContext: { discipline: string },
  data: { allDisciplinesJson: { edges: [{ node: DisciplineType }] } },
}) => {
  const { discipline } = pageContext;
  const paths = Array.from(
    new Set(data.allDisciplinesJson.edges.map(node => node.node.subname))
  )
    .filter(e => e !== '')
    .sort();
  const powers = data.allDisciplinesJson.edges
    .map(node => node.node)
    .filter((e: DisciplineType) => e.level === 0 && e.subname === '');

  return (
    <Layout>
      <SEO title={discipline} />
      <SectionHeader>{discipline}</SectionHeader>
      <ul>
        <DisciplineLevel level={{ level: '0', powers }} />
      </ul>
      <Disciplines>
        {paths.map((path: string) => (
          <li key={path}>
            <Link to={thaumaturgyPathToPath(discipline, path)}>{path}</Link>
          </li>
        ))}
      </Disciplines>
    </Layout>
  );
};

export default Thaumaturgie;

export const query = graphql`
  query($discipline: String!) {
    allDisciplinesJson(filter: { name: { eq: $discipline } }) {
      edges {
        node {
          subname
          title
          description
          level
          source
          extra_table
          extra_table_two
        }
      }
    }
  }
`;
