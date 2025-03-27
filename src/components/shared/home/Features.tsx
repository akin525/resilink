
import { FcBusinessman, FcDocument, FcGlobe } from "react-icons/fc";

const Features = () => {
  const iconStyles = "text-8xl"
  const featuresData = [
    {
      icon: <FcGlobe className={iconStyles} />,
      title: "Global Networking",
      content:
        "Connect with students from diverse backgrounds and cultures. Expand your academic network globally",
    },
    {
      icon: <FcDocument className={iconStyles} />,
      title: "Collaborative Tools",
      content:
        "Utilize powerful tools for shared document editing and project collaboration. Enhance your learning through collaborative efforts",
    },
    {
      icon: <FcBusinessman className={iconStyles} />,
      title: "Mentorship Opportunities",
      content:
        "Engage in mentorship programs for guidance and support. Be a mentor and make a positive impact on others' academic journeys",
    },
  ];
  return (
    <section id="features" className="relative z-10 bg-dv py-20 md:px-14 px-2">
      <section className="w-full text-center">
        <span className="uppercase text-neutral-200 text-sm font-medium tracking-widest">Features</span>
        <h1
          className="text-center text-white md:text-[46px] text-[26px] md:py-0 py-3 capitalize"
        >What's New?</h1>
        <p
          data-aos="fade-up"
          data-aos-delay="1000"
          className="text-center text-neutral-300 text-lg md:leading-9"
        >
          We care about the community progress and constantly update our theme!
        </p>
      </section>
      <section className="w-100 py-20">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuresData.map((item) => (
            <section className="bg-dvgray rounded text-center md:py-14 py-10 md:px-5 px-5">
              <section className="w-100 flex justify-center mb-5">
                {item?.icon}
              </section>
              <h3 className="text-2xl text-white font-bold mb-5">{item.title}</h3>
              <p className="text-base text-para md:leading-7 mb-5">
                {item.content}
              </p>
            </section>
          ))}
        </section>
      </section>
    </section>
  )
}

export default Features