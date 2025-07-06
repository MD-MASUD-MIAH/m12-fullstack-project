
import UpdateUserRole from "../../Modal/UpdateUserRole"


const UserDataRow = ({user}) => {

  const {role} = user 

 

    
  
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-red-500 whitespace-no-wrap'>{user?.status ? user.status: 'Unavailable'}</p>
      </td>

         <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       
        {/* Modal */}
       <UpdateUserRole 
      
         
          role={role}></UpdateUserRole>
      </td>
    </tr>
  )
}

export default UserDataRow
