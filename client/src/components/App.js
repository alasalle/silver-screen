import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MetaTags from "react-meta-tags";
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MovieDetail from "./views/MovieDetail/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";

function App() {
  return (
    <div className="wrapper">
      <MetaTags>
        <meta
          name="description"
          content="Silver Screen is a movie database hobby web app created by Angela La Salle."
        />
        <meta property="og:title" content="Silver Screen" />
        <meta property="og:image" content="./assets/logo_transparent.png" />
      </MetaTags>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/movie/:movieId" component={MovieDetail} />
            <Route exact path="/favorite" component={FavoritePage} />
          </Switch>
        </div>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
