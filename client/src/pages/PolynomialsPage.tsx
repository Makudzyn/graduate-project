import PolynomialTable from "../components/Table/PolynomialTable.tsx";
import Spinner from "../components/Spinner.tsx";
import { useContext } from "react";
import { Context } from "../main.tsx";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import { observer } from "mobx-react-lite";

const PolynomialsPage = observer(() => {
  const { polynomialsStore } = useContext(Context)!;

  const { loading, error } = usePolynomialsFetching(polynomialsStore);
  return (
    <>
      {loading && <Spinner />}
      {!error && !loading && (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-16 leading-normal tracking-wider">
          <PolynomialTable
            polynomials={polynomialsStore.polynomials}
            totalCount={polynomialsStore.totalCount}
          />
        </div>
      )}
    </>
  );
});

export default PolynomialsPage;
