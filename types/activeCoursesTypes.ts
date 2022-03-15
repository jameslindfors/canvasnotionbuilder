export type ActiveCourse = {
  name: string;
  id: string;
  sisId: null | string;
  courseCode: string;
  state: string;
  term: {
    name: string;
    startAt: string;
    endAt: string;
  };
};

export type ActiveCourses = {
  name: string;
  id: string;
  sisId: null | string;
  courseCode: string;
  state: string;
  term: {
    name: string;
    startAt: string;
    endAt: string;
  };
}[];
