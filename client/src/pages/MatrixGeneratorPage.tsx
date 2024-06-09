import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import CorrelationChart from "../components/Chart/Plotly/CorrelationChart.tsx";
import {
  PARAMS_CYCLIC_POLY_A,
  PARAMS_CYCLIC_POLY_B,
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B,
} from "../utils/consts.ts";
import { useSearchParams } from "react-router-dom";
import MatrixGenerator from "../components/MatrixGenerator/MatrixGenerator.tsx";
import { Context } from "../main.tsx";
import Spinner from "../components/PageComponents/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";
import Modal from "../components/Modal/Modal.tsx";
import { matrixValidationBeforeCalculations } from "../functions/functions.ts";
import Section from "../components/PageComponents/Section.tsx";
import PageWrapper from "../components/PageComponents/PageWrapper.tsx";
import PageHeader from "../components/PageComponents/Headers/PageHeader.tsx";
import SectionBlock from "../components/PageComponents/SectionBlock.tsx";
import PRTable from "../components/CommonGenComponents/PRTable/PRTable.tsx";
import TorStates from "../components/CommonGenComponents/PRTable/TorStates.tsx";

const MatrixGeneratorPage = observer(() => {
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

  const [potentialPeriodA, setPotentialPeriodA] = useState<number>(0);
  const [potentialPeriodB, setPotentialPeriodB] = useState<number>(0);
  const [potentialPeriodS, setPotentialPeriodS] = useState<number>(0);

  const [factualPeriodA, setFactualPeriodA] = useState<number>(0);
  const [factualPeriodB, setFactualPeriodB] = useState<number>(0);
  const [factualPeriodS, setFactualPeriodS] = useState<number>(0);

  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);
  const [prSequence, setPrSequence] = useState<number[]>([]);
  const [conditionS, setConditionS] = useState<number>(0);

  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [weightSpectre, setWeightSpectre] = useState<string[]>(["0"]);
  const [correlation, setCorrelation] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  const handleClick = () => {
    const fulfilled = matrixValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE_A,
      PARAMS_DEGREE_B,
      PARAMS_POLYNOMIAL_A,
      PARAMS_POLYNOMIAL_B,
      PARAMS_CYCLIC_POLY_A,
      PARAMS_CYCLIC_POLY_B,
      PARAMS_OUTPUT_INDEX_I,
      PARAMS_OUTPUT_INDEX_J,
      PARAMS_MATRIX_RANK,
      setStructureMatrixA,
      setStructureMatrixB,
      setConditionMatrix,
      setBasisMatrix,
      setPotentialPeriodA,
      setPotentialPeriodB,
      setFactualPeriodS,
      setFactualPeriodA,
      setFactualPeriodB,
      setPotentialPeriodS,
      setConditionS,
      setPrSequence,
      setHammingWeight,
      setWeightSpectre,
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
              title="Матричний генератор"
              paragraph="
                Це такий генератор на основі матричного зсувного регістра (МЗР),
                який використовує матриці для створення ПВП.
                Принцип його роботи полягає у множенні двох супроводжуючих матриць
                свого характеристичного поліному на одиничну матрицю,
                яка є нормальною формою Сміта,
                що дозволяє отримати нову матрицю наступного стану.
                Особливості матричного генератора включають
                високий ступінь випадковості отриманих послідовностей,
                можливість гнучкої настройки параметрів за допомогою
                вибору матриць різної розмірності,
                коефіцієнтів та рангу матриці.
              "
              paragraphWidth="2xl"
            />
            <hr className="border-purpleFirst opacity-30 mb-10" />

            <MatrixGenerator
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              structureMatrixA={structureMatrixA}
              structureMatrixB={structureMatrixB}
              basisMatrix={basisMatrix}
              conditionMatrix={conditionMatrix}
              potentialPeriodA={potentialPeriodA}
              potentialPeriodB={potentialPeriodB}
              potentialPeriodS={potentialPeriodS}
              factualPeriodA={factualPeriodA}
              factualPeriodB={factualPeriodB}
              factualPeriodS={factualPeriodS}
              conditionS={conditionS}
              identifierS={"S"}
              prSequence={prSequence}
              hammingWeight={hammingWeight}
              weightSpectre={weightSpectre}
              degreeParamA={PARAMS_DEGREE_A}
              degreeParamB={PARAMS_DEGREE_B}
              polynomialParamA={PARAMS_POLYNOMIAL_A}
              polynomialParamB={PARAMS_POLYNOMIAL_B}
              cyclicPolyParamA={PARAMS_CYCLIC_POLY_A}
              cyclicPolyParamB={PARAMS_CYCLIC_POLY_B}
              indexParamI={PARAMS_OUTPUT_INDEX_I}
              indexParamJ={PARAMS_OUTPUT_INDEX_J}
              matrixRankParam={PARAMS_MATRIX_RANK}
              polynomialTypeA={POLYNOMIAL_TYPE_A}
              polynomialTypeB={POLYNOMIAL_TYPE_B}
              onClick={handleClick}
            />

            <PRTable
              searchParams={searchParams}
              degreeParamA={PARAMS_DEGREE_A}
              degreeParamB={PARAMS_DEGREE_B}
              factualPeriod={factualPeriodS}
              pseudorandomSequence={prSequence}
            />

            <TorStates
              searchParams={searchParams}
              degreeParamA={PARAMS_DEGREE_A}
              degreeParamB={PARAMS_DEGREE_B}
              factualPeriodA={factualPeriodA}
              factualPeriodB={factualPeriodB}
              basisMatrix={basisMatrix}
              conditionMatrix={conditionMatrix}
            />

            <CorrelationChart data1={correlation} />
          </SectionBlock>
        </PageWrapper>
      </Section>
    </>
  );
});

export default MatrixGeneratorPage;
