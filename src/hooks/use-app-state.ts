import * as React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BUILDINGS } from '../graphql/Query';
import { mapServerDataToClientFormat } from '../utils';
import useInterval from './use-interval';
const SERVER_POLL_INTERVAL = 5 * 1000 * 60;
const CLIENT_POLL_INTERVAL = 1000 * 60;

const { useState, useEffect } = React;
const useAppState = () => {
    const [completed] = useState(false);
    const [appState, setAppState] = useState<IAppData>({ buildings: [], meetingRooms: [], meetingsMeta: { todayMeetingCount: 0, onGoingMeetingCount: 0 } })
    // Bug in pollling of useQuery hence using custom solution.
    // https://github.com/apollographql/apollo-client/issues/5531
    const { loading, data, error, startPolling, stopPolling } = useQuery(GET_ALL_BUILDINGS, {
        // fetchPolicy: 'network-only',
        // nextFetchPolicy: 'cache-first',
        // notifyOnNetworkStatusChange: true,
        // pollInterval: SERVER_POLL_INTERVAL,
    });

    useInterval(() => {
        if (data) {
            const { buildings, meetingRooms, meetingsMeta } = mapServerDataToClientFormat(data.Buildings);
            setAppState({ buildings, meetingRooms, meetingsMeta });
        }
    }, CLIENT_POLL_INTERVAL)

    useEffect(() => {
        if (data) {
            const { buildings, meetingRooms, meetingsMeta } = mapServerDataToClientFormat(data.Buildings);
            setAppState({ buildings, meetingRooms, meetingsMeta });
        }
    }, [data])

    useEffect(() => {
        if (!completed) {
            startPolling(SERVER_POLL_INTERVAL)
        } else {
            stopPolling()
        }
        return () => {
            stopPolling()
        }
    }, [stopPolling, startPolling, completed])

    return { ...appState, loading, error };
}

export default useAppState;