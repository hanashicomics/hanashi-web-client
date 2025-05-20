import './assets/styles/App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Stories from "./components/Stories.jsx";
import CreateStory from "./components/CreateStory.jsx";
import StoryInfo from './components/StoryInfo.jsx'
import Arcs from './components/Arcs.jsx'
import Characters from './components/Characters.jsx'
import Home from './Home.jsx'
import EditStory from './components/EditStory.jsx'
import LoadStory from "./components/LoadStory.jsx";
import CreateCharacter from './components/CreateCharacter.jsx';
import EditCharacter from "./components/EditCharacter.jsx";
import CreateArc from './components/CreateArc.jsx';
import ExportStory from "./components/ExportStory.jsx";
import EditArc from "./components/EditArc.jsx";
import CreateChapter from './components/CreateChapter.jsx';
import EditChapter from "./components/EditChapter.jsx";
import Locations from "./components/Locations.jsx";
import CreateLocation from "./components/CreateLocation.jsx";
import EditLocation from "./components/EditLocation.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import AppLayout from "./app layout/AppLayout.jsx";
import PublicLayout from "./public layout/PublicLayout.jsx";
import Pricing from "./components/Pricing.jsx";
import Upgrade from "./components/Upgrade.jsx";

function App() {
  return (
      <>
          <Router>

              <Routes>
                  {/* PUBLIC ROUTES */}
                  <Route element={<PublicLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/pricing" element={<Pricing/>}/>
                      <Route path="/upgrade" element={<Upgrade />} />
                  </Route>

                  {/* APP ROUTES (after login) */}
                  <Route element={<AppLayout />}>
                      <Route path="/stories" element={<Stories />} />
                      <Route path="/createstory" element={<CreateStory />} />
                      <Route path="/loadstory" element={<LoadStory />} />
                      <Route path="/story/:storyName" element={<EditStory />} />
                      <Route path="/:storyName/export" element={<ExportStory />} />

                      <Route path="/profile" element={<Profile />} />

                      <Route path="/:storyName/info" element={<StoryInfo />} />

                      <Route path="/:storyName/arcs" element={<Arcs />} />
                      <Route path="/:storyName/createarc" element={<CreateArc />} />
                      <Route path="/:storyName/arcs/:arcName/edit" element={<EditArc />} />
                      <Route path="/:storyName/arcs/:arcName/createchapter" element={<CreateChapter />} />
                      <Route path="/:storyName/arcs/:arcName/chapter/:chapterName" element={<EditChapter />} />

                      <Route path="/:storyName/createcharacter" element={<CreateCharacter />} />
                      <Route path="/:storyName/characters" element={<Characters />} />
                      <Route path="/:storyName/characters/:characterName" element={<EditCharacter />} />

                      <Route path="/:storyName/locations" element={<Locations />} />
                      <Route path="/:storyName/locations/:locationName" element={<EditLocation />} />
                      <Route path="/:storyName/createlocation" element={<CreateLocation />} />
                  </Route>
              </Routes>
          </Router>
      </>
  )
}

export default App
