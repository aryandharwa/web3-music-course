"use client";
import React from "react";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";

export default function HeroSection() {
  const handleVerify = async (proof: ISuccessResult) => {
    try {
      const res = await fetch("/api/users/worldcoin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      });

      if (!res.ok) {
        throw new Error("Verification failed.");
      }
      // Verification succeeded
      console.log("Verification successful");
    } catch (error) {
      console.error(error);
    }
  };

  const onSuccess = () => {
    window.location.href = "/courses";
  };

  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Master the art of music
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-3xl mx-auto">
          Unlock your musical potential with our Web3-powered platform. Dive
          into expertly crafted music courses, from beginner to advanced, and
          take your skills to the next level. With secure, seamless sign-in
          through Worldcoin ID, join a global community of learners and
          experience a new era of music education.
        </p>
        <div className="mt-4">
          <Link href={"/courses"}>
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Get Started
            </Button>
          </Link>

          <IDKitWidget
            app_id="app_staging_c5f85e73cdf16e8a1da546ae63768b94"
            action="music-course"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Device}
          >
            {({ open }) => (
              // This is the button that will open the IDKit modal
              <button onClick={open}>Verify with World ID</button>
            )}
          </IDKitWidget>
        </div>
      </div>
    </div>
  );
}
