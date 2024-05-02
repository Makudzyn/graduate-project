import PolynomialTable from "../components/Table/PolynomialTable.tsx";
import Spinner from "../components/Spinner.tsx";
import { useContext, useState } from "react";
import { Context } from "../main.tsx";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import { observer } from "mobx-react-lite";

const PolynomialsPage = observer(() => {
  const { polynomialsStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);
  return (
    <>
      {loading && <Spinner />}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-20 leading-normal tracking-wider">
        <PolynomialTable
          polynomials={polynomialsStore.polynomials}
          totalCount={polynomialsStore.totalCount}
        />
      </div>
    </>
  );
});

export default PolynomialsPage;
