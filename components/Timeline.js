import React, { useState } from 'react';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Link,
  List,
  ListItem,
  Icon,
  Stack,
  Divider
} from '@chakra-ui/core';

const YearDivider = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600'
  };

  return <Divider borderColor={borderColor[colorMode]} my={8} w="100%" />;
};

const TimelineStepTitle = ({ title, event, link }) => {
  return (
    <Flex align="center">
      {/* <Icon name="check-circle" mr={2} color="whatsapp.500" /> */}
      <Text fontWeight="medium">{title} — {event}</Text>
      {link && <Icon name="external-link" mx={2} size="16px" />}
    </Flex>
  );
};

const TimelineStep = ({ title, event, children, link }) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <ListItem>
      <Stack ml={0} mb={4}>
        {link ? (
          <Link display="flex" href={link} isExternal>
            <TimelineStepTitle title={title} event={event} link={link} />
          </Link>
        ) : (
          <TimelineStepTitle title={title} event={event} />
        )}
        <Text color={color[colorMode]}>{children}</Text>
      </Stack>
    </ListItem>
  );
};

const Timeline = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="700px"
      mt={8}
    >
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2020
      </Heading>
      <List>
        <TimelineStep
          title="Declarative UIs with Jetpack Compose"
					event="Devenings"
          link="http://facebook.com/deveningsGlobal/videos/329157298093960/"
        >
          A talk on how to build simple (and complex) UI layouts using the new
          Jetpack Compose library.
        </TimelineStep>
      </List>
      <YearDivider />
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2019
      </Heading>
      <List>
        <TimelineStep
          title="Kotlin for Java Developers"
					event="DevCon 19"
          link="https://www.facebook.com/events/510076783093299/"
        >
          Gave a talk to promote Kotlin as an alternative to Java for Android
          (and other platforms). Went over some of the language-specific
          features, android KTX examples and the potential of Kotlin
          multiplatform.
        </TimelineStep>
        <TimelineStep
          title="Writing Custom DSLs with Kotlin"
					event="Kotlin Everywhere"
          link="https://www.facebook.com/events/380525735959297/"
        >
          Described the characteristics of Domain Specific Language(s), both
          internal and external - with examples in the context of Kotlin &
          Android.
        </TimelineStep>
        <TimelineStep
          title="Leveraging Kotlin for App Development"
					event="Google I/O Extended"
          link="https://www.facebook.com/events/432103034235407/"
        >
          Gave a talk to promote Kotlin as a programming language for Android -
          describing in detail the benefits and the differences it has with
          Java.
        </TimelineStep>
        <TimelineStep
          title="Creating Robust Apps with Kotlin & Architecture Components"
					event="Kotlin Everywhere"
          link="https://www.facebook.com/events/1099937950198037/"
        >
          Gave an overview of Architecture Components and how it improves
          developer experience. Also introduced the audience to the upcoming
          changes that were introduced in Google I/O 19.
        </TimelineStep>
        <TimelineStep
          title="Real world Functional Programming with Kotlin"
					event="Devenings"
          link="https://speakerdeck.com/ahmedrizwan/real-world-functional-programming-with-kotlin"
        >
          Demonstrated how we can do practical functional programming in Kotlin
          using the Arrow functional toolkit.
        </TimelineStep>
      </List>
    </Flex>
  );
};

export default Timeline;
