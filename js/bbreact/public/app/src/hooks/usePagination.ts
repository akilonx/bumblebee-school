import { useState } from "react";

type PaginationOptions = {
	itemsPerPage: number;
};

type PaginationResult<T> = {
	currentItems: T[];
	currentPage: number;
	totalPages: number;
	goToPage: (page: number) => void;
	goToNextPage: () => void;
	goToPrevPage: () => void;
};

function usePagination<T>(items: T[], options: PaginationOptions): PaginationResult<T> {
	const { itemsPerPage } = options;
	const [currentPage, setCurrentPage] = useState<number>(1);

	const totalPages = Math.ceil(items.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

	const goToPage = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return {
		currentItems,
		currentPage,
		totalPages,
		goToPage,
		goToNextPage,
		goToPrevPage,
	};
}

export default usePagination;
