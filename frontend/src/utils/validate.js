import { useState, useEffect, useRef } from 'react';

const createValidator = (
  setValue, setShouldMoveCursor, setCursorMovedOnce
) => ({ target: { value } }) => setValue(prevVal => {
  if (
    prevVal.match(/^[0-9]+\.[1-9]0$/) &&
    value.match(/^[0-9]+\.[0-9][1-9]0$/)
  ) setCursorMovedOnce(false);
  if (
    prevVal.match(/^[0-9]+\.00$/) &&
    value === prevVal.replace('.', '')
  ) return value.slice(0, value.length - 2);
  if (
    prevVal.match(/^[0-9]+\.00$/) &&
    value.match(/^[0-9]+\.000$/)
  ) {
    setShouldMoveCursor(true);
    setCursorMovedOnce(true);
    return value.truncateUntil(/^[0-9]+\.$/).padEndUntil(/^[0-9]+\.00$/, 0);
  }
  if (
    !value ||
      value.match(/^[0-9]+$/) ||
      value.match(/^[0-9]+\.[0-9]{2}$/)
  ) {
    setShouldMoveCursor(false);
    return value;
  } else if (
    value.match(/^[0-9]+\.$/) ||
    value.match(/^[0-9]+\.[0-9]{1}$/)
  ) {
    setShouldMoveCursor(true);
    setCursorMovedOnce(false);
    return value.padEndUntil(/^[0-9]+\.[0-9]{2}$/, 0);
  } else if (value.match(/^[0-9]+\.[0-9]{3,}$/)) {
    setShouldMoveCursor(true);
    return value.truncateUntil(/^[0-9]+\.[0-9]{2}$/);
  }
});

export default function CurrencyInput ({ placeholder, value, setValue, required }) {
  const [shouldMoveCursor, setShouldMoveCursor] = useState(false);
  const [cursorMovedOnce, setCursorMovedOnce] = useState(false);

  const valueRef = useRef(null);

  useEffect(() => {
    if (
      value.match(/^[0-9]+\.00$/) &&
      shouldMoveCursor &&
      !cursorMovedOnce
    ) {
      valueRef.current.setSelectionRange(value.length - 2, value.length - 2);
      setShouldMoveCursor(false);
    } else if ((
      (
        value.match(/^[0-9]+\.[1-9]0$/) ||
        value.match(/^[0-9]+\.0[1-9]$/)
      ) &&
      shouldMoveCursor &&
      !cursorMovedOnce
    ) || (
      value.match(/^[0-9]+\.00$/) &&
      shouldMoveCursor &&
      cursorMovedOnce
    )) {
      valueRef.current.setSelectionRange(value.length - 1, value.length - 1);
      setShouldMoveCursor(false);
      setCursorMovedOnce(true);
    } else if (shouldMoveCursor) setShouldMoveCursor(false);
  }, [value, shouldMoveCursor, cursorMovedOnce]);

  return (
    <input
      placeholder={placeholder}
      className='form-input'
      type='text'
      value={value}
      required={required}
      onChange={createValidator(setValue, setShouldMoveCursor, setCursorMovedOnce)}
    />
  );
}
