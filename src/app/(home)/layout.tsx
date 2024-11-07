import Sidebar from "@/components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />

      {children}
    </div>
  );
};

export default HomeLayout;
