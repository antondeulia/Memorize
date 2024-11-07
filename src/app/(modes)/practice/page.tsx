import PracticeSteps from "@/components/practice/PracticeSteps";
import { usePracticeStore } from "@/store/practiceStore";
import PracticeNavbar from "@/components/practice/PracticeNavbar";
import PracticeButtons from "@/components/practice/PracticeButtons";

const PracticePage = () => {
  return (
    <div>
      <PracticeNavbar />

      <div className="container">
        <PracticeSteps />
      </div>

      <PracticeButtons />
    </div>
  );
};

export default PracticePage;
