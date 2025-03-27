import { ButtonBg } from "../buttons/Buttons"

const Getstarted = () => {
    return (
        <section className={`bg-[url("https://res.cloudinary.com/dvwvizxtz/image/upload/v1714208155/StudConnect/hy5os4sgvqrmofm29xgn.png")] bg-cover w-full z-10 relative bg-no-repeat bg-dvblue py-24`}>
            <section className="w-full  text-center">
                <span className="uppercase text-white text-base font-medium tracking-widest">Sign Up Today</span>
                <h1
                    className="my-6 text-center text-white md:text-[40px] text-[26px] capitalize"
                >
                    Join StudConnect and unlock a world of collaborative learning opportunities
                </h1>
                <section className="w-fit mx-auto">
                    <ButtonBg className="px-10 py-3" onClick={function (): void {
                        throw new Error("Function not implemented.")
                    }}>Get Started</ButtonBg>
                </section>
            </section>
        </section>
    )
}

export default Getstarted