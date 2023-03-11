import { createClient } from "@supabase/supabase-js";

const URL_PROJECT = "https://edojnbhwwtvqpicwfrqq.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb2puYmh3d3R2cXBpY3dmcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1NTU3MTcsImV4cCI6MTk5NDEzMTcxN30.16HuTDUq-Y2GsDpFRtB72GmCat-lEV1WBbzHro4NYvI";

const supabase = createClient(URL_PROJECT, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
     return supabase
        .from("video")
        .select("*")
        
    }
  }
}
