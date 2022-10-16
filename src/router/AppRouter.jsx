import { Route, Routes } from 'react-router-dom';

import { useCheckAuth } from '../hooks/useCheckAuth';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';



export const AppRouter = () => {
    useCheckAuth();

    //  if (status === 'checking') return <h3>Loading ...</h3>

    return (
        <Routes>
            <Route path="/" element={<PublicLayout component={<LoginPage />} />} />
            <Route path="/login" element={<PublicLayout component={<LoginPage />} />} />
            <Route path="/register" element={<PublicLayout component={<RegisterPage />} />} />
            <Route path="/dashboard" element={<PrivateLayout>
                <h5>favoritos</h5>
            </PrivateLayout>} />
            <Route path="/favoritos" element={<PrivateLayout component={<h5>favoritos</h5>} />} />
        </Routes>
    )
}
