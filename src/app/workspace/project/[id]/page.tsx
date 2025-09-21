'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectDetail from '../../components/ProjectDetail';
import { Project } from '@/type/project';
import { KanbanBoard } from '../../components/KanbanBoard';
import { useRouter } from 'next/router';





export default function Page() {

    const params = useParams();
    const id = params?.id as string;
    return (
        <div>
            <ProjectDetail id={id} />
            <KanbanBoard id={id} />
        </div>
    );
}
