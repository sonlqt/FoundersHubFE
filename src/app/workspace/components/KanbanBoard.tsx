'use client';
import React, { useEffect, useState } from 'react';
import { Task } from '@/type/task';
import { TaskCard } from '@/app/workspace/components/TaskCard';
import { Plus } from 'lucide-react';
import { AddTaskModal } from './AddTaskModal';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskDetail } from './TaskDetail';

const columns = [
  { id: 'To Do', label: 'To Do', color: 'border-slate-300' },
  { id: 'In Progress', label: 'In Progress', color: 'border-sky-300' },
  { id: 'Review', label: 'Review', color: 'border-yellow-300' },
  { id: 'Done', label: 'Done', color: 'border-emerald-300' },
] as const;

type KanbanBoardProps = {
  id: string; // projectId
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ id }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<string | null>(null);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null); // task đang kéo

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  // Fetch task list khi load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://foundershub.nducky.id.vn/api/${id}/tasks`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) return;

        const text = await response.text();
        if (!text) return;

        let json;
        try {
          json = JSON.parse(text);
        } catch {
          return;
        }

        if (json.code === 200) {
          const apiTasks = Array.isArray(json.data)
            ? json.data
            : (json.data?.tasks ?? []);
          setTasks(apiTasks);
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchTasks();
  }, [id]);

  const taskById = React.useMemo(
    () => new Map((tasks ?? []).map((t) => [t.id, t])),
    [tasks]
  );

  const handleDragStart = (e: DragStartEvent) => {
    const task = taskById.get(e.active.id as string);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const isColumn = columns.some((c) => c.id === overId);
    if (isColumn) {
      const t = taskById.get(activeId);
      if (t && t.status !== overId) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === activeId ? { ...task, status: overId } : task
          )
        );

        try {
          await fetch(
            `https://foundershub.nducky.id.vn/api/${id}/tasks/${activeId}`,
            {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: overId }),
              credentials: 'include',
            }
          );
        } catch (err) {
          console.error('Error updating task status:', err);
        }
        return;
      }
    }

    const overTask = taskById.get(overId);
    const activeTaskData = taskById.get(activeId);
    if (overTask && activeTaskData && overTask.status !== activeTaskData.status) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeId ? { ...task, status: overTask.status } : task
        )
      );

      try {
        await fetch(
          `https://foundershub.nducky.id.vn/api/${id}/tasks/${activeId}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: overTask.status }),
            credentials: 'include',
          }
        );
      } catch (err) {
        console.error('Error updating task status:', err);
      }
    }
  };

  const statusMap: Record<string, string> = {
    'To Do': 'To Do',
    'In Progress': 'In Progress',
    Review: 'Review',
    Done: 'Done',
  };

  const handleAddTask = async (taskData: any) => {
    if (!currentColumn) return;
    try {
      const res = await fetch(
        `https://foundershub.nducky.id.vn/api/${id}/tasks`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...taskData,
            status: statusMap[currentColumn],
          }),
          credentials: 'include',
        }
      );

      if (!res.ok) return;

      const json = await res.json();
      const apiTask = (json?.data || json) as Partial<Task>;

      const newTask: Task = {
        id: apiTask.id || Date.now().toString(),
        ...taskData,
        ...apiTask,
        status: currentColumn,
      };

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleSelectTask = async (task: Task) => {
    let project = task.projectId;

    if (typeof project === 'string') {
      try {
        const res = await fetch(
          `https://foundershub.nducky.id.vn/api/projects/${project}`,
          { credentials: 'include' }
        );
        if (res.ok) {
          const json = await res.json();
          project = json.data;
        }
      } catch (err) {
        console.error('Failed to fetch project:', err);
      }
    }

    setSelectedTask({ ...task, projectId: project });
  };

  return (
    <div className="flex-1 p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
      >
        <div className="grid grid-cols-4 gap-6 h-full">
          {columns.map((column) => {
            const columnTasks = (tasks ?? []).filter(
              (task) => task.status === column.id
            );

            return (
              <div key={column.id} className="flex flex-col">
                <div
                  className={`border-t-3 ${column.color} bg-sky-50 rounded-t-lg px-4 py-3`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-700 text-sm">
                      {column.label}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                        {columnTasks.length}
                      </span>
                      <button
                        onClick={() => {
                          setCurrentColumn(column.id);
                          setIsModalOpen(true);
                        }}
                        className="text-slate-500 hover:text-sky-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <ColumnDroppable id={column.id}>
                  <SortableContext
                    items={columnTasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex-1 bg-white rounded-b-lg p-4 space-y-3 min-h-screen border border-t-0 border-slate-200 overflow-hidden">
                      {columnTasks.map((task) => (
                        <SortableTask
                          key={task.id}
                          task={task}
                          onClick={() => handleSelectTask(task)}
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

        {/* DragOverlay để khối đi theo chuột */}
        <DragOverlay>
          {activeTask ? (
            <div className="shadow-lg rounded-lg bg-white">
              <TaskCard task={activeTask} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        columnId={currentColumn ?? ''}
      />

      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

const ColumnDroppable: React.FC<React.PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={isOver ? 'ring-2 ring-sky-300/50 rounded-b-lg' : ''}
    >
      {children}
    </div>
  );
};

const SortableTask: React.FC<{ task: Task; onClick: () => void }> = ({
  task,
  onClick,
}) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    borderRadius: '0.5rem',
    zIndex: isDragging ? 50 : 'auto',
    background: 'white',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
};
