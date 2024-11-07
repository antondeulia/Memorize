import Image from "next/image";
import Link from "next/link";

const PracticeNavbar = () => {
  return (
    <div className="max-w-[1140px] mx-auto mt-10">
      <Link href="/practice-config">
        <Image src="/icons/cancel.svg" alt="Back" width={20} height={20} />
      </Link>
    </div>
  );
};

export default PracticeNavbar;
