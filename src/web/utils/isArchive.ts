import { ParseitFolder } from "src/common/types";
import { ARCHIVE_DIR_NAME } from "src/common/constants";
import { Article } from "src/web/types/Article";

export const isArchiveFolder = (folder: ParseitFolder) => {
  return folder?.folderPath?.includes(ARCHIVE_DIR_NAME);
}

export const isArchivedArticle = (article?: Article | null) => {
  return article?.filePath?.includes(ARCHIVE_DIR_NAME);
}