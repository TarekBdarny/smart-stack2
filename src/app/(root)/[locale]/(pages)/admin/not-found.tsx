"use client";
import { AlertTriangle, Home, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center w-full justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated warning icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-red-500/10 border border-red-500/30 rounded-full p-6 inline-block backdrop-blur-sm">
            <Shield className="w-16 h-16 text-red-400 mx-auto animate-bounce" />
          </div>
        </div>

        {/* Error code */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-2">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-lg font-semibold">Access Denied</span>
          </div>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-bold text-white mb-4">
            Admin Access Required
          </h2>
          <p className="text-slate-300 leading-relaxed">
            You don&apos;t have permission to access this admin area. This
            section is restricted to authorized administrators only.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-slate-400 text-sm">
              If you believe this is an error, please contact your system
              administrator.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link
            href={"/"}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default NotFound;
