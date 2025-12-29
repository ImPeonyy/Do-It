import { apiServer } from "@/src/libs";


export default class ServerVocabularyService {
  async existingVocabularyOfUser(
    vocabularyId: number
  ): Promise<boolean> {
    return await apiServer<boolean>(
      `fav/vocabs/${vocabularyId}`,
      {
        method: "GET",
      }
    );
  }

  async saveVocabularyOfUser(
    vocabularyId: number
  ): Promise<void> {
    await apiServer<void>(
      `fav/vocabs/${vocabularyId}`,
      {
        method: "POST",
      }
    );
  }

  async deleteVocabularyOfUser(
    vocabularyId: number
  ): Promise<void> {
    await apiServer<void>(
      `fav/vocabs/${vocabularyId}`,
      {
        method: "DELETE",
      }
    );
  }
}
