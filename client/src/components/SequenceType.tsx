interface SequenceTypeProps {
  periodLengthByFormula: number;
  potentialPeriodLength: number;
}

const SequenceType = ({
  periodLengthByFormula,
  potentialPeriodLength,
}: SequenceTypeProps) => {
  return (
    <h5 className="my-5 w-full text-center">
      Вид послідовності ={" "}
      {periodLengthByFormula === potentialPeriodLength ? "M" : "C"}
      -послідовність
    </h5>
  );
};

export default SequenceType;
