import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ children }) => {
    const location = useLocation();
    // const navigate = useNavigate()
    const token = localStorage.getItem('token');
    // console.log(user?.user);

    // Check if the user has the admin role
    if (token) {
        return children;
    }
    

    // If the user is not an admin, redirect to the auth page
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AdminRoutes;
