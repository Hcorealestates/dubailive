"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
// import AsyncSearch from "@/components/AsyncSearch";

import { useRouter } from 'next/navigation'
import { useState, Suspense } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import LoadingCustom from '@/components/loading-custom';

const SEARCH_URI = process.env.API_URL + 'users/autosuggestofpost/';

export default function BlogSearch({ onClick, parentClass = 'max-w-3xl mx-6', inputClasses = '' }) {
  const [options, setOptions] = useState([]);
  const router = useRouter()
  const loadOptions = async (query) => {
    `${SEARCH_URI}?term=${query}`
    const response = await fetch(`${SEARCH_URI}?term=${query}`);
    const data = await response.json();
    setOptions(data.items);
  };

  const handleChange = (selected) => {
    router.push(selected[0].url, '_blank');
  };
    return <>
        <Suspense fallback={<LoadingCustom />}>
            <form className={`${parentClass} relative w-full`}>
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-4 flex items-center pl-2 z-10">
                <FontAwesomeIcon className="text-primary/40" icon={faMagnifyingGlass} />
            </span>

            <AsyncTypeahead
                id="my-async-typeahead"
                labelKey="label"
                minLength={1}
                onSearch={loadOptions}
                options={options}
                onChange={handleChange}
                placeholder="Enter Blog Name"
                className={`${inputClasses} `}
                renderMenuItemChildren={options =>
                    <div className="w-full flex gap-x-3">
                    <span className="grow">{options.label}</span>{options.type}
                    </div>
                }
            />
            </form>

        </Suspense>
    </>
}