import InputBlock from "../components/LinearGenComponents/InputBlock.tsx";
import {useContext, useEffect, useState} from "react";
import {fetchPolynomials} from "../http/polynomialsAPI.ts";
import {Context} from "../main.tsx";
import OutputField from "../components/OutputField.tsx";
import Button from "../components/Button.tsx";
import {createMatrix, generate, matrixRow} from "../functions/generatorFunctions.ts";
import {observer} from "mobx-react-lite";


const LinearGeneratorPage = observer(() => {
  const {polynomialsStore, calculationInfoStore} = useContext(Context)!;
  const [structureMatrix, setStructureMatrix] = useState<number[][]>();
  function calculations() {
    const {degree, polynomial, userValue} = calculationInfoStore.allInputValues;

    const degreeNum = Number(degree);
    const polynomialArr = polynomial.split("");

    const structureRow = matrixRow(degreeNum, polynomialArr);

    setStructureMatrix(createMatrix(degreeNum, structureRow));
    console.log(structureMatrix);

  }


  useEffect(() => {
    fetchPolynomials().then(data => polynomialsStore.setPolynomials(data))
  }, [])

    return (
      <section className="h-full flex justify-center">
        <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center ">

          <h1 className="py-5 text-center">Лінійний ЗРЗЗ</h1>

          <div className="flex justify-evenly pt-2.5 pb-9 w-full">
            <InputBlock/>
          </div>
          <div className={"flex justify-center items-center p-2.5 mb-5"}>
            <Button onClick={calculations}>Розпочати генерацію</Button>
          </div>



          <div className="flex justify-center items-center gap-2">
            <div>
              <h3 className="text-center">Структурна матриця</h3>
              <OutputField dataArray={structureMatrix}/>
            </div>
            <div>
              <h3 className="text-center">Матриця станів</h3>
              <OutputField></OutputField>
            </div>
          </div>

          <div className="flex justify-center my-5">
            <div className="flex justify-between w-3/4">
              <h5>Період по формулі T = </h5>
              <h5>Експериментальний період T = </h5>
              <h5>Вид послідовності = </h5>
              <h5>Вага Хеммінгу = </h5>
            </div>
          </div>

          <label>Згенерована послідовність</label>
          <OutputField></OutputField>

          <canvas></canvas>

        </div>
      </section>
    )
})

export default LinearGeneratorPage;