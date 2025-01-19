interface SequenceTypeProps {
  periodLengthByFormula: number;
  potentialPeriodLength: number;
}

const SequenceType = ({
  periodLengthByFormula,
  potentialPeriodLength,
}: SequenceTypeProps) => {
  return (
    <h5 className="my-1 w-full text-center font-medium text-lg">
      Вид послідовності ={' '}
      {periodLengthByFormula === potentialPeriodLength ? 'M' : 'C'}
      -послідовність
    </h5>
  );
};

export default SequenceType;
