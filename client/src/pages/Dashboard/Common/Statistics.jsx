import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner"
import { useRole } from "../../../hooks/useRole"
import MyOrders from "../Customer/MyOrders"
import MyInventory from "../Seller/MyInventory"

const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {role === 'admin' && <AdminStatistics />}
      {role === 'seller' && <MyInventory />}
      {role === 'customer' && <MyOrders />}
    </div>
  )
}

export default Statistics