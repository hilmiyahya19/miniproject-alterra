import Hero from "../../components/Hero/Hero"
import Movies from "../../components/Movies/Movies"

function Dashboard() {
  return (
    <>
       <h1 className="text-3xl font-semibold text-center my-5">Ini Halaman Dashboard</h1>
       <Hero/>
       <Movies title="Latest Movie"/>
    </>
  )
}

export default Dashboard;