import FooterCustomer from "@/app/components/FooterCustomer";
import NavbarCustomer from "@/app/components/NavbarCustomer";


export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">

      <div className="flex-1 flex flex-col">
        <div className="px-10 py-4">
          <NavbarCustomer />
        </div>

        <main className="">{children}</main>
        <div className="px-10 py-4 bg-[#C8E1FE]">
          <FooterCustomer />
        </div>
      </div>
    </div>
  );
}
