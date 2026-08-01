"use client";
// Client-side hook for interactive search widgets (nav search, chat widget).
// Fetches /api/jobs once, caches the result at module scope so switching
// between components (or re-mounting) doesn't refetch every time.

import { useEffect, useState } from "react";

let cachedPosts = null;
let cachedPromise = null;

function fetchAllPostsClient() {
  if (cachedPosts) return Promise.resolve(cachedPosts);
  if (!cachedPromise) {
    cachedPromise = fetch("/api/jobs?limit=500")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        cachedPosts = data;
        return data;
      })
      .catch(() => []);
  }
  return cachedPromise;
}

export function useAllPosts() {
  const [posts, setPosts] = useState(cachedPosts || []);

  useEffect(() => {
    let alive = true;
    fetchAllPostsClient().then((data) => {
      if (alive) setPosts(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  return posts;
}
