import { Routes , Route, Navigate} from "react-router-dom";
import Layout from "./layouts/Layout";
import { 
    HomePage,
    AuthCallBackPage,
    UserProfile,
    ManageRestaurant
 } from "./pages";
import ProtectedRoute from "./auth/ProtectedRoute";
import Test from "./Test";

export default function AppRoutes(){
    return (
        <Routes>
            <Route
                path="/"
                element={
                <Layout showHero>
                    <HomePage/>
                </Layout> 
             }
            />
            <Route
                path="/auth-callback"
                element={<AuthCallBackPage/>}
            />
            <Route
                path="*"
                element={<Navigate to="/"/>}
            />
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="user-profile"
                    element={<UserProfile/>}
                />
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route
                    path="restaurant-management"
                    element={<ManageRestaurant/>}
                />
            </Route>
            <Route path="/testing" element={<Test />} />
            
        </Routes>
    )
}
