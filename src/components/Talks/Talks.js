import {
  Timeline,
  Content,
  ContentYear,
  ContentBody,
  Description
} from "../Timeline/main";
import React, { useRef, useEffect } from "react";
import "./Talks.module.scss";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <Timeline>
        <Content>
          <ContentYear
            startDay="26"
            startMonth="10"
            monthType="text"
            startYear="2019"
          />
          <ContentBody title="Kotlin for Java Developers">
            <Description text="Gave a talk to promote Kotlin as an alternative to Java for Android (and other platforms). Went over some of the the language-specific features, android KTX examples and the potential of Kotlin multiplatform." />
            <Description event="DevCon’ 2019" />
          </ContentBody>
        </Content>

        <Content>
          <ContentYear
            startDay="05"
            startMonth="10"
            monthType="text"
            startYear="2019"
          />
          <ContentBody title="Writing Custom DSLs with Kotlin">
            <Description text="A talk on the characteristics of Domain Specific Language(s), both internal and external - with examples in the context of Kotlin & Android." />
            <Description event="Kotlin Everywhere" />
          </ContentBody>
        </Content>

        <Content>
          <ContentYear
            startDay="13"
            startMonth="07"
            monthType="text"
            startYear="2019"
          />
          <ContentBody title="Leveraging Kotlin for App Development">
            <Description text="An introductory talk to promote Kotlin as a programming language for Android - describing in detail the benefits and the differences it has with Java." />
            <Description event="Google I/O Extended" />
          </ContentBody>
        </Content>

        <Content>
          <ContentYear
            startDay="06"
            startMonth="07"
            monthType="text"
            startYear="2019"
          />
          <ContentBody title="Creating robust apps with Kotlin & Architecture Components">
            <Description text="An overview of Architecture Components and how it improves developer experience. Also introduced the audience to the upcoming changes that were introduced in Google I/O 19." />
            <Description event="Kotlin Everywhere" />
          </ContentBody>
        </Content>

        <Content>
          <ContentYear
            startDay="19"
            startMonth="01"
            monthType="text"
            startYear="2019"
          />
          <ContentBody title="Real world Functional Programming with Kotlin">
            <Description text="A demonstration of how we can do practical functional programming in Kotlin (using Arrow) for Android." />
            <Description event="Devenings" />
          </ContentBody>
        </Content>
      </Timeline>
    </div>
  );
};

export default Page;
