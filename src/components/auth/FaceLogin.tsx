"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fingerprint, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export function FaceLogin() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "fail" | null>(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleVerify = () => {
    setIsVerifying(true);
    setVerificationStatus(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate API call result
          const success = Math.random() > 0.3; // 70% chance of success
          setVerificationStatus(success ? "success" : "fail");
          setIsVerifying(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  useEffect(() => {
    if (verificationStatus === 'success') {
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }
  }, [verificationStatus, router]);

  return (
    <Dialog onOpenChange={() => {
        setIsVerifying(false);
        setVerificationStatus(null);
        setProgress(0);
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Fingerprint className="mr-2 h-4 w-4" />
          Login with Face ID
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Face Verification</DialogTitle>
          <DialogDescription>
            Center your face in the camera to log in.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="https://placehold.co/400x300.png" alt="Webcam feed" layout="fill" objectFit="cover" data-ai-hint="person face" />
            <div className="absolute inset-0 border-4 border-dashed border-gray-500 rounded-lg"></div>
            {isVerifying && (
                <div className="absolute bottom-4 left-4 right-4">
                    <Progress value={progress} className="w-full" />
                </div>
            )}
            {verificationStatus === "success" && (
                <div className="absolute inset-0 bg-green-500/50 flex flex-col items-center justify-center">
                    <CheckCircle className="h-16 w-16 text-white" />
                    <p className="text-white font-semibold mt-2">Verified</p>
                </div>
            )}
            {verificationStatus === "fail" && (
                <div className="absolute inset-0 bg-red-500/50 flex flex-col items-center justify-center">
                    <XCircle className="h-16 w-16 text-white" />
                    <p className="text-white font-semibold mt-2">Verification Failed</p>
                </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleVerify} disabled={isVerifying || verificationStatus === 'success'}>
            {isVerifying ? 'Verifying...' : verificationStatus === 'fail' ? 'Try Again' : verificationStatus === 'success' ? 'Redirecting...' : 'Verify'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}