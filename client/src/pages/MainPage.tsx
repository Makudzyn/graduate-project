import Card from "../components/MainPage/Card.tsx";
import TableIcon from "../assets/table-tree.svg?react";
import ChartIcon from "../assets/chart-line.svg?react";
import DataIcon from "../assets/data.svg?react";
import StatsIcon from "../assets/stats.svg?react";
import FastIcon from "../assets/speed-alt.svg?react";
import SmileIcon from "../assets/slightly-smiling-face.svg?react";
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
          <div className="flex flex-wrap justify-between">
            <Card
              iconComponent={
                <TableIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Таблиця поліномів"
              description="
                Дослідіть світ можливостей з великою таблицею,
                що надає повний список поліномів для створення послідовностей.
                Таблиця містить найбільший набір поліномів, доступний в інтернеті, і пропонує зручні функції пошуку,
                сортування та інші засоби взаємодії, забезпечуючи легкий доступ до необхідної інформації.
              "
            />
            <Card
              iconComponent={
                <ChartIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Графіки кореляції"
              description="
                Досліджуйте кореляцію згенерованих послідовностей за допомогою графіків кореляції.
                Інтуїтивно зрозумілі графіки дозволяють оцінити ступінь кореляції та вивчити властивості послідовності.
                Додаткові графічні інтрументи для взаємодії з графіком
                забезпечують більш точне та глибоке розуміння даних,
                допомагаючи краще аналізувати створені послідовності.
              "
            />
            <Card
              iconComponent={
                <DataIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Збереження даних"
              description="
                Зареєстровані користувачі можуть легко зберігати
                та керувати історією своїх запитів та даних для генерації послідовностей.
                Це забезпечує зручність повторного використання раніше введених даних та запитів,
                дозволяючи економити час та зосереджуватися на дослідженні та аналізі результатів.
              "
            />
          </div>
          <div className="flex flex-wrap justify-between">
            <Card
              iconComponent={
                <StatsIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Порівняння характеристик"
              description="
                На сайті надається унікальна можливість порівняти характеристики та властивості
                матричного та лінійного генераторів безпосередньо поруч один з одним.
                За допомогою спеціальної сторінки можна провести детальний аналіз ваги Хеммінгу для різних блоків згенерованих послідовностей,
                що допоможе вибрати найбільш підходящий генератор для конкретних потреб та задач.
              "
            />
            <Card
              iconComponent={
                <FastIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Швидкість"
              description="
                Завдяки виконанню обчислень на сервері користувачі миттєво отримують результати,
                забезпечуючи швидкий та плавний досвід користування.
                Навіть під час роботи з потенційно великими обсягами даних на сайті немає затримок завдяки
                використанню технології windowing для ефективного відображення результатів.
              "
            />
            <Card
              iconComponent={
                <SmileIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
              }
              title="Зручний дизайн"
              description="
                Сайт пропонує зручний та привабливий інтерфейс,
                який навіть новачки можуть легко освоїти.
                Використовуючи різноманітні повідомлення, плейсхолдери та тултипи,
                забезпечується проста та інтуїтивно зрозуміла взаємодію з сайтом,
                що робить процес дослідження та генерації послідовностей максимально зручним для всіх користувачів.
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
    </Section>
  );
};

export default MainPage;
