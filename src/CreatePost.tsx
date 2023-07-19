import { Session } from "@supabase/supabase-js";
import { useContext, useRef, useState } from "react";
import { UserContext } from "./App";
import { supaClient } from "./supa-client";

export interface CreatePostProps {
  newPostCreated?: () => void;
}

function createNewPost({
  session,
  title,
  content,
}: {
  session: Session | null;
  title: string;
  content: string;
}) {
  return supaClient.rpc("create_new_post", {
    userid: session?.user.id || "",
    title,
    content,
  });
}

export function CreatePost({
  newPostCreated = () => {
    return;
  },
}: CreatePostProps) {
  const { session } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        className="create-post-form"
        data-e2e="create-post-form"
        onSubmit={(event) => {
          event.preventDefault();
          void createNewPost({ session, title, content }).then(({ error }) => {
            if (error) {
              console.log(error);
            } else {
              setTitle("");
              setContent("");
              if (titleInputRef.current) {
                titleInputRef.current.value = "";
              }
              if (contentInputRef.current) {
                contentInputRef.current.value = "";
              }
              newPostCreated();
            }
          });
        }}
      >
        <h3>Create a new Post</h3>
        <input
          type="text"
          name="title"
          ref={titleInputRef}
          className="create-post-title-input"
          placeholder="Title..."
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <input
          type="text"
          name="content"
          ref={contentInputRef}
          className="create-post-content-input"
          placeholder="Content..."
          onChange={({ target: { value } }) => setContent(value)}
        />
        <div>
          <button type="submit" className="create-post-submit-button">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
