import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { toPng } from "html-to-image";

interface Props {
  value: string;
}

export default function QRCodeDisplay({
  value,
}: Props) {
  const qrRef =
    useRef<HTMLDivElement>(null);

  const downloadSVG = () => {
    const svg =
      qrRef.current?.querySelector("svg");

    if (!svg) return;

    const serializer =
      new XMLSerializer();

    const source =
      serializer.serializeToString(svg);

    const blob = new Blob(
      [source],
      {
        type: "image/svg+xml",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "qrcode.svg";

    link.click();

    URL.revokeObjectURL(url);
  };

    const downloadPNG = async () => {
  if (!qrRef.current) return;

  const dataUrl = await toPng(
    qrRef.current
  );

  const link =
    document.createElement("a");

  link.download = "qrcode.png";

  link.href = dataUrl;

  link.click();
};
  return (
    <div className="mt-4">
      <div ref={qrRef}>
        <QRCodeSVG
          value={value}
          size={200}
        />
      </div>

      <button
        onClick={downloadSVG}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download SVG
      </button>
      <button
        onClick={downloadPNG}
        className="mt-3 ml-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download PNG
      </button>
    </div>
  );
}
