import Card from "../components/MainPage/Card.tsx";
import TableIcon from "../assets/table-tree.svg?react";
import ChartIcon from "../assets/chart-line.svg?react";
import DataIcon from "../assets/data.svg?react";
import StatsIcon from "../assets/stats.svg?react";
import FastIcon from "../assets/speed-alt.svg?react";
import BlockWrapper from "../components/MainPage/BlockWrapper.tsx";
import Step from "../components/MainPage/Step.tsx";
import AccordionItem from "../components/MainPage/AccordionItem.tsx";
import SectionTitle from "../components/MainPage/SectionTitle.tsx";
import SectionBlock from "../components/MainPage/SectionBlock.tsx";
import Section from "../components/CommonGenComponents/Section.tsx";
import PageHeader from "../components/CommonGenComponents/PageHeader.tsx";

const MainPage = () => {
  return (
    <Section>
      <SectionBlock>
        <BlockWrapper>
          <PageHeader children={"Unleash the Power of Binary"}/>
        </BlockWrapper>
      </SectionBlock>
      <SectionBlock>
        <BlockWrapper>
          <SectionTitle
            headerTitle="Tailored Solutions"
            paragraphText="
              BitSequencePro is the ultimate tool for generating pseudorandom
              binary sequences tailored for research and cryptographic
              applications. Dive into the future of data simulation.
            "
            alignCenter
          />
          <div className="flex flex-wrap justify-between">
            <Card
              iconComponent={
                <TableIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Таблиця поліномів"
              description="
            Praesent tempus mollis velit vel tristique.
            Quisque tincidunt hendrerit accumsan.
            Fusce mattis porttitor mi, eget pulvinar metus ullamcorper vel.
          "
            />
            <Card
              iconComponent={
                <ChartIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Графіки корреляції"
              description="
            Aliquam ex augue, cursus fermentum imperdiet id, elementum vel enim.
            Sed orci elit, imperdiet et est nec, facilisis aliquet nulla.
            Vestibulum varius augue lorem, non ultrices mi dignissim quis.
          "
            />
            <Card
              iconComponent={
                <DataIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Збереження даних"
              description="
            Nam auctor quam in purus posuere, at venenatis eros egestas.
            Etiam sit amet libero erat.
            Cras sit amet condimentum orci, at ornare odio.
          "
            />
          </div>
          <div className="flex flex-wrap justify-between">
            <Card
              iconComponent={
                <StatsIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Таблиця поліномів"
              description="
            Maecenas vulputate sagittis est non ultricies.
            Quisque placerat lorem et eleifend fringilla.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          "
            />
            <Card
              iconComponent={
                <FastIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Швидкість генерації"
              description="
            Sed volutpat ullamcorper ipsum ac molestie.
            Vestibulum at sem sed tellus tristique eleifend venenatis eget magna.
            Praesent iaculis iaculis iaculis.
          "
            />
            <Card
              iconComponent={
                <TableIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Зручний дизайн"
              description="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur porttitor pulvinar metus, at sodales velit aliquam et.
            Maecenas suscipit maximus elementum.
          "
            />
          </div>
        </BlockWrapper>
      </SectionBlock>
      <SectionBlock>
        <BlockWrapper>
          <SectionTitle
            headerTitle="How it works"
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
            headerTitle="Common Queries"
            paragraphText="
              Have questions?
              We’ve compiled a list of the most frequently asked questions
              to help you get to know BitSequencePro better.
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
      {/*<PageWrapper>*/}
      {/*<h1>Потрібно згенерувати або дослідити бінарні псевдовипадкові послідовності?</h1>*/}
      {/*<hr/>*/}
      {/*<p>*/}
      {/*  У цьому застосунку ви зможете це зробити!*/}
      {/*  На сайті розміщені лінійний генератор зі зворотним зв'язком (LSFR),*/}
      {/*  матричний генератор та генератор послідовностей сум та добутків.*/}
      {/*  Також є сторінка де ви зможете дослідити та порівняти side-by-side властивості,*/}
      {/*  значення та особливості лінійного та матричного генераторів псевдовипадкових послідовностей!*/}
      {/*</p>*/}
      {/*</PageWrapper>*/}
    </Section>
  );
};

export default MainPage;
