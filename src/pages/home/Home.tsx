import About from "../../components/shared/home/About"
import Contact from "../../components/shared/home/Contact"
import Footer from "../../components/shared/home/Footer"
import Hero from "../../components/shared/home/Hero"
import Listings from "../../components/shared/home/Listings"
import ExclusiveBenefits from "../../components/shared/home/referral"
import TeamSection from "../../components/shared/home/teams";
import Testimonial from "../../components/shared/home/testimonial.tsx";
const Home = () => {

    return (
        <section className="relative w-full">
            <Hero />
            <Listings />
            <ExclusiveBenefits />
            <About />
            <TeamSection />
            <Testimonial />
            <Contact />
            <Footer />
        </section>
    )
}

export default Home