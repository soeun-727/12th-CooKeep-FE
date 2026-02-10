import type { RecipeDetail } from "../../../constants/mockDetailRecipes";
import RecipeDetailIngredientSection from "./RecipeDetailIngredientSection";
import RecipeDetailStepSection from "./RecipeDetailStepSection";

interface Props {
  recipe: RecipeDetail;
}

export default function RecipeDetailContentSection({ recipe }: Props) {
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
