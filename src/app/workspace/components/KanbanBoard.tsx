import React from 'react';
import { Task } from '@/type/Task';
import { TaskCard } from '@/app/workspace/components/TaskCard';
import { Plus } from 'lucide-react';

import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    closestCenter,
    useDroppable,
} from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface KanbanBoardProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    /** Tuỳ chọn: gọi khi task được thả sang cột khác để bạn persist */
    onTaskStatusChange?: (taskId: string | number, newStatus: string) => void;
}

const columns = [
    { id: 'To Do',        label: 'To Do',        color: 'border-slate-300'  },
    { id: 'In Progress',  label: 'In Progress',  color: 'border-sky-300'    },
    { id: 'Review',       label: 'Review',       color: 'border-yellow-300' },
    { id: 'Done',         label: 'Done',         color: 'border-emerald-300'},
] as const;

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskClick, onTaskStatusChange }) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
    );

    // map nhanh để tra task theo id
    const taskById = React.useMemo(() => new Map(tasks.map(t => [t.id, t])), [tasks]);

    const handleDragStart = (_e: DragStartEvent) => {
        // không cần làm gì hiện tại; giữ cho tương lai nếu muốn overlay
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Nếu thả lên cột (id khớp cột), đổi status theo cột
        const isColumn = columns.some(c => c.id === overId);
        if (isColumn) {
            const t = taskById.get(activeId);
            if (t && t.status !== overId) onTaskStatusChange?.(activeId, overId);
            return;
        }

        // Nếu thả lên một task khác, lấy status của task đó
        const overTask = taskById.get(overId);
        const activeTask = taskById.get(activeId);
        if (overTask && activeTask && overTask.status !== activeTask.status) {
            onTaskStatusChange?.(activeId, overTask.status);
        }
    };

    return (
        <div className="flex-1 p-6">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-4 gap-6 h-full">
                    {columns.map((column) => {
                        const columnTasks = tasks.filter(task => task.status === column.id);

                        return (
                            <div key={column.id} className="flex flex-col">
                                <div className={`border-t-3 ${column.color} bg-sky-50 rounded-t-lg px-4 py-3`}>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-semibold text-slate-700 text-sm">
                                            {column.label}
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                                                {columnTasks.length}
                                            </span>
                                            <button className="text-slate-500 hover:text-sky-600">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Vùng drop của cột */}
                                <ColumnDroppable id={column.id}>
                                    <SortableContext
                                        items={columnTasks.map(t => t.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="flex-1 bg-white rounded-b-lg p-4 space-y-3 min-h-96 scrollbar-thin overflow-y-auto border border-t-0 border-slate-200">
                                            {columnTasks.map((task) => (
                                                <SortableTask
                                                    key={task.id}
                                                    task={task}
                                                    onClick={onTaskClick}
                                                />
                                            ))}
                                            {columnTasks.length === 0 && (
                                                <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-lg">
                                                    <p className="text-slate-500 text-sm">No tasks</p>
                                                </div>
                                            )}
                                        </div>
                                    </SortableContext>
                                </ColumnDroppable>
                            </div>
                        );
                    })}
                </div>
            </DndContext>
        </div>
    );
};

/** Vùng droppable cho cột, giữ nguyên padding/UI */
const ColumnDroppable: React.FC<React.PropsWithChildren<{ id: string }>> = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className={isOver ? 'ring-2 ring-sky-300/50 rounded-b-lg' : ''}>
            {children}
        </div>
    );
};

/** Bọc TaskCard thành phần draggable, không đổi UI TaskCard */
const SortableTask: React.FC<{ task: Task; onClick: (task: Task) => void }> = ({ task, onClick }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: task.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard task={task} onClick={onClick} />
        </div>
    );
};
