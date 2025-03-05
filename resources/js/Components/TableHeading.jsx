import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
    name,
    sortChanged = () => {},
    sortable = true,
    sort_field = null,
    sort_direction = null,
    children,
}) {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className="flex items-center justify-between gap-1 px-3 py-3 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name && sort_direction === "asc"
                                    ? "text-white"
                                    : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "-mt-2 w-4 " +
                                (sort_field === name &&
                                sort_direction === "desc"
                                    ? "text-white"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}
