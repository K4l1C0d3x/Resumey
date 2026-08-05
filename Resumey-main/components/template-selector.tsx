"use client"

import { useState, useEffect } from "react"
import { ResumeFormData } from "@/components/resume/resume-form"
import { RESUME_TEMPLATES } from "@/lib/templates/resume-templates"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface TemplateSelectorProps {
  resumeData: ResumeFormData
}

export function TemplateSelector({ resumeData }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof RESUME_TEMPLATES>('MODERN')
  const [freshResumeData, setFreshResumeData] = useState<ResumeFormData>(resumeData)
  const { toast } = useToast()

  const currentTemplate = RESUME_TEMPLATES[selectedTemplate]
  const TemplateComponent = currentTemplate.component

  // Update fresh data when resumeData prop changes
  useEffect(() => {
    console.log('TemplateSelector - resumeData changed:', resumeData)
    setFreshResumeData(resumeData)
    // Force re-render by updating selected template
    setSelectedTemplate(prev => prev)
  }, [resumeData])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Left Column: Controls & Info */}
      <div className="xl:col-span-4 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Resume Templates</h3>
              <p className="text-sm text-muted-foreground">Choose a professional template for your resume</p>
            </div>
          </div>

          <div>
            <Select value={selectedTemplate} onValueChange={(value: keyof typeof RESUME_TEMPLATES) => setSelectedTemplate(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RESUME_TEMPLATES).map(([key, template]) => (
                  <SelectItem key={key} value={key}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4">Template Features</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <h5 className="font-medium text-sm">Professional Design</h5>
              <p className="text-xs text-muted-foreground">
                Clean, modern layouts optimized for A4 paper size
              </p>
            </div>
            <div className="space-y-1">
              <h5 className="font-medium text-sm">Print-Ready</h5>
              <p className="text-xs text-muted-foreground">
                Optimized CSS for high-quality PDF exports
              </p>
            </div>
            <div className="space-y-1">
              <h5 className="font-medium text-sm">Multiple Styles</h5>
              <p className="text-xs text-muted-foreground">
                Choose from Modern, Classic, Minimal, Creative, and Executive templates
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column: Live Preview */}
      <div className="xl:col-span-8 h-[calc(100vh-12rem)] min-h-[800px]">
        <Card className="p-6 h-full flex flex-col bg-muted/30">
          <div className="mb-4 flex-none">
            <h4 className="font-medium text-sm text-muted-foreground mb-1">
              Template: {currentTemplate.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              Live preview of your resume with the selected template
            </p>
          </div>
          
          <div className="flex-1 w-full overflow-y-auto rounded-md border border-slate-200 bg-slate-50 shadow-inner">
            <div 
              className="template-preview-container"
              style={{
                transform: 'scale(0.85)',
                transformOrigin: 'top center',
                width: '117.6%', /* 100 / 0.85 = 117.6 */
                marginLeft: '-8.8%', /* (117.6 - 100) / 2 */
                background: 'white',
                minHeight: '1122px', /* Approximate A4 height */
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            >
              <style>{currentTemplate.styles}</style>
              <div className="template-wrapper p-8">
                <TemplateComponent data={freshResumeData} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
