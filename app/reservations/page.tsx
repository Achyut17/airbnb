import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ReservationClient from "./ReservationClient"

const ReservationPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id })

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No reservations Found" subtitle="Looks like you do not have any reservations on your property" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default ReservationPage