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
            headerTitle="Крок за кроком до результату"
            paragraphText="Вивчіть функціонал з докладними інструкціями та ілюстраціями"
            alignCenter
          />
          <div className="flex items-center flex-col gap-12">
            <Step
              title="Лінійний генератор"
              description="
                Для початку роботи з лінійним генератором перейдіть на відповідну сторінку.
                Виберіть бажаний ступінь полінома зі списку.
                Потім, у наступному списку, виберіть конкретний поліном,
                який відповідає вибраному ступеню.
                Після вибору полінома буде встановлено обмеження на довжину початкового стану.
                Зверніть увагу, що у полі початкового стану допускаються лише двійкові числа (0 або 1).
                Поточна та потрібна довжина початкового стану будуть відображені у правій частині поля.
                Коли поточна довжина буде збігатися з необхідною,
                поле підсвітиться зеленим, інакше - червоним.
                Після виконання цих дій ви можете створити послідовність, натиснувши відповідну кнопку.
                Якщо всі параметри введені правильно,
                ви отримаєте результати генерації,
                інакше - повідомлення про помилку.
              "
              picture={"https://via.placeholder.com/800x800"}
            />
            <Step
              title="Матричний генератор"
              description="
                Щоб використати матричний генератор, перейдіть на відповідну сторінку.
                Виберіть бажаний ступінь полінома для матриці A зі списку,
                а потім виберіть відповідний поліном.
                У третьому списку визначте, чи поліном буде циклічним.
                Якщо циклічність не потрібна, залиште значення поля без змін.
                Повторіть подібні дії для матриці B.
                Перейдіть до центрального стовпця,
                де можна вибрати індекси вихідних елементів та ранг матриці.
                Зверніть увагу,
                що вибір I-го елемента можливий тільки після вибору ступеня для матриці A,
                і аналогічно для J-го елемента та матриці B.
                Також для вибору рангу матриці потрібно визначити ступені для обох матриць.
                Після завершення всіх налаштувань створіть послідовність, натиснувши відповідну кнопку.
                Якщо всі параметри вказані коректно,
                ви отримаєте результати генерації;
                в іншому випадку, буде виведено повідомлення про помилку.
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
