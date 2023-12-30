interface CoprimeConditionProps {
  conditionS: number;
}

const CoprimeCondition = ({ conditionS }: CoprimeConditionProps) => {
  return (
    <div className="w-full text-center my-1">
      {conditionS === 1
        ? "Періоди є взаємно простими."
        : "Періоди не взаємно прості. Обчислення сум та множень не виконано."}
    </div>
  );
};

export default CoprimeCondition;
