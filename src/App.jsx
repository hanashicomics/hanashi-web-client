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

function App() {
  return (
      <>
          <Router>
              <RootNavigation />

              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/stories" element={<Stories/>}/>
                  <Route path="/createstory" element={<CreateStory/>}/>
                  <Route path="/account" element={<Account/>}/>
                  <Route path="/settings" element={<Settings/>}/>
                  <Route path="/info" element={<StoryInfo/>}/>
                  <Route path="/timeline" element={<Timeline/>}/>
                  <Route path="/arcs" element={<Arcs/>}/>
                  <Route path="/characters" element={<Characters/>}/>
              </Routes>
          </Router>
      </>
  )
}

export default App
