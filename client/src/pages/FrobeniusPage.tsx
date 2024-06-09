import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import CorrelationChart from "../components/Chart/Plotly/CorrelationChart.tsx";
import {
  PARAMS_DECOMPOSED_POLYNOMIAL,
  PARAMS_DEGREE,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL,
  PARAMS_USER_VALUE,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B
} from "../utils/consts.ts";
import { useSearchParams } from "react-router-dom";
import { Context } from "../main.tsx";
import Spinner from "../components/PageComponents/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";
import Modal from "../components/Modal/Modal.tsx";
import { frobeniusValidationBeforeCalculations } from "../functions/functions.ts";
import Section from "../components/PageComponents/Section.tsx";
import PageWrapper from "../components/PageComponents/PageWrapper.tsx";
import PageHeader from "../components/PageComponents/Headers/PageHeader.tsx";
import SectionBlock from "../components/PageComponents/SectionBlock.tsx";
import FrobeniusGenerator from "../components/FrobeniusGenerator/FrobeniusGenerator.tsx";

const FrobeniusPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  if (userStore.isAuth) {
    useHistoryFetching(userStore, setLoading, setError);
  }

  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [potentialPeriod, setPotentialPeriod] = useState<number>(0);
  const [factualPeriod, setFactualPeriod] = useState<number>(0);
  const [potentialPeriodS, setPotentialPeriodS] = useState<number>(0);
  const [factualPeriodS, setFactualPeriodS] = useState<number>(0);

  const [prSequence, setPrSequence] = useState<number[]>([]);
  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [correlation, setCorrelation] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams("");

  const handleGenerateButtonClick = () => {
    const fulfilled = frobeniusValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE,
      PARAMS_POLYNOMIAL,
      PARAMS_USER_VALUE,
      PARAMS_DECOMPOSED_POLYNOMIAL,
      PARAMS_OUTPUT_INDEX_I,
      PARAMS_OUTPUT_INDEX_J,
      setStructureMatrixA,
      setStructureMatrixB,
      setConditionMatrix,
      setBasisMatrix,
      setPotentialPeriod,
      setPotentialPeriodS,
      setFactualPeriod,
      setFactualPeriodS,
      setPrSequence,
      setHammingWeight,
      setLoading,
      setError,
      setCorrelation
    )
    if (fulfilled && userStore.isAuth) {
      handleHistoryRecordCreation(userStore.user.id);
    }
  };

  return (
    <>
      {userStore.isAuth && (
        <SideBar
          dataArray={userStore.historyRecords}
          userId={userStore.user.id}
        />
      )}
      {loading && <Spinner />}
      {error && <Modal message={error} setError={setError} type={"error"} />}

      <Section>
        <PageWrapper>
          <SectionBlock>
            <PageHeader
              title="МЗР з нормальною формою Фробеніуса"
              paragraph="
                Це генератор бінарних послідовностей,
                який базуеться на матричному зсувному регістрі, з тими відмінностями,
                що матриці, яки використовуються для множення обернені,
                а матрицею початкового стану є матриця, яка є нормальною формою Фробеніуса.
                Такий тип МЗР генерує ПВП з кращіми кореляційними властивостями,
                має більшу криптостійкість та інший розподіл бітів.
              "
              paragraphWidth="2xl"
            />

            <hr className="border-purpleFirst opacity-30 mb-10" />

            <FrobeniusGenerator
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              structureMatrixA={structureMatrixA}
              structureMatrixB={structureMatrixB}
              basisMatrix={basisMatrix}
              conditionMatrix={conditionMatrix}
              potentialPeriod={potentialPeriod}
              potentialPeriodS={potentialPeriodS}
              factualPeriod={factualPeriod}
              factualPeriodS={factualPeriodS}
              prSequence={prSequence}
              hammingWeight={hammingWeight}
              degreeParam={PARAMS_DEGREE}
              polynomialParam={PARAMS_POLYNOMIAL}
              userValueParam={PARAMS_USER_VALUE}
              indexParamI={PARAMS_OUTPUT_INDEX_I}
              indexParamJ={PARAMS_OUTPUT_INDEX_J}
              polynomialTypeA={POLYNOMIAL_TYPE_A}
              polynomialTypeB={POLYNOMIAL_TYPE_B}
              identifierS={"S"}
              onClick={handleGenerateButtonClick}
            />

            <CorrelationChart data1={correlation} />
          </SectionBlock>
        </PageWrapper>
      </Section>
    </>
  );
});

export default FrobeniusPage;
