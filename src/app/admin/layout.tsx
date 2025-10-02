import Sidebar from "./components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
