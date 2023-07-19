import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaClient } from "./supa-client";

export function usePostScore(postId: string, initialScore: number | undefined) {
  const [score, setScore] = useState<number | undefined>(initialScore);
  const [sub, setSub] = useState<RealtimeChannel | undefined>(undefined);
  useEffect(() => {
    if (score === undefined && initialScore !== undefined) {
      setScore(initialScore);
    }
    if (!sub && postId) {
      setSub(
        supaClient
          .channel(`post_${postId}_score`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "pot_score",
              filter: `post_id=eq.${postId}`,
            },
            (payload) => {
              setScore((payload.new as { score: number }).score);
            }
          )
          .subscribe()
      );
    }
    return () => {
      void sub?.unsubscribe();
    };
  }, [postId]);

  return score;
}
