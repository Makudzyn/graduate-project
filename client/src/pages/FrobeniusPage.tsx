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

  const [potentialPeriodLength, setPotentialPeriodLength] = useState<number>(0);
  const [factualPeriodLength, setFactualPeriodLength] = useState<number>(0);
  const [potentialPeriodLengthS, setPotentialPeriodLengthS] = useState<number>(0);
  const [factualPeriodLengthS, setFactualPeriodLengthS] = useState<number>(0);

  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>([]);
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
      setPotentialPeriodLength,
      setPotentialPeriodLengthS,
      setFactualPeriodLength,
      setFactualPeriodLengthS,
      setPseudorandomSequence,
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
              title="Фробеніус генератор"
              paragraph="
                Це такий генератор бінарних послідовностей,
                який використовує матриці для створення ПВП.
                Принцип його роботи полягає у множенні початкового вектора на матрицю,
                що дозволяє отримати новий вектор,
                який використовується для генерації бітів послідовності.
                Особливості матричного генератора включають
                високий ступінь випадковості отриманих послідовностей,
                можливість гнучкої настройки параметрів за допомогою
                вибору матриць різної розмірності,
                коефіцієнтів та рангу матриці,
                а також його застосування в різних областях.
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
              potentialPeriodLength={potentialPeriodLength}
              potentialPeriodLengthS={potentialPeriodLengthS}
              factualPeriodLength={factualPeriodLength}
              factualPeriodLengthS={factualPeriodLengthS}
              pseudorandomSequence={pseudorandomSequence}
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
