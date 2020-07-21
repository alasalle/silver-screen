import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MovieDetail from "./views/MovieDetail/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/movie/:movieId" component={MovieDetail} />
          <Route exact path="/favorite" component={FavoritePage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
