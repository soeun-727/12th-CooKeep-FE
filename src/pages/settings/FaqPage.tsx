// src/pages/settings/FaqPage.tsx
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import { faqCategories } from "../../constants/faqData";
import FaqCategoryItem from "../../components/settings/components/FaqCategoryItem";

export default function FaqPage() {
  const navigate = useNavigate();

  return (
    <>
      <BackHeader title="FAQ" onBack={() => navigate(-1)} />
      <main className="pt-[129px] px-4 pb-[34px] flex flex-col gap-[14px] min-h-screen">
        {faqCategories.map((category) => (
          <FaqCategoryItem
            key={category.id}
            title={category.title}
            items={category.items}
          />
        ))}
      </main>
    </>
  );
}
