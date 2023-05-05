import prisma from '@/app/libs/prismadb'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subtitle='Please Login' />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No trips found' subtitle='Looks like you have not reserved any trips.' />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default TripsPage