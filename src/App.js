import React from 'react';
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Profile from "./screens/profile/Profile";
function App() {
  return (
    <BrowserRouter>
        <div>
          <Route exact path="/profile" component={Profile} />
        </div>
     </BrowserRouter>
  );
}

export default App;
