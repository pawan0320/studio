"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Fingerprint } from "lucide-react";
import Link from "next/link";
import { FaceLogin } from "@/components/auth/FaceLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-8 gap-2 text-primary">
          <BookOpen className="h-10 w-10" />
          <h1 className="text-4xl font-bold font-headline">Sahayak</h1>
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Teacher Login</CardTitle>
            <CardDescription>
              Access your dashboard to manage your classes.
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="teacher@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="phone">
                <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                     <Button className="w-full" variant="outline">Send OTP</Button>
                </CardContent>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col gap-4">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
            <div className="text-center text-sm">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 h-auto">Sign Up</Button>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <FaceLogin />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
