import { Navigate, Route, Routes } from 'react-router-dom';

import { useCheckAuth } from '../hooks/useCheckAuth';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import DashboardPage from '../pages/DashboardPage';
import FavoritePage from '../pages/FavoritesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';



export const AppRouter = () => {
    console.log('AppRouter');
    useCheckAuth();

    //  if (status === 'checking') return <h3>Loading ...</h3>

    return (
        <Routes>
            <Route path="/" element={<PublicLayout component={<LoginPage />} />} />
            <Route path="/login" element={<PublicLayout component={<LoginPage />} />} />
            <Route path="/dashboard" element={<PrivateLayout component={<DashboardPage />} />} />
            <Route path="/favoritos" element={<PrivateLayout component={<FavoritePage />} />} />
            <Route path="/register" element={<PublicLayout component={<RegisterPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
