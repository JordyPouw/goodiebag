import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';

import { Main } from './components/Main';
import { Collection } from './components/Collection';
import { BagDetails } from './components/Details';

export function RootRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path={'/discover/:bagName'} element={<BagDetails />} />
      <Route path={'/discover'} element={<Main />} />
      <Route path={'/my-goodiebags/:bagUuid'} element={<BagDetails />} />
      <Route path={'/my-goodiebags'} element={<Collection />} />
      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  );
}
