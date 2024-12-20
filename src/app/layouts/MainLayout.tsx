// components/layout/MainLayout.tsx
import SideNav from "@/components/sideNav/sideNav";
import Banner from "@/components/banner/banner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNav />
      <Banner />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
