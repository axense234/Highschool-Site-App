import { Dispatch, SetStateAction } from "react";

interface BookmarksMenuProps {
  setShowBookmarks: Dispatch<SetStateAction<boolean>>;
  showBookmarks: boolean;
}

export default BookmarksMenuProps;
