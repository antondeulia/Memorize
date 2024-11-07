import PracticeSteps from "@/components/practice/PracticeSteps";
import PracticeNavbar from "@/components/practice/PracticeNavbar";
import PracticeButtons from "@/components/practice/PracticeButtons";

const PracticePage = () => {
  return (
    <>
      <PracticeNavbar />

      <div className="container">
        <PracticeSteps />
      </div>

      <PracticeButtons />
    </>
  );
};

export default PracticePage;
