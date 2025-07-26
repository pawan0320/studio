"use client";

import { useState, useEffect, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Fingerprint, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function FaceLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "fail" | null>(null);
  const [progress, setProgress] = useState(0);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const getCameraPermission = async () => {
        try {
          // Reset states on open
          setVerificationStatus(null);
          setProgress(0);
          setIsVerifying(false);

          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings.",
          });
          setIsOpen(false);
        }
      };
      getCameraPermission();
    } else {
      // Cleanup when dialog closes
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isOpen, toast]);

  const handleVerify = () => {
    setIsVerifying(true);
    setVerificationStatus(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate a verification result
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
    if (verificationStatus === "success") {
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
        variant: "default",
      });
      setTimeout(() => {
        setIsOpen(false);
        router.push("/dashboard");
      }, 1500);
    } else if (verificationStatus === "fail") {
       toast({
        title: "Verification Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [verificationStatus, router, toast]);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Fingerprint className="mr-2 h-4 w-4" />
          Login with Face ID
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Face Verification</DialogTitle>
          <DialogDescription>Center your face in the camera to log in.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
            {hasCameraPermission ? (
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <AlertTriangle className="h-10 w-10 mb-2" />
                  <p>Camera not available</p>
              </div>
            )}
            <div className="absolute inset-0 border-4 border-dashed border-gray-500 rounded-lg"></div>

            {isVerifying && !verificationStatus && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <Progress value={progress} className="w-full" />
              </div>
            )}
            {verificationStatus === "success" && (
              <div className="absolute inset-0 bg-green-500/80 flex flex-col items-center justify-center">
                <CheckCircle className="h-16 w-16 text-white" />
                <p className="text-white font-semibold mt-2">Verified</p>
              </div>
            )}
            {verificationStatus === "fail" && !isVerifying && (
              <div className="absolute inset-0 bg-red-500/80 flex flex-col items-center justify-center">
                <XCircle className="h-16 w-16 text-white" />
                <p className="text-white font-semibold mt-2">Verification Failed</p>
              </div>
            )}
          </div>
          {!hasCameraPermission && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleVerify} disabled={isVerifying || verificationStatus === "success" || !hasCameraPermission}>
            {isVerifying ? "Verifying..." : verificationStatus === "fail" ? "Try Again" : verificationStatus === "success" ? "Redirecting..." : "Verify Identity"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
