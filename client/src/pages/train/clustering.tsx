import * as React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function TrainClustering() {
    const navigate = useNavigate();
    const { datasetId } = useParams();

    React.useEffect(() => {
        if (datasetId === undefined) return navigate('/');
    })

    return (
        <div className="min-h-screen w-full">
            <main className="w-full flex">
                <h1 className="text-2">Currently in development</h1>
            </main>
        </div>
    )
}
