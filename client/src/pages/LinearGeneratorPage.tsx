import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import CorrelationChart from "../components/Chart/Plotly/CorrelationChart.tsx";
import { useSearchParams } from "react-router-dom";
import {
  PARAMS_DEGREE,
  PARAMS_POLYNOMIAL,
  PARAMS_USER_VALUE,
} from "../utils/consts.ts";
import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import { Context } from "../main.tsx";
import Spinner from "../components/PageComponents/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import Modal from "../components/Modal/Modal.tsx";
import { linearValidationBeforeCalculations } from "../functions/functions.ts";
import Section from "../components/PageComponents/Section.tsx";
import PageWrapper from "../components/PageComponents/PageWrapper.tsx";
import PageHeader from "../components/PageComponents/Headers/PageHeader.tsx";
import SectionBlock from "../components/PageComponents/SectionBlock.tsx";
import PRTable from "../components/CommonGenComponents/PRTable/PRTable.tsx";
import RenderSideBar from "../components/SideBar/RenderSideBar.tsx";

const LinearGeneratorPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [potentialPeriod, setPotentialPeriod] = useState<number>(0);
  const [factualPeriod, setFactualPeriod] = useState<number>(0);
  const [prSequence, setPrSequence] = useState<number[]>([]);

  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [correlation, setCorrelation] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams("");

  const handleGenerateButtonClick = () => {
    const fulfilled = linearValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE,
      PARAMS_POLYNOMIAL,
      PARAMS_USER_VALUE,
      setStructureMatrix,
      setConditionMatrix,
      setPotentialPeriod,
      setFactualPeriod,
      setPrSequence,
      setHammingWeight,
      setLoading,
      setError,
      setCorrelation,
    );
    if (fulfilled && userStore.isAuth) {
      handleHistoryRecordCreation(userStore.user.id);
    }
  };

  return (
    <>
      <RenderSideBar userStore={userStore} setError={setError} setLoading={setLoading}>
        <SideBar
          dataArray={userStore.historyRecords}
          userId={userStore.user.id}
        />
      </RenderSideBar>
      {loading && <Spinner />}
      {error && <Modal message={error} setError={setError} type={"error"} />}

      <Section>
        <PageWrapper>
          <SectionBlock>
            <PageHeader
              title="Лінійний генератор"
              paragraph="
                Генератор, який моделює роботу зсувного регістра зі зворотними зв'язками (ЗРЗЗ),
                це один із найбільш поширених типів генераторів
                псевдовипадкових бінарних послідовностей.
                Він працює за принципом послідовної зміни бітів у регістрі на
                основі зворотного зв'язку від деяких його бітів.
                Цей процес забезпечує генерацію послідовності бітів, яка,
                хоч і не випадкова, але має властивості, близькі до випадкових.
                Особливості ЗРЗЗ включають простоту реалізації, високу швидкість
                генерації та широке застосування у різних областях.
              "
              paragraphWidth="2xl"
            />
            <hr className="border-purpleFirst opacity-30 mb-10"/>
            <LinearGenerator
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              structureMatrix={structureMatrix}
              conditionMatrix={conditionMatrix}
              potentialPeriod={potentialPeriod}
              factualPeriod={factualPeriod}
              prSequence={prSequence}
              hammingWeight={hammingWeight}
              degreeParam={PARAMS_DEGREE}
              polynomialParam={PARAMS_POLYNOMIAL}
              userValueParam={PARAMS_USER_VALUE}
              onClick={handleGenerateButtonClick}
            />

            <PRTable
              searchParams={searchParams}
              degreeParamA={PARAMS_DEGREE}
              factualPeriod={factualPeriod}
              pseudorandomSequence={prSequence}
            />

            <CorrelationChart data1={correlation} />
          </SectionBlock>
        </PageWrapper>
      </Section>
    </>
  );
});

export default LinearGeneratorPage;
