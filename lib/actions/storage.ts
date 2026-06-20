"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadLampiran(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    throw new Error("Only image and PDF files are allowed");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit");
  }

  const ext = file.name.split(".").pop();
  const filePath = `${user.id}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("lampiran")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from("lampiran").getPublicUrl(filePath);

  return { publicUrl, filePath };
}
