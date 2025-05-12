import './assets/styles/App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RootNavigation from "./components/RootNavigation.jsx";
import Stories from "./components/Stories.jsx";
import CreateStory from "./components/CreateStory.jsx";
import Account from './components/Account.jsx'
import Settings from './components/Settings.jsx'
import StoryInfo from './components/StoryInfo.jsx'
import Timeline from './components/Timeline.jsx'
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

function App() {
  return (
      <>
          <Router>
              <RootNavigation />

              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/story/:storyName" element={<EditStory/>}/>
                  <Route path="/stories" element={<Stories/>}/>
                  <Route path="/createstory" element={<CreateStory/>}/>
                  <Route path="/loadstory" element={<LoadStory/>}/>
                  <Route path="/:storyName/export" element={<ExportStory/>}/>

                  <Route path="/account" element={<Account/>}/>
                  <Route path="/settings" element={<Settings/>}/>

                  <Route path="/:storyName/info" element={<StoryInfo/>}/>
                  <Route path="/:storyName/timeline" element={<Timeline/>}/>
                  <Route path="/:storyName/arcs" element={<Arcs/>}/>
                  <Route path="/:storyName/createarc" element={<CreateArc/>}/>
                  <Route path="/:storyName/arcs/:arcName/edit" element={<EditArc/>}/>
                  <Route path="/:storyName/arcs/:arcName/createchapter" element={<CreateChapter/>}/>
                  <Route path="/:storyName/arcs/:arcName/chapter/:chapterName/" element={<EditChapter/>}/>

                  <Route path="/:storyName/createcharacter" element={<CreateCharacter/>}/>
                  <Route path="/:storyName/characters" element={<Characters/>}/>
                  <Route path="/:storyName/characters/:characterName" element={<EditCharacter/>}/>

                  <Route path="/:storyName/locations" element={<Locations/>}/>
                  <Route path="/:storyName/locations/:locationName" element={<EditLocation/>}/>
                  <Route path="/:storyName/createlocation" element={<CreateLocation/>}/>
              </Routes>
          </Router>
      </>
  )
}

export default App
