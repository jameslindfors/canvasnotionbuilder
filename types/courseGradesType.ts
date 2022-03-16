export type CourseGrades = {
  id: any;
  name: string;
  grades:
    | {
        currentGrade: string;
        currentScore: number;
      }
    | [...any];
};

export type Grades = {
  grades: { currentGrade: string; currentScore: number } | null;
};
