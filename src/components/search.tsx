import React, { FC, useState, useRef } from 'react'
import {InputGroup, Button } from "@blueprintjs/core";

const Search: FC = (props) => {
  const [login, setLogin] = useState<string>()
  const loginRef = useRef<HTMLInputElement>(null)

  return (
    <div className="search">
      <InputGroup
        inputRef={loginRef}
        placeholder="Login..."
        onKeyDown={(e) => {(e.key === 'Enter') && setLogin(loginRef.current?.value)} }
        rightElement={(
          <Button
            icon="arrow-right"
            onClick={() => {setLogin(loginRef.current?.value)}}
          />
        )}
      />
      <div className="result_container">
        {React.cloneElement(props.children as React.ReactElement<any>, { login })}
      </div>
    </div>
  );
}

export default Search