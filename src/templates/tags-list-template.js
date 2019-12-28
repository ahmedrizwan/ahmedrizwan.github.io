// @flow strict
import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Layout from "../components/Layout";
import Author from "../components/Sidebar/Author";
import Contacts from "../components/Sidebar/Contacts";
import Page from "../components/Page";
import { useSiteMetadata, useTagsList } from "../hooks";

const TagsListTemplate = () => {
  const { author, title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <Layout title={`Tags - ${title}`} description={subtitle}>
      <Page>
        <Author author={author} isIndex={true} />
        <Contacts contacts={author.contacts} />
        <p style={{ fontSize: 40 }}>Tags</p>
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsListTemplate;
