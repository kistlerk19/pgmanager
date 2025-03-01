import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('project.index'), queryParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th
                                                onClick={(e) =>
                                                    sortChanged('id')
                                                }
                                            >
                                                <div className="flex items-center justify-start gap-1 px-3 py-3 cursor-pointer">
                                                    ID
                                                    <ChevronUpDownIcon className="w-4" />
                                                </div>
                                                {/* <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4 -mt-2" />
                                                </div> */}
                                            </th>
                                            <th className="px-3 py-3">Image</th>
                                            <th
                                                onClick={(e) =>
                                                    sortChanged('name')
                                                }
                                            >
                                                <div className="flex items-center justify-start gap-1 px-3 py-3 cursor-pointer">
                                                    Name
                                                    <ChevronUpDownIcon className="w-4" />
                                                </div>
                                            </th>
                                            <th
                                                onClick={() =>
                                                    sortChanged('status')
                                                }
                                            >
                                                <div className="flex items-center justify-start gap-1 px-3 py-3 cursor-pointer">
                                                    Status
                                                    <ChevronUpDownIcon className="w-4" />
                                                </div>
                                            </th>
                                            <th
                                                onClick={(e) =>
                                                    sortChanged('created_at')
                                                }
                                            >
                                                <div className="flex items-center justify-start gap-1 px-3 py-3 cursor-pointer">
                                                    Created At
                                                    <ChevronUpDownIcon className="w-4" />
                                                </div>
                                            </th>
                                            <th
                                                onClick={(e) =>
                                                    sortChanged('due_date')
                                                }
                                            >
                                                <div className="flex items-center justify-start gap-1 px-3 py-3 cursor-pointer">
                                                    Due Date
                                                    <ChevronUpDownIcon className="w-4" />
                                                </div>
                                            </th>
                                            <th className="px-3 py-3">
                                                Created By
                                            </th>
                                            <th className="px-3 py-3 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    className="w-full"
                                                    placeholder="Project Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress('name', e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    defaultValue={
                                                        queryParams.status
                                                    }
                                                    className="w-full"
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            'status',
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select Status
                                                    </option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="in_progress">
                                                        In Progress
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-center"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr
                                                key={project.id}
                                                className="bg-white border-b dark:border-gray-800 dark:bg-gray-800"
                                            >
                                                <td className="px-3 py-2">
                                                    {project.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <img
                                                        style={{ width: 60 }}
                                                        src={project.image_path}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            'rounded px-2 py-1 text-white ' +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <Link
                                                        className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                        href={route(
                                                            'project.edit',
                                                            project.id,
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        className="mx-1 font-medium text-red-600 hover:underline dark:text-red-500"
                                                        href={route(
                                                            'project.destroy',
                                                            project.id,
                                                        )}
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
