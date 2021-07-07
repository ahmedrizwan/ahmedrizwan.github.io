import React, {useState} from 'react';
import {useColorMode, Heading, Text, Flex, Stack, InputGroup, Input, InputRightElement, Icon} from '@chakra-ui/core';

import Container from '../components/Container';
import Emoji from '../components/Emoji';
import { CustomLink } from '../components/MDXComponents';
import BlogPost from "../components/BlogPost";

import { frontMatter as blogPosts } from './blog/*.mdx';

const Index = () => {
  const [searchValue, setSearchValue] = useState('');

  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  const filteredBlogPosts = blogPosts
      .sort(
          (a, b) =>
              Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
      )
      .filter((frontMatter) =>
          frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
      );

  return (
    <Container>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          {/* Introduction */}
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            Hey <Emoji symbol="👋" label="wave" />, I'm Ahmed Rizwan
          </Heading>
          <Text color={secondaryTextColor[colorMode]} mt={2}>
            I’m a Lead Front-end Engineer at {' '}
            <CustomLink href="https://www.quixel.com">
              Quixel
            </CustomLink>
            ,
            {' '}
            <CustomLink href="/blog">
            writer
            </CustomLink>
            {' '}
            and a
            {' '}
            <CustomLink href="/speaking">

             public speaker
            </CustomLink>
            . I write mostly on Android and Web.
            This is my personal blog site.
          </Text>

          {/* Blogs */}
          <InputGroup my={4} mr={4} mt={10} w="100%">
            <Input
                aria-label="Search articles"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
            />
            <InputRightElement>
              <Icon name="search" color="gray.300" />
            </InputRightElement>
          </InputGroup>
          <Flex
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              maxWidth="700px"
              mt={2}
          >
            {!filteredBlogPosts.length && 'No posts found.'}
            {filteredBlogPosts.map((frontMatter) => (
                <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
          </Flex>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;
