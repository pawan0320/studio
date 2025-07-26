import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Mic, Clapperboard, File, Book, BrainCircuit, BarChart, Image as ImageIcon } from "lucide-react";

// Mock form for generating lesson materials
function GenerateMaterialsForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="lesson-text">Lesson Content (Text)</Label>
        <Textarea id="lesson-text" placeholder="Type or paste your lesson content here..." rows={5} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lesson-image">Upload Image</Label>
          <div className="flex items-center gap-2">
            <Input id="lesson-image" type="file" />
            <Button variant="outline" size="icon"><FileUp className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lesson-voice">Record Voice</Label>
           <div className="flex items-center gap-2">
            <Input id="lesson-voice" type="text" readOnly placeholder="Click to record..." />
            <Button variant="outline" size="icon"><Mic className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="language">Localization Language</Label>
        <Input id="language" placeholder="e.g., Hindi, Tamil, English" />
      </div>
      <Button type="submit" className="w-full md:w-auto">Generate Materials</Button>
    </form>
  );
}

// Mock form for creating interactive content
function InteractiveContentForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic">Lesson Topic</Label>
        <Input id="topic" placeholder="e.g., The Solar System, Indian History" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="grades">Grade Levels</Label>
        <Input id="grades" placeholder="e.g., 1-3, 4-6" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferences">Content Preferences</Label>
        <Input id="preferences" placeholder="e.g., adaptive quizzes, study notes, diagrams" />
      </div>
      <Button type="submit" className="w-full md:w-auto">Create Content</Button>
    </form>
  );
}

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Lesson Planner</h1>
        <p className="text-muted-foreground">Supercharge your teaching with AI-generated content.</p>
      </div>

      <Tabs defaultValue="generate-materials">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate-materials">Generate Full Lessons</TabsTrigger>
          <TabsTrigger value="interactive-content">Create Interactive Content</TabsTrigger>
        </TabsList>
        <TabsContent value="generate-materials">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Generate Lesson Materials</CardTitle>
              <CardDescription>Input your lesson idea and let our AI create a complete package for you.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <GenerateMaterialsForm />
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">What you'll get:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Clapperboard className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-medium">Animated Powerpoint</h4>
                        <p className="text-sm text-muted-foreground">Engaging slides to visually explain concepts.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ImageIcon className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-medium">AI-Generated Video</h4>
                        <p className="text-sm text-muted-foreground">A short video to make learning more dynamic.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <File className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-medium">Localized Quiz</h4>
                        <p className="text-sm text-muted-foreground">Assess understanding in the students' native language.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interactive-content">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Interactive Content Generator</CardTitle>
              <CardDescription>Create specific, adaptive learning aids for your multi-grade classroom.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <InteractiveContentForm />
                 <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Generate custom content like:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <BrainCircuit className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-medium">Adaptive Quizzes</h4>
                        <p className="text-sm text-muted-foreground">Quizzes that adjust to each student's level.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Book className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-medium">Study Notes & Diagrams</h4>
                        <p className="text-sm text-muted-foreground">Clear, concise notes and visuals to aid learning.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <BarChart className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-medium">Charts & Animated Aids</h4>
                        <p className="text-sm text-muted-foreground">Visually represent data and animate complex topics.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
