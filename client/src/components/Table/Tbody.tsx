import { Polynomial } from '../../utils/interfacesAndTypes.ts';

interface TbodyProps {
  polynomialsArray: Polynomial[];
}

const Tbody = ({ polynomialsArray }: TbodyProps) => {
  return (
    <tbody className="text-left transition">
      {polynomialsArray.map((poly, index) => (
        <tr
          className={`font-normal ${index % 2 ? 'bg-gray-50' : 'bg-lightBg'}`}
          key={poly.id}
        >
          <td className="py-2 px-2.5" tabIndex={0}>
            {poly.id}
          </td>
          <td className="py-2 px-2.5">{poly.degree}</td>
          <td className="py-2 px-2.5">{poly.name}</td>
          <td className="py-2 px-2.5">{poly.polynomial}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
