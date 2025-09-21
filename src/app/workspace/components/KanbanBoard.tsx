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
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskDetailModal } from './TaskDetail';

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

  // 🆕 state mở TaskDetail
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  // 🧠 Fetch task list khi load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://foundershub.nducky.id.vn/api/${id}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const text = await response.text();
          // console.error('Server error:', response.status, text);
          return;
        }

        const text = await response.text();
        if (!text) {
          console.error('Empty response body');
          return;
        }

        let json;
        try {
          json = JSON.parse(text);
        } catch (err) {
          console.error('Invalid JSON:', text);
          return;
        }

        if (json.code === 200) {
          setTasks(json.data);
        } else {
          console.error('API Error:', json.message);
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchTasks();
  }, [id]);

  const taskById = React.useMemo(
    () => new Map(tasks.map((t) => [t.id, t])),
    [tasks]
  );

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
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
          const token = localStorage.getItem('token');
          await fetch(
            `https://foundershub.nducky.id.vn/api/${id}/tasks/${activeId}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: overId }),
            }
          );
        } catch (err) {
          console.error('Error updating task status:', err);
        }
        return;
      }
    }

    const overTask = taskById.get(overId);
    const activeTask = taskById.get(activeId);
    if (overTask && activeTask && overTask.status !== activeTask.status) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeId ? { ...task, status: overTask.status } : task
        )
      );

      try {
        const token = localStorage.getItem('token');
        await fetch(
          `https://foundershub.nducky.id.vn/api/${id}/tasks/${activeId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: overTask.status }),
          }
        );
      } catch (err) {
        console.error('Error updating task status:', err);
      }
    }
  };

  // 🆕 Handle add task từ modal
  const statusMap: Record<string, string> = {
    'To Do': 'To Do',
    'In Progress': 'In Progress',
    Review: 'Review',
    Done: 'Done',
  };

  const handleAddTask = async (taskData: any) => {
    if (!currentColumn) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `https://foundershub.nducky.id.vn/api/${id}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...taskData,
            status: statusMap[currentColumn],
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to create task:', res.status, text);
        return;
      }

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

  return (
    <div className="flex-1 p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-6 h-full">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
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
                    <div className="flex-1 bg-white rounded-b-lg p-4 space-y-3 min-h-96 scrollbar-thin overflow-y-auto border border-t-0 border-slate-200">
                      {columnTasks.map((task) => (
                        <SortableTask
                          key={task.id}
                          task={task}
                          onClick={() => setSelectedTask(task)} // 🆕 mở modal
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

      {/* 🆕 Modal Add Task */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        columnId={currentColumn ?? ''}
      />

      {/* 🆕 Modal Task Detail */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
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
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
};
