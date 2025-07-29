
import UpdateUserRole from "../../Modal/UpdateUserRole"


const UserDataRow = ({user}) => {

  const {role,email} = user 

   console.log(user);
   

    console.log(email);
    
  
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className={`${user?.status ==='request'?'text-yellow-500':'text-green-500'} whitespace-no-wrap`}>{user?.status ? user.status: 'Unavailable'}</p>
      </td>

         <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       
        {/* Modal */}
       <UpdateUserRole 
      
          userEmail={email}
          role={role}></UpdateUserRole>
      </td>
    </tr>
  )
}

export default UserDataRow
