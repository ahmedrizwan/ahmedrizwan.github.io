import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import { useColorMode, Flex, IconButton } from '@chakra-ui/core';
import styled from '@emotion/styled';

import Footer from './Footer';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const isAtHome = router.asPath === "/";

  const bgColor = {
    light: 'white',
    dark: 'rgb(18, 24, 38)'
  };
  const primaryTextColor = {
    light: 'black',
    dark: 'white'
  };
  const navBgColor = {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgb(18, 24, 38, 0.9)'
  };

  return (
    <>
      <StickyNav
        flexDirection="row"
        justifyContent={isAtHome ? "flex-end" : "space-between"}
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={4}
        mb={0}
        mx="auto"
      >
        {!isAtHome ? <NextLink href="/" passHref>
            <IconButton
                aria-label="Navigate back to home"
                style={{
                    backgroundColor: 'transparent',
                    color: colorMode === 'dark' ? 'rgb(251, 225, 76)' : 'rgb(24, 143, 242)',
                    fontSize: 24
                }}
                icon="arrow-back"
            />
        </NextLink> : undefined}

        <IconButton
            aria-label="Toggle dark mode"
            style={{
              backgroundColor: 'transparent',
              color: colorMode === 'dark' ? 'rgb(251, 225, 76)' : 'rgb(24, 143, 242)',
              fontSize: 24,
            }}
            icon={colorMode === 'dark' ? 'sun' : 'moon'}
            onClick={toggleColorMode}
        />
      </StickyNav>
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={primaryTextColor[colorMode]}
        px={8}
      >
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Container;
