import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RQSuperHeroes from './components/RQSuperHeroes';
import SuperHeroes from './components/SuperHeroes';
import RQSuperHero from './components/RQSuperHero';
import ParallelQueries from './components/ParallelQueries';
import './App.css';
import DynamicParallel from './components/DynamicParallel';
import DependentQueries from './components/DependentQueries';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/super-heroes" element={<SuperHeroes />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
          <Route path="/rq-super-heroes/:id" element={<RQSuperHero />} />
          <Route path="/rq-parallel" element={<ParallelQueries />} />
          <Route
            path="/rq-dependent"
            element={<DependentQueries email="lenguyenhoangkhang2@gmail.com" />}
          />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallel heroIds={[1, 3]} />}
          />
          <Route path="/rq-paginated" element={<PaginatedQueries />} />
          <Route path="/rq-infinite" element={<InfiniteQueries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
