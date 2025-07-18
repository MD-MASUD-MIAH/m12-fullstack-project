
import { Navigate, useLoaderData, } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { useRole } from '../hooks/useRole'

const  SellerRoute = ({ children }) => {
 
    const [role, isRoleLoading] = useRole()
  const location = useLoaderData()
  console.log(location)
  console.log('I was here, in seller route')
  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'seller') return children
  return <Navigate to='/' replace='true' />
}

export default SellerRoute
