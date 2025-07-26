import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Mail, Phone, Edit } from "lucide-react";

export default function ProfilePage() {
  const teacherInfo = {
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@sahayak.edu",
    phone: "+91 98765 43210",
    subjects: ["Mathematics", "Science", "English"],
    grades: ["4th", "5th", "6th"],
    school: "Sarvodaya Vidyalaya, Rajasthan",
    isVerified: true,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Teacher Profile</h1>
        <p className="text-muted-foreground">Your personal information and professional overview.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src="https://placehold.co/200x200.png" alt={teacherInfo.name} data-ai-hint="person face" />
              <AvatarFallback className="text-3xl">AS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-headline">{teacherInfo.name}</CardTitle>
              <CardDescription className="text-base">{teacherInfo.school}</CardDescription>
              {teacherInfo.isVerified && (
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-semibold">Verified Teacher</span>
                </div>
              )}
            </div>
          </div>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold font-headline mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{teacherInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{teacherInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Teaching Details */}
            <div>
              <h3 className="text-lg font-semibold font-headline mb-4">Teaching Details</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Subjects Taught</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {teacherInfo.subjects.map(subject => <Badge key={subject} variant="secondary">{subject}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Grades Handled</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                     {teacherInfo.grades.map(grade => <Badge key={grade} variant="secondary">{grade}</Badge>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
              <CardHeader>
                  <CardTitle className="font-headline">Performance Overview</CardTitle>
                  <CardDescription>A summary of your class performance metrics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Average Class Score</span>
                      <span className="font-bold text-lg">85.3%</span>
                  </div>
                   <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Student Engagement</span>
                      <span className="font-bold text-lg text-green-600">High</span>
                  </div>
                   <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Completed Lessons</span>
                      <span className="font-bold text-lg">42</span>
                  </div>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle className="font-headline">Upcoming Classes</CardTitle>
                  <CardDescription>Your next two classes for the day.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <div>
                        <p className="font-semibold">Grade 5 - Mathematics</p>
                        <p className="text-sm text-muted-foreground">Chapter 4: Fractions</p>
                      </div>
                      <span className="font-bold">09:00 AM</span>
                  </div>
                   <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <div>
                        <p className="font-semibold">Grade 4 - English</p>
                        <p className="text-sm text-muted-foreground">Grammar: Tenses</p>
                      </div>
                      <span className="font-bold">10:00 AM</span>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
