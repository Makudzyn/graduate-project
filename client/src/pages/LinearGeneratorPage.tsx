import { useContext, useState } from "react";
import { linearCalculations } from "../functions/requestFunctions/calculationRequestFunctions.ts";
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
import { getSelectedParam } from "../functions/functions.ts";
import { polynomialDestructuring } from "../functions/generatorFunctions.ts";
import Modal from "../components/Modal/Modal.tsx";

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

  const validityCheck = () => {
    const degree = parseInt(getSelectedParam(PARAMS_DEGREE, searchParams));
    if (degree === undefined || degree === null || isNaN(degree)) {
      setError("Invalid degree number.");
      return false;
    }

    const polynomial = getSelectedParam(PARAMS_POLYNOMIAL, searchParams);
    if (polynomial === null) {
      setError("Invalid polynomial.");
      return false;
    }
    const { polyBinary } = polynomialDestructuring(polynomial);

    if (polyBinary.length - 1 !== degree) {
      setError("The selected polynomial does not correspond to the selected degree.");
      return false;
    }
    const paramValue = getSelectedParam(PARAMS_USER_VALUE, searchParams);
    if (paramValue === null) {
      setError("Invalid user value (initial state).");
      return false;
    }
    console.log(polyBinary.length, paramValue.length);
    if (polyBinary.length !== paramValue.length + 1) {
      setError("Length of user value (initial state) does not equal to polynomial length.");
      return false;
    }
    return true;
  }

  const handleClick = () => {
    const isValid = validityCheck();
    if (isValid) {
      userStore.isAuth && handleHistoryRecordCreation(userStore.user.id);
      linearCalculations(
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
      {error && <Modal message={error} setError={setError} />}

      <section className="flex h-full justify-center pt-20 px-5">
        <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
          <h1 className="py-5 text-center">Лінійний ЗРЗЗ</h1>

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
            onClick={handleClick}
          />

          <CorrelationChart data1={correlation} />
        </div>
      </section>
    </>
  );
});

export default LinearGeneratorPage;
