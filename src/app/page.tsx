import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BookOpen, Users, BarChart, Video, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-accent" />,
      title: 'AI-Powered Lesson Prep',
      description: 'Auto-generate animated PPTs, videos, and localized quizzes from text, image, or voice inputs.',
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: 'Smart Group Divider',
      description: 'Intelligently create balanced student groups based on skills and interests for optimal collaboration.',
    },
    {
      icon: <BarChart className="h-10 w-10 text-accent" />,
      title: 'Performance Analytics',
      description: 'Visualize student progress with insightful charts and identify at-risk students proactively.',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-accent" />,
      title: 'Daily Student Reports',
      description: 'Automatically generate comprehensive daily reports on student engagement and performance.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary">Sahayak</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tight">
              Your AI-Powered Teaching Assistant
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
              Sahayak empowers teachers in rural India with cutting-edge AI tools to simplify lesson planning, automate reports, and personalize education for every student.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Secure Teacher Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold font-headline">Features Designed for Modern Educators</h3>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create a dynamic and effective learning environment.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-3xl sm:text-4xl font-bold font-headline">Secure and Intelligent Attendance</h3>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Utilize our AI-based face verification for secure, hassle-free login and attendance marking. Ensure data privacy and integrity with our robust app lock features.
                    </p>
                    <ul className="mt-6 space-y-4">
                        <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">AI Face Verification</h4>
                                <p className="text-muted-foreground">Quick and secure teacher identity confirmation.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">Automated Attendance Logging</h4>
                                <p className="text-muted-foreground">Save time with automatic attendance tracking and activity logs.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">App Lock Security</h4>
                                <p className="text-muted-foreground">Protect sensitive student data with PIN or biometric access control.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <Image src="https://placehold.co/500x500.png" alt="Secure Attendance" width={500} height={500} className="rounded-xl shadow-2xl" data-ai-hint="security technology" />
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-secondary border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sahayak. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
