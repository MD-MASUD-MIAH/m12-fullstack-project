import { useEffect, useState } from "react"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"




export const useRole =()=>{

 const [role,setRole] = useState(null)
 const [isRoleLoading,setIsRoleLoading] = useState(true)
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()


    useEffect(()=>{

        const fetchUserRole = async ()=>{

const {data} = await axiosSecure(
    `${import.meta.env.VITE_API_URL}/user/role/${user?.email}`)

    setRole(data?.role) 

    setIsRoleLoading(false)
        }


        fetchUserRole()


    },[user,axiosSecure])

    console.log(role);
    

    return [role,isRoleLoading]
}