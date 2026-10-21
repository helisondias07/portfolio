/** Both languages stay in the DOM. A head script sets data-lang before paint, and CSS shows one. */
export default function Tx({ pt, en }: { pt: string; en: string }) {
  return (
    <>
      <span className="i18n-pt">{pt}</span>
      <span className="i18n-en">{en}</span>
    </>
  );
}
