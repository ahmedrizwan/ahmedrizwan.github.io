// @flow strict
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Feed from "../components/Feed";
import Page from "../components/Page";
import Author from "../components/Sidebar/Author";
import Contacts from "../components/Sidebar/Contacts";
import Pagination from "../components/Pagination";
import { useSiteMetadata } from "../hooks";
import type { PageContext, AllMarkdownRemark } from "../types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../assets/scss/_tabs.scss";

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const IndexTemplate = ({ data, pageContext }: Props) => {
  const {
    author,
    title: siteTitle,
    subtitle: siteSubtitle
  } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Page>
        <Author author={author} isIndex={true} />
        <Contacts contacts={author.contacts} />

        <Tabs>
          <TabList>
            <Tab>Articles</Tab>
            <Tab>Talks</Tab>
            {/* <Tab>About Me</Tab> */}
            <Tab>Contact</Tab>
          </TabList>

          <TabPanel>
            <Feed edges={edges} />
            <Pagination
              prevPagePath={prevPagePath}
              nextPagePath={nextPagePath}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
            />
          </TabPanel>
        </Tabs>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
