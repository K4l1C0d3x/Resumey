"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Mail, MessageCircleQuestion, FileText, Settings, ShieldQuestion } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "How do I create a new resume?",
    answer: "Head over to the 'Create Resume' tab in your sidebar. Fill out your personal information, experience, education, and skills. Once you're done, you can instantly preview and download it.",
    icon: FileText
  },
  {
    question: "Are the resume templates ATS-friendly?",
    answer: "Yes! All of our templates are specifically designed to be easily readable by Applicant Tracking Systems (ATS) to ensure your resume gets past the bots and into the hands of real recruiters.",
    icon: ShieldQuestion
  },
  {
    question: "Can I save multiple versions of my resume?",
    answer: "Currently, your data is saved locally so you can safely leave and come back to edit your current resume. In the future, we plan to add support for managing multiple distinct resume profiles.",
    icon: Settings
  },
  {
    question: "How do I download my resume?",
    answer: "On the template preview screen, there is an 'Export PDF' button. It will open your browser's print dialog—make sure to select 'Save as PDF' and disable 'Headers and footers' for the best result.",
    icon: FileText
  }
]

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions or get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col items-start gap-4 bg-primary/5 border-primary/20">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <MessageCircleQuestion className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground">Browse our knowledge base below to find quick answers about using Resumey.</p>
          </div>
        </Card>

        <Card className="p-6 flex flex-col items-start gap-4">
          <div className="p-3 bg-muted rounded-lg text-muted-foreground">
            <Mail className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Contact Support</h3>
            <p className="text-sm text-muted-foreground mb-4">Still need help? Our support team is ready to assist you.</p>
            <Button asChild variant="outline" className="gap-2">
              <Link href="mailto:support@resumey.app">
                <Mail className="w-4 h-4" />
                Email Us
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Common Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <faq.icon className="w-4 h-4 text-muted-foreground" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pl-7">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  )
}
