import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import { WatchlistProvider } from "./context/WatchlistContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundEffects from "./components/BackgroundEffects";

const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const Results = lazy(() => import("./pages/Results"));
const Watchlist = lazy(() => import("./pages/Watchlist"));

function App() {
    return (
        <div className="
                relative flex min-h-screen 
                flex-col bg-(--color-bg)
                text-(--color-text)
                isolate">

            <BackgroundEffects />
            
            <WatchlistProvider>
                <Router>
                    <Navbar />

                    <div className="relative z-0 flex-1">
                        <Suspense
                            fallback={
                                <div className="p-4 text-sm text-textMuted">
                                    Loading...
                                </div>
                            }
                        >
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Home />}
                                />

                                <Route
                                    path="/detail/:id"
                                    element={<Detail />}
                                />

                                <Route
                                    path="/results"
                                    element={<Results />}
                                />

                                <Route
                                    path="/watchlist"
                                    element={<Watchlist />}
                                />
                            </Routes>
                        </Suspense>
                    </div>

                    <Footer />
                </Router>
            </WatchlistProvider>
        </div>
    );
}

export default App;