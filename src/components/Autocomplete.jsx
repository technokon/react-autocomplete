import { useEffect, useRef, useState } from "react"
import { fetchSuggestions } from "../mockApis";
import { useDebounce } from "../customHooks/useDebounce";

export const Autocomplete = ({ label }) => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const debounceInput = useDebounce(input, 500);

  useEffect(() => {
    if (debounceInput) {
      fetchSuggestions(debounceInput)
      .then(setOptions)
    } else {
      setOptions([]);
    }
  }, [debounceInput])

  const onInput = (e) => {
    setInput(e.target.value);
  }

  const onOptionClick = (option) => {
    setInput(option);
    setShowOptions(false);
  }

  return (
    <div>
      <label className="block text-left text-gray-500" htmlFor="input">{label}</label>
      <input value={input} onChange={onInput} id="input" onKeyDown={() => setShowOptions(true)} className="bg-white hover:bg-blue-100 border border-gray-300 rounded px-3 py-2" />
      { showOptions && (
        <ul className="bg-green-100 rounded" style={{ listStyle: 'none' }}>
          { options.map((o, i) => (
            <li onClick={(e) => onOptionClick(o)} className="text-left hover:cursor-pointer hover:underline" key={i}>
              {o}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}