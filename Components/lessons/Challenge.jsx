import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Lightbulb, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "@/components/utils/confetti";

export default function Challenge({ challenge, onComplete }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const isCorrect = selectedAnswer === challenge.correctAnswer;

    const handleSubmit = () => {
        setIsAnswered(true);
        if (selectedAnswer === challenge.correctAnswer) {
            confetti();
        }
    };

    return (
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100">
            <div className="mb-4">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    <span>🎯</span>
                    <span>Desafio Prático</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{challenge.question}</h3>
            </div>

            {challenge.scenario && (
                <div className="bg-white p-4 rounded-xl mb-4 border border-indigo-100">
                    <p className="text-gray-600 text-sm">{challenge.scenario}</p>
                </div>
            )}

            <RadioGroup
                value={selectedAnswer}
                onValueChange={setSelectedAnswer}
                disabled={isAnswered}
                className="space-y-3 mb-4"
            >
                {challenge.options.map((option, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Label
                            htmlFor={`option-${index}`}
                            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                isAnswered
                                    ? index === challenge.correctAnswer
                                        ? 'bg-green-100 border-2 border-green-400'
                                        : selectedAnswer === index
                                            ? 'bg-red-100 border-2 border-red-400'
                                            : 'bg-white border-2 border-gray-200'
                                    : selectedAnswer === index
                                        ? 'bg-indigo-100 border-2 border-indigo-400'
                                        : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
                            }`}
                        >
                            <RadioGroupItem value={index} id={`option-${index}`} />
                            <span className="flex-1">{option}</span>
                            {isAnswered && index === challenge.correctAnswer && (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            )}
                            {isAnswered && selectedAnswer === index && index !== challenge.correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-600" />
                            )}
                        </Label>
                    </motion.div>
                ))}
            </RadioGroup>

            <AnimatePresence>
                {showHint && !isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4"
                    >
                        <div className="flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-amber-800 text-sm">{challenge.hint}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isAnswered && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                >
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? '🎉 Parabéns! Resposta correta!' : '😔 Não foi dessa vez...'}
                    </p>
                    <p className="text-sm mt-1 text-gray-700">{challenge.explanation}</p>
                </motion.div>
            )}

            <div className="flex gap-3">
                {!isAnswered && (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setShowHint(!showHint)}
                            className="flex items-center gap-2"
                        >
                            <Lightbulb className="w-4 h-4" />
                            Dica
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        >
                            Verificar Resposta
                        </Button>
                    </>
                )}
                {isAnswered && (
                    <Button
                        onClick={() => onComplete(isCorrect)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        Continuar
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </Card>
    );
}