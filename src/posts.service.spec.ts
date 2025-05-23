import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();

    // Создаем тестовый пост перед каждым тестом
    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    // реализуйте тест-кейс
    // Arrange
    const initialLength = postsService.create({ text: "Initial post" }).id;

    // Act
    const createdPost = postsService.create(post);

    // Assert
    expect(createdPost).toHaveProperty("id");
    expect(createdPost).toHaveProperty("date");
    expect(createdPost.text).toBe(post.text);
    expect(createdPost.id).not.toBe(initialLength);
  });

  it("should find a post", () => {
    // реализуйте тест-кейс
    // Arrange
    const createdPost = postsService.create({ text: "Findable post" });

    // Act
    const foundPost = postsService.find(createdPost.id);

    // Assert
    expect(foundPost).toBeDefined();
    expect(foundPost).toEqual(createdPost);
  });

  it("should not find a non-existent post", () => {
    // реализуйте тест-кейс
    // Act
    const foundPost = postsService.find("non-existent-id");

    // Assert
    expect(foundPost).toBeUndefined();
  });
});
