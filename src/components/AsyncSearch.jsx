"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
// import 'react-bootstrap-typeahead/css/Typeahead.css';

/* example-start */
const SEARCH_URI = process.env.API_URL + 'users/autosuggest/';

const AsyncSearch = ({ onClick, className }) => {
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

   return (
      <AsyncTypeahead
         id="my-async-typeahead"
         labelKey="label"
         minLength={1}
         onSearch={loadOptions}
         options={options}
         onChange={handleChange}
         placeholder="Enter Project, Community Or Developer"
         className={className}
         renderMenuItemChildren={options =>
            <div className="">
               <span className='list__label'>{options.label}</span>
               <span className='list__type'>{options.type}</span>
            </div>
         }
      />
   );
};
export default AsyncSearch;


