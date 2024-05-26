import { observer } from "mobx-react-lite";
import {
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  PARAMS_USER_VALUE_A,
  PARAMS_USER_VALUE_B,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B,
} from "../utils/consts.ts";
import { useSearchParams } from "react-router-dom";
import { findGCD } from "../functions/generatorFunctions.ts";
import { additionAndMultiplicationCalculations } from "../functions/requestFunctions/calculationRequestFunctions.ts";
import { useContext, useEffect, useState } from "react";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import PeriodsCondition from "../components/CommonGenComponents/PeriodsCondition.tsx";
import PeriodInfo from "../components/CommonGenComponents/PeriodInfo.tsx";
import CoprimeCondition from "../components/CommonGenComponents/CoprimeCondition.tsx";
import { Context } from "../main.tsx";
import Spinner from "../components/PageComponents/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";
import Modal from "../components/Modal/Modal.tsx";
import { linearValidationBeforeCalculations } from "../functions/functions.ts";
import PageHeader from "../components/PageComponents/Headers/PageHeader.tsx";
import Section from "../components/PageComponents/Section.tsx";
import PageWrapper from "../components/PageComponents/PageWrapper.tsx";
import SumAndProductBlock from "../components/SumAndProduct/SumAndProductBlock.tsx";
import SectionBlock from "../components/PageComponents/SectionBlock.tsx";

const SumAndProductGeneratorPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  if (userStore.isAuth) {
    useHistoryFetching(userStore, setLoading, setError);
  }

  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);

  const [conditionMatrixA, setConditionMatrixA] = useState<number[][]>([]);
  const [conditionMatrixB, setConditionMatrixB] = useState<number[][]>([]);

  const [potentialPeriodLengthA, setPotentialPeriodLengthA] =
    useState<number>(0);
  const [potentialPeriodLengthB, setPotentialPeriodLengthB] =
    useState<number>(0);

  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);

  const [periodLengthS, setPeriodLengthS] = useState<number>(0);
  const [conditionS, setConditionS] = useState<number>(0);

  const [hammingWeightA, setHammingWeightA] = useState<number>(0);
  const [hammingWeightB, setHammingWeightB] = useState<number>(0);
  const [hammingWeightSum, setHammingWeightSum] = useState<number>(0);
  const [hammingWeightProduct, setHammingWeightProduct] = useState<number>(0);

  const [pseudorandomSequenceA, setPseudorandomSequenceA] = useState<number[]>(
    [],
  );
  const [pseudorandomSequenceB, setPseudorandomSequenceB] = useState<number[]>(
    [],
  );

  const [sumCorrelation, setSumCorrelation] = useState<number[]>([]);
  const [productCorrelation, setProductCorrelation] = useState<number[]>([]);

  const [sumSequence, setSumSequence] = useState<number[]>([]);
  const [productSequence, setProductSequence] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    if (factualPeriodLengthA !== 0 && factualPeriodLengthB !== 0) {
      const condition = findGCD(factualPeriodLengthA, factualPeriodLengthB);
      setConditionS(condition);
      if (condition !== 1) {
        setError("Періоди не взаємно прості. Обчислення сум та добутків не виконано.");
      }
      const periodLengthS = factualPeriodLengthA * factualPeriodLengthB;
      setPeriodLengthS(periodLengthS);
    }
  }, [factualPeriodLengthA, factualPeriodLengthB]);

  const handleFirstGenClick = () => {
    linearValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE_A,
      PARAMS_POLYNOMIAL_A,
      PARAMS_USER_VALUE_A,
      setStructureMatrixA,
      setConditionMatrixA,
      setPotentialPeriodLengthA,
      setFactualPeriodLengthA,
      setPseudorandomSequenceA,
      setHammingWeightA,
      setLoading,
      setError,
      undefined,
      POLYNOMIAL_TYPE_A,
    );
  };

  const handleSecondGenClick = () => {
    linearValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE_B,
      PARAMS_POLYNOMIAL_B,
      PARAMS_USER_VALUE_B,
      setStructureMatrixB,
      setConditionMatrixB,
      setPotentialPeriodLengthB,
      setFactualPeriodLengthB,
      setPseudorandomSequenceB,
      setHammingWeightB,
      setLoading,
      setError,
      undefined,
      POLYNOMIAL_TYPE_B,
    );
  };

  const handleClick = () => {
    additionAndMultiplicationCalculations(
      pseudorandomSequenceA,
      pseudorandomSequenceB,
      periodLengthS,
      setSumSequence,
      setProductSequence,
      setHammingWeightSum,
      setHammingWeightProduct,
      setSumCorrelation,
      setProductCorrelation,
      setLoading,
      setError,
    );
    userStore.isAuth && handleHistoryRecordCreation(userStore.user.id);
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
              title="ЗРЗЗ сум та добутків М-послідовностей"
              paragraph="
                Генератор призначений для створення псевдовипадкових бінарних
                послідовностей на основі додавання та множення вихідних M-послідовностей.
                Ці операції дозволяють отримати нові послідовності,
                що володіють покращеними характеристиками випадковості та довшими періодами.
                M-послідовності, або послідовності максимальної довжини,
                є циклічними послідовностями, що генеруються лінійними регістрами
                зсуву зі зворотним зв'язком і які мають максимальну довжину періоду
                та хороші статистичні властивості.
                Цей генератор є потужним інструментом для створення псевдовипадкових послідовностей,
                які застосовуються в криптографії, моделюванні та інших областях,
                що вимагають високого рівня випадковості та безпеки.
              "
              paragraphWidth="2xl"
            />
            <hr className="border-purpleFirst opacity-30 mb-10" />

            <div className="flex justify-evenly flex-row">
              <LinearGenerator
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                structureMatrix={structureMatrixA}
                conditionMatrix={conditionMatrixA}
                potentialPeriodLength={potentialPeriodLengthA}
                factualPeriodLength={factualPeriodLengthA}
                pseudorandomSequence={pseudorandomSequenceA}
                hammingWeight={hammingWeightA}
                degreeParam={PARAMS_DEGREE_A}
                polynomialParam={PARAMS_POLYNOMIAL_A}
                userValueParam={PARAMS_USER_VALUE_A}
                polynomialType={POLYNOMIAL_TYPE_A}
                identifier={`(${POLYNOMIAL_TYPE_A})`}
                className={"w-[50rem]"}
                onClick={handleFirstGenClick}
              />
              <LinearGenerator
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                structureMatrix={structureMatrixB}
                conditionMatrix={conditionMatrixB}
                potentialPeriodLength={potentialPeriodLengthB}
                factualPeriodLength={factualPeriodLengthB}
                pseudorandomSequence={pseudorandomSequenceB}
                hammingWeight={hammingWeightB}
                degreeParam={PARAMS_DEGREE_B}
                polynomialParam={PARAMS_POLYNOMIAL_B}
                userValueParam={PARAMS_USER_VALUE_B}
                polynomialType={POLYNOMIAL_TYPE_B}
                identifier={`(${POLYNOMIAL_TYPE_B})`}
                className={"w-[50rem]"}
                onClick={handleSecondGenClick}
              />
            </div>
            <div className="flex justify-center flex-col my-5">
              <PeriodInfo
                factualPeriodLength={periodLengthS}
                identifier={"(S)"}
              />
              <PeriodsCondition
                polynomialTypeFirst={POLYNOMIAL_TYPE_A}
                polynomialTypeSecond={POLYNOMIAL_TYPE_B}
                condition={conditionS}
              />
              <CoprimeCondition conditionS={conditionS} />
            </div>

            <SumAndProductBlock
              conditionS={conditionS}
              onClick={handleClick}
              dataArray={sumSequence}
              hammingWeight={hammingWeightSum}
              dataArray1={productSequence}
              hammingWeight1={hammingWeightProduct}
              data1={sumCorrelation}
              data2={productCorrelation}
            />
          </SectionBlock>
        </PageWrapper>
      </Section>
    </>
  );
});

export default SumAndProductGeneratorPage;
