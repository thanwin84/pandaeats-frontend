import { useUpdateUser, useUserInformation } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import Layout from "@/layouts/Layout";


export default function UserProfile(){
    const {
        updateUser,
        isPending:userUpdatePending
    } = useUpdateUser()
    const {isPending:getUserInfoPending, currentUser, isError} = useUserInformation()
    if (getUserInfoPending){
        return <p>Loading...</p>
    }
    if (isError){
        return <p>Unable to load user profile</p>
    }
    
   
    return (
        <Layout showHero={false} className="px-4 py-6 md:px-10" >
            <UserProfileForm 
                isLoading={userUpdatePending}
                onSave={updateUser} 
                className="md:px-28"
                user={currentUser}
            />
        </Layout>
    )
}