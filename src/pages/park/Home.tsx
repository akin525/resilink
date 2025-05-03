
import Footer from "../../components/shared/home/Footer"
import Park from "../../components/shared/park/Park.tsx"
import Hero from "../../components/shared/park/Hero"
const Home = () => {

    return (
        <section className="relative w-full">
            <Hero />
            <Park/>
            <Footer />
        </section>
    )
}

export default Home