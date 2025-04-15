
import Footer from "../../components/shared/home/Footer"
import About from "../../components/shared/home/About"
import Hero from "../../components/shared/list/Hero"
const Home = () => {

    return (
        <section className="relative w-full">
            <Hero />
            <About/>
            <Footer />
        </section>
    )
}

export default Home