import {Button} from "./button.tsx";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
                               currentPage,
                               totalCount,
                               pageSize,
                               onPageChange,
                           }: PaginationProps) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Précédent
            </Button>

            <span className="text-sm">
        Page {currentPage} sur {totalPages}
      </span>

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Suivant
            </Button>
        </div>
    );
};
