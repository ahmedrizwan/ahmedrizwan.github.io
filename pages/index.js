import React from 'react';
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core';

import Container from '../components/Container';
import Emoji from '../components/Emoji';
import { CustomLink } from '../components/MDXComponents';

const Index = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

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
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            Hey <Emoji symbol="👋" label="wave" />, I'm Ahmed Rizwan
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            I’m a Senior Software Engineer{' '}
            <CustomLink href="https://www.quixel.com">
              @quixel
            </CustomLink>
            , writer and a public speaker. I write mostly on Android and Web.
            This is my personal blog site.
          </Text>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;
