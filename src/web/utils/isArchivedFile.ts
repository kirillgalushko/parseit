import { ARCHIVE_DIR_NAME } from "../../common/constants";

export const isArchivedFile = (filePath: string) => {
  return filePath.includes(ARCHIVE_DIR_NAME);
}