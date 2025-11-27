import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Sparkles, FileText, Table2, Globe, Mail, Lock, CheckCircle2, Flame, Star, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Course data inline to avoid import issues
const modules = [
    {
        id: "word",
        title: "Microsoft Word",
        description: "Aprenda a criar e editar documentos de texto com facilidade",
        icon: FileText,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        lessonsCount: 3
    },
    {
        id: "excel",
        title: "Microsoft Excel",
        description: "Organize dados, crie tabelas e faça cálculos simples",
        icon: Table2,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        lessonsCount: 3
    },
    {
        id: "browser",
        title: "Navegador de Internet",
        description: "Explore a internet com segurança e encontre informações",
        icon: Globe,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        lessonsCount: 3
    },
    {
        id: "email",
        title: "E-mail",
        description: "Aprenda a enviar e receber mensagens eletrônicas",
        icon: Mail,
        bgColor: "bg-rose-100",
        iconColor: "text-rose-600",
        lessonsCount: 3
    }
];

const achievements = [
    { id: "first-lesson", emoji: "🎯", title: "Primeiro Passo", description: "Complete sua primeira lição" },
    { id: "word-master", emoji: "📝", title: "Mestre do Word", description: "Complete todas as lições de Word" },
    { id: "excel-master", emoji: "📊", title: "Mestre do Excel", description: "Complete todas as lições de Excel" },
    { id: "browser-master", emoji: "🌐", title: "Navegador Expert", description: "Complete todas as lições de Navegador" },
    { id: "email-master", emoji: "📧", title: "Mestre do E-mail", description: "Complete todas as lições de E-mail" },
    { id: "streak-3", emoji: "🔥", title: "Em Chamas!", description: "Estude 3 dias seguidos" }
];

const lessonIds = {
    word: ["word-1", "word-2", "word-3"],
    excel: ["excel-1", "excel-2", "excel-3"],
    browser: ["browser-1", "browser-2", "browser-3"],
    email: ["email-1", "email-2", "email-3"]
};

function ProgressCard({ progress }) {
    const xpForNextLevel = progress.level * 100;
    const currentLevelXp = progress.total_xp % 100;
    const progressPercent = (currentLevelXp / xpForNextLevel) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-xl border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white/80 text-sm font-medium">Seu Progresso</p>
                            <h2 className="text-3xl font-bold">Nível {progress.level}</h2>
                        </div>
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                            <Trophy className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                            <span>XP: {progress.total_xp}</span>
                            <span>{currentLevelXp}/{xpForNextLevel}</span>
                        </div>
                        <Progress value={progressPercent} className="h-3 bg-white/30" />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                            <Flame className="w-5 h-5 text-orange-300" />
                            <span className="font-semibold">{progress.current_streak} dias</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                            <Star className="w-5 h-5 text-yellow-300" />
                            <span className="font-semibold">{progress.achievements?.length || 0} conquistas</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

function ModuleCard({ module, index, isUnlocked, completedLessons }) {
    const totalLessons = module.lessonsCount;
    const modulelessonIds = lessonIds[module.id] || [];
    const completed = modulelessonIds.filter(id => completedLessons?.includes(id)).length;
    const progressPercent = (completed / totalLessons) * 100;
    const isComplete = completed === totalLessons;
    const Icon = module.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link to={isUnlocked ? createPageUrl(`Module?id=${module.id}`) : "#"}>
                <Card className={`p-5 rounded-2xl transition-all duration-300 border-2 ${
                    isUnlocked 
                        ? 'bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer border-transparent hover:border-indigo-200' 
                        : 'bg-gray-100 cursor-not-allowed border-gray-200 opacity-60'
                }`}>
                    <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-2xl ${module.bgColor}`}>
                            <Icon className={`w-8 h-8 ${module.iconColor}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-gray-900 truncate">{module.title}</h3>
                                {isComplete && (
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                )}
                                {!isUnlocked && (
                                    <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                )}
                            </div>
                            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{module.description}</p>
                            
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{completed}/{totalLessons} lições</span>
                                    <span>{Math.round(progressPercent)}%</span>
                                </div>
                                <Progress value={progressPercent} className="h-2" />
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}

function AchievementBadge({ achievement, isUnlocked, index }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                            isUnlocked 
                                ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-200' 
                                : 'bg-gray-200 grayscale opacity-50'
                        }`}
                    >
                        {achievement.emoji}
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-center">
                        <p className="font-semibold">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default function Home() {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => {});
    }, []);

    const { data: progressData, isLoading } = useQuery({
        queryKey: ['userProgress'],
        queryFn: async () => {
            const list = await base44.entities.UserProgress.list();
            if (list.length === 0) {
                const newProgress = await base44.entities.UserProgress.create({
                    total_xp: 0,
                    level: 1,
                    completed_lessons: [],
                    achievements: [],
                    current_streak: 0,
                    last_activity_date: new Date().toISOString().split('T')[0]
                });
                return newProgress;
            }
            return list[0];
        }
    });

    const progress = progressData || {
        total_xp: 0,
        level: 1,
        completed_lessons: [],
        achievements: [],
        current_streak: 0
    };

    const isModuleUnlocked = (index) => {
        if (index === 0) return true;
        const prevModuleId = modules[index - 1].id;
        const prevLessonIds = lessonIds[prevModuleId] || [];
        const completedInPrev = prevLessonIds.filter(id => 
            progress.completed_lessons?.includes(id)
        ).length;
        return completedInPrev >= Math.ceil(prevLessonIds.length * 0.5);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                        <span className="text-indigo-600 font-medium">Alfabetização Digital</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Olá{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Continue sua jornada de aprendizado digital
                    </p>
                </motion.div>

                {/* Progress Card */}
                <div className="mb-8">
                    <ProgressCard progress={progress} />
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 mb-8 overflow-x-auto pb-2"
                >
                    <Link to={createPageUrl("Family")}>
                        <Button variant="outline" className="flex items-center gap-2 rounded-xl whitespace-nowrap">
                            <MessageCircle className="w-4 h-4" />
                            Escola & Família
                        </Button>
                    </Link>
                    <Link to={createPageUrl("Achievements")}>
                        <Button variant="outline" className="flex items-center gap-2 rounded-xl whitespace-nowrap">
                            <BookOpen className="w-4 h-4" />
                            Minhas Conquistas
                        </Button>
                    </Link>
                </motion.div>

                {/* Achievements Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Conquistas Recentes</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {achievements.slice(0, 6).map((achievement, index) => (
                            <AchievementBadge
                                key={achievement.id}
                                achievement={achievement}
                                isUnlocked={progress.achievements?.includes(achievement.id)}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Modules */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Módulos de Aprendizado</h2>
                    <div className="grid gap-4">
                        {modules.map((module, index) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                                index={index}
                                isUnlocked={isModuleUnlocked(index)}
                                completedLessons={progress.completed_lessons}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}