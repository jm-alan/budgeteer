export const createValidator = (
  setValue, setShouldMoveCursor, setCursorMovedOnce
) => ({ target: { value } }) => {
  if (
    !value ||
      value.match(/^[0-9]+$/) ||
      value.match(/^[0-9]+\.[0-9]{2}$/)
  ) {
    setValue(value);
    setShouldMoveCursor(false);
  } else if (value.match(/^[0-9]+\.[0-9]{2}$/)) setShouldMoveCursor(false);
  else if (
    value.match(/^[0-9]+\.$/) ||
        value.match(/^[0-9]+\.[0-9]{1}$/)
  ) {
    setValue(value.padEndUntil(/^[0-9]+\.[0-9]{2}$/, 0));
    setShouldMoveCursor(true);
    setCursorMovedOnce(false);
  } else if (value.match(/^[0-9]+\.[0-9]{3,}$/)) {
    setValue(value.truncateUntil(/^[0-9]+\.[0-9]{2}$/));
    setShouldMoveCursor(true);
  }
};

export const createEffect = (
  value, valueRef, shouldMoveCursor,
  setShouldMoveCursor, cursorMovedOnce, setCursorMovedOnce
) => () => {
  if (value.match(/^[0-9]+\.00$/) && shouldMoveCursor) {
    valueRef.current.setSelectionRange(value.length - 2, value.length - 2);
    setShouldMoveCursor(false);
  } else if (value.match(/^[0-9]+\.[1-9]0$/) && shouldMoveCursor && !cursorMovedOnce) {
    valueRef.current.setSelectionRange(value.length - 1, value.length - 1);
    setShouldMoveCursor(false);
    setCursorMovedOnce(true);
  } else if (shouldMoveCursor) setShouldMoveCursor(false);
};
