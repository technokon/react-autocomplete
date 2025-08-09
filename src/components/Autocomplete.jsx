import { useEffect, useRef, useState } from "react"
import { fetchSuggestions } from "../mockApis";
import { useDebounce } from "../customHooks/useDebounce";

export const Autocomplete = ({ label }) => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef({});

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

  const onKeyDown = (e) => {
    if (!showOptions) {
      setShowOptions(true);
    } else if (e.key === 'ArrowDown') {
      const references = optionsRef.current;
      console.log(references);
      const firstInLine = references[Object.keys(references)[0]];
      firstInLine.focus();
    }
  }

  const onOptionClick = (option) => {
    setInput(option);
    setShowOptions(false);
  }

  const setOptionRefs = (option) => (el) => {
    if (el) {
      optionsRef.current[option] = el;
    } else {
      delete optionsRef.current[option];
    }
  }

  const optionKeyDown = (option, e) => {
    if (e.key === 'Enter' || e.keyCode === 32) {
      e.target.click();
    } else if (e.key === 'ArrowDown') {
      const currentIndex = options.indexOf(option);
      if (currentIndex < options.length - 1) {
        const nextItem = Object
        .keys(optionsRef.current)[currentIndex + 1];
        optionsRef.current[nextItem].focus();
      }
    } else if (e.key === 'ArrowUp') {
      const currentIndex = options.indexOf(option);
      if (currentIndex > 0) {
        const nextItem = Object
        .keys(optionsRef.current)[currentIndex - 1];
        optionsRef.current[nextItem].focus();
      }
    }
  }

  return (
    <div>
      <label className="block text-left text-gray-500" htmlFor="input">{label}</label>
      <input aria-autocomplete="list" aria-controls="options-list" aria-activedescendant="" value={input} onChange={onInput} id="input" onKeyDown={onKeyDown} className="bg-white hover:bg-blue-100 border border-gray-300 rounded px-3 py-2" />
      { showOptions && (
        <ul id="options-list" className="bg-green-100 rounded" role="listbox" style={{ listStyle: 'none' }}>
          { options.map((o, i) => (
            <li ref={setOptionRefs(o)} role="option" tabIndex="0" onKeyDown={(e) => optionKeyDown(o, e)} onClick={(e) => onOptionClick(o)} className="text-left hover:cursor-pointer hover:underline focus-visible:underline focus-visible:outline-0" key={i}>
              {o}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}