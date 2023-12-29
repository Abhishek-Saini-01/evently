import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/db/actions/Event.action"
import getUserId from "@/db/actions/User.action"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type UpdateEventProps = {
  params: {
    id: string
  }
}
const updateEvent = async ({params:{id}}: UpdateEventProps) => {
  const session = await getServerSession()
  if (!session) return redirect("/login")
  const userId = await getUserId();

  const event = await getEventById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10" >
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm 
          userId={userId} 
          event={event} 
          eventId={event._id} 
          type="Update" 
        />
      </div>
    </>
  )
}

export default updateEvent