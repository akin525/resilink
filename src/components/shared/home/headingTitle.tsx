interface HeadingProps {
  heading?: string;
  subheading?: string;
}

const Heading = ({ heading, subheading }: HeadingProps) => {
  return (
    <div className="w-full text-center">
      <h3 className="text-base text-bc font-semibold tracking-widest uppercase">
        {heading}
      </h3>
      {subheading ? (
        <>
          <h2 className="font-Chalty mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {subheading}
          </h2>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Heading;
