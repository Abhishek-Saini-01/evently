"use client"
import { IEvent } from "@/db/models/Events.model";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton =  ({event, userId}:{ event:IEvent, userId:string}) => {
    const hasEventFinished = new Date(event.endDateTime) < new Date()
    const { data: session } = useSession()
    
    
  return (
    <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
      ): (
        <>
            
            {!session && <Button asChild className="button rounded-full" size="lg">
                    <Link href="/login">
                        Get Tickets
                    </Link>
                </Button>
            }
            {
                session && <Checkout event={event} userId={userId} />
            }
          
        </>
      )}
    </div>
    </div>
  )
}

export default CheckoutButton