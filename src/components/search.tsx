import React, { FC, useState, useRef } from 'react'
import { ControlGroup, InputGroup, Button } from "@blueprintjs/core";

interface IProps {

}

const Search: FC<IProps> = (props) => {
  const [login, setLogin] = useState<string>()
  const loginRef = useRef<HTMLInputElement>(null)

  return (
    <div className="search">
      <InputGroup
        // disabled={disabled}
        inputRef={loginRef}
        placeholder="Login..."
        onKeyDown={(e) => {(e.key === 'Enter') && setLogin(loginRef.current?.value)} }
        rightElement={(
          <Button
            // disabled={disabled}
            icon="arrow-right"
            // minimal={true}
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