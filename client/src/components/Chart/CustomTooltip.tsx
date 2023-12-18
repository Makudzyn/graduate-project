import {correlationNameAndType} from "../../functions/chartFunctions.ts";

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     const correlationLevel = payload[0].value.toFixed(6);
//     const {correlationName, correlationType} = correlationNameAndType(correlationLevel);
//     return (
//       <div className={"border-indigo-600 p-2 rounded-md border-2"}>
//         <h4>Індекс: {label}</h4>
//         <p>Коєфіцієнт корреляції: {correlationLevel}</p>
//         <p>Рівень корреляції: {correlationName}</p>
//         <p>Тип: {correlationType}</p>
//       </div>
//     );
//   }
//   return null;
// };

const CustomTooltip = ({correlationLevel, label }: any) => {
    const { correlationName, correlationType } = correlationNameAndType(correlationLevel);

    return (
      <div className={"border-indigo-600 p-2 rounded-md border-2"}>
        <h4>Індекс: {label}</h4>
        <p>Коєфіцієнт корреляції: {correlationLevel.toFixed(6)}</p>
        <p>Рівень корреляції: {correlationName}</p>
        <p>Тип: {correlationType}</p>
      </div>
    );

};

export default CustomTooltip;
