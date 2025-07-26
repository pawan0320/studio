import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { studentData } from "@/lib/data";
import { Users, FileText, Bot } from "lucide-react";

function GroupDivider() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline">AI-Powered Student Group Divider</CardTitle>
        </div>
        <CardDescription>Intelligently create balanced groups for collaborative learning.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-names">Student Names (comma-separated)</Label>
            <Textarea id="student-names" placeholder="Aarav Sharma, Priya Singh, Rohan Mehta..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" placeholder="Reading, Math, Art..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input id="interests" placeholder="Science, Sports, Music..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-size">Desired Group Size</Label>
            <Input id="group-size" type="number" placeholder="e.g., 4" />
          </div>
          <Button>Create Groups</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function StudentReportGenerator() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-accent" />
                    <CardTitle className="font-headline">Generate Daily Student Report</CardTitle>
                </div>
                <CardDescription>Auto-generate a comprehensive report for a student's daily performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="student-name">Student Name</Label>
                            <Input id="student-name" placeholder="Aarav Sharma" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="class-name">Class Name</Label>
                            <Input id="class-name" placeholder="Grade 5 - Mathematics" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="participation">Participation</Label>
                            <Input id="participation" placeholder="e.g., High, Medium, Low" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quiz-score">Quiz Score</Label>
                            <Input id="quiz-score" type="number" placeholder="e.g., 85" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="assignment-score">Assignment Score</Label>
                            <Input id="assignment-score" type="number" placeholder="e.g., 90" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="insights">Engagement & Behavior Insights</Label>
                        <Textarea id="insights" placeholder="e.g., Very engaged during the fractions lesson..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="feedback">Teacher Feedback</Label>
                        <Textarea id="feedback" placeholder="e.g., Excellent work on the assignment, needs to participate more..." />
                    </div>
                    <Button>Generate Report</Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default function StudentsPage() {
  return (
    <div className="space-y-8">
       <div>
            <h1 className="text-3xl font-bold font-headline">Student Management</h1>
            <p className="text-muted-foreground">Oversee your students and leverage AI tools for classroom activities.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Student Roster</CardTitle>
                <CardDescription>A complete list of all students in your classes.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead className="text-center">Attendance</TableHead>
                            <TableHead className="text-right">Overall Score</TableHead>
                             <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.grade}</TableCell>
                                <TableCell className="text-center">{student.attendance}%</TableCell>
                                <TableCell className="text-right">{student.overallScore}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={student.isAtRisk ? "destructive" : "default"} className={!student.isAtRisk ? "bg-green-500" : ""}>
                                        {student.isAtRisk ? "At Risk" : "On Track"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GroupDivider />
            <StudentReportGenerator />
        </div>
    </div>
  );
}
