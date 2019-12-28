// @flow strict
import React from "react";
import Author from "../components/Sidebar/Author";
import Contacts from "../components/Sidebar/Contacts"
import Layout from "../components/Layout";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";

const NotFoundTemplate = () => {
  const { author, title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Page title="NOT FOUND">
        <Author author={author} isIndex={true} />
        <Contacts contacts={author.contacts} />
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
