import { useAuth } from 'lib/hooks';
import React from 'react';

const WorkspacesListPage = () => {
    useAuth();

    return (
        <div>WorkspacesListPage</div>
    );
};

export default WorkspacesListPage;
