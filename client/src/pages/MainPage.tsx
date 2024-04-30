import Section from "../components/CommonGenComponents/Section.tsx";
import PageWrapper from "../components/CommonGenComponents/PageWrapper.tsx";
import MainHeader from "../components/CommonGenComponents/MainHeader.tsx";

const MainPage = () => {
  return (
    <Section>
      <PageWrapper>
        <h1>Потрібно згенерувати або дослідити бінарні псевдовипадкові послідовності?</h1>
        <hr/>
        <p>
          У цьому застосунку ви зможете це зробити!
          На сайті розміщені лінійний генератор зі зворотним зв'язком (LSFR),
          матричний генератор та генератор послідовностей сум та добутків.
          Також є сторінка де ви зможете дослідити та порівняти side-by-side властивості,
          значення та особливості лінійного та матричного генераторів псевдовипадкових послідовностей!
        </p>
      </PageWrapper>
    </Section>
  );
};

export default MainPage;
