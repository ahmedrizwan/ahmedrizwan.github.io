import React from 'react';
import { NextSeo } from 'next-seo';
import {
  useColorMode,
  Heading,
  Flex,
  Stack,
} from '@chakra-ui/core';

import Timeline from '../components/Timeline';
import Container from '../components/Container';

const url = 'https://ahmedrizwan.com/talks';
const title = 'Talks – Ahmed Rizwan';

const About = () => {
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
							Talks
            </Heading>
						<Timeline />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default About;
