export const createValidator = (
  setBalance, setShouldMoveCursor, setCursorMovedOnce
) => ({ target: { value } }) => {
  if (
    !value ||
      value.match(/^[0-9]+$/) ||
      value.match(/^[0-9]+\.[0-9]{2}$/)
  ) {
    setBalance(value);
    setShouldMoveCursor(false);
  } else if (value.match(/^[0-9]+\.[0-9]{2}$/)) setShouldMoveCursor(false);
  else if (
    value.match(/^[0-9]+\.$/) ||
        value.match(/^[0-9]+\.[0-9]{1}$/)
  ) {
    setBalance(value.padEndUntil(/^[0-9]+\.[0-9]{2}$/, 0));
    setShouldMoveCursor(true);
    setCursorMovedOnce(false);
  } else if (value.match(/^[0-9]+\.[0-9]{3,}$/)) {
    setBalance(value.truncateUntil(/^[0-9]+\.[0-9]{2}$/));
    setShouldMoveCursor(true);
  }
};

export const createEffect = (
  balance, balanceRef, shouldMoveCursor,
  setShouldMoveCursor, cursorMovedOnce, setCursorMovedOnce
) => () => {
  if (balance.match(/^[0-9]+\.00$/) && shouldMoveCursor) {
    balanceRef.current.setSelectionRange(balance.length - 2, balance.length - 2);
    setShouldMoveCursor(false);
  } else if (balance.match(/^[0-9]+\.[1-9]0$/) && shouldMoveCursor && !cursorMovedOnce) {
    balanceRef.current.setSelectionRange(balance.length - 1, balance.length - 1);
    setShouldMoveCursor(false);
    setCursorMovedOnce(true);
  } else if (shouldMoveCursor) setShouldMoveCursor(false);
};
