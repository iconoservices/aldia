import { Plus, Trash2, ListTodo, Edit2, Archive, Play, GripVertical } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { Project } from '../../hooks/useAlDiaState';
import { ProjectEditOverlay } from '../features/ProjectEditOverlay';

interface ProyectosProps {
    projects: Project[];
    onAddProject: () => void;
    deleteProject: (id: number) => void;
    updateProject: (id: number, updates: Partial<Project>) => void;
    onOpenDetail: (projectId: number) => void;
    reorderProjects: (newOrder: Project[]) => void;
}

export const ProyectosDashboard = ({ 
    projects, onAddProject, deleteProject, updateProject, onOpenDetail, reorderProjects
}: ProyectosProps) => {
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showArchived, setShowArchived] = useState(false);
    const [isDetailedView, setIsDetailedView] = useState(false);

    const activeItems = projects.filter(p => (p.status === 'activo' || !p.status) && !p.parentId);
    const archivedItems = projects.filter(p => p.status === 'pausado' && !p.parentId);

    const displayedProjects = projects.filter(p => {
        const matchesStatus = showArchived ? p.status === 'pausado' : (p.status === 'activo' || !p.status);
        if (!matchesStatus) return false;
        if (isDetailedView) return true;
        return !p.parentId;
    });
    
    return (
        <div style={{ paddingBottom: '5rem' }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                marginBottom: '1.5rem' 
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-carbon)' }}>Proyectos</h2>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <span style={{ background: 'var(--domain-blue)', color: 'white', fontSize: '0.6rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>
                                {activeItems.length} ACT
                            </span>
                            <span style={{ background: '#F1F5F9', color: '#94A3B8', fontSize: '0.6rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                                {archivedItems.length} ARCH
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto', 
                    paddingBottom: '4px',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}>
                    <button 
                        onClick={() => setIsDetailedView(!isDetailedView)}
                        style={{ 
                            background: isDetailedView ? '#F0EBE6' : 'white', 
                            color: isDetailedView ? 'var(--domain-purple)' : '#888', border: '1px solid #EEE', borderRadius: '12px', padding: '6px 10px', 
                            display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', 
                            fontWeight: 900, fontSize: '0.65rem', transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                    >
                        <ListTodo size={12} /> 
                        {isDetailedView ? 'AGRUPADA' : 'PLANA'}
                    </button>
                    <button 
                        onClick={() => setShowArchived(!showArchived)}
                        style={{ 
                            background: showArchived ? '#F0EBE6' : 'white', 
                            color: showArchived ? 'var(--text-carbon)' : '#888', border: '1px solid #EEE', borderRadius: '12px', padding: '6px 10px', 
                            display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', 
                            fontWeight: 900, fontSize: '0.65rem', transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                    >
                        {showArchived ? <Play size={12} /> : <Archive size={12} />} 
                        {showArchived ? 'ACTIVOS' : 'ARCHIVOS'}
                    </button>
                    <button 
                        onClick={onAddProject}
                        style={{ 
                            background: 'linear-gradient(135deg, var(--domain-blue) 0%, #003399 100%)', 
                            color: 'white', border: 'none', borderRadius: '12px', padding: '6px 12px', 
                            display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', 
                            fontWeight: 900, fontSize: '0.65rem', boxShadow: '0 4px 12px rgba(0, 85, 255, 0.2)',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            marginLeft: 'auto'
                        }}
                    >
                        <Plus size={14} /> NUEVO
                    </button>
                </div>
            </div>

            <Reorder.Group 
                axis="y"
                values={displayedProjects}
                onReorder={(newOrder) => {
                    const otherProjects = projects.filter(p => !displayedProjects.find(dp => dp.id === p.id));
                    // Reorder works best by keeping the rest of the projects in their relative positions
                    // but putting the new order in place.
                    reorderProjects([...newOrder, ...otherProjects]);
                }}
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    listStyle: 'none',
                    padding: 0
                }}
            >
                {displayedProjects.map(project => (
                    <Reorder.Item 
                        key={project.id} 
                        value={project}
                    >
                        <ProjectCard 
                            project={project} 
                            allProjects={projects}
                            deleteProject={deleteProject}
                            onEdit={() => setEditingProject(project)}
                            onOpenDetail={onOpenDetail}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {displayedProjects.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '24px', border: '2px dashed #F1F5F9' }}>
                    <p style={{ color: '#94A3B8', fontWeight: 700, margin: 0 }}>
                        {showArchived ? 'No tienes proyectos archivados.' : 'No hay proyectos activos. ¡Crea uno para empezar!'}
                    </p>
                </div>
            )}

            <ProjectEditOverlay 
                isOpen={!!editingProject}
                onClose={() => setEditingProject(null)}
                project={editingProject}
                projects={projects}
                updateProject={updateProject}
            />
        </div>
    );
};

const ProjectCard = ({ 
    project, allProjects, deleteProject, onEdit, onOpenDetail
}: { 
    project: Project, 
    allProjects: Project[],
    deleteProject: (id: number) => void,
    onEdit: () => void,
    onOpenDetail: (pid: number) => void
}) => {
    const subProjects = allProjects.filter(p => p.parentId === project.id);
    const hasSubProjects = subProjects.length > 0;
    
    const getProjectTasks = (p: Project) => p.checklist || [];
    const allNestedTasks = [
        ...getProjectTasks(project),
        ...subProjects.flatMap(sp => getProjectTasks(sp))
    ];
    
    const completedCount = allNestedTasks.filter(t => t.completed).length;
    const totalCount = allNestedTasks.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <GlassCard 
            style={{ 
                padding: '1rem', 
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: `6px solid ${project.color}`,
                cursor: 'pointer',
                background: 'white',
                gap: '12px'
            }}
            onClick={() => onOpenDetail(project.id)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <GripVertical size={16} color="#DDD" style={{ cursor: 'grab' }} />
                    <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-carbon)', lineHeight: 1.2 }}>
                            {project.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                            {hasSubProjects && (
                                <span style={{ fontSize: '0.6rem', fontWeight: 900, color: project.color, background: `${project.color}15`, padding: '1px 6px', borderRadius: '4px' }}>
                                    📁 {subProjects.length} HIJOS
                                </span>
                            )}
                            {project.parentId && (
                                <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#AAA' }}>
                                    En: {allProjects.find(p => p.id === project.parentId)?.name || '...'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        style={{ background: '#F1F5F9', border: 'none', color: '#64748B', borderRadius: '8px', padding: '6px', cursor: 'pointer' }}
                    >
                        <Edit2 size={14} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); if(confirm('¿Borrar proyecto?')) deleteProject(project.id); }}
                        style={{ background: '#F1F5F9', border: 'none', color: '#EF4444', borderRadius: '8px', padding: '6px', cursor: 'pointer' }}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#94A3B8' }}>PROGRESO</span>
                        <span style={{ fontSize: '0.6rem', fontWeight: 900, color: project.color }}>{Math.round(progress)}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            style={{ height: '100%', background: project.color }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#F8FAFC', padding: '4px 8px', borderRadius: '8px' }}>
                    <ListTodo size={12} color="#94A3B8" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#334155' }}>{completedCount}/{totalCount}</span>
                </div>
            </div>
        </GlassCard>
    );
};
