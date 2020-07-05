import React from 'react';
import { NextSeo } from 'next-seo';
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core';

import Timeline from '../components/Timeline';
import Container from '../components/Container';

const url = 'https://ahmedrizwan.com/talks';
const title = 'Speaking – Ahmed Rizwan';

const Speaking = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
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
            maxWidth="700p"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Speaking
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              These are some of the talks I have given in recent times.
            </Text>
            <Timeline />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Speaking;
