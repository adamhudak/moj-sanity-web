"use client" // Accordion potrebuje interaktivitu (JS), preto "use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqProps {
  questions?: { 
    question: string; 
    answer: string 
  }[];
}

export default function FaqSection({ questions }: FaqProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto w-full px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">
        Časté otázky
      </h2>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {questions.map((q, i) => (
          <AccordionItem 
            key={i} 
            value={`item-${i}`} 
            className="border rounded-3xl px-6 bg-white border-slate-200 shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 cursor-pointer">
              {q.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
              {q.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}