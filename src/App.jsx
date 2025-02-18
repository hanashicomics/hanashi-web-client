import './assets/styles/App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RootNavigation from "./RootNavigation.jsx";
import Stories from "./Stories.jsx";
import CreateStory from "./CreateStory.jsx";
import Account from './Account.jsx'
import Settings from './Settings.jsx'
import StoryInfo from './StoryInfo.jsx'
import Timeline from './Timeline.jsx'
import Arcs from './Arcs.jsx'
import Characters from './Characters.jsx'
import Home from './Home.jsx'
import EditStory from './EditStory.jsx'
import LoadStory from "./LoadStory.jsx";
import CreateCharacter from './CreateCharacter.jsx';
import EditCharacter from "./EditCharacter.jsx";
import CreateArc from './CreateArc.jsx';
import ExportStory from "./ExportStory.jsx";
import EditArc from "./EditArc.jsx";
import CreateChapter from './CreateChapter.jsx';
import EditChapter from "./EditChapter.jsx";
import Locations from "./Locations.jsx";
import CreateLocation from "./CreateLocation.jsx";
import EditLocation from "./EditLocation.jsx";

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
