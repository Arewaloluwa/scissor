import { useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";

import { validateUrl } from "../utils/validateUrl";

import { generateSlug } from "../utils/generateSlug";

import QRCodeDisplay from "./QRCodeDisplay";

export default function ShortenForm() {
  const { user } = useUser();

  const navigate = useNavigate();

  const [expiresAt, setExpiresAt] = useState("");

  const createLink = useMutation(
    api.links.createLink
  );

  const [url, setUrl] = useState("");

  const [shortUrl, setShortUrl] =
    useState("");

  const [customSlug, setCustomSlug] =
  useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) {
      navigate("/signin");
      return;
    }

    if (!validateUrl(url)) {
      alert("Invalid URL");
      return;
    }

    const slug = customSlug || generateSlug();

    try {
      await createLink({
        userId: user.id,
        originalUrl: url,
        shortSlug: slug,
      });

      setShortUrl(
        `${window.location.origin}/${slug}`
      );

      setUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Paste URL"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          className="border p-3 rounded w-full"
        />

        <input
            placeholder="Custom slug (optional)"
            value={customSlug}
            onChange={(e) =>
                setCustomSlug(e.target.value)
            }
        />
        <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
      />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4">
          <h3 className="font-bold">
            Short URL
          </h3>

          <p>{shortUrl}</p>

          <QRCodeDisplay
            value={shortUrl}
          />
        </div>
      )}
    </div>
  );
}
