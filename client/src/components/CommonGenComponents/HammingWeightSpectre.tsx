import Header5 from '../PageComponents/Headers/Header5.tsx';

interface HammingWeightSpectreProps {
  hammingWeightSpectre: string[];
}

const HammingWeightSpectre = ({
  hammingWeightSpectre,
}: HammingWeightSpectreProps) => {
  return (
    <Header5 align="left">
      Спектр ваг Хеммінга:{' '}
      {hammingWeightSpectre.map((item) => (
        <span key={item}>{item};</span>
      ))}
    </Header5>
  );
};

export default HammingWeightSpectre;
