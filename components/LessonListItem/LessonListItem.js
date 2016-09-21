import React from 'react';
import {Link} from 'react-router';
import {LessonRemoveButton} from 'components';
import moment from 'moment';

const LessonListItem = ({lesson, courseName, onRemove}) => {
  const createdAt = lesson.get('createdAt');

  return (
    <tr>
      <td className="col-md-6 col-sm-6">{lesson.get('title')}</td>
      <td className="col-md-3 col-sm-3">{moment(createdAt).format('L')}</td>
      <td className="col-md-3 col-sm-3 text-center">
        <ul className="icons-list">
          <li className="text-primary-600">
            <Link
              to={`/author/course/${courseName}/lesson/${lesson.get('slug')}/edit`}><i
              className="icon-pencil7"></i></Link>
          </li>
          <li className="text-danger-600">
            <LessonRemoveButton lesson={lesson}
                                onRemove={()=> onRemove(courseName, lesson.get('slug'))}/>
          </li>
        </ul>
      </td>
    </tr>
  );
};
export default LessonListItem;
