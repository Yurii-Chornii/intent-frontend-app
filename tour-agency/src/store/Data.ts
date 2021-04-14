import {makeAutoObservable} from "mobx";
import {ITour} from "../interfaces/ITour";

class Data {
    toursDB: ITour[] = []
    pageNumber: number = 1;
    pageSize: number = 6;
    totalPages: number = 0;
    minPrice: number = 0;
    maxPrice: number = 5000
    sortOrder: string = "id";

    constructor() {
        makeAutoObservable(this);
    }

    setTotalPages(total: number): void {
        this.totalPages = total;
    }

    setToursDB(tours: ITour[]): void {
        this.toursDB = tours;
    }

    setSortOrder(sort: string): void {
        this.sortOrder = sort;
    }

    setMaxPrice(max: number): void {
        this.maxPrice = max;
    }

    setMinPrice(min: number): void {
        this.minPrice = min;
    }

    setPageSize(pageSize: number): void {
        this.pageSize = pageSize;
    }

    setPage(pageNumber: number): void {
        this.pageNumber = pageNumber;
    }

    incrementPage(): void {
        this.pageNumber = this.pageNumber + 1;
    }

    decrementPage(): void {
        this.pageNumber = this.pageNumber - 1;
    }

}

export default new Data();
