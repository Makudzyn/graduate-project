import {Select, Option, Input, Button, Typography, Textarea} from "@material-tailwind/react";


const LinearGeneratorPage = () => {
  // Генерация массива опций от 1 до 15
  const options = Array.from({ length: 15 }, (_, index) => index + 1);

    return (
      <section className="h-full flex justify-center">
        <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center ">

          <Typography variant="h1" className="py-5 text-center">Лінійний ЗРЗЗ</Typography>

          <div className="flex justify-evenly px-2.5 w-full">
            <div className="flex justify-center flex-col w-[500px] gap-5 py-3">
                <Select label="Оберіть ступінь поліному">
                  {options.map((option) => (
                    <Option key={option}>{option}</Option>
                  ))}
                </Select>

              <Select label="Оберіть поліном">
                {options.map((option) => (
                  <Option key={option}>{option}</Option>
                ))}
              </Select>
              <Input label="Введіть початковий стан" crossOrigin={undefined}/>
            </div>
          </div>

          <div className="flex justify-center items-center w-full p-8">
            <Button className="border-2 w-96 hover:text-gray-900/90 hover:bg-white hover:border-gray-900/90" size="lg" variant="filled">Розпочати генерацію</Button>
          </div>

          <div className="flex justify-center items-center flex-col gap-2">
            <Typography variant="h3" className="text-center">Структурна матриця</Typography>
            <Textarea labelProps={{className: "hidden"}}
                      className="py-5 h-64 w-[400px] focus:border-t-gray-900">

            </Textarea>

            <Typography variant="h3" className="text-center">Матриця станів</Typography>
            <Textarea labelProps={{className: "hidden"}}
                      className="py-5 h-64 w-[400px] focus:border-t-gray-900">
            </Textarea>
          </div>

          <div className="flex justify-center my-5">
            <div className="flex justify-between w-3/4">
              <Typography variant="h5" id="periodFormula">Період по формулі T = </Typography>
              <Typography variant="h5" id="periodExperiment">Експериментальний період T = </Typography>
              <Typography variant="h5" id="prs-type">Вид послідовності = </Typography>
              <Typography variant="h5" id="hammingWeight">Вага Хеммінгу = </Typography>
            </div>
          </div>

          <Textarea label="Згенерована послідовність" className=""></Textarea>

          <canvas id="autocorrelationChart"></canvas>

        </div>
      </section>
    )
}

export default LinearGeneratorPage;