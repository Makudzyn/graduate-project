import { useContext, useState } from "react";
import { linearCalculations } from "../functions/calculationRequestFunctions.ts";
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
import { sendHistoryRecord } from "../http/historyRecordsAPI.ts";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";

const LinearGeneratorPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;

  const { loading, error } = usePolynomialsFetching(polynomialsStore);
  
  if (userStore.isAuth) {
    useHistoryFetching(userStore);
  }

  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [potentialPeriodLength, setPotentialPeriodLength] = useState<number>(0);
  const [factualPeriodLength, setFactualPeriodLength] = useState<number>(0);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>([]);

  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [correlation, setCorrelation] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  async function createHistoryRecord() {
    const userId = userStore.user.id;
    const pageName = location.pathname.slice(1);
    const parameters = location.search;
    try {
      await sendHistoryRecord(userId, pageName, parameters);
    } catch (error: any) {
      console.error("Error creating history record in DB: ", error.message);
    }
  }
  const handleClick = () => {
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
      setCorrelation,
    ).then(r => console.log(r));
    userStore.isAuth && createHistoryRecord().then(r => console.log(r));
  };

  return (
    <>
      {userStore.isAuth && <SideBar dataArray={userStore.historyRecords} />}
      {loading && <Spinner />}

      {!error && !loading && (
        <section className="flex h-full justify-center pt-16">
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
      )}
    </>
  );
});

export default LinearGeneratorPage;
