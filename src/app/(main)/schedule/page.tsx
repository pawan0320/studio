import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { scheduleData } from "@/lib/data";
import { Calendar } from "@/components/ui/calendar";

export default function SchedulePage() {
  return (
    <div className="space-y-8">
       <div>
            <h1 className="text-3xl font-bold font-headline">Schedule & Meetings</h1>
            <p className="text-muted-foreground">Manage your class schedule and book meetings with ease.</p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleData.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground w-28">
                        <Clock className="h-4 w-4" />
                        <span>{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                    </div>
                    {item.description && <Button variant="outline" size="sm">View Details</Button>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Schedule a Meeting</CardTitle>
                    <CardDescription>Book a time with students or parents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="meeting-title">Meeting Title</Label>
                            <Input id="meeting-title" placeholder="e.g., Priya's Progress" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="attendees">Attendees</Label>
                            <Input id="attendees" placeholder="e.g., priya.singh@parent.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" />
                            </div>
                        </div>
                        <Button className="w-full">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Schedule Meeting
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Monthly Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md border p-0"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
