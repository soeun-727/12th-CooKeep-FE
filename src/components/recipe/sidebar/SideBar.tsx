import React, { useEffect, useState, useLayoutEffect } from "react";
import Recipe from "./Recipe";
import DoublecheckModal from "../../ui/DoublecheckModal";
import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/recipe/search.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DUMMY_RECIPES = [
  { id: 1, name: "참치마요 덮밥", isLiked: true },
  { id: 2, name: "남은 야채 비빔밥", isLiked: false },
  { id: 3, name: "토마토 달걀 볶음 (토달볶)", isLiked: true },
  { id: 4, name: "스팸 김치찌개 레시피", isLiked: false },
  { id: 5, name: "베이컨 크림 파스타", isLiked: false },
  { id: 6, name: "계란 간장 버터밥", isLiked: true },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [recipes, setRecipes] = useState(DUMMY_RECIPES);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [shouldAnimateOpen, setShouldAnimateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const translateClasses = shouldAnimateOpen
    ? "translate-x-0"
    : "-translate-x-full";

  const handleLike = (id: number) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked } : recipe
      )
    );
  };

  const handleRename = (id: number, newName: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, name: newName } : recipe
      )
    );
  };

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedRecipe({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRecipe) {
      setRecipes((prev) =>
        prev.filter((recipe) => recipe.id !== selectedRecipe.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedRecipe(null);
    }
  };

  const filteredRecipes = recipes.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setShouldAnimateOpen(false);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShouldAnimateOpen(false);
      setTimeout(() => {
        setShouldAnimateOpen(true);
      }, 0);
    }
  }, [isOpen]);

  if (!isVisible) return null;
  return (
    <>
      {/* 1. 배경 오버레이 */}
      <div
        className={`absolute inset-0 z-[120] bg-[#11111160]
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* 2. 사이드바 본체 */}
      <div
        className={`absolute left-0 z-[130] top-[76px]
          w-[342px] h-[calc(100%-152px)] bg-[#FFFFFFE3] shadow-2xl rounded-tr-[10px] rounded-br-[10px]
          transform transition-transform duration-300 ease-in-out
          ${translateClasses}`}
      >
        <div className="flex flex-col h-full">
          {/* 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto py-[35px] px-[26px] no-scrollbar">
            <div className="w-[290px]">
              <div
                className='[&_>_div]:!w-full [&_input]:border-none [&_input::placeholder]:text-stone-300
                ${searchTerm ? "[&_input]: bg-white" : "[&_input]:bg-[#EBEDF1] "}'
              >
                <TextField
                  value={searchTerm}
                  placeholder="레시피를 검색하세요"
                  onChange={(value) => setSearchTerm(value)}
                  rightIcon={<img src={searchIcon} className="" />}
                />
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              {recipes.length > 0 ? (
                <>
                  <div className="flex flex-col items-center w-full">
                    {filteredRecipes
                      .filter((item) => item.isLiked)
                      .map((item) => (
                        <Recipe
                          key={item.id}
                          name={item.name}
                          searchTerm={searchTerm}
                          isLiked={item.isLiked}
                          onLike={() => handleLike(item.id)}
                          onDelete={() => handleDeleteClick(item.id, item.name)}
                          onRename={(newName) => handleRename(item.id, newName)}
                          onSelect={() => console.log(`${item.name} 상세 이동`)}
                        />
                      ))}
                  </div>

                  {filteredRecipes.some((r) => r.isLiked) &&
                    filteredRecipes.some((r) => !r.isLiked) && (
                      <div className="h-6" />
                    )}

                  <div className="flex flex-col items-center w-full">
                    {filteredRecipes
                      .filter((item) => !item.isLiked)
                      .map((item) => (
                        <Recipe
                          key={item.id}
                          name={item.name}
                          searchTerm={searchTerm}
                          isLiked={item.isLiked}
                          onLike={() => handleLike(item.id)}
                          onDelete={() => handleDeleteClick(item.id, item.name)}
                          onRename={() => console.log(`${item.name} 수정`)}
                          onSelect={() => console.log(`${item.name} 상세 이동`)}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-gray-400 text-sm">
                  저장된 레시피가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. 삭제 확인 모달 연결 */}
      <DoublecheckModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={selectedRecipe?.name!}
        description="이 레시피를 삭제할까요?"
      />
    </>
  );
};

export default Sidebar;
