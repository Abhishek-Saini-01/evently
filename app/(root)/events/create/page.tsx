import EventForm from "@/components/shared/EventForm"
import getUserId from "@/db/actions/User.action"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const createEvent = async () => {
  const session = await getServerSession()
  if (!session) return redirect("/login")
  const userId = await getUserId();


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10" >
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  )
}

export default createEvent