// @flow strict
import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Author from "../components/Sidebar/Author";
import Contacts from "../components/Sidebar/Contacts";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { useSiteMetadata, useCategoriesList } from "../hooks";

const CategoriesListTemplate = () => {
  const { author, title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Layout title={`Categories - ${title}`} description={subtitle}>
      <Page>
        <Author author={author} isIndex={true} />
        <Contacts contacts={author.contacts} />
        <p style={{ fontSize: 40 }}>Categories</p>
        <ul>
          {categories.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default CategoriesListTemplate;
