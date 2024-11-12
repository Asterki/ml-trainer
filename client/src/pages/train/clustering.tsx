import * as React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function TrainClustering() {
    const navigate = useNavigate();
    const { fileID } = useParams();

    React.useEffect(() => {
        if (fileID === undefined) return navigate('/home');
    })

    return (
        <div className="min-h-screen w-full">
            <main className="w-full flex"></main>
        </div>
    )
}
