import React, { useEffect, useState, useLayoutEffect, useMemo } from "react";
import Recipe from "./Recipe";
import DoublecheckModal from "../../ui/DoublecheckModal";
import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/recipe/search.svg";
import { useRecipeStore } from "../../../stores/useRecipeStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { recipes, toggleLike, renameRecipe, deleteRecipe } = useRecipeStore();
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

  const handleConfirmDelete = () => {
    if (selectedRecipe) {
      deleteRecipe(selectedRecipe.id);
      setIsDeleteModalOpen(false);
      setSelectedRecipe(null);
    }
  };

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

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  const renderRecipeList = (isLiked: boolean) => (
    <div className="flex flex-col items-center w-full">
      {filteredRecipes
        .filter((item) => item.isLiked === isLiked)
        .map((item) => (
          <Recipe
            key={item.id}
            {...item}
            searchTerm={searchTerm}
            onLike={() => toggleLike(item.id)}
            onRename={(newName) => renameRecipe(item.id, newName)}
            onDelete={() => {
              setSelectedRecipe(item);
              setIsDeleteModalOpen(true);
            }}
            onSelect={() => console.log(`${item.name} 상세 이동`)}
          />
        ))}
    </div>
  );

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
                className={`[&_>_div]:!w-full [&_input]:border-none [&_input::placeholder]:text-stone-300 ${
                  searchTerm ? "[&_input]:bg-white" : "[&_input]:bg-[#EBEDF1]"
                }`}
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
                  {renderRecipeList(true)}
                  {filteredRecipes.some((r) => r.isLiked) &&
                    filteredRecipes.some((r) => !r.isLiked) && (
                      <div className="h-6" />
                    )}
                  {renderRecipeList(false)}
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
