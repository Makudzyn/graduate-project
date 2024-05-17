import Header5 from "../PageComponents/Headers/Header5.tsx";

interface CoprimeConditionProps {
  conditionS: number;
}

const CoprimeCondition = ({ conditionS }: CoprimeConditionProps) => {
  return (
    <Header5>
      {conditionS === 1
        ? "Періоди є взаємно простими."
        : "Періоди не взаємно прості. Обчислення сум та множень не виконано."}
    </Header5>
  );
};

export default CoprimeCondition;
