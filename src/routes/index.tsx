import {
    BrowserRouter as Router,
    Route,
    Routes as ReactRoutes,
} from "react-router-dom";
import Home from './home';
import NewMeeting from "./new-meeting";
import SelectRoom from "./new-meeting/select-room";
import Details from "./new-meeting/details";

const Routes = () =>
    <Router>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="new-meeting" element={<NewMeeting />}>
          <Route index element={<Details />} />
          <Route path="select-room" element={<SelectRoom />} />
        </Route>
      </ReactRoutes>
      </Router>

export default Routes;