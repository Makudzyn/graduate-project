import InputBlock from "../components/LinearGenComponents/InputBlock.tsx";
import {useContext, useEffect, useState} from "react";
import {fetchPolynomials} from "../http/polynomialsAPI.ts";
import {Context} from "../main.tsx";
import OutputField from "../components/OutputField.tsx";


const LinearGeneratorPage = () => {
  const {polynomialsStore} = useContext(Context)!;
  const [userValue, setUserValue] = useState<string>("");
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


          <div className="flex justify-center items-center flex-col gap-2">
            <h3 className="text-center">Структурна матриця</h3>
            <OutputField></OutputField>
            <h3 className="text-center">Матриця станів</h3>
            <OutputField></OutputField>
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
}

export default LinearGeneratorPage;