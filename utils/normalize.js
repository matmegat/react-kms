import { normalize, Schema, arrayOf } from 'normalizr';
import * as _ from 'lodash';

export function courses(arrayOfCourses) {
  const coursesSchema = new Schema('courses', { idAttribute: 'slug' });
  const results = normalize({ courses: arrayOfCourses }, {
    courses: arrayOf(coursesSchema)
  });
  const entities = _.get(results, 'entities.courses', {});
  const order = _.get(results, 'result.courses', []);
  return { order, entities, listLoaded: true };
}

export function lessons(arrayOfLessons) {
  const lessonsSchema = new Schema('lessons', { idAttribute: 'slug' });
  const results = normalize({ lessons: arrayOfLessons }, {
    lessons: arrayOf(lessonsSchema)
  });
  const entities = _.get(results, 'entities.lessons', {});
  const order = _.get(results, 'result.lessons', []);
  return { order, entities, listLoaded: true };
}


export function categories(arrayOfCategories) {
  const categoriesSchema = new Schema('categories', { idAttribute: 'slug' });
  const results = normalize({ categories: arrayOfCategories }, {
    categories: arrayOf(categoriesSchema)
  });
  const entities = _.get(results, 'entities.categories', {});
  const order = _.get(results, 'result.categories', []);
  return { order, entities, listLoaded: true };
}
