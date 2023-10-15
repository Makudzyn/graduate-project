import InputBlock from "../components/LinearGenComponents/InputBlock.tsx";


const LinearGeneratorPage = () => {
  // Генерация массива опций от 1 до 15

    return (
      <section className="h-full flex justify-center">
        <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center ">

          <h1 className="py-5 text-center">Лінійний ЗРЗЗ</h1>

          <div className="flex justify-evenly px-2.5 w-full">
            <InputBlock/>
          </div>

          <div className="flex justify-center items-center w-full p-8">
            <button className="border-2 w-96 hover:text-gray-900/90 hover:bg-white hover:border-gray-900/90" >Розпочати генерацію</button>
          </div>

          <div className="flex justify-center items-center flex-col gap-2">
            <h3 className="text-center">Структурна матриця</h3>
            <textarea className="py-5 h-64 w-[400px] focus:border-t-gray-900">

            </textarea>

            <h3 className="text-center">Матриця станів</h3>
            <textarea className="py-5 h-64 w-[400px] focus:border-t-gray-900">
            </textarea>
          </div>

          <div className="flex justify-center my-5">
            <div className="flex justify-between w-3/4">
              <h5 id="periodFormula">Період по формулі T = </h5>
              <h5 id="periodExperiment">Експериментальний період T = </h5>
              <h5 id="prs-type">Вид послідовності = </h5>
              <h5 id="hammingWeight">Вага Хеммінгу = </h5>
            </div>
          </div>

          <label>"Згенерована послідовність"</label>
          <textarea  className=""></textarea>

          <canvas id="autocorrelationChart"></canvas>

        </div>
      </section>
    )
}

export default LinearGeneratorPage;