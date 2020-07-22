import React from 'react';
import { parseISO, format } from 'date-fns';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
  Link,
  Box
} from '@chakra-ui/core';

import Container from '../components/Container';
import BlogSeo from '../components/BlogSeo';

const editUrl = (slug) =>
  `https://github.com/ahmedrizwan/ahmedrizwan.com/edit/master/pages/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://ahmedrizwan.com/blog/${slug}`
  )}`;

export default (frontMatter) => {
  const slug = frontMatter.__resourcePath
    .replace('blog/', '')
    .replace('.mdx', '');

  return ({ children }) => {
    const { colorMode } = useColorMode();
    const textColor = {
      light: 'gray.700',
      dark: 'gray.400'
    };

    return (
      <Container>
        <BlogSeo slug={slug} {...frontMatter} />
        <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
          w="100%"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            w="100%"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              {frontMatter.title}
            </Heading>
            <Flex
              justify="space-between"
              align={['initial', 'center']}
              direction={['column', 'row']}
              mt={2}
              w="100%"
              mb={4}
            >
              <Flex align="center">
                <Avatar size="xs" name="Ahmed Rizwan" mr={2} color="black" />
                <Text fontSize="sm" color={textColor[colorMode]}>
                  {frontMatter.by}
                  {'Ahmed Rizwan / '}
                  {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" mt={[2, 0]}>
                {frontMatter.readingTime.text}
              </Text>
            </Flex>
          </Flex>
          {children}
          <Box>
            <Link href={discussUrl(slug)} isExternal>
              {'Discuss on Twitter'}
            </Link>
            {` • `}
            <Link href={editUrl(slug)} isExternal>
              {'Edit on GitHub'}
            </Link>
          </Box>
        </Stack>
      </Container>
    );
  };
};
