import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";

interface Props {
  search: string;
}

export default function LinkTable({
  search,
}: Props) {
  const { user } = useUser();

  const links = useQuery(
    api.links.getUserLinks,
    user
      ? {
          userId: user.id,
        }
      : "skip"
  );

    const copyLink = (slug: string) => {
  navigator.clipboard.writeText(
    `${window.location.origin}/${slug}`
  );

  alert("Copied!");
};

  const [selected, setSelected] = useState<
  Id<"links">[]
>([]);
  
  const deleteLinks = useMutation(
  api.links.deleteLinks
);

  if (!links) {
    return <p>Loading...</p>;
  }

  const filteredLinks =
  links.filter((link) =>
    link.shortSlug
      .toLowerCase()
      .includes(search.toLowerCase())
  );
    const toggleSelect = (
  id: Id<"links">
) => {
  if (selected.includes(id)) {
    setSelected(
      selected.filter(
        (item) => item !== id
      )
    );
  } else {
    setSelected([
      ...selected,
      id,
    ]);
  }
};

    const handleBulkDelete =
  async () => {
    if (
      selected.length === 0
    ) {
      alert(
        "No links selected"
      );
      return;
    }

    await deleteLinks({
      ids: selected,
    });

    setSelected([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        My Links
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Select</th>
            <th>Slug</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Copy</th>
          </tr>
        </thead>

        <tbody>
          {filteredLinks.map((link) => (
            <tr key={link._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(link._id)}
                  onChange={() => toggleSelect(link._id)}
                />
              </td>
              <td>{link.shortSlug}</td>

              <td>
                {link.originalUrl}
              </td>

              <td>{link.clicks}</td>
              <td>
                <button
                  onClick={() => copyLink(link.shortSlug)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Copy
                </button>
                <button
                  onClick={() => deleteLinks({
                  ids: selected,             })
                          }
                  className="bg-red-600 text-white px-4 py-2 rounded ml-2">
                  Delete Selected
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded mb-4"
                >
                  Delete Selected
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}