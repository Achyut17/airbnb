import prisma from '@/app/libs/prismadb'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import getListing from '../actions/getListings';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subtitle='Please Login' />
            </ClientOnly>
        )
    }

    const listings = await getListing({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Properties found' subtitle='Looks like you have no Properties.' />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default PropertiesPage