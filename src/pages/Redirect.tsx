import { useEffect } from "react";
import { useNavigate,useParams, } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UAParser } from "ua-parser-js";

export default function Redirect() {

  const navigate = useNavigate();

  const trackClick = useMutation(
      api.clicks.trackClick
    );

  const { slug } = useParams();
    console.log("slug =", slug);

  const link = useQuery(
    api.links.getLinkBySlug,
    slug
      ? { slug }
      : "skip"
  );

  useEffect(() => {
  async function handleRedirect() {
    if (!link) return;

    if (link.expired) {
      navigate("/expired");
      return;
    }

    if (link.expiresAt && Date.now() > link.expiresAt) {
      navigate("/expired");
      return;
    }
    
    const parser =
      new UAParser();

    const device =
      parser.getDevice().type ||
      "desktop";

    const referrer =
      document.referrer ||
      "Direct";

    await trackClick({
      linkId: link._id,
      device,
      referrer,
    });


    window.location.href =
      link.originalUrl;
  }

  handleRedirect();
}, [link]);

  return (
    <div className="p-8">
      Redirecting...
    </div>
  );
}