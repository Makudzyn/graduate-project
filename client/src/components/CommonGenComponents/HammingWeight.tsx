import Header5 from "../PageComponents/Headers/Header5.tsx";

interface HammingWeightProps {
  hammingWeight: number;
}

const HammingWeight = ({ hammingWeight }: HammingWeightProps) => {
  return <Header5 align="left">Вага Хеммінга = {hammingWeight}</Header5>;
};

export default HammingWeight;
