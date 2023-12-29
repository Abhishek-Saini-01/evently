import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { getEventsByUser } from "@/db/actions/Event.action"
import { getOrdersByUser } from "@/db/actions/Order.actions"
import getUserId from "@/db/actions/User.action"
import { IOrder } from "@/db/models/Order.model"
import { SearchParamProps } from "@/types"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

const profilePage = async ({ searchParams }:SearchParamProps) => {
  const session = await getServerSession()
  if (!session) return redirect("/login")
  const userId = await getUserId()

  const ordersPage = Number(searchParams?.ordersPage) || 1; 
  const eventsPage = Number(searchParams?.eventsPage) || 1; 

  const orders = await getOrdersByUser({userId, page: ordersPage})
  const orderedEvents = orders?.data.map((order:IOrder) => order.event) || [];

  const orgainzedEvents = await getEventsByUser({
    userId,
    page: eventsPage
  })
  
  
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event ticket purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events toexplore"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={orgainzedEvents?.data}
          emptyTitle="No events created yet"
          emptyStateSubtext="Go create some events now"
          collectionType="Events_Organized"
          limit={6}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={orgainzedEvents?.totalPages}
        />
      
      </section>
    </>
  )
}

export default profilePage