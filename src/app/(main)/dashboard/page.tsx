"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Users, BookOpen, BarChart, AlertTriangle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart as BarChartComponent, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts";
import { studentData, performanceChartData, engagementChartData } from "@/lib/data";

export default function DashboardPage() {
    const atRiskStudents = studentData.filter(s => s.isAtRisk);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, Teacher!</h1>
                <p className="text-muted-foreground">Here's a snapshot of your classroom today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{studentData.length}</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92.5%</div>
                        <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85.3</div>
                        <p className="text-xs text-muted-foreground">+3.1 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">{atRiskStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Needs immediate attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Student Performance Over Time</CardTitle>
                        <CardDescription>Average scores from the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={performanceChartData}>
                                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Avg Score" stroke="hsl(var(--primary))" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Class Engagement by Subject</CardTitle>
                         <CardDescription>Engagement levels across different subjects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                             <BarChartComponent data={engagementChartData}>
                                <XAxis dataKey="subject" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="engagement" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                            </BarChartComponent>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">At-Risk Students</CardTitle>
                        <CardDescription>Students who may require additional support.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead className="text-center">Attendance</TableHead>
                                    <TableHead className="text-right">Overall Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {atRiskStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.grade}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={student.attendance < 90 ? "destructive" : "outline"}>{student.attendance}%</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{student.overallScore}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                     <CardHeader>
                        <CardTitle className="font-headline">Quick Actions</CardTitle>
                        <CardDescription>Your AI-powered toolkit.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/lessons">
                            <Button className="w-full justify-start" variant="outline"><PlusCircle className="mr-2 h-4 w-4" />Create New Lesson</Button>
                        </Link>
                        <Link href="/students">
                            <Button className="w-full justify-start" variant="outline"><Users className="mr-2 h-4 w-4" />Divide Students into Groups</Button>
                        </Link>
                        <Link href="/lessons">
                             <Button className="w-full justify-start" variant="outline"><FileText className="mr-2 h-4 w-4" />Generate Student Report</Button>
                        </Link>
                         <Link href="/schedule">
                             <Button className="w-full justify-start" variant="outline"><Calendar className="mr-2 h-4 w-4" />Schedule a Meeting</Button>
                        </Link>
                    </CardContent>
                 </Card>
            </div>
        </div>
    )
}
