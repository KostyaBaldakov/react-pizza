import { useSearchContext } from "../../shared/contexts/searchContext";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useSearchContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchValue = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    }, 300),
    []
  );

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          handleSearchValue(e);
          setValue(e.target.value);
        }}
        className={styles.input}
        placeholder="Поиск пиццы..."
      ></input>
      {value && (
        <div onClick={onClickClear}>
          <svg
            className={styles.cross}
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 32 32"
            height="32px"
            id="Слой_1"
            version="1.1"
            viewBox="0 0 32 32"
            width="32px"
          >
            <path
              d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
              fill="#121313"
              id="Close"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Search;

<svg
  xmlns="http://www.w3.org/2000/svg"
  enable-background="new 0 0 32 32"
  height="32px"
  id="Слой_1"
  version="1.1"
  viewBox="0 0 32 32"
  width="32px"
>
  <path
    d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
    fill="#121313"
    id="Close"
  />
</svg>;
