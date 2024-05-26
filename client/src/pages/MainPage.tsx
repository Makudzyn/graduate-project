import BlockWrapper from "../components/MainPage/BlockWrapper.tsx";
import SectionTitle from "../components/MainPage/SectionTitle.tsx";
import SectionBlock from "../components/PageComponents/SectionBlock.tsx";
import Section from "../components/PageComponents/Section.tsx";
import PageHeader from "../components/PageComponents/Headers/PageHeader.tsx";
import FeaturesBlock from "../components/MainPage/Features/FeaturesBlock.tsx";
import InstructionsBlock from "../components/MainPage/Instructions/InstructionsBlock.tsx";
import BlockFAQ from "../components/MainPage/FAQ/BlockFAQ.tsx";

const MainPage = () => {
  return (
    <Section>
      <SectionBlock>
        <BlockWrapper>
          <PageHeader
            title="Дослідження та генерація матричних кодів та послідовностей"
            paragraph="
              Вивчення та створення матричних кодів та послідовностей:
              різноманітні генератори та порівняння їх характеристик на одній платформі.
            "
            paragraphWidth={"md"}
          />
        </BlockWrapper>
      </SectionBlock>
      <SectionBlock>
        <BlockWrapper>
          <SectionTitle
            headerTitle="Особливості та переваги"
            paragraphText="
              Дослідіть безліч функцій та переваг,
              які роблять цей сайт ідеальним вибором для вивчення
              та генерації матричних кодів та послідовностей.
            "
            alignCenter
          />
          <FeaturesBlock/>
        </BlockWrapper>
      </SectionBlock>
      <SectionBlock>
        <BlockWrapper>
          <SectionTitle
            headerTitle="Інструкції користувача"
            paragraphText="Вивчіть функціонал з докладними інструкціями та ілюстраціями"
            alignCenter
          />
          <InstructionsBlock/>
        </BlockWrapper>
      </SectionBlock>
      <SectionBlock>
        <BlockWrapper>
          <SectionTitle
            headerTitle="Питання та відповіді"
            paragraphText="
              Є питання? У цьому розділі складено список найпоширеніших запитань,
              щоб допомогти вам краще пізнати цей застосунок.
            "
          />
          <BlockFAQ/>
        </BlockWrapper>
      </SectionBlock>
    </Section>
  );
};

export default MainPage;
