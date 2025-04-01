import {FilterStatus} from "../types/Task";

interface FilterButtonsProps {
    currentFilter: FilterStatus;
    onFilterChange: (filter: FilterStatus) => void;
}

function FilterButtons({currentFilter, onFilterChange} : FilterButtonsProps) {
    return (
        <div className="filter-buttons">
            <button
                type="button"
                onClick={() => onFilterChange("all")}
                className={`btn filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            >
                All
            </button>
            <button
                type="button"
                onClick={() => onFilterChange("active")}
                className={`btn filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
            >
                Active
            </button>
            <button
                type="button"
                onClick={() => onFilterChange("completed")}
                className={`btn filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
            >
                Completed
            </button>
        </div>
    );
}

export default FilterButtons;