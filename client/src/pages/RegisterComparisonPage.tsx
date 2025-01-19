import LinearGenerator from '../components/LinearGenerator/LinearGenerator.tsx';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { hammingBlockCalculations } from '../functions/requestFunctions/calculationRequestFunctions.ts';
import { observer } from 'mobx-react-lite';
import {
  PARAMS_CYCLIC_POLY_A,
  PARAMS_CYCLIC_POLY_B,
  PARAMS_DEGREE,
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_HAMMING_BLOCK,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  PARAMS_USER_VALUE,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B,
} from '../utils/consts.ts';
import MatrixGenerator from '../components/MatrixGenerator/MatrixGenerator.tsx';
import usePolynomialsFetching from '../hooks/fetching/usePolynomialsFetching.ts';
import GenButton from '../components/CommonGenComponents/GenButton.tsx';
import HammingChart from '../components/Chart/Plotly/HammingChart.tsx';
import { Context } from '../main.tsx';
import Spinner from '../components/PageComponents/Spinner.tsx';
import SideBar from '../components/SideBar/SideBar.tsx';
import { handleHistoryRecordCreation } from '../functions/requestFunctions/requestFunctions.ts';
import InputBlockLength from '../components/RegisterComparison/InputBlockLength.tsx';
import Modal from '../components/Modal/Modal.tsx';
import {
  linearValidationBeforeCalculations,
  matrixValidationBeforeCalculations,
} from '../functions/functions.ts';
import Section from '../components/PageComponents/Section.tsx';
import PageWrapper from '../components/PageComponents/PageWrapper.tsx';
import PageHeader from '../components/PageComponents/Headers/PageHeader.tsx';
import SectionBlock from '../components/PageComponents/SectionBlock.tsx';
import CorrelationChart from '../components/Chart/Plotly/CorrelationChart.tsx';
import RenderSideBar from '../components/SideBar/RenderSideBar.tsx';

const RegisterComparisonPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);

  const [conditionMatrixLinear, setConditionMatrixLinear] = useState<
    number[][]
  >([]);
  const [conditionMatrixMatrices, setConditionMatrixMatrices] = useState<
    number[][]
  >([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);

  const [potentialPeriod, setPotentialPeriod] = useState<number>(0);
  const [factualPeriod, setFactualPeriod] = useState<number>(0);

  const [potentialPeriodA, setPotentialPeriodA] = useState<number>(0);
  const [potentialPeriodB, setPotentialPeriodB] = useState<number>(0);
  const [potentialPeriodS, setPotentialPeriodS] = useState<number>(0);

  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);
  const [factualPeriodLengthS, setFactualPeriodLengthS] = useState<number>(0);
  const [conditionS, setConditionS] = useState<number>(0);

  const [prSequenceLinear, setPrSequenceLinear] = useState<number[]>([]);
  const [prSequenceMatrices, setPrSequenceMatrices] = useState<number[]>([]);

  const [hammingWeightLinear, setHammingWeightLinear] = useState<number>(0);
  const [hammingWeightMatrices, setHammingWeightMatrices] = useState<number>(0);
  const [weightSpectre, setWeightSpectre] = useState<string[]>(['0']);

  const [linearBlockLens, setLinearBlockLens] = useState<number[]>([]);
  const [matrixBlockLens, setMatrixBlockLens] = useState<number[]>([]);

  const [linearCorrelation, setLinearCorrelation] = useState<number[]>([]);
  const [matrixCorrelation, setMatrixCorrelation] = useState<number[]>([]);

  const [sharedWeights, setSharedWeights] = useState<number[]>([]);
  const [valueRestriction, setValueRestriction] = useState<number>(0);
  const [selectedChart, setSelectedChart] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    const linearLength = prSequenceLinear.length;
    const matrixLength = prSequenceMatrices.length;
    const maxAllowedBlockLength = Math.min(linearLength, matrixLength);
    setValueRestriction(maxAllowedBlockLength);
  }, [prSequenceLinear, prSequenceMatrices]);

  const handleFirstGenClick = () => {
    linearValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE,
      PARAMS_POLYNOMIAL,
      PARAMS_USER_VALUE,
      setStructureMatrix,
      setConditionMatrixLinear,
      setPotentialPeriod,
      setFactualPeriod,
      setPrSequenceLinear,
      setHammingWeightLinear,
      setLoading,
      setError,
      setLinearCorrelation,
    );
  };

  const handleSecondGenClick = () => {
    matrixValidationBeforeCalculations(
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
      setConditionMatrixMatrices,
      setBasisMatrix,
      setPotentialPeriodA,
      setPotentialPeriodB,
      setFactualPeriodLengthS,
      setFactualPeriodLengthA,
      setFactualPeriodLengthB,
      setPotentialPeriodS,
      setConditionS,
      setPrSequenceMatrices,
      setHammingWeightMatrices,
      setWeightSpectre,
      setLoading,
      setError,
      setMatrixCorrelation,
    );
  };

  const handleClick = () => {
    hammingBlockCalculations(
      searchParams,
      PARAMS_HAMMING_BLOCK,
      prSequenceLinear,
      prSequenceMatrices,
      setLinearBlockLens,
      setMatrixBlockLens,
      setSharedWeights,
      setLoading,
      setError,
    );
    userStore.isAuth && handleHistoryRecordCreation(userStore.user.id);
  };

  const handleSwitch = () => {
    setSelectedChart((prev) => !prev);
  };

  return (
    <>
      <RenderSideBar
        userStore={userStore}
        setError={setError}
        setLoading={setLoading}
      >
        <SideBar
          dataArray={userStore.historyRecords}
          userId={userStore.user.id}
        />
      </RenderSideBar>
      {loading && <Spinner />}
      {error && <Modal message={error} setError={setError} type={'error'} />}

      <Section>
        <PageWrapper>
          <SectionBlock>
            <PageHeader
              title="Порівняння лінійного та матричного регістрів"
              paragraph="
                Сторінка надає можливість порівняти
                та проаналізувати властивості псевдовипадкових послідовностей,
                які згенеровані лінійним та матричним генераторами.
                Вона має ті ж функції що й індивідуальні сторінки генераторів,
                включаючи налаштування параметрів генерації та запуск процесу генерації.
                Додатково на сторінці представлений графік автокореляції,
                що візуалізує значення автокореляції для послідовностей,
                згенерованих цими генераторами а також графік ваг Хеммінгу,
                який допомагає аналізувати стійкість та розподіл ваг послідовностей
                у блоках певної довжини,
                створюваних різними методами.
                Загалом, сторінка є потужним інструментом для дослідників та розробників,
                дозволяючи глибше зрозуміти різницю між лінійним та матричним генераторами
                та їх вплив зміни значень на властивості псевдовипадкових послідовностей.
              "
              paragraphWidth="2xl"
            />

            <hr className="border-purpleFirst opacity-30 mb-10" />
            <div className="flex">
              <div className="w-1/4 px-5">
                <LinearGenerator
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  structureMatrix={structureMatrix}
                  conditionMatrix={conditionMatrixLinear}
                  potentialPeriod={potentialPeriod}
                  factualPeriod={factualPeriod}
                  prSequence={prSequenceLinear}
                  hammingWeight={hammingWeightLinear}
                  degreeParam={PARAMS_DEGREE}
                  polynomialParam={PARAMS_POLYNOMIAL}
                  userValueParam={PARAMS_USER_VALUE}
                  onClick={handleFirstGenClick}
                />
              </div>
              <div className="w-3/4 px-5">
                <MatrixGenerator
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  structureMatrixA={structureMatrixA}
                  structureMatrixB={structureMatrixB}
                  basisMatrix={basisMatrix}
                  conditionMatrix={conditionMatrixMatrices}
                  potentialPeriodA={potentialPeriodA}
                  potentialPeriodB={potentialPeriodB}
                  potentialPeriodS={potentialPeriodS}
                  factualPeriodA={factualPeriodLengthA}
                  factualPeriodB={factualPeriodLengthB}
                  factualPeriodS={factualPeriodLengthS}
                  conditionS={conditionS}
                  identifierS={'S'}
                  prSequence={prSequenceMatrices}
                  hammingWeight={hammingWeightMatrices}
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
                  onClick={handleSecondGenClick}
                />
              </div>
            </div>

            <div className="my-5 flex items-center justify-center">
              <GenButton onClick={handleSwitch}>
                Переключитись на інший графік
              </GenButton>
            </div>

            <div className="flex flex-col h-full w-full items-center justify-center">
              {selectedChart ? (
                <CorrelationChart
                  data1={linearCorrelation}
                  data2={matrixCorrelation}
                />
              ) : (
                <>
                  <div className="my-8 flex flex-col items-center justify-center">
                    <InputBlockLength
                      inputLabel="Довжина блоку"
                      inputPlaceholder="2"
                      urlParamName={PARAMS_HAMMING_BLOCK}
                      setSearchParams={setSearchParams}
                      searchParams={searchParams}
                      valueRestriction={valueRestriction}
                    />
                    <GenButton onClick={handleClick}>
                      Провести розрахунки
                    </GenButton>
                  </div>
                  <HammingChart
                    data1={linearBlockLens}
                    data2={matrixBlockLens}
                    xAxisLabels={sharedWeights}
                  />
                </>
              )}
            </div>
          </SectionBlock>
        </PageWrapper>
      </Section>
    </>
  );
});

export default RegisterComparisonPage;
