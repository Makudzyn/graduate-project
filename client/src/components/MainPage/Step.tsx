interface StepProps {
   title: string;
   description: string;
   picture: string;
   reverse?: boolean;
}

const Step = ({ title, description, picture, reverse }: StepProps) => {
  return (
    <div className={`flex items-center gap-20 ${reverse && "flex-row-reverse"}`}>
      <div className="flex-grow basis-0 px-4">
        <h3 className="text-primary mb-1.5 text-3xl font-semibold">{title}</h3>
        <p className="text-2xl text-paragraph">{description}</p>
      </div>
      <div className="flex-grow basis-0">
        <img src={picture} alt={"placehold.it"} />
      </div>
    </div>
  );
};

export default Step;
