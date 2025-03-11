import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Contact from "./components/Contact"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import CallforPaper from "./components/CallforPaper"
/* import PaperSubmission from "./components/PaperSubmission"
import ConferenceDetails from "./components/ConferenceDetails"
import ConferenceSchedule from "./components/ConferenceSchedule"
import ConferenceCommittee from "./components/ConferenceCommittee"
 */
/* import Footer from "./components/Footer"
 */
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/call-for-papers" element={<CallforPaper />} />
      </Routes>
{/*       <Footer /> */}
    </Router>
  )
}

export default App
