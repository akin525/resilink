
import Footer from "../../components/shared/home/Footer"
import Hero from "../../components/shared/list/Hero"
import List from "../../components/shared/list/Listings"
const Home = () => {

    return (
        <section className="relative w-full">
            <Hero />
            <List/>
            <Footer />
        </section>
    )
}

export default Home