import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const dashboardPage = async () => {
  const session = await getServerSession()
  if(!session) return redirect("/login")

  return (
    <div >createPage</div>
  )
}

export default dashboardPage