import { ParseitFolder } from "src/common/types";
import { ARCHIVE_DIR_NAME } from "../../common/constants";
import { Article } from "../types/Article";

export const isArchiveFolder = (folder: ParseitFolder) => {
  return folder?.folderPath?.includes(ARCHIVE_DIR_NAME);
}

export const isArchivedArticle = (article: Article) => {
  return article.filePath?.includes(ARCHIVE_DIR_NAME);
}