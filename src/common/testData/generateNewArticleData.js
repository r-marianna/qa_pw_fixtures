import { faker } from '@faker-js/faker';

export function generateNewArticleData(tagNumber = 0, logger = console) {
  let tags = Array.from({ length: tagNumber }, () => faker.lorem.word());

  const article = {
    title: faker.lorem.words(4),
    description: faker.lorem.sentence(4),
    body: faker.lorem.paragraphs(2),
    tags,
  };

  logger.debug(`New article generated: ${JSON.stringify(article)}`);

  return article;
}
