
import Footer from "../../components/shared/home/Footer"
import Hero from "../../components/shared/services/Hero"
import Service from "../../components/shared/services/services"
const Home = () => {

    return (
        <section className="relative w-full">
            <Hero />
            <Service/>
            <Footer />
        </section>
    )
}

export default Home