import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Store,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { format } from "date-fns";

export type UserProps = {
  _id: string;
  avatar?: string | null;
  name: string;
  role: string;
  createdAt: number;
  email: string;
  address?: string | null;
  phoneNumber?: string | null;
  clerkId: string;
  location?: string | null;
};
const UserCard = ({ user, store }: { user: UserProps; store: boolean }) => {
  if (!user) return;
  const getRoleColor = (role: string): string => {
    const roleColors: { [key: string]: string } = {
      STAFF: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      CUSTOMER: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      OWNER: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      ADMIN: "bg-red-500/20 text-red-300 border-red-500/30",
    };
    return roleColors[role] || roleColors.CUSTOMER;
  };

  return (
    <div className="w-[400px] max-w-lg p-1">
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 shadow-2xl">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

        {/* Online status indicator */}

        <CardHeader className="relative z-10 pb-2">
          {/* Header section with avatar and basic info */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-white/20">
                <AvatarImage
                  src={user?.avatar || "/default.png"}
                  alt={user?.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl">
                  {user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" fill="currentColor" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white truncate">
                  {user?.name}
                </h3>
              </div>

              <Badge
                className={`${getRoleColor(
                  user?.role
                )} border text-xs font-medium`}
              >
                <Shield className="w-3 h-3 mr-1" />
                {user?.role?.slice(0, 1).toUpperCase() +
                  user?.role?.slice(1).toLowerCase()}
              </Badge>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  <span>{store ? 1 : 0}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          {/* Contact information */}
          <div className="space-y-3 mb-6">
            <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm text-white truncate font-medium">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-1">Phone</p>
                <p className="text-sm text-white font-medium">
                  {user.phoneNumber ? user.phoneNumber : "No phone number yet."}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-1">Location</p>
                <p className="text-sm text-white font-medium">
                  {user.location ? user.location : "No location yet."}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-1">Member Since</p>
                <p className="text-sm text-white font-medium">
                  {format(new Date(user?.createdAt), "PPP")}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 mb-6" />

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold border border-white/20 transition-all duration-200 transform hover:scale-[1.02]"
              size="lg"
              asChild
            >
              <Link href={`/profile/${user?._id}`}>
                <UserIcon className="w-4 h-4 mr-2" />
                View Full Profile
              </Link>
            </Button>
          </div>
        </CardContent>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-600/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full blur-xl"></div>
      </Card>
    </div>
  );
};

export default UserCard;
