"use server";

import { Resend } from "resend";
import StoreApproval from "./StoreApproval";

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendApprovalEmail = async (
  storeName: string,
  storeOwnerEmail: string
) => {
  await resend.emails.send({
    to: storeOwnerEmail,
    from: "Smart Stack <onboarding@resend.dev>",
    subject: "Your Store request has been approved!",
    react: StoreApproval({
      name: storeName,
    }),
  });
};
