import React from 'react';
import { Flex, Link, IconButton } from '@chakra-ui/core';

const Footer = () => (
  <Flex justify="center" mb={4}>
    <Link href="https://twitter.com/sudo_rizwan" title="Twitter" isExternal>
      <IconButton
        aria-label="Twitter"
        icon="twitter"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href="https://github.com/ahmedrizwan" title="GitHub" isExternal>
      <IconButton
        aria-label="GitHub"
        icon="github"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href="https://www.medium.com/@ahmedrizwan" title="Medium" isExternal>
      <IconButton
        aria-label="Medium"
        icon="medium"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link
      href="https://www.linkedin.com/in/ahmedrz/"
      title="LinkedIn"
      isExternal
    >
      <IconButton
        aria-label="LinkedIn"
        icon="linkedin"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href="mailto:ahmedrizwan@outlook.com" title="Email" isExternal>
      <IconButton
        aria-label="Email"
        icon="mail"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
  </Flex>
);

export default Footer;
