import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import { AuthContext } from './Usercontext';
import { BookContext } from './Bookcontext';
import PrivateMyBooks from './PrivateMyBooks';
import ResponseNotFound from './ResponseNotFound';

// Lazy load components
const MainBooks = lazy(() => import('./mainBooks'));
const Signup = lazy(() => import('./Signup'));
const Signin = lazy(() => import('./signin'));
const MyBooks = lazy(() => import('./MyBooks'));

function App() {
  return (
    <AuthContext>
      <BookContext>
        <Nav />
        
        {/* Suspense wraps all lazy components */}
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<MainBooks />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/MyBooks" element={
              <PrivateMyBooks>
                <MyBooks />
              </PrivateMyBooks>
            } />
            <Route path="*" element={<ResponseNotFound />} />
          </Routes>
        </Suspense>
        
      </BookContext>
    </AuthContext>
  );
}

export default App;
