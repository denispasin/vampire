// @flow

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import DisciplineLevel from '../components/DisciplineLevel';
import SectionHeader from '../styles/SectionHeader';
import LevelsLink from '../components/LevelsLink';
import type { PowerType } from '../types/DisciplineTypes';

const Discipline = ({
  pageContext,
  data,
}: {
  pageContext: { discipline: string },
  data: {
    allDisciplinesJson: {
      group: [{ fieldValue: number, edges: [{ node: PowerType }] }],
    },
  },
}) => {
  const { discipline } = pageContext;
  const disciplineData = data.allDisciplinesJson.group
    .map(group => ({
      level: group.fieldValue,
      powers: group.edges.map(e => e.node),
    }))
    .sort((a, b) => parseInt(a.level) - parseInt(b.level));

  return (
    <Layout>
      <SEO title={discipline} />
      <SectionHeader>{discipline}</SectionHeader>
      <LevelsLink data={disciplineData} />
      <ul>
        {disciplineData.map(level => (
          <DisciplineLevel level={level} />
        ))}
      </ul>
    </Layout>
  );
};

export default Discipline;

export const query = graphql`
  query($discipline: String!) {
    allDisciplinesJson(
      filter: { name: { eq: $discipline }, subname: { eq: "" } }
    ) {
      group(field: level) {
        fieldValue
        edges {
          node {
            title
            description
            source
            extra_table
            extra_table_two
          }
        }
      }
    }
  }
`;
