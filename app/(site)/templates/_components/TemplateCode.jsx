export default function TemplateCode({ code }) {
  return (
    <div>
      <div className="overflow-hidden rounded max-h-[500px] overflow-y-auto">
        <pre className={`language-html !m-0 rounded`}>
          <code className={`language-html`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
