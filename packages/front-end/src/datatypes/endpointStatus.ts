interface EndpointCompleted<T> {
    status: 'completed';
    response: T;
}

interface EndpointInitialising {
    status: 'initialising';
}

interface EndpointInProgress {
    status: 'progressing';
}

interface EndpointError {
    status: 'errored';
    error: Error;
}

export type EndpointStatus<T> =
    | EndpointCompleted<T>
    | EndpointInitialising
    | EndpointInProgress
    | EndpointError;