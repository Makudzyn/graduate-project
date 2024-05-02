import Card from "../components/MainPage/Card.tsx";
import TableIcon from "../assets/table-tree.svg?react";
import ChartIcon from "../assets/chart-line.svg?react";
import DataIcon from "../assets/data.svg?react";
import StatsIcon from "../assets/stats.svg?react";
import FastIcon from "../assets/speed-alt.svg?react";

const MainPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <section className="pt-[120px] pb-[50px]">
        <div className="mx-0 my-auto box-border w-full py-0 px-[1.875rem] max-w-[1140px]">
          <div className="flex flex-col items-center">
            <div className="flex shrink-0 flex-col items-center text-left pb-[3.75rem]">
              <div className={"flex flex-col items-center text-center"}>
                <h1 className={"font-libreFranklin font-extrabold text-title"}>
                  Unleash the Power of Binary
                </h1>
                <p className="max-w-3xl font-normal text-paragraph font-inter">
                  BitSequencePro is the ultimate tool for generating
                  pseudorandom binary sequences tailored for research and
                  cryptographic applications. Dive into the future of data
                  simulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[50px] pb-[50px]">
        <div className="mx-0 my-auto box-border w-full py-0 px-[1.875rem] max-w-[1140px]">
          <div className="flex flex-col items-center text-center">
            <h2 className="m-0 font-extrabold font-libreFranklin text-subtitle">
              Tailored Solutions
            </h2>
            <p className="font-normal text-paragraph font-inter mb-[1.875rem]">
              BitSequencePro is the ultimate tool for generating pseudorandom
              binary sequences tailored for research and cryptographic
              applications. Dive into the future of data simulation.
            </p>
          </div>
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
        </div>
      </section>
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
    </div>
  );
};

export default MainPage;
