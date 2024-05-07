import BlockWrapper from "../components/MainPage/BlockWrapper.tsx";
import Step from "../components/MainPage/Step.tsx";
import AccordionItem from "../components/MainPage/AccordionItem.tsx";
import SectionTitle from "../components/MainPage/SectionTitle.tsx";
import SectionBlock from "../components/MainPage/SectionBlock.tsx";
import Section from "../components/CommonGenComponents/Section.tsx";
import PageHeader from "../components/CommonGenComponents/PageHeader.tsx";
import FeaturesBlock from "../components/MainPage/FeaturesBlock.tsx";

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
            headerTitle="Як це працює"
            paragraphText="Show step by step how to get started"
            alignCenter
          />
          <div className="flex items-center flex-col gap-12">
            <Step
              title={"First Step"}
              description="
                Etiam bibendum, lorem in hendrerit commodo, orci leo luctus massa, vitae semper eros lacus eu massa.
                Donec et eros ac nulla condimentum ultrices ac vitae orci.
                Nunc massa leo, auctor finibus feugiat at, pellentesque ac metus.
                Suspendisse non ultrices augue, id congue nisi.
                In hac habitasse platea dictumst.
                "
              picture={"https://via.placeholder.com/800x800"}
            />
            <Step
              title={"Second Step"}
              description="
                Suspendisse molestie sem at velit volutpat dapibus.
                Phasellus ullamcorper consectetur justo, quis pellentesque ex gravida eget.
                Nulla felis augue, elementum vitae massa eu, placerat imperdiet ipsum.
                Aliquam elementum placerat sem, nec efficitur tortor vestibulum et.
                "
              picture={"https://via.placeholder.com/800x800"}
              reverse
            />
            <Step
              title={"Final Step"}
              description="
                Ut ultricies dictum mollis. Integer quis volutpat risus, ac tempor libero.
                Nulla euismod fermentum rutrum.
                Curabitur mollis elementum tellus ac dapibus.
                Suspendisse dignissim semper hendrerit.
                "
              picture={"https://via.placeholder.com/800x800"}
            />
          </div>
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
          <div className="flex bg-bgSecondary text-secondary box-border border-0 shadow-lg rounded-md flex-col ">
            <AccordionItem
              title="Etiam bibendum?"
              description="
                 Suspendisse convallis sem in justo egestas ornare.
                 Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                 Quisque sodales ornare scelerisque. Nulla facilisi.
                 Suspendisse tempor auctor sem, in efficitur augue porta ut.
                 "
            />
            <AccordionItem
              title="Lorem in hendrerit commodo, orci leo luctus massa?"
              description="
                 Aenean ut nisi vel dui convallis accumsan a nec ligula.
                 Donec sit amet enim eu mauris rhoncus bibendum vel a quam.
                 "
            />
            <AccordionItem
              title="Vitae semper eros lacus eu massa?"
              description="
                 Integer dapibus felis fringilla, eleifend neque nec, maximus magna.
                 Aliquam posuere, enim at mollis varius, metus justo blandit metus, in tincidunt mauris ex eu dui.
                 Integer hendrerit, felis quis blandit convallis.
                 "
            />
          </div>
        </BlockWrapper>
      </SectionBlock>
    </Section>
  );
};

export default MainPage;
