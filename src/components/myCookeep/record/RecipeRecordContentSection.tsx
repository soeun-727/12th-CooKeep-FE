import type { RecipeContent } from "../../../types/recipe";
import RecipeDetailIngredientSection from "../../cookeeps/recipedetail/RecipeDetailIngredientSection";
import RecipeDetailStepSection from "../../cookeeps/recipedetail/RecipeDetailStepSection";

interface Props {
  recipe: RecipeContent;
}

export default function RecipeRecordContentSection({ recipe }: Props) {
  return (
    <section className="flex flex-col w-full bg-white rounded-md shadow p-4">
      <div className="flex flex-col w-full gap-9">
        <RecipeDetailIngredientSection
          ingredients={recipe.ingredients}
          substitutions={recipe.substitutions}
        />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
