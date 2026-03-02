import Header from "@/components/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-[1440px] px-8 py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p
              className="text-lg text-gray-300"
              style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
            >
              Dreaming Kit
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300">
              Artist Goods Store
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
