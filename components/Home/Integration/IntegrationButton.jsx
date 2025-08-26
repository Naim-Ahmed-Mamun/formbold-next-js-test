
export default function IntegrationButton({
  handleShowCode,
  showCode,
  integration,
}) {
  const { framework, icon, title } = integration;
  return (
    <>
      <button
        className={`group flex h-10 items-center whitespace-nowrap rounded-[30px] px-5 transition hover:bg-white hover:text-black ${
          showCode === framework
            ? "bg-white text-black shadow-fb-three"
            : "text-body-color shadow-none"
        } `}
        onClick={() => handleShowCode(framework)}
        aria-label={`Show ${framework} code`}
      >
        {icon && <span className={`pr-1 transition`}>{icon}</span>}
        {title && (
          <span className={`text-sm font-medium capitalize transition`}>
            {title}
          </span>
        )}
      </button>
    </>
  );
}
