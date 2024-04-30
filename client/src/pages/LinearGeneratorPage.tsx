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
import Spinner from "../components/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import Modal from "../components/Modal/Modal.tsx";
import { linearValidationBeforeCalculations } from "../functions/functions.ts";
import Section from "../components/CommonGenComponents/Section.tsx";
import PageWrapper from "../components/CommonGenComponents/PageWrapper.tsx";
import MainHeader from "../components/CommonGenComponents/MainHeader.tsx";

const LinearGeneratorPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  if (userStore.isAuth) {
    useHistoryFetching(userStore, setLoading, setError);
  }

  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [potentialPeriodLength, setPotentialPeriodLength] = useState<number>(0);
  const [factualPeriodLength, setFactualPeriodLength] = useState<number>(0);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>(
    [],
  );

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
      setPotentialPeriodLength,
      setFactualPeriodLength,
      setPseudorandomSequence,
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
      {userStore.isAuth && (
        <SideBar
          dataArray={userStore.historyRecords}
          userId={userStore.user.id}
        />
      )}
      {loading && <Spinner />}
      {error && <Modal message={error} setError={setError} type={"error"}/>}

      <Section>
        <PageWrapper>
          <MainHeader>Лінійний ЗРЗЗ</MainHeader>

          <LinearGenerator
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            structureMatrix={structureMatrix}
            conditionMatrix={conditionMatrix}
            potentialPeriodLength={potentialPeriodLength}
            factualPeriodLength={factualPeriodLength}
            pseudorandomSequence={pseudorandomSequence}
            hammingWeight={hammingWeight}
            degreeParam={PARAMS_DEGREE}
            polynomialParam={PARAMS_POLYNOMIAL}
            userValueParam={PARAMS_USER_VALUE}
            onClick={handleGenerateButtonClick}
          />

          <CorrelationChart data1={correlation} />
        </PageWrapper>
      </Section>
    </>
  );
});

export default LinearGeneratorPage;
